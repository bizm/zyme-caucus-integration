package fi.zyme.caucus.exception;

import fi.zyme.caucus.HttpStatus;

public class ApplicationException extends Exception {

    private static final long serialVersionUID = -809754259040329780L;

    public enum Type {
        GENERAL(HttpStatus.INTERNAL_SERVER_ERROR),
        UNAUTHORIZED(HttpStatus.UNAUTHORIZED),
        BAD_REQUEST(HttpStatus.BAD_REQUEST),
        TOO_MANY_REQUESTS(HttpStatus.TOO_MANY_REQUESTS),
        INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR);

        public final HttpStatus httpStatus;

        private Type(HttpStatus httpStatus) {
            this.httpStatus = httpStatus;
        }
    }

    private Type type;

    public static ApplicationException unauthorized(String message, Exception cause) {
        return new ApplicationException(Type.UNAUTHORIZED, message, cause);
    }

    public static ApplicationException unauthorized(String message) {
        return new ApplicationException(Type.UNAUTHORIZED, message);
    }

    public static ApplicationException badRequest(String message, Exception cause) {
        return new ApplicationException(Type.BAD_REQUEST, message, cause);
    }

    public static ApplicationException badRequest(String message) {
        return new ApplicationException(Type.BAD_REQUEST, message);
    }

    public static ApplicationException internal(String message, Exception cause) {
        return new ApplicationException(Type.INTERNAL_SERVER_ERROR, message, cause);
    }

    public static ApplicationException internal(String message) {
        return new ApplicationException(Type.INTERNAL_SERVER_ERROR, message);
    }

    public ApplicationException(Type type, String message, Exception cause) {
        super(message, cause);
        this.type = type;
    }

    public ApplicationException(Type type, String message) {
        super(message);
        this.type = type;
    }

    public ApplicationException(String message) {
        super(message);
        this.type = Type.GENERAL;
    }

    public Type type() { return type; }

}
