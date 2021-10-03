package fi.zyme.caucus;

public enum HttpStatus {
    OK(200),
    BAD_REQUEST(400),
    UNAUTHORIZED(401),
    NOT_FOUND(404),
    NOT_ALLOWED(405),
    TOO_MANY_REQUESTS(429),
    INTERNAL_SERVER_ERROR(500);

    public final Integer code;

    private HttpStatus(int code) {
        this.code = code;
    }
}
