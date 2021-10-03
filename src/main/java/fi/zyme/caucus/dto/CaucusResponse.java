package fi.zyme.caucus.dto;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CaucusResponse {

    public int httpStatus;

    public boolean success;
    public ResponseContainer response;
    public ErrorContainer error;

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ResponseContainer {
        public InitiateResponse identifierVerification;

        public InitiateResponse initiate() {
            return identifierVerification;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class InitiateResponse {
        public String token;
        public Links _links;

        public String token() {
            return token;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Links {
        @JsonInclude(Include.NON_NULL)
        public Link cancel;
        @JsonInclude(Include.NON_NULL)
        public Link verify;
        @JsonInclude(Include.NON_NULL)
        public Link error;
        @JsonInclude(Include.NON_NULL)
        public Link callbackUrl;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Link {
        public String href;
        @JsonInclude(Include.NON_NULL)
        public String method;
        @JsonInclude(Include.NON_NULL)
        public String scope;
        public boolean templated;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ErrorContainer {
        public int statusCode;
        public String code;
        public String message;
        public List<ValidationError> validationErrors;
        public Links _links;
        public List<ErrorDetails> details;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ErrorDetails {
        public String errorCode;
        public String message;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ValidationError {
        public int errorCode;
        public List<Object> parameters;
        public String message;
    }

    public boolean succeeded() {
        return success == true;
    }

    public boolean failed() {
        return success != true;
    }

    public Optional<String> token() {
        return Optional.ofNullable(response)
                .map(ResponseContainer::initiate)
                .map(InitiateResponse::token);
    }
}
