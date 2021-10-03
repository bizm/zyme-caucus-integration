package fi.zyme.caucus.message;

import java.net.URI;

import fi.zyme.caucus.Token;
import fi.zyme.caucus.dto.ApiRequest;
import io.vertx.core.http.HttpMethod;

public class VerificationRequest {

    public ApiRequest apiRequest;
    public Token caucusToken;
    public Token zymeToken;
    public URI caucusApiUri;
    public HttpMethod caucusApiMethod;
    public String globalID;

    public VerificationRequest() {}

    public VerificationRequest(ApiRequest apiRequest) {
        this.apiRequest = apiRequest;
    }

    public VerificationRequest(ApiRequest apiRequest, Token caucusToken) {
        this.apiRequest = apiRequest;
        this.caucusToken = caucusToken;
    }

    public ApiRequest apiRequest() { return apiRequest; }

    public URI caucusApiUri() { return caucusApiUri; }
    public void caucusApiUri(URI caucusApiUri) { this.caucusApiUri = caucusApiUri; }
    public String caucusApiHost() { return caucusApiUri().getHost(); }
    public String caucusApiPath() { return caucusApiUri().getPath(); }
    public void caucusApiMethod(HttpMethod method) { this.caucusApiMethod = method; }
    public HttpMethod caucusApiMethod() { return this.caucusApiMethod; }

}
