package fi.zyme.caucus;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fi.zyme.caucus.exception.ApplicationException;
import fi.zyme.caucus.exception.ApplicationException.Type;
import fi.zyme.caucus.util.UncheckedConsumer;
import fi.zyme.caucus.util.UncheckedSupplier;
import io.reactivex.Single;
import io.reactivex.functions.Function;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.core.buffer.Buffer;
import io.vertx.reactivex.core.eventbus.Message;
import io.vertx.reactivex.ext.web.RoutingContext;
import io.vertx.reactivex.ext.web.client.HttpResponse;

public class Utils {

    private static final Logger LOG = LoggerFactory.getLogger(Utils.class);


    static <T> Single<T> jsonBody(RoutingContext ctx, Class<T> type) {
            try {
                JsonObject body = ctx.getBodyAsJson();
                T entity = body.mapTo(type);
                return Single.just(entity);
            } catch (Throwable error) {
                return Single.error(error);
            }
    }

    public static <T> T fromJsonHttpResponse(HttpResponse<Buffer> httpResponse, Class<T> type) throws ApplicationException {
        try {
            return httpResponse.bodyAsJsonObject().mapTo(type);
        } catch (Exception e) {
            LOG.error("Failed to read JSON from HTTP response", e);
            LOG.trace("HTTP response was {}:\n{}", httpResponse.statusCode(), httpResponse.bodyAsString());
            throw applicationException(httpResponse.statusCode(), "Failed to read JSON from HTTP response", e);
        }
    }

    static Function<HttpResponse<Buffer>, Single<HttpResponse<Buffer>>> httpResponseValidator(HttpStatus httpStatus) {
        return response -> {
            LOG.trace("HTTP response {}: {}", response.statusCode(), response.bodyAsString());
            if (!httpStatus.code.equals(response.statusCode())) {
                String errorMessage = String.format(
                        "HTTP response status code mismatch - expected %s but was %s",
                        httpStatus, response.statusCode());
                LOG.error(errorMessage);
                return Single.error(
                        applicationException(response.statusCode(), errorMessage, null));
            }
            return Single.just(response);
        };
    }

    static <T> Function<Message<Object>, Single<JsonObject>> replyValidator() {
        return reply -> {
            LOG.trace("Got reply: {}", reply.body());
            try {
                JsonObject json = (JsonObject) reply.body();
                return Single.just(json);
            } catch (Throwable error) {
                return Single.error(error);
            }
        };
    }

    static void invoke(RoutingContext ctx, UncheckedConsumer<RoutingContext> consumer) {
        invoke(ctx, consumer, ctx);
    }
    private static <T> void invoke(RoutingContext ctx, UncheckedConsumer<T> consumer, T entity) {
        try {
            consumer.accept(entity);
        } catch (Exception e) {
            fail(ctx, e);
        }
    }

    static <T, R> Function<T, Single<R>> toSingle(Function<T, R> function) {
        return (t) -> {
            try {
                R r = function.apply(t);
                return Single.just(r);
            } catch (Exception error) {
                return Single.error(error);
            }
        };
    }

    static <T, R> Function<T, Single<R>> checked(Function<T, Single<R>> function) {
        return (t) -> {
            try {
                return function.apply(t);
            } catch (Exception error) {
                return Single.error(error);
            }
        };
    }

    static <T> Single<T> checked(UncheckedSupplier<Single<T>> supplier) {
        try {
            return supplier.get();
        } catch (Exception error) {
            return Single.error(error);
        }
    }

    public static void fail(Message<JsonObject> message, Throwable e) {
        message.headers().forEach(entry -> {
            LOG.debug("{} = {}", entry.getKey(), entry.getValue());
        });
        fail(message, e, String.format("Caught exception wihin message handler ('%s'): %s (%s)",
                message.address(),
                e.getLocalizedMessage(), e.getClass()));
    }
    private static void fail(Message<JsonObject> message, Throwable e, String errorMessage) {
        LOG.error(errorMessage, e);
        message.fail(errorCode(e), e.getLocalizedMessage());
    }

    private static void fail(RoutingContext ctx, Throwable e) {
        fail(ctx, e, String.format("Caught exception within routing context('%s'): %s (%s)",
                ctx.request().path(),
                e.getLocalizedMessage(), e.getClass()));
    }
    private static void fail(RoutingContext ctx, Throwable e, String errorMessage) {
        LOG.error(errorMessage);
        ctx.fail(errorCode(e), e);
    }

    public static int errorCode(Throwable e) {
        if (e.getClass().equals(ApplicationException.class)) {
            return errorCode((ApplicationException) e);
        }
        return HttpStatus.INTERNAL_SERVER_ERROR.code;
    }
    static int errorCode(ApplicationException e) {
        return e.type().httpStatus.code;
//        switch(e.type()) {
//            case BAD_REQUEST:
//                return badRequest();
//            case UNAUTHORIZED:
//                return unauthorized();
//            case TOO_MANY_REQUESTS:
//                return tooManyRequests();
//            case INTERNAL_SERVER_ERROR:
//            default:
//                return internalServerError();
//        }
    }
    static ApplicationException.Type applicationExceptionType(int httpStatus) {
        if (HttpStatus.BAD_REQUEST.code.equals(httpStatus)) {
            return Type.BAD_REQUEST;
        } else if (HttpStatus.UNAUTHORIZED.code.equals(httpStatus)) {
            return Type.UNAUTHORIZED;
        } else {
            return Type.INTERNAL_SERVER_ERROR;
        }
    }
    static ApplicationException applicationException(int httpStatus, String message, Exception cause) {
        return new ApplicationException(applicationExceptionType(httpStatus), message, cause);
    }

}
