package fi.zyme.caucus;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.BiPredicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import fi.zyme.caucus.dto.ApiRequest;
import fi.zyme.caucus.dto.ApiResponse;
import fi.zyme.caucus.exception.ApplicationException;
import fi.zyme.caucus.message.CaucusInitiateReply;
import fi.zyme.caucus.message.VerificationRequest;
import fi.zyme.caucus.util.Config;
import fi.zyme.caucus.util.UncheckedConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude.Include;

import io.reactivex.Single;
import io.reactivex.SingleObserver;
import io.reactivex.functions.Function;
import io.reactivex.observers.DisposableSingleObserver;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.core.json.jackson.DatabindCodec;
import io.vertx.reactivex.config.ConfigRetriever;
import io.vertx.reactivex.core.AbstractVerticle;
import io.vertx.reactivex.core.http.HttpServerResponse;
import io.vertx.reactivex.ext.web.Route;
import io.vertx.reactivex.ext.web.Router;
import io.vertx.reactivex.ext.web.RoutingContext;
import io.vertx.reactivex.ext.web.handler.BodyHandler;
import io.vertx.reactivex.ext.web.handler.StaticHandler;

public class MainVerticle extends AbstractVerticle {

    private final Logger LOG = LoggerFactory.getLogger(MainVerticle.class);
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private static final int AUTH_COUNTER_RESET_INTERVAL = 60000;

    private static int PORT = 8080;
    private static String PATH_API = "api";
    private static Pattern PATH_API_PATTERN = Pattern.compile(String.format("^/%s/(.*)", PATH_API));
    private static int authCounter = 0;

    @SuppressWarnings("unused")
    private Route routeApi;
    @SuppressWarnings("unused")
    private Route routeStatic;
    private List<BiPredicate<RoutingContext, String>> registeredApiHandlers = Collections.emptyList();

    @Override
    public void start() throws Exception {
        DatabindCodec.prettyMapper().setSerializationInclusion(Include.NON_NULL);

        vertx.deployVerticle(new CaucusAPI());
        vertx.deployVerticle(new ZymeAPI());

        Router router = Router.router(vertx);

        ConfigRetriever retriever = ConfigRetriever.create(vertx);
        retriever.getConfig(ar -> {
            if (ar.failed()) {
                // TODO: notify Config about failure
                LOG.error("Config retrieve failed!!!");
            } else {
                Config.readConfig(ar.result());
            }
        });

        scheduler.scheduleAtFixedRate(() -> {
            authCounter = 0;
        }, AUTH_COUNTER_RESET_INTERVAL, AUTH_COUNTER_RESET_INTERVAL, TimeUnit.MILLISECONDS);

        registeredApiHandlers = Arrays.asList(
                pathHandler(HttpMethod.POST, "initiate", this::initiateVerification),
                pathHandler(HttpMethod.POST, "auth", this::authenticateUser),
                pathHandler(HttpMethod.POST, "verify", this::finalizeIpnVerification));
        routeApi = router.routeWithRegex(PATH_API_PATTERN.pattern())
                .handler(BodyHandler.create())
                .handler(this::handler)
                .failureHandler(this::handleFailure);
        routeStatic = router.routeWithRegex("^(?!/api/).*")
                .handler(StaticHandler.create().setCachingEnabled(false));

        vertx.createHttpServer().requestHandler(router).listen(PORT);

        LOG.info("HTTP server started at port {}", PORT);
    }

    private void handler(RoutingContext ctx) {
        String uriPath = ctx.request().path();
        Matcher m = PATH_API_PATTERN.matcher(uriPath);
        if (!m.matches()) {
            LOG.error("API path {} is invalid", uriPath);
            ctx.fail(HttpStatus.NOT_FOUND.code);
        }

        String endpointPath = m.group(1);
        LOG.info("Handling {} request {}", ctx.request().rawMethod(), endpointPath);
        for (BiPredicate<RoutingContext, String> pathHandler : registeredApiHandlers) {
            if (pathHandler.test(ctx, endpointPath)) { return; }
        }
        notFound(ctx);
    }
    private BiPredicate<RoutingContext, String> pathHandler(HttpMethod method, String path,
            UncheckedConsumer<RoutingContext> consumer) {
        Pattern patternPath = Pattern.compile(String.format("^%s\\/?$", path));
        return (ctx, actualPath) -> {
            if (patternPath.matcher(actualPath).matches()) {
                if (!method.equals(ctx.request().method())) {
                    notAllowed(ctx);
                } else if (Config.succeeded()) {
                    Utils.invoke(ctx, consumer);
                } else if (Config.failed()) {
                    internalServerError(ctx, "API error - configuration failed to load");
                } else {
                    internalServerError(ctx, "API error - configuration not ready");
                }
                return true;
            }
            return false;
        };
    }

    /**
     * Implementation of 'init' API call
     * @param ctx
     */
    private void initiateVerification(RoutingContext ctx) {
        LOG.debug("Handling 'initiate' call");
        Utils.jsonBody(ctx, ApiRequest.class)
            .map(Convert::toCaucusInitiateRequest)
            .flatMap(request -> vertx.eventBus().rxRequest(CaucusAPI.INITIATE, JsonObject.mapFrom(request)))
            .flatMap(Utils.replyValidator())
            .map(this::replyWithCaucusJWT)
            .subscribe(responder(ctx));
    }
    private ApiResponse replyWithCaucusJWT(JsonObject message) throws ApplicationException {
        LOG.debug("Handling initiate reply: {}", message.encodePrettily());
        return Convert.toApiResponse(
                message.mapTo(CaucusInitiateReply.class));
    }

    /**
     * Implementation of 'auth' API call
     * @param ctx
     */
    private void authenticateUser(RoutingContext ctx) {
        LOG.debug("Handling 'auth' call");
        Utils.jsonBody(ctx, ApiRequest.class)
            .map(Convert::toZymeAuthRequest)
            .flatMap(authCounter(ctx))
            .delay(Config.zymeAuthTimeout(), TimeUnit.MILLISECONDS)
            .flatMap(request -> vertx.eventBus().rxRequest(ZymeAPI.AUTHENTICATE, JsonObject.mapFrom(request)))
            .flatMap(Utils.replyValidator())
            .map(this::replyWithZymeData)
            .subscribe(responder(ctx));
    }
    private Function<ZymeAPI.AuthRequest, Single<ZymeAPI.AuthRequest>> authCounter(RoutingContext ctx) {
        return request -> {
            authCounter ++;
            LOG.trace("authCounter: {}", authCounter);
            if (authCounter > Config.zymeAuthThreshold()) {
                String errorMessage = String.format("Too many requests: (%s) %s", ctx.request().method().name(), ctx.request().path());
                LOG.error(errorMessage);
                return Single.error(new ApplicationException(ApplicationException.Type.TOO_MANY_REQUESTS, errorMessage));
            } else {
                return Single.just(request);
            }
        };
    }
    private ApiResponse replyWithZymeData(JsonObject message) {
        return Convert.toApiResponse(
                message.mapTo(ZymeAPI.AuthReply.class));
    }

    /**
     * Implementation of 'verify' API call
     * @param ctx
     * @throws ApplicationException 
     */
    private void finalizeIpnVerification(RoutingContext ctx) throws ApplicationException {
        LOG.debug("Handling 'verify' call");

        Token caucusToken = Token.caucusToken(ctx.request());
        LOG.debug("caucusToken: {}", caucusToken);

        Utils.jsonBody(ctx, ApiRequest.class)
            .map(apiRequest -> Convert.toVerificationRequest(apiRequest, caucusToken))
            .flatMap(this::doZymeVerification)
            .flatMap(caucusVerifyRequest -> vertx.eventBus().rxRequest(CaucusAPI.VERIFY, JsonObject.mapFrom(caucusVerifyRequest)))
            .flatMap(Utils.replyValidator())
            .map(this::replyWithIpnVerification)
            .subscribe(responder(ctx));
    }
    private Single<CaucusAPI.VerifyRequest> doZymeVerification(VerificationRequest verificationRequest) {
        ZymeAPI.VerifyRequest zymeVerificationRequest = Convert.toZymeVerificationRequest(verificationRequest);
        return vertx.eventBus()
                .rxRequest(ZymeAPI.VERIFY, JsonObject.mapFrom(zymeVerificationRequest))
                .flatMap(Utils.replyValidator())
                .map(json -> json.mapTo(ZymeAPI.VerifyReply.class))
                .map(zymeVerifyReply -> Convert.toCaucusVerificationRequest(verificationRequest, zymeVerifyReply));
    }
    private ApiResponse replyWithIpnVerification(JsonObject message) {
        return Convert.toApiResponse(
                message.mapTo(CaucusAPI.VerifyReply.class));
    }

    private SingleObserver<ApiResponse> responder(RoutingContext ctx) {
        return new DisposableSingleObserver<ApiResponse>() {
            @Override
            public void onSuccess(ApiResponse response) {
                respond(ctx, response);
                this.dispose();
            }
            @Override
            public void onError(Throwable error) {
                ctx.fail(error);
                this.dispose();
            }
        };
    }

    static <T> void respond(RoutingContext ctx, T entity) {
        if (entity.getClass().equals(ApiResponse.class)) {
            ApiResponse apiResponse = (ApiResponse) entity;
            ctx.response()
                    .setStatusCode(apiResponse.success ? HttpStatus.OK.code : HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .putHeader("content-type", "application/json; charset=utf-8")
                    // Strict HTTPS (one non-leap year)
                    .putHeader("Strict-Transport-Security", "Strict-Transport-Security: max-age=31536000 ; includeSubDomains")
                    .end(JsonObject.mapFrom(apiResponse).encode());
        } else {
            ctx.response()
                    .end(JsonObject.mapFrom(entity).encode());
        }
    }

    private void handleFailure(RoutingContext ctx) {
        LOG.error("Handling API failure {}", ctx.statusCode(), ctx.failure());
        HttpServerResponse response = ctx.response();
        int errorCode = Utils.errorCode(ctx.failure());
        response.setStatusCode(errorCode);
        response.end();
    }

    void notFound(RoutingContext ctx) {
        LOG.error("API handler not found: ({}) {}", ctx.request().method().name(), ctx.request().path());
        ctx.fail(HttpStatus.NOT_FOUND.code);
    }

//    static void badRequest(RoutingContext ctx) {
//        LOG.error("Bad API request: ({}) {}", ctx.request().method().name(), ctx.request().path());
//        ctx.fail(badRequest());
//    }

    void notAllowed(RoutingContext ctx) {
        LOG.error("Method is not allowed: ({}) {}", ctx.request().method().name(), ctx.request().path());
        ctx.fail(HttpStatus.NOT_ALLOWED.code);
    }

//    static void tooManyRequests(RoutingContext ctx) {
//        String errorMessage = String.format("Too many requests: (%s) %s", ctx.request().method().name(), ctx.request().path());
//        LOG.error(errorMessage);
//        ctx.fail(tooManyRequests(), new ApplicationException(Type.TOO_MANY_REQUESTS, errorMessage));
//    }

    void internalServerError(RoutingContext ctx, String errorMessage) {
        LOG.error("{}: ({}) {}", errorMessage, ctx.request().method().name(), ctx.request().path());
        ctx.fail(HttpStatus.INTERNAL_SERVER_ERROR.code);
    }

}
