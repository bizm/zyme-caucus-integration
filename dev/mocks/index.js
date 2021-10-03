const express = require('express')
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

const port = 9000
const CAUCUS_JWT_KEY = process.env.CAUCUS_JWT_KEY || "jZnBQcjU1S4EbwAnNCzmMgoZxSu2HuZQ";
const HOST = process.env.HOST || "host.docker.internal";
console.log("CAUCUS_JWT_KEY=%s", CAUCUS_JWT_KEY);
console.log("HOST=%s", HOST);

app.get('/', (req, res) => {
  console.log(req.url);
  res.send('{"result":true}');
});

app.get('/creator-identifiers/integration/:nonce', (req, res) => {
  console.log(req.path);
  var nonce = req.params.nonce;
  console.log("Nonce was %s", nonce);
  var tokenPayload = {};

  switch (nonce) {
    case "notfound":
      res.sendStatus(404);
      return;
    case "failedresponse":
      res.send({success: false});
      return;
    case "invalidresponse":
      res.send({success: true, resource: {}});
      return;
    case "notoken":
      var noTokenResult = JSON.parse(JSON.stringify(INITIATE_RESPONSE));
      delete noTokenResult.response.identifierVerification['token'];
      res.send(updateResponse(noTokenResult));
      return;
    case "invalidtoken_aud":
      tokenPayload.aud = "Auddly";
      break;
    case "failandredirect":
      res.send(updateResponse(JSON.parse(JSON.stringify(ERROR_RESPONSE_REDIRECT))));
      return;
    case "failandinform":
      const responseFailAndInform = JSON.parse(JSON.stringify(ERROR_RESPONSE_REDIRECT));
      responseFailAndInform.response.identifierVerification._links.error.scope = "browser";
      res.send(updateResponse(responseFailAndInform));
      return;
  }

  var result = JSON.parse(JSON.stringify(INITIATE_RESPONSE));
  var token = getCaucusToken(nonce, tokenPayload);

  result.response.identifierVerification.token = token;
  res.send(updateResponse(result));
});

app.post("/creator-identifiers/integration/verify", (req, res) => {
  console.log(req.path);
  if (req.headers && req.headers.hasOwnProperty("authorization")) {
    var authorizationHeader = req.headers["authorization"];
    console.log("authorizationHeader: %s", authorizationHeader);

    if (authorizationHeader.startsWith("Bearer ")) {
      try {
        var token = jwt.verify(authorizationHeader.substring(7), CAUCUS_JWT_KEY);
        console.log("token", token);
        if (token.jti == "verifyfailwithredirect") {
          return res.send(updateResponse(JSON.parse(JSON.stringify(ERROR_RESPONSE_REDIRECT))));
        }
        if (token.exp - token.iat != 600) {
          throw new Error("Invalid token expiry time");
        }
        var result = JSON.parse(JSON.stringify(VERIFY_RESPONSE));
        res.send(updateResponse(result));
      } catch(e) {
        console.error(e);
        res.send({
          success: false
        });
      }
    } else {
      res.send({
        success: false
      });
    }
  } else {
    console.log("No authorization header");
    console.debug(req.headers);
    res.send({
      success: false
    });
  }
});

app.get("/callback", (req, res) => {
  console.log(req.path);
  res.status(200).send("Done!!!");
});

app.listen(port, () => {
  console.log("Caucus API mock started on port %s!", port);
})

function getCaucusToken(nonce, payloadOverride) {
  payloadOverride = payloadOverride || {};
  payloadOverride.iss = "Caucus";
  payloadOverride.aud = "Zyme";
  payloadOverride.jti = nonce;

  switch (nonce) {
    case "jwtexpired":
      payload.exp = Math.floor(Date.now() / 1000);
      break;
  }

  return getToken(payloadOverride, 15, CAUCUS_JWT_KEY);
}

const INITIATE_RESPONSE = {
 success : true ,
 response : {
   identifierVerification : {
     token : "Nicely JWT",
     _links: {
       verify: {
         href: "https://host.docker.internal/creator-identifiers/integration/verify", // Link to follow (api call) when making the verification request back to Nicely
         method : "POST"
       },
       cancel: {
         href: "https://host.docker.internal/cancel", // Link to follow (redirect) if the user opts to cancel the verification flow.
         scope: "browser"
       }
     }
   }
 }
};
const VERIFY_RESPONSE = {
  success: true,
  response: {
    identifierVerification: {
      _links: {
        callbackUrl: {
           href: "https://host.docker.internal/callback",
//          href: "https://127.0.0.1/callback",
          scope: "redirect"
          // method: "POST"
        }
      }
    }
  }
};
const ERROR_RESPONSE_REDIRECT = {
  success: true,
  response: {
    identifierVerification: {
      _links: {
        error: {
          href: "https://host.docker.internal/error",
          scope: "redirect"
        }
      }
    }
  },
  error: {
    message: "An internal error occured",
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR'
    // statusCode: 403,
    // code: "FORBIDDEN",
    // message: "Error message that should not be sent to client",
    // validationErrors: [
    //   {
    //     errorCode: 403,
    //     parameters: [],
    //     message: "403 error message, not for end user"
    //   },
    //   {
    //     errorCode: 404,
    //     parameters: [],
    //     message: "404 error message, not for end user"
    //   }
    // ],
    // _links: {
    //   callbackUrl: {
    //     href: "https://app.auddly.com/callback"
    //   },
    //   cancel: {
    //     href: "https://app.auddly.com/cancel"
    //   }
    // }
  }
};

function updateResponse(response) {
  if (response.response && response.response.identifierVerification) {
    let identifierVerification = response.response.identifierVerification;
    console.log("response.response.identifierVerification=" + identifierVerification);
    console.log(identifierVerification.token);
    var links = identifierVerification["_links"];
    for (var linkName in links) {
      links[linkName].href = links[linkName].href.replace("host.docker.internal", HOST);
    }
    console.log(JSON.stringify(identifierVerification));
  }
  return response;
};



////////////////////////////////////////////////////////////////////////////////
// Zyme API mock
const ZYME_JWT_KEY = process.env.ZYME_JWT_KEY || "12345678901234567890123456789012";
app.get('/zyme', (req, res) => {
  console.log(req.url);
  res.send('{"success":true,"api":"Zyme"}');
});
app.post("/zyme/auth", (req, res) => {
  console.log(req.url);
  const body = req.body;
  if (body.username.length < 2) {
    res.status(403);
    res.send();
  } else if (body.username=="creep") {
    res.status(200);
    res.send(JSON.stringify({
      accessToken: getZymeToken("XX", "00000")
    }));
  } else {
    res.status(200);
    res.send(JSON.stringify({
      accessToken: getZymeToken()
    }));
  }
})

app.get("/zyme/customer/:customerType/:customerNumber", (req, res) => {
  console.log(req.url);
  console.log("customerType: %s", req.params.customerType);
  console.log("customerNumber: %s", req.params.customerNumber);
  const customer = CUSTOMERS.find(customer => {
    return customer.customerType === req.params.customerType &&
           String(customer.customerNumber) === req.params.customerNumber;
  });
  if ( ! customer ) {
    res.status(404);
    res.send();
  } else {
    res.status(200);
    res.send({
      name: customer.name,
      firstName: customer.firstName,
      globalID: customer.globalID
    });
  }
})

app.get("/zyme/users/me/privileges", (req, res) => {
  var authorizationHeader = req.headers["authorization"];
  var token = jwt.verify(authorizationHeader.substring(7), ZYME_JWT_KEY);
  const noRoles = token.usertype == "XX" && token.usernumber == "00000";
  console.debug(token);
  res.status(200);
  res.send({
    dataPrivileges: noRoles ? [] : [
      {
        webCustomerId: { customerType: "TE", customerNumber: 21303 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "TE", customerNumber: 21295 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "TE", customerNumber: 693 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "PE", customerNumber: 66600 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "TE", customerNumber: 12345 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "TE", customerNumber: 54321 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
      {
        webCustomerId: { customerType: "TE", customerNumber: 88988 },
        privilegeClass: "OMATEOS",
        privilegeLevel: "UPD"
      },
    ]
  });
});
const FIRST_NAMES = ["Niklas", "Magnus", "Jukka", "Pekka", "Jukka-Pekka", "Pekka-Timo", "Aimo", "Andreas", "Joel", "Isac"];
const LAST_NAMES = ["Nälkäinen-Karhu", "Bergqvist", "Lundin", "Hassan", "Birch", "Koivunen", "Ahlund", "Engberg", "Hämäläinen"];
const CUSTOMERS = [
  createCustomer("TE", 21303),
  createCustomer("TE", 21295),
  createCustomer("TE", 693),
  createCustomer("PE", 66600),
  createCustomer("TE", 12345),
  createCustomer("TE", 54321),
  createCustomer("TE", 88988)
];
function createCustomer(customerType, customerNumber) {
  return {
    customerType: customerType, customerNumber: customerNumber,
    name: pickRandomly(LAST_NAMES),
    firstName: pickRandomly(FIRST_NAMES),
    globalID: makeUpGlobalId()
  };
}
function pickRandomly(values) {
  return values[Math.floor(Math.random()*values.length)];
}
function makeUpGlobalId() {
  let number = "";
  for (let i = 0; i<11; i++) {
    number += Math.round(Math.random()*10);
  }
  return number;
}
function getZymeToken(userType, userNumber) {
  return getToken({usernumber:userNumber || 12345, usertype: userType || "TE"}, 15, ZYME_JWT_KEY);
}


////////////////////////////////////////////////////////////////////////////////
// Common code
function getToken(payloadOverride, expMins, signKey) {
  var payload = {
    iss: "<unset>",
    sub: "<unset>",
    jti: "<unset>",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (expMins * 60)
  };

  for (var claim in payloadOverride) {
    payload[claim] = payloadOverride[claim];
  }

  // sign with HMAC SHA256 by default
  return jwt.sign(payload, signKey)
}
