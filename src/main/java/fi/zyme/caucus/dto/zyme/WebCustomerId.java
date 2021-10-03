package fi.zyme.caucus.dto.zyme;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WebCustomerId {

    public String customerType;
    public Integer customerNumber;
}
