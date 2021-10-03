package fi.zyme.caucus.util;

import java.util.function.Function;

import io.vertx.core.Handler;

public class ExtFunction<T, R> implements Function<T, R>, Handler<T> {

    private Function<T, R> handler;

    public ExtFunction(Function<T, R> handler) {
        this.handler = handler;
    }

    @Override
    public void handle(T event) {
        handler.apply(event);
    }

    @Override
    public R apply(T t) {
        return handler.apply(t);
    }

}
