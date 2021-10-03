package fi.zyme.caucus;

import static fi.zyme.caucus.Token.toBearerToken;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import fi.zyme.caucus.dto.ApiResponse;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import fi.zyme.caucus.dto.zyme.AuthResponse;
import fi.zyme.caucus.dto.zyme.ZymeCustomer;
import fi.zyme.caucus.dto.zyme.WebCustomerId;
import fi.zyme.caucus.exception.ApplicationException;
import fi.zyme.caucus.util.Config;
import io.reactivex.Single;
import io.reactivex.functions.Function;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.core.buffer.Buffer;
import io.vertx.reactivex.core.eventbus.Message;
import io.vertx.reactivex.ext.web.client.HttpRequest;
import io.vertx.reactivex.ext.web.client.HttpResponse;

public class ZymeAPI extends ApiVerticle {

    public static class AuthRequest {
        public String username;
        public String password;
    }

    public static class AuthReply {
        public Token token;
        public List<ApiResponse.Customer> customers;
    }

    /**
     * Represents a response of '/zyme/users/me/privileges' call.
     * <pre>{
     *   "applicationPrivileges": [...],
     *   "dataPrivileges": [
     *     {
     *       "webCustomerId": {
     *         "customerType": "...", // applicable values are "TE"
     *         "customerNumber": ...
     *       },
     *       "privilegeClass": "...",
     *       "privilegeLevel": "..." // applicable values are "OMATEOS"
     *     },
     *     ...
     *   ]
     * }</pre>
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PrivilegesResponse {
        public List<DataPrivilege> dataPrivileges;
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class DataPrivilege {
        public WebCustomerId webCustomerId;
        public String privilegeClass;
        public String privilegeLevel;
    }

    public static class VerifyRequest {
        public Token zymeToken;
        public String globalID;
    }

    public static class VerifyReply {
        public ApiResponse.Customer customer;

        public VerifyReply() {}
        public VerifyReply(ApiResponse.Customer customer) {
            this.customer = customer;
        }
    }

    private static final String ADDRESS = "zyme.api.service";
    private static String address(String action) {
        return String.format("%s.%s", ADDRESS, action);
    }
    public static final String AUTHENTICATE = address("authenticate");
    public static final String VERIFY = address("verify");

    public ZymeAPI() {
        super(LoggerFactory.getLogger(ZymeAPI.class));
    }

    @Override
    public void start() throws Exception {
        super.start();

        vertx.eventBus().consumer(AUTHENTICATE, this::authenticate);
        vertx.eventBus().consumer(VERIFY, this::verify);
    }

    private void authenticate(Message<JsonObject> message) {
        Single.just(message.body().mapTo(AuthRequest.class))
            .flatMap(Utils.checked(this::rxAuth))
            .flatMap(this::rxAuthRoles)
            .map(JsonObject::mapFrom)
            .subscribe(observer(message));
    }

    private void verify(Message<JsonObject> message) {
        Single.just(message.body().mapTo(VerifyRequest.class))
            .flatMap(verifyRequest -> rxRoles(verifyRequest.zymeToken.asString())
                        .flatMap(customers -> customers.stream()
                            .filter(customer -> customer.globalID.equals(verifyRequest.globalID))
                            .findFirst()
                            .map(Single::just)
                            .orElse(Single.error(ApplicationException.internal(
                                        String.format("Couldn't find customer with global ID %s", verifyRequest.globalID))))))
            .map(VerifyReply::new)
            .map(JsonObject::mapFrom)
            .subscribe(observer(message));
    }

    /**
     * Invokes POST call to '/zyme/auth'.
     * @param request
     * @return Single of AuthReply
     * @throws MalformedURLException
     */
    private Single<AuthReply> rxAuth(AuthRequest request) throws MalformedURLException {
        URL url = new URL(Config.zymeApiEndpointDns(), "./auth");
        return post(url, JsonObject.mapFrom(request))
                .flatMap(Utils.toSingle(this::readAuthResponse));
    }
    private AuthReply readAuthResponse(HttpResponse<Buffer> response) throws ApplicationException {
        LOG.trace("Got response {}", response);
        AuthResponse authResponse = Utils.fromJsonHttpResponse(response, AuthResponse.class);
        return Convert.toZymeAuthReply(authResponse);
    }

    private Single<AuthReply> rxAuthRoles(AuthReply authReply) {
        return rxRoles(authReply.token.asString())
                .map(customers -> {
                    authReply.customers = customers;
                    return authReply;
                });
    }

    /**
     * Fetches Customer instances (containing name and global ID) for given token.
     * Method first gets a Single of PrivilegesResponse, then turns it into
     * Observable of matching WebCustomerId instances, and for each of that
     * fetches Customer instance.
     *
     * @param token
     * @return Single of list of ApiResponse.Customer instances
     */
    private Single<List<ApiResponse.Customer>> rxRoles(String token) {
        return Utils.checked(() -> rxPrivileges(token)
                .flattenAsObservable(ZymeAPI::getWebCustomerIds)
                .flatMap(webCustomerId -> rxRoleData(webCustomerId, token).toObservable())
                .collectInto(
                        new ArrayList<ApiResponse.Customer>(),
                        (list, customer) -> list.add(customer)));
    }
    /**
     * Invokes GET call to '/zyme/users/me/privileges'.
     * Sends Bearer token via Authorization header.
     * Response contains list of DataPrivilege instances of which only those of "OMATEOS"
     * privilege class need to be taken into account.
     * @param token
     * @return Single of PrivilegesResponse
     * @throws MalformedURLException
     */
    private Single<PrivilegesResponse> rxPrivileges(String token) throws MalformedURLException {
        LOG.debug("(rx) Fetching roles for token {}", token);
        URL url = new URL(Config.zymeApiEndpointDns(), "./zyme/users/me/privileges");
        return get(url, token)
                .flatMap(Utils.httpResponseValidator(HttpStatus.OK))
                .flatMap(Utils.toSingle(this::readPrivilegesResponse));
    }
    private PrivilegesResponse readPrivilegesResponse(HttpResponse<Buffer> response) {
        return response.bodyAsJson(PrivilegesResponse.class);
    }

    /**
     * Filters DataPrivilege instances from fetched PrivilegesResponse and returns only those
     * that have "OMATEOS" privilege class and "TE" customer type.
     * @param response
     * @return listed of WebCustomerId's (contain customer type and number) from matching DataPrivilege instances.
     */
    private static List<WebCustomerId> getWebCustomerIds(PrivilegesResponse response) {
        return response.dataPrivileges.stream()
            .filter(privilege -> {
                return "OMATEOS".equals(privilege.privilegeClass)
                        && "TE".equals(privilege.webCustomerId.customerType);
            })
            .map(dataPrivilege -> dataPrivilege.webCustomerId)
            .collect(Collectors.toList());
    }

    /**
     * Invokes GET call to '/zyme/customer/{customerType}/{customerNumber}'.
     * Sends Bearer token via Authorization header.
     * Passes particular customer type and number via path parameters.
     * Response data contains both name and global ID.
     * @param webCustomerId
     * @param token
     * @return Single of Customer type
     * @throws MalformedURLException
     */
    private Single<ApiResponse.Customer> rxRoleData(WebCustomerId webCustomerId, String token) throws MalformedURLException {
        LOG.debug("(rx) Fetching customer {} {}", webCustomerId.customerType, webCustomerId.customerNumber);
        URL url = new URL(Config.zymeApiEndpointDns(),
                String.format("./customer/%s/%s",
                        webCustomerId.customerType, webCustomerId.customerNumber));
        return get(url, token)
                .flatMap(Utils.httpResponseValidator(HttpStatus.OK))
                .flatMap(Utils.toSingle(salesforceCustomerResponseReader(webCustomerId)));
    }
    private Function<HttpResponse<Buffer>, ApiResponse.Customer> salesforceCustomerResponseReader(
            WebCustomerId webCustomerId) {
        return response -> {
            ZymeCustomer zymeCustomer = response.bodyAsJson(ZymeCustomer.class);
            return Convert.toCustomer(webCustomerId, zymeCustomer);
        };
    }

    private Single<HttpResponse<Buffer>> get(URL url, String token) {
        return webClient(HttpMethod.GET, url)
                .putHeader(HttpHeaders.AUTHORIZATION.toString(), Token.toBearerToken(token))
                .rxSend()
                .map(this::traceResponse);
    }
    private Single<HttpResponse<Buffer>> post(URL url, JsonObject body) {
        return webClient(HttpMethod.POST, url)
                .rxSendJsonObject(body)
                .map(this::traceResponse);
    }
    @Override
    protected HttpRequest<Buffer> webClient(HttpMethod method, URL url) {
        return super.webClient(method, url)
                .putHeader("Host", Config.zymeApiHost());
    }

}
