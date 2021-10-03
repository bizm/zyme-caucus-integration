package fi.zyme.caucus.util;

@FunctionalInterface
public interface UncheckedConsumer<T> {

    void accept(T t) throws Exception;

}
