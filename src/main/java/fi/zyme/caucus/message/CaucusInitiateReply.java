package fi.zyme.caucus.message;

import fi.zyme.caucus.Token;
import fi.zyme.caucus.dto.CaucusResponse;

public class CaucusInitiateReply {

    public CaucusResponse caucusResponse;
    public Token token;

    public CaucusInitiateReply() {}

    public CaucusInitiateReply(CaucusResponse caucusResponse, Token token) {
        this.caucusResponse = caucusResponse;
        this.token = token;
    }

    public CaucusResponse caucusResponse() { return caucusResponse; }

    public Token token() { return token; }

}
