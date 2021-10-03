package fi.zyme.caucus;

import static fi.zyme.caucus.Token.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;

import fi.zyme.caucus.exception.ApplicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fi.zyme.caucus.dto.ApiRequest;
import fi.zyme.caucus.dto.ApiResponse;
import fi.zyme.caucus.dto.CaucusResponse;
import fi.zyme.caucus.dto.zyme.AuthResponse;
import fi.zyme.caucus.dto.zyme.ZymeCustomer;
import fi.zyme.caucus.dto.zyme.WebCustomerId;
import fi.zyme.caucus.message.CaucusInitiateReply;
import fi.zyme.caucus.message.CaucusInitiateRequest;
import fi.zyme.caucus.message.VerificationRequest;
import fi.zyme.caucus.util.Config;
import io.vertx.core.http.HttpMethod;

public class Convert {

    private static final Logger LOG = LoggerFactory.getLogger(Convert.class);


    public static CaucusInitiateRequest toCaucusInitiateRequest(ApiRequest apiRequest) throws URISyntaxException, ApplicationException {
        try {
            LOG.debug("Converting initiate request {}", apiRequest);
            CaucusInitiateRequest result = new CaucusInitiateRequest();

            result.nonce = apiRequest.nonce;
            LOG.debug("nonce: {}", result.nonce);
            if (result.nonce == null) {
                String errorMessage = "Invalid initiate request: nonce property is missing";
                LOG.error(errorMessage);
                throw ApplicationException.badRequest(errorMessage);
            }

            if (apiRequest.links == null || apiRequest.links.callbackUrl == null && apiRequest.links.callbackUrl.href == null) {
                String errorMessage = "Invalid initiate request: links.callbackUrl.href property is missing";
                LOG.error(errorMessage);
                throw ApplicationException.badRequest(errorMessage);
            }
            result.caucusApiUri = caucusUri(apiRequest.links().callbackUrl.href, Optional.ofNullable(apiRequest.nonce));

            return result;
        } catch (ApplicationException e) {
            throw e;
        } catch (Exception e) {
            throw ApplicationException.badRequest("Invalid initiate request", e);
        }
    }

    private static URI caucusUri(String url, Optional<String> nonce) throws URISyntaxException, ApplicationException {
        if (nonce.isPresent()) {
            url = url.replaceAll("\\{nonce\\}", nonce.get());
        }
        LOG.trace("url: {}", url);
        // Config.caucusApiRegex is compiled from value in external configuration JSON file.
        // It must be guaranteed that at this point it is already successfully fetched. If not then there's a bug.
        // In other words no NullPointerExceptions should be thrown.
        LOG.trace("Testing url against regex {}", Config.caucusApiRegex().pattern());
        Matcher matcher = Config.caucusApiRegex().matcher(url);
        if (matcher.lookingAt()) {
            return new URI(url);
        } else {
            throw ApplicationException.badRequest("Invalid caucus API url");
        }
    }

    public static CaucusInitiateReply toCaucusInitiateReply(CaucusResponse caucusResponse) throws ApplicationException {
        LOG.debug("Converting initiate Caucus response {}", caucusResponse);
        CaucusInitiateReply result = new CaucusInitiateReply();
        result.caucusResponse = caucusResponse;

        // TODO: check status code of HTTP response!!!

        if (caucusResponse.failed()) {
            // TODO: implement proper error handling
            // it shouldn't fail here rather proceed with 500 response
        }

        result.token = Token.caucusToken(caucusResponse);

        return result;
    }

    public static ApiResponse toApiResponse(CaucusInitiateReply reply) {
        LOG.debug("Converting initiate API response {}", reply);
        ApiResponse result = new ApiResponse();

        result.success = reply.caucusResponse.success;
        if (!result.success) {
            result.appendError("CAUCUS_API_ERROR");
        }

        if (result.success) {
            result.caucusToken = processToken(reply.token, result);
        }

        result.links = new CaucusResponse.Links();
        Optional<CaucusResponse.Links> links = Optional.ofNullable(reply)
                .map(entity -> entity.caucusResponse)
                .map(entity -> entity.response)
                .map(entity -> entity.identifierVerification)
                .map(entity -> entity._links);
        links.map(entity -> entity.verify)
            .ifPresent(link -> result.links.verify = link);
        links.map(entity -> entity.cancel)
            .ifPresent(link -> result.links.cancel = link);
        links.map(entity -> entity.error)
            .ifPresent(link -> result.links.error = link);

        return result;
    }

    public static ApiResponse toApiResponse(ZymeAPI.AuthReply reply) {
        ApiResponse result = new ApiResponse();

        result.success = reply.token.isValid();
        result.zymeToken = reply.token.asString();
        result.customers = reply.customers;

        return result;
    }

    public static VerificationRequest toVerificationRequest(ApiRequest apiRequest, Token caucusToken) throws ApplicationException, URISyntaxException {
            LOG.debug("Converting verify request {}", apiRequest);

            // TODO: implement proper verify request validation
            VerificationRequest result = new VerificationRequest(apiRequest);

            result.caucusToken = caucusToken;

            result.zymeToken = Token.zymeToken(apiRequest.zymeToken);
            if (result.zymeToken.isInvalid()) {
                LOG.error("Invalid Zyme token");
                throw ApplicationException.badRequest("Invalid Zyme token");
            }

            LOG.debug("converting links");
            if (apiRequest.links() == null) {
                LOG.error("Invalid verify request: links property is missing");
                throw ApplicationException.badRequest("Invalid verify request: links property is missing");
            }
            if (apiRequest.links().verify == null) {
                LOG.error("Invalid verify request: link.verify property is missing");
                throw ApplicationException.badRequest("Invalid verify request: link.verify property is missing");
            }
            if (apiRequest.links().verify.href == null) {
                LOG.error("Invalid verify request: link.verify property is missing");
                throw ApplicationException.badRequest("Invalid verify request: link.verify property is missing");
            }
            result.caucusApiUri(caucusUri(apiRequest.links().verify.href, Optional.empty()));

            LOG.debug("Converting method");
            result.caucusApiMethod(Optional.ofNullable(apiRequest.links().verify.method)
                    .map(String::toUpperCase)
                    .map(HttpMethod::valueOf)
                    .orElse(HttpMethod.POST));
            LOG.trace("caucus API method: {}", result.caucusApiMethod);

            if (apiRequest.globalIDs == null) {
                LOG.error("Invalid verify request: globalIDs list is empty");
                throw ApplicationException.badRequest("Invalid verify request: globalIDs list is empty");
            }
            if (apiRequest.globalIDs.size() != 1) {
                LOG.error("Invalid verify request: globalIDs list must have exactly one element");
                throw ApplicationException.badRequest("Invalid verify request: globalIDs list must have exactly one element");
            }
            result.globalID = apiRequest.globalIDs.get(0);

            return result;
    }

    public static ZymeAPI.VerifyRequest toZymeVerificationRequest(VerificationRequest request) {
        ZymeAPI.VerifyRequest result = new ZymeAPI.VerifyRequest();
        result.zymeToken = request.zymeToken;
        result.globalID = request.globalID;
        return result;
    }

    private static class ZymeTokenPayload {
        private static class Entry {
            @SuppressWarnings("unused")
            public final String number;
            @SuppressWarnings("unused")
            public final String name;
            private Entry(String name, String number) {
                this.name = name;
                this.number = number;
            }
        }
        @SuppressWarnings("unused")
        public final List<Entry> customerData;
        public ZymeTokenPayload(ApiResponse.Customer customer) {
            this.customerData = Arrays.asList(new Entry(customer.name, customer.globalID));
        }
    }

    public static CaucusAPI.VerifyRequest toCaucusVerificationRequest(VerificationRequest request, ZymeAPI.VerifyReply zymeVerifyReply) throws ApplicationException {
        CaucusAPI.VerifyRequest result = new CaucusAPI.VerifyRequest();
        result.caucusApiUri = request.caucusApiUri;
        result.caucusApiMethod = request.caucusApiMethod;

        ApiResponse.Customer customer = zymeVerifyReply.customer;
        // Token is loosing it's jws field via JSON (de)serialization, so we need to recreate it
        Token caucusToken = caucusToken(request.caucusToken);
        if (request.caucusToken.isInvalid()) {
            throw ApplicationException.unauthorized("Caucus token is invalid");
        }

        Token verificationToken = Token.verificationToken(caucusToken, new ZymeTokenPayload(customer));
        // Check verification token validity just to be sure. However it is hard to imagine why would it be invalid.
        // If it is that means there's a serious bug.
        if (verificationToken.isValid()) {
            result.verificationToken = verificationToken;
        } else {
            throw ApplicationException.internal("Verification token is invalid");
        }

        return result;
    }

    public static CaucusAPI.VerifyReply toCaucusVerifyReply(CaucusResponse caucusResponse) throws ApplicationException {
        LOG.debug("Converting verify Caucus response {}", caucusResponse);
        CaucusAPI.VerifyReply result = new CaucusAPI.VerifyReply();
        result.caucusResponse = caucusResponse;

        // TODO: check status code of HTTP response!!!

        if (caucusResponse.failed()) {
            // TODO: implement proper error handling
            // it shouldn't fail here rather proceed with 500 response
        } else {
            result.callbackUrl = caucusResponse.response.identifierVerification._links.callbackUrl;
        }

        return result;
    }

    public static ApiResponse toApiResponse(CaucusAPI.VerifyReply reply) {
        LOG.debug("Converting verify API response {}", reply);
        ApiResponse result = new ApiResponse();

        result.success = reply.caucusResponse.success;
        if (!result.success) {
            result.appendError("CAUCUS_API_ERROR");
        }

        result.links = new CaucusResponse.Links();
        Optional<CaucusResponse.Links> links = Optional.ofNullable(reply)
                .map(entity -> entity.caucusResponse)
                .map(entity -> entity.response)
                .map(entity -> entity.identifierVerification)
                .map(entity -> entity._links);
        links.map(entity -> entity.callbackUrl)
                .ifPresent(link -> result.links.callbackUrl = link);
        links.map(entity -> entity.error)
                .ifPresent(link -> result.links.error = link);

        return result;
    }

    public static ZymeAPI.AuthRequest toZymeAuthRequest(ApiRequest apiRequest) throws ApplicationException {
        try {
            ZymeAPI.AuthRequest result = new ZymeAPI.AuthRequest();

            assert apiRequest.username != null : "Username is null";
            assert apiRequest.password != null : "Password is null";

            result.username = apiRequest.username;
            result.password = apiRequest.password;

            return result;
        } catch (Exception e) {
            throw ApplicationException.badRequest("Invalid initiate request", e);
        }
    }

    public static ZymeAPI.AuthReply toZymeAuthReply(AuthResponse response) throws ApplicationException {
        ZymeAPI.AuthReply reply = new ZymeAPI.AuthReply();

        // TODO: check if we should verify token here
        reply.token = Token.zymeToken(response.accessToken);
        if (reply.token.isInvalid()) {
            throw ApplicationException.unauthorized("Zyme token is invalid", reply.token.cause());
        }

        return reply;
    }

    public static ApiResponse.Customer toCustomer(WebCustomerId webCustomerId, ZymeCustomer zymeCustomer) {
        ApiResponse.Customer customer = new ApiResponse.Customer();

        customer.customerType = webCustomerId.customerType;
        customer.customerNumber = webCustomerId.customerNumber;
        customer.name = String.format("%s %s", zymeCustomer.firstName, zymeCustomer.name);
        customer.globalID = zymeCustomer.globalID;

        return customer;
    }


    private static String processToken(Token token, ApiResponse response) {
        if (token == null) {
            LOG.trace("Token is null");
            response.appendError("TOKEN_IS_MISSING");
            return null;
        }

        LOG.trace("Processing token: {} (valid: {}, error: {}, cause: {})",
                token, token.isValid(), token.error(), token.cause());
        if (token.isInvalid()) {
            switch (token.error()) {
            case INVALID:
                response.appendError("TOKEN_IS_INVALID");
                break;
            case EXPIRED:
                response.appendError("TOKEN_EXPIRED");
                break;
            case MISSING_IN_REQUEST:
                response.appendError("TOKEN_MISSING_IN_REQUEST");
                break;
            case MISSING_IN_RESPONSE:
                response.appendError("TOKEN_MISSING_IN_RESPONSE");
                break;
            }
        }
        return token.asString();
    }
}
