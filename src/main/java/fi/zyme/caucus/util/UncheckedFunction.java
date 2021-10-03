package fi.zyme.caucus.util;

@FunctionalInterface
public interface UncheckedFunction<T, R> {

    R apply(T t) throws Exception;

}
