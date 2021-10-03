package fi.zyme.caucus.util;

import java.util.function.Consumer;

import io.vertx.core.Handler;

public class ExtConsumer<T> implements Consumer<T>, Handler<T> {

    private Consumer<T> consumer;

    public ExtConsumer(Consumer<T> consumer) {
        this.consumer = consumer;
    }

    @Override
    public void handle(T event) {
        consumer.accept(event);
    }

    @Override
    public void accept(T t) {
        consumer.accept(t);
    }

}
