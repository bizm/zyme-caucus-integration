package fi.zyme.caucus.util;

@FunctionalInterface
public interface UncheckedSupplier<T> {

    T get() throws Exception;

}
