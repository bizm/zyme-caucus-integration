package fi.zyme.caucus;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import static junit.framework.Assert.assertNotNull;
import static junit.framework.Assert.assertTrue;

public class TokenTest {

    private final static Logger LOG = LoggerFactory.getLogger(TokenTest.class);

    @Test
    public void shouldParseSignedTokenWithoutSigningKey() throws UnsupportedEncodingException {
        Token token = Token.zymeToken(getToken(9000));
        assertNotNull(token);
        assertTrue(token.isValid());
    }

    @Test
    public void shouldParseExpiredSignedTokenWithoutSigningKey() throws UnsupportedEncodingException {
        Token token = Token.zymeToken(getToken(-9000));
        assertNotNull(token);
        assertTrue(token.isInvalid());
    }

    private static String getToken(long expTimeDiff) throws UnsupportedEncodingException {
        long currentTime = new Date().getTime();
        SecretKey key = Keys.hmacShaKeyFor(
                "B&E)H@McQfTjWnZr4u7x!A%D*G-JaNdR"
                        .getBytes("UTF-8"));
        return Jwts.builder()
                .setSubject("1234567890")
                .setId("fe7ac620-eb89-44ef-acff-cf656318429b")
                .setIssuedAt(new Date(currentTime - 10000))
                .setExpiration(new Date(currentTime + expTimeDiff))
                .claim("name", "John Doe")
                .claim("admin", true)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
