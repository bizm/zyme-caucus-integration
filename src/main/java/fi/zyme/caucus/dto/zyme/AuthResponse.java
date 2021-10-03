package fi.zyme.caucus.dto.zyme;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * <pre>{
 *   "accessToken": "...",
 *   "refreshToken": "...",
 *   "expiresIn": ...
 * }</pre>
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthResponse {

    public String accessToken;
    public String refreshToken;
    public int expiresIn;

}
