package fi.zyme.caucus.util;

import java.net.URI;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.jsonwebtoken.security.Keys;
import io.vertx.core.json.JsonObject;

public class Config {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Container {
        public Caucus caucus;
        public Zyme zyme;
        public Api api;
        // ZYME_API_URL is coming from container environment variables, thus it only reside on a first level
        @JsonAlias("ZYME_API_URL")
        public String zymeApiUrl;
        @JsonAlias("ZYME_API_ENDPOINT_DNS")
        public String zymeApiEndpointDns;
        @JsonAlias("ZYME_API_HOST")
        public String zymeApiHost;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Caucus {
        @JsonAlias("api.regex")
        public String apiRegex;
        public JWT jwt;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Zyme {
        @JsonAlias("verify.jwt")
        public JWT verifyJWT;
        public Auth auth;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Auth {
        @JsonAlias("timeout.ms")
        public int timeout;
        public int threshold;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class JWT {
        public String iss;
        public String aud;
        @JsonAlias("exp.period.ms")
        public int expirationPeriod;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Api {
        @JsonAlias("https.trust.all")
        public boolean httpsTrustAll;
    }

    private static enum State {
        WAITING, SUCCESS, FAILED
    }

    private static final Logger LOG = LoggerFactory.getLogger(Config.class);
    private static final int DEFAULT_ZYME_AUTH_TIMEOUT = 10000;
    private static final int DEFAULT_ZYME_AUTH_THRESHOLD = 25;
    private static final String DEFAULT_CAUCUS_JWT_ISS = "Caucus";
    private static final String DEFAULT_ZYME_JWT_ISS = "Zyme";
    private static final int DEFAULT_ZYME_JWT_EXP = 10*60*1000;

    private static State state = State.WAITING;
    private static Pattern caucusApiRegex;
    private static String caucusJwtIss;
    private static String caucusJwtAud;
    private static SecretKey caucusJwtKey;
    private static String zymeVerifyJwtIss;
    private static String zymeVerifyJwtAud;
    private static int zymeVerifyJwtExpirationPeriod;
    private static URL zymeApiEndpointDns;
    private static String zymeApiHost;
    private static int zymeAuthTimeout;
    private static int zymeAuthThreshold;
    private static boolean httpsTrustAll;

    public static void readConfig(JsonObject config) {
        LOG.info("Parsing configuration from JSON");
        config.forEach(entry -> {
            if (entry.getKey().startsWith("SECRET_")) {
                LOG.trace("{}: ***", entry.getKey());
            } else {
                LOG.trace("{}: {}", entry.getKey(), entry.getValue());
            }
        });

        Optional<Container> container;
        try {
            container = Optional.ofNullable(config.mapTo(Container.class));
        } catch (Exception error) {
            LOG.error("Config parsing failed", error);
            state = State.FAILED;
            return;
        }

        handleCaucusApiRegex(container
                .map(item -> item.caucus)
                .map(item -> item.apiRegex));
        handleCaucusJWT(container
                .map(item -> item.caucus)
                .map(item -> item.jwt));
        handleZymeVerifyJWT(container
                .map(item -> item.zyme)
                .map(item -> item.verifyJWT));
        handleZymeApiEndpointDNS(container.map(item -> item.zymeApiEndpointDns));
        handleZymeApiHost(container.map(item -> item.zymeApiHost));
        zymeAuthTimeout = container
                .map(item -> item.zyme)
                .map(item -> item.auth)
                .map(item -> item.timeout)
                .orElse(DEFAULT_ZYME_AUTH_TIMEOUT);
        LOG.trace("Zyme auth timeout set to {}", zymeAuthTimeout());
        zymeAuthThreshold = container
                .map(item -> item.zyme)
                .map(item -> item.auth)
                .map(item -> item.threshold)
                .orElse(DEFAULT_ZYME_AUTH_THRESHOLD);
        LOG.trace("Zyme auth threshold set to {}", zymeAuthThreshold());
        httpsTrustAll = container
                .map(item -> item.api)
                .map(item -> item.httpsTrustAll)
                .orElse(false);
        LOG.debug("httpsTrusAll set to {}", httpsTrustAll);

        handleCaucusJwtKey(config);

        if (state != State.FAILED) {
            state = State.SUCCESS;
        }

        LOG.info("Configuration parsing completed");
    }

    public static Pattern caucusApiRegex() { return caucusApiRegex; }
    public static String caucusJwtIss() { return caucusJwtIss; }
    public static String caucusJwtAud() { return caucusJwtAud; }
    public static SecretKey caucusJwtKey() { return caucusJwtKey; }
    public static String zymeVerifyJwtIss() { return zymeVerifyJwtIss; }
    public static String zymeVerifyJwtAud() { return zymeVerifyJwtAud; }
    public static URL zymeApiEndpointDns() { return zymeApiEndpointDns; }
    public static String zymeApiHost() { return zymeApiHost; }
    public static int zymeVerifyJWTExpirationPeriod() { return zymeVerifyJwtExpirationPeriod; }
    public static int zymeAuthTimeout() { return zymeAuthTimeout; }
    public static int zymeAuthThreshold() { return zymeAuthThreshold; }
    public static boolean httpsTrustAll() { return httpsTrustAll; }

    public static boolean succeeded() { return state == State.SUCCESS; }
    public static boolean failed() { return state == State.FAILED; }

    private static void handleCaucusApiRegex(Optional<String> regex) {
        try {
            caucusApiRegex = Pattern.compile(regex.get());
            LOG.debug("Caucus API regex set to {}", caucusApiRegex);
        } catch (Exception error) {
            LOG.error("Failed to read Caucus API regex ('caucus.api.regex')", error);
            state = State.FAILED;
        }
    }

    private static void handleCaucusJWT(Optional<JWT> jwt) {
        try {
            caucusJwtIss = jwt.map(item -> item.iss).get();
        } catch (Exception error) {
            LOG.error("Failed to read Caucus JWT issuer ('caucus.jwt.iss')", error);
            state = State.FAILED;
        }
        try {
            caucusJwtAud = jwt.map(item -> item.aud).get();
        } catch (Exception error) {
            LOG.error("Failed to read Caucus JWT audience ('caucus.jwt.aud')", error);
            state = State.FAILED;
        }
    }

    private static void handleZymeVerifyJWT(Optional<JWT> jwt) {
        zymeVerifyJwtIss = jwt.map(item -> item.iss)
                .orElse(DEFAULT_ZYME_JWT_ISS);
        zymeVerifyJwtAud = jwt.map(item -> item.aud)
                .orElse(DEFAULT_CAUCUS_JWT_ISS);
        zymeVerifyJwtExpirationPeriod = jwt.map(item -> item.expirationPeriod)
                .orElse(DEFAULT_ZYME_JWT_EXP);
    }

    private static void handleZymeApiHost(Optional<String> host) {
        try {
            zymeApiHost = host.get();
            LOG.trace("Zyme API Host set to {}", Config.zymeApiHost());
        } catch (Exception error) {
            LOG.error("Failed to read Zyme API Host ('ZYME_API_HOST' environment variable)", error);
            state = State.FAILED;
        }
    }

    private static void handleZymeApiEndpointDNS(Optional<String> url) {
        try {
            String urlRaw = url.get();
            LOG.trace("Parsing Zyme API Endpoint DNS URL: {}", urlRaw);
            if (!urlRaw.endsWith("/")) {
                urlRaw = urlRaw + "/";
            }
            zymeApiEndpointDns = new URI(urlRaw)
                    .toURL();
            LOG.trace("Zyme API Endpoint DNS URL set to {}", Config.zymeApiEndpointDns());
        } catch (Exception error) {
            LOG.error("Failed to read Zyme API Endpoint DNS URL ('ZYME_API_ENDPOINT_DNS' environment variable)", error);
            state = State.FAILED;
        }
    }

    private static void handleCaucusJwtKey(JsonObject config) {
        try {
            LOG.error("Processing Caucus JWT key");
            caucusJwtKey = getShaKey(config, "SECRET_CAUCUS_JWT_KEY");
        } catch (Exception error) {
            LOG.error("Failed to read Caucus JWT key ('SECRET_CAUCUS_JWT_KEY' environment variable)", error);
            state = State.FAILED;
        }
    }

    private static SecretKey getShaKey(JsonObject config, String envVarName) throws Exception {
        LOG.trace("Looking for SHA key {}", envVarName);
        String key = getString(config, envVarName);
        if (key == null) {
            throw new Exception("Secret key wasn't found in provided JSON.");
        }
        byte[] bytes = key.getBytes(Charset.forName("UTF-8"));
        return Keys.hmacShaKeyFor(bytes);
    }
    private static String getString(JsonObject config, String key) {
        Object value = config.getValue(key);
        LOG.trace("Found *** ({})", value.getClass());
        if (value.getClass().equals(String.class)) {
            return (String) value;
        } else if (value.getClass().equals(JsonObject.class)) {
            JsonObject json = (JsonObject) value;
            for (Iterator<Map.Entry<String, Object>> i = json.iterator(); i.hasNext(); ) {
                Map.Entry<String, Object> entry = i.next();
                if (entry.getValue() != null && entry.getValue().getClass().equals(String.class)) {
                    LOG.trace("{}: ... ({})", entry.getKey(), entry.getValue().getClass());
                    return (String) entry.getValue();
                }
            }
        }
        return null;
    }

}
