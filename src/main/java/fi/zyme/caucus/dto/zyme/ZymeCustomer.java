package fi.zyme.caucus.dto.zyme;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 *
 * <pre>{
 *   "firstName": "...",
 *   "name": "...",
 *   "globalID": ...,
 *   ...
 * }</pre>
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ZymeCustomer {

    public String firstName;
    public String name;
    public String globalID;

}
