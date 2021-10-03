package fi.zyme.caucus;

import static fi.zyme.caucus.Convert.toCaucusInitiateReply;
import static fi.zyme.caucus.Convert.toCaucusVerifyReply;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Optional;

import org.slf4j.LoggerFactory;

import fi.zyme.caucus.dto.CaucusResponse;
import fi.zyme.caucus.exception.ApplicationException;
import fi.zyme.caucus.message.CaucusInitiateReply;
import fi.zyme.caucus.message.CaucusInitiateRequest;
import io.reactivex.Single;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.core.buffer.Buffer;
import io.vertx.reactivex.core.eventbus.Message;
import io.vertx.reactivex.ext.web.client.HttpRequest;
import io.vertx.reactivex.ext.web.client.HttpResponse;

public class CaucusAPI extends ApiVerticle {

    public static class VerifyRequest {
        public URI caucusApiUri;
        public HttpMethod caucusApiMethod;
        public Token verificationToken;
    }
    public static class VerifyReply {
        public CaucusResponse caucusResponse;
        public CaucusResponse.Link callbackUrl;
    }

    private static final String ADDRESS_CAUCUS_SERVICE = "caucus.api.service";
    private static String caucusService(String action) {
        return String.format("%s.%s", ADDRESS_CAUCUS_SERVICE, action);
    }
    public static final String INITIATE = caucusService("initiate");
    public static final String VERIFY = caucusService("verify");

    public CaucusAPI() {
        super(LoggerFactory.getLogger(CaucusAPI.class));
    }

    @Override
    public void start() throws Exception {
        super.start();

        vertx.eventBus().consumer(INITIATE, this::initiate);
        vertx.eventBus().consumer(VERIFY, this::verifyIpn);
    }

    private void initiate(Message<JsonObject> message) {
        Single.just(message.body().mapTo(CaucusInitiateRequest.class))
            .flatMap(Utils.checked(this::rxInit))
            .map(JsonObject::mapFrom)
            .subscribe(observer(message));
    }
    private Single<CaucusInitiateReply> rxInit(CaucusInitiateRequest request) throws MalformedURLException {
        URL url = request.caucusApiUri.toURL();
        return get(url)
            .flatMap(Utils.toSingle(this::readInitiateReply));
    }

    private CaucusInitiateReply readInitiateReply(HttpResponse<Buffer> httpResponse) throws ApplicationException {
        CaucusResponse caucusResponse = toCaucusResponse(httpResponse);
        return toCaucusInitiateReply(caucusResponse);
    }

    private void verifyIpn(Message<JsonObject> message) {
        LOG.debug("Requesting IPN verification {}", message.body());
        Single.just(message.body().mapTo(VerifyRequest.class))
            .flatMap(Utils.checked(this::rxVerify))
            .map(JsonObject::mapFrom)
            .subscribe(observer(message));
    }
    private Single<VerifyReply> rxVerify(VerifyRequest request) throws MalformedURLException {
        URL url = request.caucusApiUri.toURL();
        return httpRequest(request.caucusApiMethod, url, Optional.of(request.verificationToken))
                .flatMap(Utils.toSingle(this::verifyReply));
    }
    private VerifyReply verifyReply(HttpResponse<Buffer> httpResponse) throws ApplicationException {
        CaucusResponse caucusResponse = toCaucusResponse(httpResponse);
        return toCaucusVerifyReply(caucusResponse);
    }

    private CaucusResponse toCaucusResponse(HttpResponse<Buffer> httpResponse) throws ApplicationException {
        CaucusResponse caucusResponse = Utils.fromJsonHttpResponse(httpResponse, CaucusResponse.class);
        caucusResponse.httpStatus = httpResponse.statusCode();
        return caucusResponse;
    }

    private Single<HttpResponse<Buffer>> get(URL url) {
        return httpRequest(HttpMethod.GET, url, Optional.empty());
    }
    private Single<HttpResponse<Buffer>> httpRequest(HttpMethod method, URL url, Optional<Token> bearerToken) {
        HttpRequest<Buffer> request = webClient(method, url);
        bearerToken.ifPresent(token -> request.bearerTokenAuthentication(token.asString()));
        return request.rxSend()
                .map(this::traceResponse);
    }

}
