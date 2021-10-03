package fi.zyme.caucus;

import java.net.URL;
import java.util.Optional;

import fi.zyme.caucus.util.Config;
import org.slf4j.Logger;

import io.reactivex.SingleObserver;
import io.reactivex.observers.DisposableSingleObserver;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClientOptions;
import io.vertx.reactivex.core.AbstractVerticle;
import io.vertx.reactivex.core.buffer.Buffer;
import io.vertx.reactivex.core.eventbus.Message;
import io.vertx.reactivex.ext.web.client.HttpRequest;
import io.vertx.reactivex.ext.web.client.HttpResponse;
import io.vertx.reactivex.ext.web.client.WebClient;

public abstract class ApiVerticle extends AbstractVerticle {

    protected final Logger LOG;

    protected WebClient webClient;

    protected ApiVerticle(Logger logger) {
        this.LOG = logger;
    }

    protected void createWebClient() {
        WebClientOptions options = new WebClientOptions()
                .setTrustAll(Config.httpsTrustAll());
        webClient = WebClient.create(vertx, options);
    }

    @Override
    public void start() throws Exception {
        createWebClient();
        super.start();
    }

    protected HttpRequest<Buffer> webClient(HttpMethod method, URL url) {
        LOG.trace("Calling ({}) {}", method.name(), url);
        return webClient.requestAbs(method, url.toString())
                .ssl(true);
    }
    protected HttpResponse<Buffer> traceResponse(HttpResponse<Buffer> response) {
        if (LOG.isTraceEnabled()) {
            LOG.trace("Got {} response: {}", response.statusCode(),
                    Optional.of(response)
                            .map(HttpResponse::bodyAsJsonObject)
                            .map(JsonObject::encodePrettily)
                            .orElse("")
            );
        }
        return response;
    }

    static SingleObserver<JsonObject> observer(Message<JsonObject> message) {
        return new DisposableSingleObserver<JsonObject>() {
            @Override
            public void onSuccess(JsonObject json) {
                message.reply(json);
                this.dispose();
            }
            @Override
            public void onError(Throwable error) {
                Utils.fail(message, error);
                this.dispose();
            }
        };
    }

}
