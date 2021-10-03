package fi.zyme.caucus.dto;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class ApiResponse {

    public static class Customer {
        public String customerType;
        public int customerNumber;
        public String name;
        public String globalID;
    }

    public boolean success = true;

    @JsonInclude(Include.NON_NULL)
    public String caucusToken;

    @JsonInclude(Include.NON_NULL)
    public String zymeToken;

    @JsonInclude(Include.NON_NULL)
    public List<String> globalIDs;

    @JsonInclude(Include.NON_NULL)
    public List<Customer> customers;

    @JsonInclude(Include.NON_NULL)
    public CaucusResponse.Links links;

    @JsonInclude(Include.NON_NULL)
    public List<String> errors;

    public void appendError(String error) {
        success = false;
        if (errors == null) {
            errors = Arrays.asList(error);
        } else {
            errors.add(error);
        }
    }
}
