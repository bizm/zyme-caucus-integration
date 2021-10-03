package fi.zyme.caucus.util;

@FunctionalInterface
public interface UncheckedRunnable {

    void run() throws Exception;

}
