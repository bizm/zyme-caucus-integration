package fi.zyme.caucus.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class ApiRequest {

    @JsonInclude(Include.NON_NULL)
    public String username;

    @JsonInclude(Include.NON_NULL)
    public String password;

    @JsonInclude(Include.NON_NULL)
    public String zymeToken;

    @JsonInclude(Include.NON_NULL)
    public List<String> globalIDs;

    @JsonInclude(Include.NON_NULL)
    public String nonce;

    @JsonInclude(Include.NON_NULL)
    public CaucusResponse.Links links;

    public CaucusResponse.Links links() { return links; }

}
