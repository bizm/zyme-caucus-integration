package fi.zyme.caucus;

import java.util.Date;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnore;

import fi.zyme.caucus.dto.CaucusResponse;
import fi.zyme.caucus.exception.ApplicationException;
import fi.zyme.caucus.util.Config;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.vertx.core.http.HttpHeaders;
import io.vertx.reactivex.core.http.HttpServerRequest;

@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class Token {

    public enum Error {
        INVALID,
        EXPIRED,
        MISSING_IN_REQUEST,
        MISSING_IN_RESPONSE
    }

    private static final Logger LOG = LoggerFactory.getLogger(Token.class);

    private static final Pattern AUTH_HEADER_PATTERN = Pattern.compile("^Bearer\\s+(.*)$");

    private String token;
    @JsonIgnore
    private Jws<Claims> jws;
    private Error error;
    @JsonIgnore
    private Exception cause;

    private static Token from(String token, SecretKey signingKey, Consumer<Jws<Claims>> validator) {
        try {
            JwtParser parser = Jwts.parser();
            String tokenToBeParsed = token;
            if (signingKey == null) {
                String[] splitToken = token.split("\\.");
                tokenToBeParsed = splitToken[0] + "." + splitToken[1] + ".";
                parser.parse(tokenToBeParsed);
                return new Token(token);
            } else {
                parser.setSigningKey(signingKey);
                Jws<Claims> jws = parser.parseClaimsJws(tokenToBeParsed);
                if (validator != null) {
                    validator.accept(jws);
                }
                return new Token(token, jws);
            }
        } catch (ExpiredJwtException e) {
                LOG.error("Token expired", e);
                return new Token(Error.EXPIRED, e);
        } catch (RuntimeException e) {
            LOG.error("Failed to parse token", e);
            return new Token(Error.INVALID, e);
        }
    }

    static Token caucusToken(CaucusResponse response) {
        return Optional.ofNullable(response)
            .flatMap(CaucusResponse::token)
            .map(Token::caucusToken)
            .orElseGet(() -> {
                LOG.debug("Token missing in Caucus API response");
                return missing();
            });
    }

    static Token zymeToken(String token) {
        return from(token, null, null);
    }

    static Token caucusToken(Token token) {
        return caucusToken(token.asString());
    }

    private static Token caucusToken(String token) {
        return from(token, Config.caucusJwtKey(), Token::validateCaucusToken);
    }

    private static void validateCaucusToken(Jws<Claims> jws) throws RuntimeException {
        LOG.trace("Validating caucus token: iss={}, aud={}", jws.getBody().getIssuer(), jws.getBody().getAudience());
        if (!jws.getBody().getIssuer().equals(Config.caucusJwtIss())) {
            throw new RuntimeException(
                    String.format("Invalid Caucus token: iss=%s", jws.getBody().getIssuer()));
        }
        if (!jws.getBody().getAudience().equals(Config.caucusJwtAud())) {
            throw new RuntimeException(
                    String.format("Invalid Caucus token: aud=%s", jws.getBody().getAudience()));
        }
    }

    static Token verificationToken(Token caucusToken, Object data) {
        if (caucusToken.isInvalid()) {
            // should not happen, since invalid token request is handled at earlier stage
            // just return some invalid token, error code doesn't matter as long as it is different from 0
            return new Token(Error.INVALID);
        }

        Date now = new Date();
        String token = Jwts.builder()
            .setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + Config.zymeVerifyJWTExpirationPeriod()))
            .setIssuer(Config.zymeVerifyJwtIss())
            .setAudience(Config.zymeVerifyJwtAud())
            .setSubject(caucusToken.jws().getBody().getSubject())
            .setId(caucusToken.jws().getBody().getId())
            .claim("data", data)
            .signWith(Config.caucusJwtKey(), SignatureAlgorithm.HS256)
            .compact();
        return from(token, Config.caucusJwtKey(), null);
    }

    static Optional<String> bearerToken(HttpServerRequest request) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        LOG.trace("authorization: {}", authorization);
        return Optional.ofNullable(authorization)
            .map(header -> {
                Matcher matcher = AUTH_HEADER_PATTERN.matcher(header);
                if (matcher.matches() && matcher.groupCount()==1) {
                    return matcher.group(1);
                } else {
                    return null;
                }
            });
    }

    static Token caucusToken(HttpServerRequest request) throws ApplicationException {
        Optional<Token> token = bearerToken(request).map(Token::caucusToken);
        if (token.isPresent()) {
            if (token.get().isInvalid()) {
                LOG.error("Invalid request: Caucus token is invalid", token.get().cause());
                throw ApplicationException.unauthorized(
                        "Invalid request: Caucus token is invalid",
                        token.get().cause());
            }
        } else {
            LOG.error("Invalid request: Bearer token is missing");
            throw ApplicationException.unauthorized(
                    "Invalid request: Bearer token is missing");
        }
        return token.get();
    }

    static String toBearerToken(Token token) { return toBearerToken(token.asString()); }
    static String toBearerToken(String token) { return String.format("Bearer %s", token); }

    public static Token missing() {
        return new Token(Error.MISSING_IN_RESPONSE, null);
    }

    private Token() {}

    private Token(String token) {
        this.token = token;
    }

    private Token(String token, Jws<Claims> jws) {
        this.token = token;
        this.jws = jws;
    }

    private Token(Error error, Exception cause) {
        this.error = error;
        this.cause = cause;
    }

    private Token(Error error) {
        this.error = error;
    }

    @JsonIgnore
    public boolean isValid() { return error == null; }

    @JsonIgnore
    public boolean isInvalid() { return !isValid(); }

    public String asString() { return token; }

    public Jws<Claims> jws() { return jws; }

    public Error error() { return error; }

    public Exception cause() { return cause; }

}
