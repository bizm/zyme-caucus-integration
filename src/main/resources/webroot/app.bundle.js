(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports) {

const api = function() {
  function api(method, path, body, token, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, window.location.protocol + "//" + window.location.host + "/api/" + path, true);
    xhr.responseType = 'json';
    if (token != undefined && typeof token == "string") {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          success(xhr.response);
        } else if (failure != null) {
          failure(xhr);
        }
      }
    }
    if (method == "POST" && body != undefined) {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    xhr.send(JSON.stringify(body));
  }

  return {
    apiGet: (path, token, success, failure) => {
      api("GET", path, null, token, success, failure);
    },
    apiPost: (path, body, token, success, failure) => {
      api("POST", path, body, token, success, failure);
    }
  }
}();

module.exports = api;


/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.html */ "./main.html");
/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ "./api.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_api_js__WEBPACK_IMPORTED_MODULE_2__);




function hide(element) { show(element, false); }
function show(element, makeVisible) {
  element.style.display = (makeVisible !== false) ? null : "none";
}
function disable(element) { enable(element, false); }
function enable(element, makeEnabled) {
  if(makeEnabled !== false) {
    element.removeAttribute("disabled");
  } else {
    element.setAttribute("disabled", "disabled");
  }
}

const i18nExtension = {
  "slogan-thin": {
    fi_FI: "Rakkaudesta",
    sv_SE: "AV KÄRLEK",
    en_EN: "FOR THE LOVE"
  },
  "slogan-bold": {
    fi_FI: "Musiikkiin",
    sv_SE: "TILL MUSIKEN",
    en_EN: "OF MUSIC"
  },
  username: {
    fi_FI: "Käyttäjätunnus",
    sv_SE: "Användarnamn",
    en_EN: "Username"
  },
  password: {
    fi_FI: "Salasana",
    sv_SE: "Lösenord",
    en_EN: "Password"
  },
  "button-login": {
    fi_FI: "Kirjaudu sisään",
    sv_SE: "Logga in",
    en_EN: "Log in"
  },
  "button-login-again": {
    fi_FI: "Kirjaudu uudelleen",
    sv_SE: "Logga in på nytt",
    en_EN: "Log in again"
  },
  "button-link": {
    fi_FI: "Lähetä",
    sv_SE: "Sänd",
    en_EN: "Send"
  },
  "button-try-again": {
    fi_FI: "Yritä uudelleen",
    sv_SE: "Försök på nytt",
    en_EN: "Try again"
  },
  "button-back-to-caucus": {
    fi_FI: "Takaisin Caucusiin",
    sv_SE: "Tillbaka till Caucus",
    en_EN: "Back to Caucus"
  },
  "button-cancel": {
    fi_FI: "Peruuta",
    sv_SE: "Ångra",
    en_EN: "Cancel"
  },
  info: {
    fi_FI: "<p>OHJE: Kirjaudu tunnistautumispalveluun Zymen verkkopalvelun käyttäjätunnuksilla.</p>" +
"<p>HUOM! Tunnistautua voivat vain henkilöt, eivät yritykset tai yhtyeet. Jos sinulla on myös kustantajan tai esiintyjän käyttäjätunnukset, älä käytä niitä, vaan kirjaudu palveluun tekijä-asiakkaan käyttäjätunnuksilla.</p>",
    sv_SE: "<p>ANVISNING: Logga in på autentiseringstjänsten med användarnamnet för Zymes webbtjänst.</p>" +
"<p>OBS! Autentisering kan endast göras för personer, inte för företag och musikgrupper. Om du även har användarnamn som förläggare eller artist, använd inte dem, utan logga in på tjänsten med användarnamnet du har som upphovsmannakund.</p>",
    en_EN: "<p>HELP: Log in to the identification service using your Zyme web service username and password.</p>" +
"<p>NOTE: Identification is only available for individuals, not for businesses or groups. If you also have the user credentials of a publisher or an artist, do not use them; instead, log in to the system using your member username and password.</p>"
  },
  "error-initiate": {
    fi_FI: "Yhteydessä ilmeni ongelmia. Haluatko yrittää uudelleen?",
    sv_SE: "Anslutningen misslyckades. Vill du försöka på nytt?",
    en_EN: "Connection unsuccessful. Do you want to try again?"
  },
  "error-login": {
    fi_FI: "Virheellinen käyttäjätunnus tai salasana",
    sv_SE: "Felaktigt användarnamn eller lösenord",
    en_EN: "Incorrect username or password"
  },
  "error-linking": {
    fi_FI: "Linkitys ei onnistunut. Haluatko yrittää uudelleen?",
    sv_SE: "Länkningen misslyckades. Vill du försöka på nytt?",
    en_EN: "Linking unsuccessful. Do you want to try again?"
  },
  "error-roles": {
    fi_FI: "Valitse rooli jonka haluat linkittää Caucusiin",
    sv_SE: "Välj den roll som du vill länka till Caucus",
    en_EN: "Select the role you wish to link to Caucus"
  },
  "error-no-roles": {
    fi_FI: "<p>Tietokannastamme ei löydy roolia, jonka voi linkittää Caucusiin. Olethan Zymen tekijäasiakas?</p>" +
"<p>Kirjaudu tekijän käyttäjätunnuksilla tai siirry takaisin Caucusiin.</p>" +
"<p>Caucusiin voivat rekisteröityä ainoastaan Zymen tekijäasiakkaiksi liittyneet henkilöt eli säveltäjät, sanoittajat ja sovittajat (tuottajat). Kustantajat tai esiintyjät (orkesterit) eivät voi kirjautua Caucusiin.</p>" +
"<p>Kirjaudu tunnistautumispalveluun tekijän verkkopalvelutunnuksilla.  Kirjauduttuasi näet kaikki voimassa olevat roolisi, myös mahdolliset pseudonyymit, jos haluat käyttää niitä.</p>",
    sv_SE: "<p>I vår databas finns ingen roll som kan länkas till Caucus. Du är väl upphovsmannakund hos Zyme?</p>" +
"<p>Logga in med användarnamnet för upphovsman eller gå tillbaka till Caucus.</p>" +
"<p>I Caucus kan endast personer som anslutit sig som upphovsmannakunder hos Zyme registrera sig, dvs. kompositörer, textförfattare och arrangörer (producenter). Förläggare och artister (orkestrar) kan inte logga in i Caucus. </p>" +
"<p>Logga in i autentiseringstjänsten med upphovsmannens webbtjänstkoder.  När du loggat in ser du alla dina aktuella roller, även eventuella pseudonymer, ifall du vill använda dem.</p>",
    en_EN: "Our database does not contain a role that can be linked to Caucus. This service is only available to Zyme’s members.</p>" +
"<p>Please log in using your member’s user credentials or go back to Caucus.</p>" +
"<p>Only the individuals registered as Zyme’s members, in other words, composers, lyricists and arrangers (producers), can sign up to Caucus. Publishers or artists (groups) may not log in to Caucus.</p>" +
"<p>Log in to the identification service using your member’s online banking service credentials.  After logging in, you can see all your valid roles, including any pseudonyms, if you wish to use them.</p>"
  },
  // Note, in fact this is not an error :)
  "error-success": {
    fi_FI: "<p>Linkitys onnistui!</p>" +
"<p>Siirrytään takaisin Caucusiin</p>",
    sv_SE: "<p>Länkningen lyckades!</p>" +
    "<p>Du överförs tillbaka till Caucus</p>",
    en_EN: "<p>Linking successful!</p>" +
    "<p>Going back to Caucus</p>",
  }
};

function createApplication(i18n) {
  const container = document.getElementById("container");
  container.innerHTML += _main_html__WEBPACK_IMPORTED_MODULE_1___default.a;

  const urlParams = new URLSearchParams(window.location.search);
  const loader = document.getElementById("loader");
  const mainContainer = document.getElementById("main");
  const infoContainer = document.getElementById("info");
  const sloganThin = document.getElementById("slogan-thin");
  const sloganBold = document.getElementById("slogan-bold");
  const submitButton = document.getElementById("button-submit");
  const submitButtonFake = document.getElementById("button-submit-fake");
  const cancelButton = document.getElementById("button-cancel");
  const loginForm = document.getElementById("login-form");
  const rolesForm = document.getElementById("roles-form");
  const username = document.getElementById("username");
  const usernameLabel = document.getElementById("username-label");
  const password = document.getElementById("password");
  const passwordLabel = document.getElementById("password-label");
  const infoTextWrapper = document.getElementById("info-text-wrapper");
  const infoTextWrapperOverlap = document.getElementById("info-text-wrapper-overlap");
  const infoText = document.getElementById("info-text");
  const infoTextButton = document.getElementById("info-text-button");
  const errorBox = document.getElementById("error");
  const localeSwitchFi = document.getElementById("locale-switch-fi"),
        localeSwitchEn = document.getElementById("locale-switch-en"),
        localeSwitchSe = document.getElementById("locale-switch-se");
  localeSwitchFi.onclick = localeSwitchEn.onclick = localeSwitchSe.onclick = function(event) {
    event.preventDefault();
    const locale = this.dataset['locale'];
    i18n.setLocale(locale);
  }
  let caucusToken, zymeToken, links;

  infoTextButton.addEventListener("click", showInfoPopup);
  infoTextWrapperOverlap.addEventListener("click", showInfoPopup);
  function showInfoPopup(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const className = "show-in-mobile";
    if (infoTextWrapper.classList.contains(className)) {
      infoTextWrapper.classList.remove(className);
      infoTextWrapperOverlap.classList.remove(className);
    } else {
      infoTextWrapper.classList.add(className);
      infoTextWrapperOverlap.classList.add(className);
    }
  }

  function redirectTo(url) {
    window.location.replace(url);
  }

  i18n.append(i18nExtension);
  function setText(element, textId) {
    element.innerText = i18n.get(textId);
  };
  function setHTML(element, textId) {
    element.innerHTML = i18n.get(textId);
  };
  function updateTexts(event) {
    setText(sloganThin, "slogan-thin");
    setText(sloganBold, "slogan-bold");
    setText(usernameLabel, "username");
    setText(passwordLabel, "password");
    updateSubmitButtonLabel();
    updateCancelButtonLabel();
    updateErrorMessage();
    setHTML(infoText, "info");
  }
  function updateSubmitButtonLabel(phase) { updateButtonLabel(submitButton, phase); }
  function updateCancelButtonLabel(phase) { updateButtonLabel(cancelButton, phase); }
  function updateButtonLabel(button, phase) {
    phase = phase ? (button.dataset["phase"] = phase) : button.dataset["phase"];
    button.innerText = i18n.get("button-" + phase);
  }
  function updateErrorMessage() {
    const errorType = errorBox.dataset['type'];
    errorBox.innerHTML = errorType ? i18n.get("error-" + errorType) : errorBox.innerHTML = null;
  }
  window.addEventListener("locale-change", updateTexts);
  updateTexts();

  function setButtonListener(button, listener) {
    if (listener && (typeof listener) == "string") {
      button.onclick = () => { redirectTo(listener); }
    } else {
      button.onclick = listener;
    }
  }

  function showError(errorType, errorClass) {
    errorBox.className = errorClass;
    setError(errorType, errorBox);
    show(errorBox);
    show(mainContainer);
    show(infoContainer);
    hide(loader);
  }
  function setError(errorType) {
    errorBox.dataset['type'] = errorType;
    updateErrorMessage();
    if (!errorType) { hide(errorBox); }
  }

  function initiate() {
    if (urlParams.has('nonce') && urlParams.has('callbackUrl')) {
      Object(_api_js__WEBPACK_IMPORTED_MODULE_2__["apiPost"])("initiate", getInitiateCallPayload(), null,
        (initiateResponse) => {
          if (initiateResponse.success!==true || initiateResponse.caucusToken==null) {
            return handleInitiateErrorResponse(initiateResponse);
          }
          caucusToken = initiateResponse.caucusToken;
          links = initiateResponse.links;
          showLoginForm();
          hide(loader);
        },
        (xhr) => {
          handleInitiateErrorResponse(xhr.response);
        }
      );
    }
  }
  function getInitiateCallPayload() {
    return {
      nonce: urlParams.get("nonce"),
      links:{callbackUrl:{href:urlParams.get('callbackUrl')}}
    };
  }
  function handleInitiateErrorResponse(response) {
    if (response && response.links && response.links.error && response.links.error.scope == "redirect") {
      return window.location.replace(response.links.error.href);
    }
    const link = (response && response.links) ? (response.links.error || response.links.cancel) : null;
    setButtonListener(cancelButton, link ? link.href : window.history.back);
    hide(submitButtonFake);
    show(submitButton);
    enable(submitButton);
    updateSubmitButtonLabel("try-again");
    setButtonListener(submitButton, initiateAgain);
    showError("initiate");
  }
  function initiateAgain(event) {
    event.preventDefault();
    hide(submitButton);
    setButtonListener(submitButton, null);
    show(submitButtonFake);
    initiate();
  }

  function showLoginForm() {
    setError();
    show(loginForm);
    show(mainContainer);
    show(infoContainer);
    username.readOnly = password.readOnly = false;
    username.value = password.value = null;
    setLoginFormListeners();
    hide(submitButtonFake);
    setButtonListener(submitButton, authenticate);
    disable(submitButton);
    show(submitButton);
    updateSubmitButtonLabel("login");

    updateCancelButtonLabel("back-to-caucus");
    // At this moment variable 'links' must be initalized with links objected fetched via 'initiate' call
    if (links && links.cancel && links.cancel.href) {
      setButtonListener(cancelButton, links.cancel.href);
    }
  }
  function setLoginFormListeners() {
    const originalUsername = username.value;
    const originalPassword = password.value;
    username.onkeyup = password.onkeyup = function(event) {
      if ((this == username && this.value != originalUsername) ||
          (this == password && this.value != originalPassword)) {
        username.className = password.className = null;
        setError();
      }
      if (username.value && password.value && username.className != "error" && password.className != "error") {
        enable(submitButton);
        if (event.keyCode==13 && this==password) {
          authenticate();
        }
      } else {
        disable(submitButton);
      }
    };
  }

  function authenticate(event) {
    if (event) { event.preventDefault(); }
    disable(submitButton);
    hide(submitButton);
    show(submitButtonFake);
    username.readOnly = password.readOnly = true;
    username.onkeyup = password.onkeyup = null;

    const formData = new FormData(loginForm);
    const data = {username:formData.get("username"), password:formData.get("password")};

    Object(_api_js__WEBPACK_IMPORTED_MODULE_2__["apiPost"])("auth", data, null,
      (authResponse) => {
        if (authResponse.success!==true || authResponse.customers==null || authResponse.customers.length==0) {
          return handleAuthenticateErrorResponse(authResponse);
        }

        zymeToken = authResponse.zymeToken;

        setButtonListener(submitButton, verify);
        hide(submitButtonFake);
        disable(submitButton);
        show(submitButton);
        updateSubmitButtonLabel("link");
        updateCancelButtonLabel("cancel");
        setButtonListener(cancelButton, authenticateAgain);

        hide(loginForm);
        rolesForm.innerHTML = "";
        authResponse.customers.forEach(customer => {
          rolesForm.innerHTML += "<input id=\"" + customer.ipiNumber + "\" type=\"radio\" name=\"ipiNumber\" value=\"" +
            customer.ipiNumber + "\">" + "<label for=\"" + customer.ipiNumber + "\"><span class=\"name\">" +
            customer.name + "</span>" + "<span class=\"ipi\">" + customer.ipiNumber + "</span></label>";
        });
        show(rolesForm);
        rolesForm.addEventListener("change", (event) => {
          if (event.target && event.target.name=="ipiNumber") {
            enable(submitButton);
          }
        });

        showError("roles", "compact");
      },
      (xhr) => {
        handleAuthenticateErrorResponse(xhr.response);
      }
    );
  }
  function handleAuthenticateErrorResponse(authResponse) {
    if (authResponse && authResponse.customers && authResponse.customers.length==0) {
      hide(loginForm);
      setButtonListener(submitButton, authenticateAgain);
      enable(submitButton);
      updateSubmitButtonLabel("login-again");
      showError("no-roles", "scroll");
    } else {
      [username, password].forEach(function(input){
        input.className = "error";
        input.readOnly = false;
      });
      setLoginFormListeners();
      showError("login", "login");
    }
    hide(submitButtonFake);
    show(submitButton);
  }

  function authenticateAgain(event) {
    if (event) { event.preventDefault(); }
    zymeToken = null;
    hide(rolesForm);
    rolesForm.innerHTML = "";
    showLoginForm();
  }

  function verify(event) {
    if (event) { event.preventDefault(); }

    hide(submitButton);
    show(submitButtonFake);
    setButtonListener(submitButton, null);

    const data = {
      zymeToken: zymeToken,
      links: { verify: links.verify },
      ipiNumbers: [ new FormData(rolesForm).get("ipiNumber") ]
    };
    [...rolesForm.elements].forEach(disable);

    Object(_api_js__WEBPACK_IMPORTED_MODULE_2__["apiPost"])("verify", data, caucusToken,
      (verifyResponse) => {
        if (verifyResponse.success!==true || verifyResponse.links==null ||
          verifyResponse.links.callbackUrl==null || verifyResponse.links.callbackUrl.href==null) {
          return handleVerifyErrorResponse(verifyResponse);
        }
        showError("success");
        window.location.replace(verifyResponse.links.callbackUrl.href);
      },
      (xhr) => {
        handleVerifyErrorResponse(xhr.response);
      }
    );
  }
  function handleVerifyErrorResponse(verifyResponse) {
    hide(submitButtonFake);
    show(submitButton);
    enable(submitButton);
    updateSubmitButtonLabel("try-again");
    setButtonListener(submitButton, verifyAgain);
    hide(rolesForm);
    showError("linking");
  }

  function verifyAgain(event) {
    event.preventDefault();
    setError();
    updateSubmitButtonLabel("link");
    setButtonListener(submitButton, verify);

    [...rolesForm.elements].forEach(enable);
    show(rolesForm);
  }

  initiate();
}

/* harmony default export */ __webpack_exports__["default"] = ((function() {
  return {
    initiate: (i18n) => {
      const fontsLoader = document.getElementById("fonts-loader");
      var fontLoader = document.createElement("div");
      fontLoader.style.fontFamily = "Panton Light";
      fontLoader.innerText = "ABC";
      fontsLoader.appendChild(fontLoader);
      fontLoader = document.createElement("div");
      fontLoader.style.fontFamily = "Panton Regular";
      fontLoader.innerText = "ABC";
      fontsLoader.appendChild(fontLoader);
      fontLoader = document.createElement("div");
      fontLoader.style.fontFamily = "Panton Black";
      fontLoader.innerText = "ABC";
      fontsLoader.appendChild(fontLoader);

      let cssCheckInterval = setInterval(function() {
        if (document.fonts.check("10pt Panton Regular") && document.fonts.check("10pt Panton Light") && document.fonts.check("10pt Panton Black")) {
          fontsLoader.parentElement.removeChild(fontsLoader);
          clearInterval(cssCheckInterval);
          cssCheckInterval = null;
          createApplication(i18n);
        }
      }, 100);
    }
  };
})());


/***/ }),

/***/ "./background.jpg":
/*!************************!*\
  !*** ./background.jpg ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2a793e247b3548111a69d474e445d685.jpg";

/***/ }),

/***/ "./fonts/panton-black.ttf":
/*!********************************!*\
  !*** ./fonts/panton-black.ttf ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-black.ttf");

/***/ }),

/***/ "./fonts/panton-black.woff":
/*!*********************************!*\
  !*** ./fonts/panton-black.woff ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-black.woff");

/***/ }),

/***/ "./fonts/panton-black.woff2":
/*!**********************************!*\
  !*** ./fonts/panton-black.woff2 ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-black.woff2");

/***/ }),

/***/ "./fonts/panton-light.ttf":
/*!********************************!*\
  !*** ./fonts/panton-light.ttf ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-light.ttf");

/***/ }),

/***/ "./fonts/panton-light.woff":
/*!*********************************!*\
  !*** ./fonts/panton-light.woff ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-light.woff");

/***/ }),

/***/ "./fonts/panton-light.woff2":
/*!**********************************!*\
  !*** ./fonts/panton-light.woff2 ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-light.woff2");

/***/ }),

/***/ "./fonts/panton-normal.ttf":
/*!*********************************!*\
  !*** ./fonts/panton-normal.ttf ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-normal.ttf");

/***/ }),

/***/ "./fonts/panton-normal.woff":
/*!**********************************!*\
  !*** ./fonts/panton-normal.woff ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-normal.woff");

/***/ }),

/***/ "./fonts/panton-normal.woff2":
/*!***********************************!*\
  !*** ./fonts/panton-normal.woff2 ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "fonts/panton-normal.woff2");

/***/ }),

/***/ "./main.html":
/*!*******************!*\
  !*** ./main.html ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"main\" style=\"display:none\">\n  <div id=\"logo\"><span id=\"logo-text\" class=\"slogan bold\">Zyme-Caucus</span></div>\n  <div id=\"forms\">\n    <form id=\"login-form\" style=\"display: none;\">\n      <label id=\"username-label\" for=\"username\"></label>\n      <input id=\"username\" name=\"username\" type=\"text\" placeholder=\"\" tabindex=\"1\">\n\n      <label id=\"password-label\" for=\"password\"></label>\n      <input id=\"password\" name=\"password\" type=\"password\" placeholder=\"\" tabindex=\"2\">\n    </form>\n    <div id=\"error\" style=\"display:none\"></div>\n    <form id=\"roles-form\" style=\"display: none;\">\n      <input type=\"radio\" name=\"radio-group\" id=\"radio1\">\n      <label for=\"radio1\"><span class=\"name\">Option #1</span><span class=\"ipi\">12345678</span></label>\n      <input type=\"radio\" name=\"radio-group\" id=\"radio2\">\n      <label for=\"radio2\"><span class=\"name\">Option #2</span><span class=\"ipi\">192837465</span></label>\n      <input type=\"radio\" name=\"radio-group\" id=\"radio3\">\n      <label for=\"radio3\"><span class=\"name\">Option #3</span><span class=\"ipi\">735648291</span></label>\n    </form>\n  </div>\n  <div id=\"buttons\">\n    <button id=\"button-submit\" type=\"button\" value=\"\" class=\"submit\" disabled=\"disabled\"\n    style=\"display: none;\" data-phase=\"login\" tabindex=\"3\"></button>\n    <div id=\"button-submit-fake\" class=\"button-imitation\" style=\"display: block\"><div class=\"spinner\"></div></div>\n    <button id=\"button-cancel\" type=\"button\" tabindex=\"4\" class=\"cancel\" data-phase=\"back-to-caucus\"></button>\n  </div>\n</div>\n<div id=\"info\" style=\"display:none\">\n  <div id=\"info-inner-box\">\n    <h1><span id=\"slogan-thin\" class=\"slogan thin\">Rakkaudesta</span><br /><span id=\"slogan-bold\" class=\"slogan bold\">Musiikkiin</span></h1>\n    <div id=\"info-text-wrapper-overlap\"></div>\n    <div id=\"info-text-wrapper\">\n      <div id=\"info-text\"></div>\n      <div id=\"info-locale-switch\">\n        <button id=\"locale-switch-fi\" type=\"button\" data-locale=\"fi_FI\" class=\"locale-switch\">Fi</button>\n        <button id=\"locale-switch-en\" type=\"button\" data-locale=\"en_EN\" class=\"locale-switch\">En</button>\n        <button id=\"locale-switch-se\" type=\"button\" data-locale=\"sv_SE\" class=\"locale-switch\">Sve</button>\n      </div>\n    </div>\n    <div id=\"info-text-button\"></div>\n  </div>\n</div>\n";

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./fonts/panton-normal.woff2 */ "./fonts/panton-normal.woff2");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ./fonts/panton-normal.woff */ "./fonts/panton-normal.woff");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(/*! ./fonts/panton-normal.ttf */ "./fonts/panton-normal.ttf");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(/*! ./fonts/panton-light.woff2 */ "./fonts/panton-light.woff2");
var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(/*! ./fonts/panton-light.woff */ "./fonts/panton-light.woff");
var ___CSS_LOADER_URL_IMPORT_5___ = __webpack_require__(/*! ./fonts/panton-light.ttf */ "./fonts/panton-light.ttf");
var ___CSS_LOADER_URL_IMPORT_6___ = __webpack_require__(/*! ./fonts/panton-black.woff2 */ "./fonts/panton-black.woff2");
var ___CSS_LOADER_URL_IMPORT_7___ = __webpack_require__(/*! ./fonts/panton-black.woff */ "./fonts/panton-black.woff");
var ___CSS_LOADER_URL_IMPORT_8___ = __webpack_require__(/*! ./fonts/panton-black.ttf */ "./fonts/panton-black.ttf");
var ___CSS_LOADER_URL_IMPORT_9___ = __webpack_require__(/*! ./background.jpg */ "./background.jpg");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_5___);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_6___);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_7___);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_8___);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_9___);
// Module
exports.push([module.i, "@font-face {\n  font-family: \"Panton Regular\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Panton Light\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Panton Black\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"truetype\");\n}\n\nhtml, body {\n  font-family: \"Panton Regular\", 'Panton-Regular','Panton',sans-serif;\n}\n\n#vertical-aligner {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\n  background-size: cover;\n}\n\n#main {\n  width: 400px;\n  height: 411px;\n  box-sizing: border-box;\n  background-color: #ffffff;\n  padding: 37px 70px 35px 70px;\n  display: flex;\n  flex-flow: column;\n}\n\n#container #main #logo {\n  /* position: relative; */\n  width: 100%;\n  text-align: center;\n}\n#container #main #logo > span {\n  font-size: 2.2rem;\n  line-height: 1.5rem;\n}\n\n#container #main #error {\n  height: 100%;\n  width: 100%;\n  display: table;\n  text-align: center;\n  font-size: .9rem;\n  box-sizing: border-box;\n}\n\n#container #main #error.login {\n  height: auto;\n  width: auto;\n  color: #e95b53;\n}\n\n#container #main #error.scroll {\n  box-sizing: border-box;\n  padding-right: 17px;\n  text-align: left;\n}\n#container #main #error.compact {\n  height: auto;\n  margin: 10px 0 16px 0;\n}\n\n#container #main #error span {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n\n#main #buttons {\n  margin-top: 10px;\n}\n\n#info {\n  background-color: #1c212a;\n  color: #ffffff;\n  width: 576px;\n  height: 411px;\n  box-sizing: border-box;\n  padding: 43px 100px;\n}\n\n#info-text-wrapper-overlap {\n  display: none;\n}\n\na {\n  color: #009cb6;\n  text-decoration: none;\n}\n\ninput, label {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n}\n\nlabel {\n  font-family: \"Panton Bold\";\n  font-size: 0.875rem;\n  color: #1c212a;\n}\n\nbutton, .button-imitation {\n  font-size: 0.875rem;\n  line-height: 1.71;\n  color: #ffffff;\n  text-align: center;\n  text-transform: uppercase;\n  cursor: pointer;\n  user-select: none;\n  background-color: #009CB6;\n  border: 0;\n  border-radius: 5px;\n  transition: background 0.2s, color 0.25s;\n  word-break: break-word;\n  white-space: nowrap;\n  padding: 8px;\n  width: 100%;\n  width: 260px;\n  height: 40px;\n  box-sizing: border-box;\n  font-family: \"Panton Bold\";\n}\n.button-imitation {\n  cursor: default;\n}\nbutton:disabled {\n  opacity: 0.2;\n}\nbutton:disabled:hover {\n  cursor: default;\n}\nbutton:hover:not(:disabled) {\n  background-color: #007083;\n}\n\nbutton.cancel {\n  background-color: #ffffff;\n  color: #009CB6;\n  margin-top: 8px;\n}\nbutton.cancel:hover:not(:disabled) {\n  background-color: #e6e6e6;\n}\n\nbutton.locale-switch {\n  color: #009cb6;\n  background: none;\n  padding: 0;\n  margin-right: 5px;\n  width: auto;\n  display: inline;\n}\nbutton.locale-switch:hover {\n  color: #ffffff;\n  background: none;\n}\n\n.spinner {\n  margin: auto;\n  margin-top: 2px;\n  height: 16px;\n  width: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.0);\n  border-top-color: rgba(255, 255, 255, 0.8);\n  border-right-color: rgba(255, 255, 255, 0.8);\n  border-radius: 100%;\n  animation: rotation 1s infinite linear 0.25s;\n\n  /* the opacity is used to lazyload the spinner, see animation delay */\n  /* this avoid the spinner to be displayed when visible for a very short period of time */\n  opacity: 0;\n}\n\n@keyframes rotation {\n  from {\n    opacity: 1;\n    transform: rotate(0deg);\n  }\n  to {\n    opacity: 1;\n    transform: rotate(359deg);\n  }\n}\n\ninput {\n  padding: 0 10px;\n  height: 40px;\n  border: 1px solid #909b9e;\n  border-radius: 4px;\n}\n\ninput:focus{\n  outline: none;\n  border-color: #009cb6;\n}\n\ninput#username {\n  margin-bottom: 20px;\n}\n\ninput.error, input:focus.error {\n  border-color: #e95b53;\n}\n\ndiv#forms {\n  height: 100%;\n  overflow-y: overlay;\n}\n\nform, #buttons {\n  width: 260px;\n  margin: 0 auto;\n}\nform#login-form label {\n  margin-top: 20px;\n}\nform#roles-form label .name {\n  display: block;\n}\n\nform#roles-form label .ipi {\n  display: block;\n}\n\n#info-inner-box, #info-text-wrapper {\n  display: flex;\n  flex-flow: column;\n  height: 100%;\n}\n\n#info h1 {\n  margin: 0;\n  padding: 0;\n  line-height: 2.6rem;\n}\n.slogan {\n  font-size: 3.4rem;\n  line-height: 1rem;\n  text-transform: uppercase;\n}\n.slogan.thin {\n  font-family: \"Panton Light\";\n  font-weight: normal;\n}\n.slogan.bold {\n  font-family: \"Panton Black\";\n  font-weight: normal;\n}\n#info #info-text {\n  height: 100%;\n}\n#info #info-locale-switch a {\n  text-transform: uppercase;\n  font-family: \"Panton Bold\";\n  margin-right: 8px;\n}\n\n@media (max-width: 1000px) {\n  #vertical-aligner {\n    display: block;\n    background-position: center;\n    min-height: 580px;\n  }\n  #container {\n    display: flex;\n    flex-flow: column-reverse;\n    height: 100%;\n  }\n\n  #loader {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n  }\n\n  #main {\n    width: 100%;\n    padding: 43px 0px 20px 0px;\n    bottom: 0;\n  }\n\n  #container #main #forms #error, #container #main #forms #error.scroll {\n    padding: 0 20px;\n  }\n\n  #info {\n    display: flex;\n    background: none;\n    width: 100%;\n    height: 100%;\n    padding: 0px 10px 20px 10px;\n  }\n\n  #info-inner-box {\n    height: auto;\n    width: 260px;\n    margin: auto auto 0 auto;\n  }\n  #info-inner-box h1 {\n    line-height: 2rem;\n  }\n\n  #info-text-button {\n    width: 52px;\n    height: 52px;\n    border-radius: 28px;\n    position: absolute;\n    top: 22px;\n    right: 25px;\n    background-color: #009CB6;\n  }\n\n  #info-text-wrapper {\n    /* display: none; */\n    display: flex;\n    flex-flow: column;\n    position: absolute;\n    background-color: #ffffff;\n    height: auto;\n    top: 28px;\n    left: 0;\n    margin: 24px;\n    padding: 24px;\n    border-radius: 24px;\n    -webkit-box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    -moz-box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    opacity: 0;\n    transition: all 0.4s ease-in, opacity 0.1s ease-out;\n    transform: scale(0);\n  }\n  #info-text-wrapper.show-in-mobile {\n    display: flex;\n    opacity: 1;\n    transform: scale(1);\n    transition: all 0.1s ease-out, opacity 0.2s ease-in;\n  }\n\n  #info-text-wrapper-overlap {\n    display: none;\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    background-color: rgba(34, 55, 61, 0.75);\n  }\n  #info-text-wrapper-overlap.show-in-mobile {\n    display: block;\n    opacity: 1;\n    transition: opacity 2s linear;\n  }\n\n  #info #info-text {\n    order: 2;\n    color: #000000;\n    height: auto;\n  }\n\n  .slogan {\n    font-size: 2.4rem;\n  }\n\n  button.locale-switch:hover {\n    color: #007083;\n  }\n}\n\ninput[type=\"radio\"] {\n    outline: none;\n}\ninput[type=\"radio\"]:checked + label:before {\n    /* border: 1px solid #d00; */\n    border-color: #009cb6 !important;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:checked,\n[type=\"radio\"]:not(:checked) {\n    position: absolute;\n    left: -9999px;\n}\n[type=\"radio\"]:checked + label,\n[type=\"radio\"]:not(:checked) + label\n{\n    position: relative;\n    padding-left: 28px;\n    cursor: pointer;\n    line-height: 20px;\n    display: inline-block;\n    color: #666;\n}\n[type=\"radio\"]:checked + label:before,\n[type=\"radio\"]:not(:checked) + label:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 18px;\n    height: 18px;\n    border: 1px solid #ddd;\n    border-radius: 100%;\n    background: #fff;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:checked + label:after,\n[type=\"radio\"]:not(:checked) + label:after {\n    content: '';\n    width: 10px;\n    height: 10px;\n    background: #009cb6;\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    border-radius: 100%;\n    -webkit-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:not(:checked) + label:after {\n    opacity: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n}\n[type=\"radio\"]:checked + label:after {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !./node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2JhY2tncm91bmQuanBnIiwid2VicGFjazovLy8uL2ZvbnRzL3BhbnRvbi1ibGFjay50dGYiLCJ3ZWJwYWNrOi8vLy4vZm9udHMvcGFudG9uLWJsYWNrLndvZmYiLCJ3ZWJwYWNrOi8vLy4vZm9udHMvcGFudG9uLWJsYWNrLndvZmYyIiwid2VicGFjazovLy8uL2ZvbnRzL3BhbnRvbi1saWdodC50dGYiLCJ3ZWJwYWNrOi8vLy4vZm9udHMvcGFudG9uLWxpZ2h0LndvZmYiLCJ3ZWJwYWNrOi8vLy4vZm9udHMvcGFudG9uLWxpZ2h0LndvZmYyIiwid2VicGFjazovLy8uL2ZvbnRzL3BhbnRvbi1ub3JtYWwudHRmIiwid2VicGFjazovLy8uL2ZvbnRzL3BhbnRvbi1ub3JtYWwud29mZiIsIndlYnBhY2s6Ly8vLi9mb250cy9wYW50b24tbm9ybWFsLndvZmYyIiwid2VicGFjazovLy8uL21haW4uaHRtbCIsIndlYnBhY2s6Ly8vLi9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUuY3NzP2Y2OTYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7O0FDakNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQXFCO0FBQ2M7QUFDTTs7QUFFekMsd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2S0FBNks7QUFDN0ssR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsaURBQVE7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QyxLQUFLLCtDQUErQyxxQkFBcUIsaUJBQWlCLG9DQUFvQyxLQUFLLHdCQUF3QixlQUFlLHFCQUFxQixtQkFBbUIsS0FBSyxlQUFlLHdCQUF3QixLQUFLLGtDQUFrQyxxQkFBcUIsS0FBSyxHQUFHLDJCQUEyQixvQkFBb0IsR0FBRyxnREFBZ0QsZ0NBQWdDLDBDQUEwQyxnQ0FBZ0MsR0FBRyw2REFBNkQseUJBQXlCLG9CQUFvQixHQUFHLDhFQUE4RSx5QkFBeUIseUJBQXlCLHNCQUFzQix3QkFBd0IsNEJBQTRCLGtCQUFrQixHQUFHLDJGQUEyRixrQkFBa0IseUJBQXlCLGNBQWMsYUFBYSxrQkFBa0IsbUJBQW1CLDZCQUE2QiwwQkFBMEIsdUJBQXVCLGdDQUFnQyxHQUFHLHlGQUF5RixrQkFBa0Isa0JBQWtCLG1CQUFtQiwwQkFBMEIseUJBQXlCLGVBQWUsZ0JBQWdCLDBCQUEwQix3Q0FBd0MsZ0NBQWdDLEdBQUcsZ0RBQWdELGlCQUFpQixrQ0FBa0MsMEJBQTBCLEdBQUcsMENBQTBDLGlCQUFpQixrQ0FBa0MsMEJBQTBCLEdBQUc7QUFDdHZSO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNCQSxVQUFVLG1CQUFPLENBQUMsa0pBQXVFO0FBQ3pGLDBCQUEwQixtQkFBTyxDQUFDLDZHQUFxRDs7QUFFdkY7O0FBRUE7QUFDQSwwQkFBMEIsUUFBUztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUEsMEIiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwaSA9IGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBhcGkobWV0aG9kLCBwYXRoLCBib2R5LCB0b2tlbiwgc3VjY2VzcywgZmFpbHVyZSkge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbihtZXRob2QsIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvYXBpL1wiICsgcGF0aCwgdHJ1ZSk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICBpZiAodG9rZW4gIT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0b2tlbiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyB0b2tlbik7XG4gICAgfVxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgc3VjY2Vzcyh4aHIucmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGZhaWx1cmUgIT0gbnVsbCkge1xuICAgICAgICAgIGZhaWx1cmUoeGhyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobWV0aG9kID09IFwiUE9TVFwiICYmIGJvZHkgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgIH1cbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShib2R5KSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFwaUdldDogKHBhdGgsIHRva2VuLCBzdWNjZXNzLCBmYWlsdXJlKSA9PiB7XG4gICAgICBhcGkoXCJHRVRcIiwgcGF0aCwgbnVsbCwgdG9rZW4sIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgIH0sXG4gICAgYXBpUG9zdDogKHBhdGgsIGJvZHksIHRva2VuLCBzdWNjZXNzLCBmYWlsdXJlKSA9PiB7XG4gICAgICBhcGkoXCJQT1NUXCIsIHBhdGgsIGJvZHksIHRva2VuLCBzdWNjZXNzLCBmYWlsdXJlKTtcbiAgICB9XG4gIH1cbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhcGk7XG4iLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBtYWluSHRtbCBmcm9tICcuL21haW4uaHRtbCc7XG5pbXBvcnQge2FwaVBvc3QsIGFwaUdldH0gZnJvbSAnLi9hcGkuanMnO1xuXG5mdW5jdGlvbiBoaWRlKGVsZW1lbnQpIHsgc2hvdyhlbGVtZW50LCBmYWxzZSk7IH1cbmZ1bmN0aW9uIHNob3coZWxlbWVudCwgbWFrZVZpc2libGUpIHtcbiAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gKG1ha2VWaXNpYmxlICE9PSBmYWxzZSkgPyBudWxsIDogXCJub25lXCI7XG59XG5mdW5jdGlvbiBkaXNhYmxlKGVsZW1lbnQpIHsgZW5hYmxlKGVsZW1lbnQsIGZhbHNlKTsgfVxuZnVuY3Rpb24gZW5hYmxlKGVsZW1lbnQsIG1ha2VFbmFibGVkKSB7XG4gIGlmKG1ha2VFbmFibGVkICE9PSBmYWxzZSkge1xuICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICB9XG59XG5cbmNvbnN0IGkxOG5FeHRlbnNpb24gPSB7XG4gIFwic2xvZ2FuLXRoaW5cIjoge1xuICAgIGZpX0ZJOiBcIlJha2thdWRlc3RhXCIsXG4gICAgc3ZfU0U6IFwiQVYgS8OEUkxFS1wiLFxuICAgIGVuX0VOOiBcIkZPUiBUSEUgTE9WRVwiXG4gIH0sXG4gIFwic2xvZ2FuLWJvbGRcIjoge1xuICAgIGZpX0ZJOiBcIk11c2lpa2tpaW5cIixcbiAgICBzdl9TRTogXCJUSUxMIE1VU0lLRU5cIixcbiAgICBlbl9FTjogXCJPRiBNVVNJQ1wiXG4gIH0sXG4gIHVzZXJuYW1lOiB7XG4gICAgZmlfRkk6IFwiS8OkeXR0w6Rqw6R0dW5udXNcIixcbiAgICBzdl9TRTogXCJBbnbDpG5kYXJuYW1uXCIsXG4gICAgZW5fRU46IFwiVXNlcm5hbWVcIlxuICB9LFxuICBwYXNzd29yZDoge1xuICAgIGZpX0ZJOiBcIlNhbGFzYW5hXCIsXG4gICAgc3ZfU0U6IFwiTMO2c2Vub3JkXCIsXG4gICAgZW5fRU46IFwiUGFzc3dvcmRcIlxuICB9LFxuICBcImJ1dHRvbi1sb2dpblwiOiB7XG4gICAgZmlfRkk6IFwiS2lyamF1ZHUgc2lzw6TDpG5cIixcbiAgICBzdl9TRTogXCJMb2dnYSBpblwiLFxuICAgIGVuX0VOOiBcIkxvZyBpblwiXG4gIH0sXG4gIFwiYnV0dG9uLWxvZ2luLWFnYWluXCI6IHtcbiAgICBmaV9GSTogXCJLaXJqYXVkdSB1dWRlbGxlZW5cIixcbiAgICBzdl9TRTogXCJMb2dnYSBpbiBww6Ugbnl0dFwiLFxuICAgIGVuX0VOOiBcIkxvZyBpbiBhZ2FpblwiXG4gIH0sXG4gIFwiYnV0dG9uLWxpbmtcIjoge1xuICAgIGZpX0ZJOiBcIkzDpGhldMOkXCIsXG4gICAgc3ZfU0U6IFwiU8OkbmRcIixcbiAgICBlbl9FTjogXCJTZW5kXCJcbiAgfSxcbiAgXCJidXR0b24tdHJ5LWFnYWluXCI6IHtcbiAgICBmaV9GSTogXCJZcml0w6QgdXVkZWxsZWVuXCIsXG4gICAgc3ZfU0U6IFwiRsO2cnPDtmsgcMOlIG55dHRcIixcbiAgICBlbl9FTjogXCJUcnkgYWdhaW5cIlxuICB9LFxuICBcImJ1dHRvbi1iYWNrLXRvLWNhdWN1c1wiOiB7XG4gICAgZmlfRkk6IFwiVGFrYWlzaW4gQ2F1Y3VzaWluXCIsXG4gICAgc3ZfU0U6IFwiVGlsbGJha2EgdGlsbCBDYXVjdXNcIixcbiAgICBlbl9FTjogXCJCYWNrIHRvIENhdWN1c1wiXG4gIH0sXG4gIFwiYnV0dG9uLWNhbmNlbFwiOiB7XG4gICAgZmlfRkk6IFwiUGVydXV0YVwiLFxuICAgIHN2X1NFOiBcIsOFbmdyYVwiLFxuICAgIGVuX0VOOiBcIkNhbmNlbFwiXG4gIH0sXG4gIGluZm86IHtcbiAgICBmaV9GSTogXCI8cD5PSEpFOiBLaXJqYXVkdSB0dW5uaXN0YXV0dW1pc3BhbHZlbHV1biBaeW1lbiB2ZXJra29wYWx2ZWx1biBrw6R5dHTDpGrDpHR1bm51a3NpbGxhLjwvcD5cIiArXG5cIjxwPkhVT00hIFR1bm5pc3RhdXR1YSB2b2l2YXQgdmFpbiBoZW5raWzDtnQsIGVpdsOkdCB5cml0eWtzZXQgdGFpIHlodHllZXQuIEpvcyBzaW51bGxhIG9uIG15w7ZzIGt1c3RhbnRhamFuIHRhaSBlc2lpbnR5asOkbiBrw6R5dHTDpGrDpHR1bm51a3NldCwgw6Rsw6Qga8OkeXTDpCBuaWl0w6QsIHZhYW4ga2lyamF1ZHUgcGFsdmVsdXVuIHRla2lqw6QtYXNpYWtrYWFuIGvDpHl0dMOkasOkdHVubnVrc2lsbGEuPC9wPlwiLFxuICAgIHN2X1NFOiBcIjxwPkFOVklTTklORzogTG9nZ2EgaW4gcMOlIGF1dGVudGlzZXJpbmdzdGrDpG5zdGVuIG1lZCBhbnbDpG5kYXJuYW1uZXQgZsO2ciBaeW1lcyB3ZWJidGrDpG5zdC48L3A+XCIgK1xuXCI8cD5PQlMhIEF1dGVudGlzZXJpbmcga2FuIGVuZGFzdCBnw7ZyYXMgZsO2ciBwZXJzb25lciwgaW50ZSBmw7ZyIGbDtnJldGFnIG9jaCBtdXNpa2dydXBwZXIuIE9tIGR1IMOkdmVuIGhhciBhbnbDpG5kYXJuYW1uIHNvbSBmw7ZybMOkZ2dhcmUgZWxsZXIgYXJ0aXN0LCBhbnbDpG5kIGludGUgZGVtLCB1dGFuIGxvZ2dhIGluIHDDpSB0asOkbnN0ZW4gbWVkIGFudsOkbmRhcm5hbW5ldCBkdSBoYXIgc29tIHVwcGhvdnNtYW5uYWt1bmQuPC9wPlwiLFxuICAgIGVuX0VOOiBcIjxwPkhFTFA6IExvZyBpbiB0byB0aGUgaWRlbnRpZmljYXRpb24gc2VydmljZSB1c2luZyB5b3VyIFp5bWUgd2ViIHNlcnZpY2UgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLjwvcD5cIiArXG5cIjxwPk5PVEU6IElkZW50aWZpY2F0aW9uIGlzIG9ubHkgYXZhaWxhYmxlIGZvciBpbmRpdmlkdWFscywgbm90IGZvciBidXNpbmVzc2VzIG9yIGdyb3Vwcy4gSWYgeW91IGFsc28gaGF2ZSB0aGUgdXNlciBjcmVkZW50aWFscyBvZiBhIHB1Ymxpc2hlciBvciBhbiBhcnRpc3QsIGRvIG5vdCB1c2UgdGhlbTsgaW5zdGVhZCwgbG9nIGluIHRvIHRoZSBzeXN0ZW0gdXNpbmcgeW91ciBtZW1iZXIgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLjwvcD5cIlxuICB9LFxuICBcImVycm9yLWluaXRpYXRlXCI6IHtcbiAgICBmaV9GSTogXCJZaHRleWRlc3PDpCBpbG1lbmkgb25nZWxtaWEuIEhhbHVhdGtvIHlyaXR0w6TDpCB1dWRlbGxlZW4/XCIsXG4gICAgc3ZfU0U6IFwiQW5zbHV0bmluZ2VuIG1pc3NseWNrYWRlcy4gVmlsbCBkdSBmw7Zyc8O2a2EgcMOlIG55dHQ/XCIsXG4gICAgZW5fRU46IFwiQ29ubmVjdGlvbiB1bnN1Y2Nlc3NmdWwuIERvIHlvdSB3YW50IHRvIHRyeSBhZ2Fpbj9cIlxuICB9LFxuICBcImVycm9yLWxvZ2luXCI6IHtcbiAgICBmaV9GSTogXCJWaXJoZWVsbGluZW4ga8OkeXR0w6Rqw6R0dW5udXMgdGFpIHNhbGFzYW5hXCIsXG4gICAgc3ZfU0U6IFwiRmVsYWt0aWd0IGFudsOkbmRhcm5hbW4gZWxsZXIgbMO2c2Vub3JkXCIsXG4gICAgZW5fRU46IFwiSW5jb3JyZWN0IHVzZXJuYW1lIG9yIHBhc3N3b3JkXCJcbiAgfSxcbiAgXCJlcnJvci1saW5raW5nXCI6IHtcbiAgICBmaV9GSTogXCJMaW5raXR5cyBlaSBvbm5pc3R1bnV0LiBIYWx1YXRrbyB5cml0dMOkw6QgdXVkZWxsZWVuP1wiLFxuICAgIHN2X1NFOiBcIkzDpG5rbmluZ2VuIG1pc3NseWNrYWRlcy4gVmlsbCBkdSBmw7Zyc8O2a2EgcMOlIG55dHQ/XCIsXG4gICAgZW5fRU46IFwiTGlua2luZyB1bnN1Y2Nlc3NmdWwuIERvIHlvdSB3YW50IHRvIHRyeSBhZ2Fpbj9cIlxuICB9LFxuICBcImVycm9yLXJvbGVzXCI6IHtcbiAgICBmaV9GSTogXCJWYWxpdHNlIHJvb2xpIGpvbmthIGhhbHVhdCBsaW5raXR0w6TDpCBDYXVjdXNpaW5cIixcbiAgICBzdl9TRTogXCJWw6RsaiBkZW4gcm9sbCBzb20gZHUgdmlsbCBsw6Rua2EgdGlsbCBDYXVjdXNcIixcbiAgICBlbl9FTjogXCJTZWxlY3QgdGhlIHJvbGUgeW91IHdpc2ggdG8gbGluayB0byBDYXVjdXNcIlxuICB9LFxuICBcImVycm9yLW5vLXJvbGVzXCI6IHtcbiAgICBmaV9GSTogXCI8cD5UaWV0b2thbm5hc3RhbW1lIGVpIGzDtnlkeSByb29saWEsIGpvbmthIHZvaSBsaW5raXR0w6TDpCBDYXVjdXNpaW4uIE9sZXRoYW4gWnltZW4gdGVraWrDpGFzaWFrYXM/PC9wPlwiICtcblwiPHA+S2lyamF1ZHUgdGVraWrDpG4ga8OkeXR0w6Rqw6R0dW5udWtzaWxsYSB0YWkgc2lpcnJ5IHRha2Fpc2luIENhdWN1c2lpbi48L3A+XCIgK1xuXCI8cD5DYXVjdXNpaW4gdm9pdmF0IHJla2lzdGVyw7ZpdHnDpCBhaW5vYXN0YWFuIFp5bWVuIHRla2lqw6Rhc2lha2thaWtzaSBsaWl0dHluZWV0IGhlbmtpbMO2dCBlbGkgc8OkdmVsdMOkasOkdCwgc2Fub2l0dGFqYXQgamEgc292aXR0YWphdCAodHVvdHRhamF0KS4gS3VzdGFudGFqYXQgdGFpIGVzaWludHlqw6R0IChvcmtlc3Rlcml0KSBlaXbDpHQgdm9pIGtpcmphdXR1YSBDYXVjdXNpaW4uPC9wPlwiICtcblwiPHA+S2lyamF1ZHUgdHVubmlzdGF1dHVtaXNwYWx2ZWx1dW4gdGVraWrDpG4gdmVya2tvcGFsdmVsdXR1bm51a3NpbGxhLiAgS2lyamF1ZHV0dHVhc2kgbsOkZXQga2Fpa2tpIHZvaW1hc3NhIG9sZXZhdCByb29saXNpLCBtecO2cyBtYWhkb2xsaXNldCBwc2V1ZG9ueXltaXQsIGpvcyBoYWx1YXQga8OkeXR0w6TDpCBuaWl0w6QuPC9wPlwiLFxuICAgIHN2X1NFOiBcIjxwPkkgdsOlciBkYXRhYmFzIGZpbm5zIGluZ2VuIHJvbGwgc29tIGthbiBsw6Rua2FzIHRpbGwgQ2F1Y3VzLiBEdSDDpHIgdsOkbCB1cHBob3ZzbWFubmFrdW5kIGhvcyBaeW1lPzwvcD5cIiArXG5cIjxwPkxvZ2dhIGluIG1lZCBhbnbDpG5kYXJuYW1uZXQgZsO2ciB1cHBob3ZzbWFuIGVsbGVyIGfDpSB0aWxsYmFrYSB0aWxsIENhdWN1cy48L3A+XCIgK1xuXCI8cD5JIENhdWN1cyBrYW4gZW5kYXN0IHBlcnNvbmVyIHNvbSBhbnNsdXRpdCBzaWcgc29tIHVwcGhvdnNtYW5uYWt1bmRlciBob3MgWnltZSByZWdpc3RyZXJhIHNpZywgZHZzLiBrb21wb3NpdMO2cmVyLCB0ZXh0ZsO2cmZhdHRhcmUgb2NoIGFycmFuZ8O2cmVyIChwcm9kdWNlbnRlcikuIEbDtnJsw6RnZ2FyZSBvY2ggYXJ0aXN0ZXIgKG9ya2VzdHJhcikga2FuIGludGUgbG9nZ2EgaW4gaSBDYXVjdXMuIDwvcD5cIiArXG5cIjxwPkxvZ2dhIGluIGkgYXV0ZW50aXNlcmluZ3N0asOkbnN0ZW4gbWVkIHVwcGhvdnNtYW5uZW5zIHdlYmJ0asOkbnN0a29kZXIuICBOw6RyIGR1IGxvZ2dhdCBpbiBzZXIgZHUgYWxsYSBkaW5hIGFrdHVlbGxhIHJvbGxlciwgw6R2ZW4gZXZlbnR1ZWxsYSBwc2V1ZG9ueW1lciwgaWZhbGwgZHUgdmlsbCBhbnbDpG5kYSBkZW0uPC9wPlwiLFxuICAgIGVuX0VOOiBcIk91ciBkYXRhYmFzZSBkb2VzIG5vdCBjb250YWluIGEgcm9sZSB0aGF0IGNhbiBiZSBsaW5rZWQgdG8gQ2F1Y3VzLiBUaGlzIHNlcnZpY2UgaXMgb25seSBhdmFpbGFibGUgdG8gWnltZeKAmXMgbWVtYmVycy48L3A+XCIgK1xuXCI8cD5QbGVhc2UgbG9nIGluIHVzaW5nIHlvdXIgbWVtYmVy4oCZcyB1c2VyIGNyZWRlbnRpYWxzIG9yIGdvIGJhY2sgdG8gQ2F1Y3VzLjwvcD5cIiArXG5cIjxwPk9ubHkgdGhlIGluZGl2aWR1YWxzIHJlZ2lzdGVyZWQgYXMgWnltZeKAmXMgbWVtYmVycywgaW4gb3RoZXIgd29yZHMsIGNvbXBvc2VycywgbHlyaWNpc3RzIGFuZCBhcnJhbmdlcnMgKHByb2R1Y2VycyksIGNhbiBzaWduIHVwIHRvIENhdWN1cy4gUHVibGlzaGVycyBvciBhcnRpc3RzIChncm91cHMpIG1heSBub3QgbG9nIGluIHRvIENhdWN1cy48L3A+XCIgK1xuXCI8cD5Mb2cgaW4gdG8gdGhlIGlkZW50aWZpY2F0aW9uIHNlcnZpY2UgdXNpbmcgeW91ciBtZW1iZXLigJlzIG9ubGluZSBiYW5raW5nIHNlcnZpY2UgY3JlZGVudGlhbHMuICBBZnRlciBsb2dnaW5nIGluLCB5b3UgY2FuIHNlZSBhbGwgeW91ciB2YWxpZCByb2xlcywgaW5jbHVkaW5nIGFueSBwc2V1ZG9ueW1zLCBpZiB5b3Ugd2lzaCB0byB1c2UgdGhlbS48L3A+XCJcbiAgfSxcbiAgLy8gTm90ZSwgaW4gZmFjdCB0aGlzIGlzIG5vdCBhbiBlcnJvciA6KVxuICBcImVycm9yLXN1Y2Nlc3NcIjoge1xuICAgIGZpX0ZJOiBcIjxwPkxpbmtpdHlzIG9ubmlzdHVpITwvcD5cIiArXG5cIjxwPlNpaXJyeXTDpMOkbiB0YWthaXNpbiBDYXVjdXNpaW48L3A+XCIsXG4gICAgc3ZfU0U6IFwiPHA+TMOkbmtuaW5nZW4gbHlja2FkZXMhPC9wPlwiICtcbiAgICBcIjxwPkR1IMO2dmVyZsO2cnMgdGlsbGJha2EgdGlsbCBDYXVjdXM8L3A+XCIsXG4gICAgZW5fRU46IFwiPHA+TGlua2luZyBzdWNjZXNzZnVsITwvcD5cIiArXG4gICAgXCI8cD5Hb2luZyBiYWNrIHRvIENhdWN1czwvcD5cIixcbiAgfVxufTtcblxuZnVuY3Rpb24gY3JlYXRlQXBwbGljYXRpb24oaTE4bikge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lclwiKTtcbiAgY29udGFpbmVyLmlubmVySFRNTCArPSBtYWluSHRtbDtcblxuICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRlclwiKTtcbiAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbiAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKTtcbiAgY29uc3Qgc2xvZ2FuVGhpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xvZ2FuLXRoaW5cIik7XG4gIGNvbnN0IHNsb2dhbkJvbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsb2dhbi1ib2xkXCIpO1xuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvbi1zdWJtaXRcIik7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbkZha2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvbi1zdWJtaXQtZmFrZVwiKTtcbiAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b24tY2FuY2VsXCIpO1xuICBjb25zdCBsb2dpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWZvcm1cIik7XG4gIGNvbnN0IHJvbGVzRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9sZXMtZm9ybVwiKTtcbiAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJuYW1lXCIpO1xuICBjb25zdCB1c2VybmFtZUxhYmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZS1sYWJlbFwiKTtcbiAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpO1xuICBjb25zdCBwYXNzd29yZExhYmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1sYWJlbFwiKTtcbiAgY29uc3QgaW5mb1RleHRXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXRleHQtd3JhcHBlclwiKTtcbiAgY29uc3QgaW5mb1RleHRXcmFwcGVyT3ZlcmxhcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby10ZXh0LXdyYXBwZXItb3ZlcmxhcFwiKTtcbiAgY29uc3QgaW5mb1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tdGV4dFwiKTtcbiAgY29uc3QgaW5mb1RleHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tdGV4dC1idXR0b25cIik7XG4gIGNvbnN0IGVycm9yQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvclwiKTtcbiAgY29uc3QgbG9jYWxlU3dpdGNoRmkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2FsZS1zd2l0Y2gtZmlcIiksXG4gICAgICAgIGxvY2FsZVN3aXRjaEVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhbGUtc3dpdGNoLWVuXCIpLFxuICAgICAgICBsb2NhbGVTd2l0Y2hTZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYWxlLXN3aXRjaC1zZVwiKTtcbiAgbG9jYWxlU3dpdGNoRmkub25jbGljayA9IGxvY2FsZVN3aXRjaEVuLm9uY2xpY2sgPSBsb2NhbGVTd2l0Y2hTZS5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMuZGF0YXNldFsnbG9jYWxlJ107XG4gICAgaTE4bi5zZXRMb2NhbGUobG9jYWxlKTtcbiAgfVxuICBsZXQgY2F1Y3VzVG9rZW4sIHp5bWVUb2tlbiwgbGlua3M7XG5cbiAgaW5mb1RleHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dJbmZvUG9wdXApO1xuICBpbmZvVGV4dFdyYXBwZXJPdmVybGFwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93SW5mb1BvcHVwKTtcbiAgZnVuY3Rpb24gc2hvd0luZm9Qb3B1cChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gXCJzaG93LWluLW1vYmlsZVwiO1xuICAgIGlmIChpbmZvVGV4dFdyYXBwZXIuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgIGluZm9UZXh0V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICBpbmZvVGV4dFdyYXBwZXJPdmVybGFwLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mb1RleHRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIGluZm9UZXh0V3JhcHBlck92ZXJsYXAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZGlyZWN0VG8odXJsKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsKTtcbiAgfVxuXG4gIGkxOG4uYXBwZW5kKGkxOG5FeHRlbnNpb24pO1xuICBmdW5jdGlvbiBzZXRUZXh0KGVsZW1lbnQsIHRleHRJZCkge1xuICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gaTE4bi5nZXQodGV4dElkKTtcbiAgfTtcbiAgZnVuY3Rpb24gc2V0SFRNTChlbGVtZW50LCB0ZXh0SWQpIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGkxOG4uZ2V0KHRleHRJZCk7XG4gIH07XG4gIGZ1bmN0aW9uIHVwZGF0ZVRleHRzKGV2ZW50KSB7XG4gICAgc2V0VGV4dChzbG9nYW5UaGluLCBcInNsb2dhbi10aGluXCIpO1xuICAgIHNldFRleHQoc2xvZ2FuQm9sZCwgXCJzbG9nYW4tYm9sZFwiKTtcbiAgICBzZXRUZXh0KHVzZXJuYW1lTGFiZWwsIFwidXNlcm5hbWVcIik7XG4gICAgc2V0VGV4dChwYXNzd29yZExhYmVsLCBcInBhc3N3b3JkXCIpO1xuICAgIHVwZGF0ZVN1Ym1pdEJ1dHRvbkxhYmVsKCk7XG4gICAgdXBkYXRlQ2FuY2VsQnV0dG9uTGFiZWwoKTtcbiAgICB1cGRhdGVFcnJvck1lc3NhZ2UoKTtcbiAgICBzZXRIVE1MKGluZm9UZXh0LCBcImluZm9cIik7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlU3VibWl0QnV0dG9uTGFiZWwocGhhc2UpIHsgdXBkYXRlQnV0dG9uTGFiZWwoc3VibWl0QnV0dG9uLCBwaGFzZSk7IH1cbiAgZnVuY3Rpb24gdXBkYXRlQ2FuY2VsQnV0dG9uTGFiZWwocGhhc2UpIHsgdXBkYXRlQnV0dG9uTGFiZWwoY2FuY2VsQnV0dG9uLCBwaGFzZSk7IH1cbiAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uTGFiZWwoYnV0dG9uLCBwaGFzZSkge1xuICAgIHBoYXNlID0gcGhhc2UgPyAoYnV0dG9uLmRhdGFzZXRbXCJwaGFzZVwiXSA9IHBoYXNlKSA6IGJ1dHRvbi5kYXRhc2V0W1wicGhhc2VcIl07XG4gICAgYnV0dG9uLmlubmVyVGV4dCA9IGkxOG4uZ2V0KFwiYnV0dG9uLVwiICsgcGhhc2UpO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZUVycm9yTWVzc2FnZSgpIHtcbiAgICBjb25zdCBlcnJvclR5cGUgPSBlcnJvckJveC5kYXRhc2V0Wyd0eXBlJ107XG4gICAgZXJyb3JCb3guaW5uZXJIVE1MID0gZXJyb3JUeXBlID8gaTE4bi5nZXQoXCJlcnJvci1cIiArIGVycm9yVHlwZSkgOiBlcnJvckJveC5pbm5lckhUTUwgPSBudWxsO1xuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9jYWxlLWNoYW5nZVwiLCB1cGRhdGVUZXh0cyk7XG4gIHVwZGF0ZVRleHRzKCk7XG5cbiAgZnVuY3Rpb24gc2V0QnV0dG9uTGlzdGVuZXIoYnV0dG9uLCBsaXN0ZW5lcikge1xuICAgIGlmIChsaXN0ZW5lciAmJiAodHlwZW9mIGxpc3RlbmVyKSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHsgcmVkaXJlY3RUbyhsaXN0ZW5lcik7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBsaXN0ZW5lcjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93RXJyb3IoZXJyb3JUeXBlLCBlcnJvckNsYXNzKSB7XG4gICAgZXJyb3JCb3guY2xhc3NOYW1lID0gZXJyb3JDbGFzcztcbiAgICBzZXRFcnJvcihlcnJvclR5cGUsIGVycm9yQm94KTtcbiAgICBzaG93KGVycm9yQm94KTtcbiAgICBzaG93KG1haW5Db250YWluZXIpO1xuICAgIHNob3coaW5mb0NvbnRhaW5lcik7XG4gICAgaGlkZShsb2FkZXIpO1xuICB9XG4gIGZ1bmN0aW9uIHNldEVycm9yKGVycm9yVHlwZSkge1xuICAgIGVycm9yQm94LmRhdGFzZXRbJ3R5cGUnXSA9IGVycm9yVHlwZTtcbiAgICB1cGRhdGVFcnJvck1lc3NhZ2UoKTtcbiAgICBpZiAoIWVycm9yVHlwZSkgeyBoaWRlKGVycm9yQm94KTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdGlhdGUoKSB7XG4gICAgaWYgKHVybFBhcmFtcy5oYXMoJ25vbmNlJykgJiYgdXJsUGFyYW1zLmhhcygnY2FsbGJhY2tVcmwnKSkge1xuICAgICAgYXBpUG9zdChcImluaXRpYXRlXCIsIGdldEluaXRpYXRlQ2FsbFBheWxvYWQoKSwgbnVsbCxcbiAgICAgICAgKGluaXRpYXRlUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAoaW5pdGlhdGVSZXNwb25zZS5zdWNjZXNzIT09dHJ1ZSB8fCBpbml0aWF0ZVJlc3BvbnNlLmNhdWN1c1Rva2VuPT1udWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlSW5pdGlhdGVFcnJvclJlc3BvbnNlKGluaXRpYXRlUmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXVjdXNUb2tlbiA9IGluaXRpYXRlUmVzcG9uc2UuY2F1Y3VzVG9rZW47XG4gICAgICAgICAgbGlua3MgPSBpbml0aWF0ZVJlc3BvbnNlLmxpbmtzO1xuICAgICAgICAgIHNob3dMb2dpbkZvcm0oKTtcbiAgICAgICAgICBoaWRlKGxvYWRlcik7XG4gICAgICAgIH0sXG4gICAgICAgICh4aHIpID0+IHtcbiAgICAgICAgICBoYW5kbGVJbml0aWF0ZUVycm9yUmVzcG9uc2UoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhdGVDYWxsUGF5bG9hZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbm9uY2U6IHVybFBhcmFtcy5nZXQoXCJub25jZVwiKSxcbiAgICAgIGxpbmtzOntjYWxsYmFja1VybDp7aHJlZjp1cmxQYXJhbXMuZ2V0KCdjYWxsYmFja1VybCcpfX1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZUluaXRpYXRlRXJyb3JSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5saW5rcyAmJiByZXNwb25zZS5saW5rcy5lcnJvciAmJiByZXNwb25zZS5saW5rcy5lcnJvci5zY29wZSA9PSBcInJlZGlyZWN0XCIpIHtcbiAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShyZXNwb25zZS5saW5rcy5lcnJvci5ocmVmKTtcbiAgICB9XG4gICAgY29uc3QgbGluayA9IChyZXNwb25zZSAmJiByZXNwb25zZS5saW5rcykgPyAocmVzcG9uc2UubGlua3MuZXJyb3IgfHwgcmVzcG9uc2UubGlua3MuY2FuY2VsKSA6IG51bGw7XG4gICAgc2V0QnV0dG9uTGlzdGVuZXIoY2FuY2VsQnV0dG9uLCBsaW5rID8gbGluay5ocmVmIDogd2luZG93Lmhpc3RvcnkuYmFjayk7XG4gICAgaGlkZShzdWJtaXRCdXR0b25GYWtlKTtcbiAgICBzaG93KHN1Ym1pdEJ1dHRvbik7XG4gICAgZW5hYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgdXBkYXRlU3VibWl0QnV0dG9uTGFiZWwoXCJ0cnktYWdhaW5cIik7XG4gICAgc2V0QnV0dG9uTGlzdGVuZXIoc3VibWl0QnV0dG9uLCBpbml0aWF0ZUFnYWluKTtcbiAgICBzaG93RXJyb3IoXCJpbml0aWF0ZVwiKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0aWF0ZUFnYWluKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbik7XG4gICAgc2V0QnV0dG9uTGlzdGVuZXIoc3VibWl0QnV0dG9uLCBudWxsKTtcbiAgICBzaG93KHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIGluaXRpYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93TG9naW5Gb3JtKCkge1xuICAgIHNldEVycm9yKCk7XG4gICAgc2hvdyhsb2dpbkZvcm0pO1xuICAgIHNob3cobWFpbkNvbnRhaW5lcik7XG4gICAgc2hvdyhpbmZvQ29udGFpbmVyKTtcbiAgICB1c2VybmFtZS5yZWFkT25seSA9IHBhc3N3b3JkLnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgdXNlcm5hbWUudmFsdWUgPSBwYXNzd29yZC52YWx1ZSA9IG51bGw7XG4gICAgc2V0TG9naW5Gb3JtTGlzdGVuZXJzKCk7XG4gICAgaGlkZShzdWJtaXRCdXR0b25GYWtlKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIGF1dGhlbnRpY2F0ZSk7XG4gICAgZGlzYWJsZShzdWJtaXRCdXR0b24pO1xuICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcImxvZ2luXCIpO1xuXG4gICAgdXBkYXRlQ2FuY2VsQnV0dG9uTGFiZWwoXCJiYWNrLXRvLWNhdWN1c1wiKTtcbiAgICAvLyBBdCB0aGlzIG1vbWVudCB2YXJpYWJsZSAnbGlua3MnIG11c3QgYmUgaW5pdGFsaXplZCB3aXRoIGxpbmtzIG9iamVjdGVkIGZldGNoZWQgdmlhICdpbml0aWF0ZScgY2FsbFxuICAgIGlmIChsaW5rcyAmJiBsaW5rcy5jYW5jZWwgJiYgbGlua3MuY2FuY2VsLmhyZWYpIHtcbiAgICAgIHNldEJ1dHRvbkxpc3RlbmVyKGNhbmNlbEJ1dHRvbiwgbGlua3MuY2FuY2VsLmhyZWYpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBzZXRMb2dpbkZvcm1MaXN0ZW5lcnMoKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxVc2VybmFtZSA9IHVzZXJuYW1lLnZhbHVlO1xuICAgIGNvbnN0IG9yaWdpbmFsUGFzc3dvcmQgPSBwYXNzd29yZC52YWx1ZTtcbiAgICB1c2VybmFtZS5vbmtleXVwID0gcGFzc3dvcmQub25rZXl1cCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoKHRoaXMgPT0gdXNlcm5hbWUgJiYgdGhpcy52YWx1ZSAhPSBvcmlnaW5hbFVzZXJuYW1lKSB8fFxuICAgICAgICAgICh0aGlzID09IHBhc3N3b3JkICYmIHRoaXMudmFsdWUgIT0gb3JpZ2luYWxQYXNzd29yZCkpIHtcbiAgICAgICAgdXNlcm5hbWUuY2xhc3NOYW1lID0gcGFzc3dvcmQuY2xhc3NOYW1lID0gbnVsbDtcbiAgICAgICAgc2V0RXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VybmFtZS52YWx1ZSAmJiBwYXNzd29yZC52YWx1ZSAmJiB1c2VybmFtZS5jbGFzc05hbWUgIT0gXCJlcnJvclwiICYmIHBhc3N3b3JkLmNsYXNzTmFtZSAhPSBcImVycm9yXCIpIHtcbiAgICAgICAgZW5hYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlPT0xMyAmJiB0aGlzPT1wYXNzd29yZCkge1xuICAgICAgICAgIGF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNhYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZShldmVudCkge1xuICAgIGlmIChldmVudCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgZGlzYWJsZShzdWJtaXRCdXR0b24pO1xuICAgIGhpZGUoc3VibWl0QnV0dG9uKTtcbiAgICBzaG93KHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHVzZXJuYW1lLnJlYWRPbmx5ID0gcGFzc3dvcmQucmVhZE9ubHkgPSB0cnVlO1xuICAgIHVzZXJuYW1lLm9ua2V5dXAgPSBwYXNzd29yZC5vbmtleXVwID0gbnVsbDtcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGxvZ2luRm9ybSk7XG4gICAgY29uc3QgZGF0YSA9IHt1c2VybmFtZTpmb3JtRGF0YS5nZXQoXCJ1c2VybmFtZVwiKSwgcGFzc3dvcmQ6Zm9ybURhdGEuZ2V0KFwicGFzc3dvcmRcIil9O1xuXG4gICAgYXBpUG9zdChcImF1dGhcIiwgZGF0YSwgbnVsbCxcbiAgICAgIChhdXRoUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKGF1dGhSZXNwb25zZS5zdWNjZXNzIT09dHJ1ZSB8fCBhdXRoUmVzcG9uc2UuY3VzdG9tZXJzPT1udWxsIHx8IGF1dGhSZXNwb25zZS5jdXN0b21lcnMubGVuZ3RoPT0wKSB7XG4gICAgICAgICAgcmV0dXJuIGhhbmRsZUF1dGhlbnRpY2F0ZUVycm9yUmVzcG9uc2UoYXV0aFJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHp5bWVUb2tlbiA9IGF1dGhSZXNwb25zZS56eW1lVG9rZW47XG5cbiAgICAgICAgc2V0QnV0dG9uTGlzdGVuZXIoc3VibWl0QnV0dG9uLCB2ZXJpZnkpO1xuICAgICAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgICAgICBkaXNhYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgICAgICAgdXBkYXRlU3VibWl0QnV0dG9uTGFiZWwoXCJsaW5rXCIpO1xuICAgICAgICB1cGRhdGVDYW5jZWxCdXR0b25MYWJlbChcImNhbmNlbFwiKTtcbiAgICAgICAgc2V0QnV0dG9uTGlzdGVuZXIoY2FuY2VsQnV0dG9uLCBhdXRoZW50aWNhdGVBZ2Fpbik7XG5cbiAgICAgICAgaGlkZShsb2dpbkZvcm0pO1xuICAgICAgICByb2xlc0Zvcm0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYXV0aFJlc3BvbnNlLmN1c3RvbWVycy5mb3JFYWNoKGN1c3RvbWVyID0+IHtcbiAgICAgICAgICByb2xlc0Zvcm0uaW5uZXJIVE1MICs9IFwiPGlucHV0IGlkPVxcXCJcIiArIGN1c3RvbWVyLmlwaU51bWJlciArIFwiXFxcIiB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwiaXBpTnVtYmVyXFxcIiB2YWx1ZT1cXFwiXCIgK1xuICAgICAgICAgICAgY3VzdG9tZXIuaXBpTnVtYmVyICsgXCJcXFwiPlwiICsgXCI8bGFiZWwgZm9yPVxcXCJcIiArIGN1c3RvbWVyLmlwaU51bWJlciArIFwiXFxcIj48c3BhbiBjbGFzcz1cXFwibmFtZVxcXCI+XCIgK1xuICAgICAgICAgICAgY3VzdG9tZXIubmFtZSArIFwiPC9zcGFuPlwiICsgXCI8c3BhbiBjbGFzcz1cXFwiaXBpXFxcIj5cIiArIGN1c3RvbWVyLmlwaU51bWJlciArIFwiPC9zcGFuPjwvbGFiZWw+XCI7XG4gICAgICAgIH0pO1xuICAgICAgICBzaG93KHJvbGVzRm9ybSk7XG4gICAgICAgIHJvbGVzRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0Lm5hbWU9PVwiaXBpTnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGVuYWJsZShzdWJtaXRCdXR0b24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hvd0Vycm9yKFwicm9sZXNcIiwgXCJjb21wYWN0XCIpO1xuICAgICAgfSxcbiAgICAgICh4aHIpID0+IHtcbiAgICAgICAgaGFuZGxlQXV0aGVudGljYXRlRXJyb3JSZXNwb25zZSh4aHIucmVzcG9uc2UpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlQXV0aGVudGljYXRlRXJyb3JSZXNwb25zZShhdXRoUmVzcG9uc2UpIHtcbiAgICBpZiAoYXV0aFJlc3BvbnNlICYmIGF1dGhSZXNwb25zZS5jdXN0b21lcnMgJiYgYXV0aFJlc3BvbnNlLmN1c3RvbWVycy5sZW5ndGg9PTApIHtcbiAgICAgIGhpZGUobG9naW5Gb3JtKTtcbiAgICAgIHNldEJ1dHRvbkxpc3RlbmVyKHN1Ym1pdEJ1dHRvbiwgYXV0aGVudGljYXRlQWdhaW4pO1xuICAgICAgZW5hYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcImxvZ2luLWFnYWluXCIpO1xuICAgICAgc2hvd0Vycm9yKFwibm8tcm9sZXNcIiwgXCJzY3JvbGxcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFt1c2VybmFtZSwgcGFzc3dvcmRdLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpe1xuICAgICAgICBpbnB1dC5jbGFzc05hbWUgPSBcImVycm9yXCI7XG4gICAgICAgIGlucHV0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHNldExvZ2luRm9ybUxpc3RlbmVycygpO1xuICAgICAgc2hvd0Vycm9yKFwibG9naW5cIiwgXCJsb2dpblwiKTtcbiAgICB9XG4gICAgaGlkZShzdWJtaXRCdXR0b25GYWtlKTtcbiAgICBzaG93KHN1Ym1pdEJ1dHRvbik7XG4gIH1cblxuICBmdW5jdGlvbiBhdXRoZW50aWNhdGVBZ2FpbihldmVudCkge1xuICAgIGlmIChldmVudCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgenltZVRva2VuID0gbnVsbDtcbiAgICBoaWRlKHJvbGVzRm9ybSk7XG4gICAgcm9sZXNGb3JtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2hvd0xvZ2luRm9ybSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdmVyaWZ5KGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cblxuICAgIGhpZGUoc3VibWl0QnV0dG9uKTtcbiAgICBzaG93KHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNldEJ1dHRvbkxpc3RlbmVyKHN1Ym1pdEJ1dHRvbiwgbnVsbCk7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgenltZVRva2VuOiB6eW1lVG9rZW4sXG4gICAgICBsaW5rczogeyB2ZXJpZnk6IGxpbmtzLnZlcmlmeSB9LFxuICAgICAgaXBpTnVtYmVyczogWyBuZXcgRm9ybURhdGEocm9sZXNGb3JtKS5nZXQoXCJpcGlOdW1iZXJcIikgXVxuICAgIH07XG4gICAgWy4uLnJvbGVzRm9ybS5lbGVtZW50c10uZm9yRWFjaChkaXNhYmxlKTtcblxuICAgIGFwaVBvc3QoXCJ2ZXJpZnlcIiwgZGF0YSwgY2F1Y3VzVG9rZW4sXG4gICAgICAodmVyaWZ5UmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHZlcmlmeVJlc3BvbnNlLnN1Y2Nlc3MhPT10cnVlIHx8IHZlcmlmeVJlc3BvbnNlLmxpbmtzPT1udWxsIHx8XG4gICAgICAgICAgdmVyaWZ5UmVzcG9uc2UubGlua3MuY2FsbGJhY2tVcmw9PW51bGwgfHwgdmVyaWZ5UmVzcG9uc2UubGlua3MuY2FsbGJhY2tVcmwuaHJlZj09bnVsbCkge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVWZXJpZnlFcnJvclJlc3BvbnNlKHZlcmlmeVJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBzaG93RXJyb3IoXCJzdWNjZXNzXCIpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh2ZXJpZnlSZXNwb25zZS5saW5rcy5jYWxsYmFja1VybC5ocmVmKTtcbiAgICAgIH0sXG4gICAgICAoeGhyKSA9PiB7XG4gICAgICAgIGhhbmRsZVZlcmlmeUVycm9yUmVzcG9uc2UoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVZlcmlmeUVycm9yUmVzcG9uc2UodmVyaWZ5UmVzcG9uc2UpIHtcbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgICBlbmFibGUoc3VibWl0QnV0dG9uKTtcbiAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcInRyeS1hZ2FpblwiKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIHZlcmlmeUFnYWluKTtcbiAgICBoaWRlKHJvbGVzRm9ybSk7XG4gICAgc2hvd0Vycm9yKFwibGlua2luZ1wiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeUFnYWluKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcigpO1xuICAgIHVwZGF0ZVN1Ym1pdEJ1dHRvbkxhYmVsKFwibGlua1wiKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIHZlcmlmeSk7XG5cbiAgICBbLi4ucm9sZXNGb3JtLmVsZW1lbnRzXS5mb3JFYWNoKGVuYWJsZSk7XG4gICAgc2hvdyhyb2xlc0Zvcm0pO1xuICB9XG5cbiAgaW5pdGlhdGUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGluaXRpYXRlOiAoaTE4bikgPT4ge1xuICAgICAgY29uc3QgZm9udHNMb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvbnRzLWxvYWRlclwiKTtcbiAgICAgIHZhciBmb250TG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvbnRMb2FkZXIuc3R5bGUuZm9udEZhbWlseSA9IFwiUGFudG9uIExpZ2h0XCI7XG4gICAgICBmb250TG9hZGVyLmlubmVyVGV4dCA9IFwiQUJDXCI7XG4gICAgICBmb250c0xvYWRlci5hcHBlbmRDaGlsZChmb250TG9hZGVyKTtcbiAgICAgIGZvbnRMb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9udExvYWRlci5zdHlsZS5mb250RmFtaWx5ID0gXCJQYW50b24gUmVndWxhclwiO1xuICAgICAgZm9udExvYWRlci5pbm5lclRleHQgPSBcIkFCQ1wiO1xuICAgICAgZm9udHNMb2FkZXIuYXBwZW5kQ2hpbGQoZm9udExvYWRlcik7XG4gICAgICBmb250TG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvbnRMb2FkZXIuc3R5bGUuZm9udEZhbWlseSA9IFwiUGFudG9uIEJsYWNrXCI7XG4gICAgICBmb250TG9hZGVyLmlubmVyVGV4dCA9IFwiQUJDXCI7XG4gICAgICBmb250c0xvYWRlci5hcHBlbmRDaGlsZChmb250TG9hZGVyKTtcblxuICAgICAgbGV0IGNzc0NoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmZvbnRzLmNoZWNrKFwiMTBwdCBQYW50b24gUmVndWxhclwiKSAmJiBkb2N1bWVudC5mb250cy5jaGVjayhcIjEwcHQgUGFudG9uIExpZ2h0XCIpICYmIGRvY3VtZW50LmZvbnRzLmNoZWNrKFwiMTBwdCBQYW50b24gQmxhY2tcIikpIHtcbiAgICAgICAgICBmb250c0xvYWRlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGZvbnRzTG9hZGVyKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKGNzc0NoZWNrSW50ZXJ2YWwpO1xuICAgICAgICAgIGNzc0NoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICAgIGNyZWF0ZUFwcGxpY2F0aW9uKGkxOG4pO1xuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIyYTc5M2UyNDdiMzU0ODExMWE2OWQ0NzRlNDQ1ZDY4NS5qcGdcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWJsYWNrLnR0ZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9wYW50b24tYmxhY2sud29mZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9wYW50b24tYmxhY2sud29mZjJcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWxpZ2h0LnR0ZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9wYW50b24tbGlnaHQud29mZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9wYW50b24tbGlnaHQud29mZjJcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLW5vcm1hbC50dGZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLW5vcm1hbC53b2ZmXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL3BhbnRvbi1ub3JtYWwud29mZjJcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBpZD1cXFwibWFpblxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+XFxuICA8ZGl2IGlkPVxcXCJsb2dvXFxcIj48c3BhbiBpZD1cXFwibG9nby10ZXh0XFxcIiBjbGFzcz1cXFwic2xvZ2FuIGJvbGRcXFwiPlp5bWUtQ2F1Y3VzPC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBpZD1cXFwiZm9ybXNcXFwiPlxcbiAgICA8Zm9ybSBpZD1cXFwibG9naW4tZm9ybVxcXCIgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIj5cXG4gICAgICA8bGFiZWwgaWQ9XFxcInVzZXJuYW1lLWxhYmVsXFxcIiBmb3I9XFxcInVzZXJuYW1lXFxcIj48L2xhYmVsPlxcbiAgICAgIDxpbnB1dCBpZD1cXFwidXNlcm5hbWVcXFwiIG5hbWU9XFxcInVzZXJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBwbGFjZWhvbGRlcj1cXFwiXFxcIiB0YWJpbmRleD1cXFwiMVxcXCI+XFxuXFxuICAgICAgPGxhYmVsIGlkPVxcXCJwYXNzd29yZC1sYWJlbFxcXCIgZm9yPVxcXCJwYXNzd29yZFxcXCI+PC9sYWJlbD5cXG4gICAgICA8aW5wdXQgaWQ9XFxcInBhc3N3b3JkXFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJcXFwiIHRhYmluZGV4PVxcXCIyXFxcIj5cXG4gICAgPC9mb3JtPlxcbiAgICA8ZGl2IGlkPVxcXCJlcnJvclxcXCIgc3R5bGU9XFxcImRpc3BsYXk6bm9uZVxcXCI+PC9kaXY+XFxuICAgIDxmb3JtIGlkPVxcXCJyb2xlcy1mb3JtXFxcIiBzdHlsZT1cXFwiZGlzcGxheTogbm9uZTtcXFwiPlxcbiAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwicmFkaW8tZ3JvdXBcXFwiIGlkPVxcXCJyYWRpbzFcXFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XFxcInJhZGlvMVxcXCI+PHNwYW4gY2xhc3M9XFxcIm5hbWVcXFwiPk9wdGlvbiAjMTwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiaXBpXFxcIj4xMjM0NTY3ODwvc3Bhbj48L2xhYmVsPlxcbiAgICAgIDxpbnB1dCB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwicmFkaW8tZ3JvdXBcXFwiIGlkPVxcXCJyYWRpbzJcXFwiPlxcbiAgICAgIDxsYWJlbCBmb3I9XFxcInJhZGlvMlxcXCI+PHNwYW4gY2xhc3M9XFxcIm5hbWVcXFwiPk9wdGlvbiAjMjwvc3Bhbj48c3BhbiBjbGFzcz1cXFwiaXBpXFxcIj4xOTI4Mzc0NjU8L3NwYW4+PC9sYWJlbD5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInJhZGlvLWdyb3VwXFxcIiBpZD1cXFwicmFkaW8zXFxcIj5cXG4gICAgICA8bGFiZWwgZm9yPVxcXCJyYWRpbzNcXFwiPjxzcGFuIGNsYXNzPVxcXCJuYW1lXFxcIj5PcHRpb24gIzM8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImlwaVxcXCI+NzM1NjQ4MjkxPC9zcGFuPjwvbGFiZWw+XFxuICAgIDwvZm9ybT5cXG4gIDwvZGl2PlxcbiAgPGRpdiBpZD1cXFwiYnV0dG9uc1xcXCI+XFxuICAgIDxidXR0b24gaWQ9XFxcImJ1dHRvbi1zdWJtaXRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdmFsdWU9XFxcIlxcXCIgY2xhc3M9XFxcInN1Ym1pdFxcXCIgZGlzYWJsZWQ9XFxcImRpc2FibGVkXFxcIlxcbiAgICBzdHlsZT1cXFwiZGlzcGxheTogbm9uZTtcXFwiIGRhdGEtcGhhc2U9XFxcImxvZ2luXFxcIiB0YWJpbmRleD1cXFwiM1xcXCI+PC9idXR0b24+XFxuICAgIDxkaXYgaWQ9XFxcImJ1dHRvbi1zdWJtaXQtZmFrZVxcXCIgY2xhc3M9XFxcImJ1dHRvbi1pbWl0YXRpb25cXFwiIHN0eWxlPVxcXCJkaXNwbGF5OiBibG9ja1xcXCI+PGRpdiBjbGFzcz1cXFwic3Bpbm5lclxcXCI+PC9kaXY+PC9kaXY+XFxuICAgIDxidXR0b24gaWQ9XFxcImJ1dHRvbi1jYW5jZWxcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdGFiaW5kZXg9XFxcIjRcXFwiIGNsYXNzPVxcXCJjYW5jZWxcXFwiIGRhdGEtcGhhc2U9XFxcImJhY2stdG8tY2F1Y3VzXFxcIj48L2J1dHRvbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgaWQ9XFxcImluZm9cXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwiaW5mby1pbm5lci1ib3hcXFwiPlxcbiAgICA8aDE+PHNwYW4gaWQ9XFxcInNsb2dhbi10aGluXFxcIiBjbGFzcz1cXFwic2xvZ2FuIHRoaW5cXFwiPlJha2thdWRlc3RhPC9zcGFuPjxiciAvPjxzcGFuIGlkPVxcXCJzbG9nYW4tYm9sZFxcXCIgY2xhc3M9XFxcInNsb2dhbiBib2xkXFxcIj5NdXNpaWtraWluPC9zcGFuPjwvaDE+XFxuICAgIDxkaXYgaWQ9XFxcImluZm8tdGV4dC13cmFwcGVyLW92ZXJsYXBcXFwiPjwvZGl2PlxcbiAgICA8ZGl2IGlkPVxcXCJpbmZvLXRleHQtd3JhcHBlclxcXCI+XFxuICAgICAgPGRpdiBpZD1cXFwiaW5mby10ZXh0XFxcIj48L2Rpdj5cXG4gICAgICA8ZGl2IGlkPVxcXCJpbmZvLWxvY2FsZS1zd2l0Y2hcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwibG9jYWxlLXN3aXRjaC1maVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWxvY2FsZT1cXFwiZmlfRklcXFwiIGNsYXNzPVxcXCJsb2NhbGUtc3dpdGNoXFxcIj5GaTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwibG9jYWxlLXN3aXRjaC1lblxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWxvY2FsZT1cXFwiZW5fRU5cXFwiIGNsYXNzPVxcXCJsb2NhbGUtc3dpdGNoXFxcIj5FbjwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiBpZD1cXFwibG9jYWxlLXN3aXRjaC1zZVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiBkYXRhLWxvY2FsZT1cXFwic3ZfU0VcXFwiIGNsYXNzPVxcXCJsb2NhbGUtc3dpdGNoXFxcIj5TdmU8L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgaWQ9XFxcImluZm8tdGV4dC1idXR0b25cXFwiPjwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tbm9ybWFsLndvZmYyXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gcmVxdWlyZShcIi4vZm9udHMvcGFudG9uLW5vcm1hbC53b2ZmXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gcmVxdWlyZShcIi4vZm9udHMvcGFudG9uLW5vcm1hbC50dGZcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tbGlnaHQud29mZjJcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tbGlnaHQud29mZlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1saWdodC50dGZcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tYmxhY2sud29mZjJcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzdfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tYmxhY2sud29mZlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1ibGFjay50dGZcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18gPSByZXF1aXJlKFwiLi9iYWNrZ3JvdW5kLmpwZ1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzZfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF82X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF83X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzhfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF85X19fKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIlBhbnRvbiBSZWd1bGFyXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIExpZ2h0XFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIEJsYWNrXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzhfX18gKyBcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpO1xcbn1cXG5cXG5odG1sLCBib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIFJlZ3VsYXJcXFwiLCAnUGFudG9uLVJlZ3VsYXInLCdQYW50b24nLHNhbnMtc2VyaWY7XFxufVxcblxcbiN2ZXJ0aWNhbC1hbGlnbmVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzlfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG4jbWFpbiB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQxMXB4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBwYWRkaW5nOiAzN3B4IDcwcHggMzVweCA3MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uO1xcbn1cXG5cXG4jY29udGFpbmVyICNtYWluICNsb2dvIHtcXG4gIC8qIHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4jY29udGFpbmVyICNtYWluICNsb2dvID4gc3BhbiB7XFxuICBmb250LXNpemU6IDIuMnJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxufVxcblxcbiNjb250YWluZXIgI21haW4gI2Vycm9yIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogdGFibGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IC45cmVtO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuI2NvbnRhaW5lciAjbWFpbiAjZXJyb3IubG9naW4ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgd2lkdGg6IGF1dG87XFxuICBjb2xvcjogI2U5NWI1MztcXG59XFxuXFxuI2NvbnRhaW5lciAjbWFpbiAjZXJyb3Iuc2Nyb2xsIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nLXJpZ2h0OiAxN3B4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuI2NvbnRhaW5lciAjbWFpbiAjZXJyb3IuY29tcGFjdCB7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXJnaW46IDEwcHggMCAxNnB4IDA7XFxufVxcblxcbiNjb250YWluZXIgI21haW4gI2Vycm9yIHNwYW4ge1xcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNtYWluICNidXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbiNpbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYzIxMmE7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHdpZHRoOiA1NzZweDtcXG4gIGhlaWdodDogNDExcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogNDNweCAxMDBweDtcXG59XFxuXFxuI2luZm8tdGV4dC13cmFwcGVyLW92ZXJsYXAge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuYSB7XFxuICBjb2xvcjogIzAwOWNiNjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG59XFxuXFxuaW5wdXQsIGxhYmVsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG5sYWJlbCB7XFxuICBmb250LWZhbWlseTogXFxcIlBhbnRvbiBCb2xkXFxcIjtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBjb2xvcjogIzFjMjEyYTtcXG59XFxuXFxuYnV0dG9uLCAuYnV0dG9uLWltaXRhdGlvbiB7XFxuICBmb250LXNpemU6IDAuODc1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNzE7XFxuICBjb2xvcjogI2ZmZmZmZjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDlDQjY7XFxuICBib3JkZXI6IDA7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMsIGNvbG9yIDAuMjVzO1xcbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBwYWRkaW5nOiA4cHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIHdpZHRoOiAyNjBweDtcXG4gIGhlaWdodDogNDBweDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogXFxcIlBhbnRvbiBCb2xkXFxcIjtcXG59XFxuLmJ1dHRvbi1pbWl0YXRpb24ge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5idXR0b246ZGlzYWJsZWQge1xcbiAgb3BhY2l0eTogMC4yO1xcbn1cXG5idXR0b246ZGlzYWJsZWQ6aG92ZXIge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5idXR0b246aG92ZXI6bm90KDpkaXNhYmxlZCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzA4MztcXG59XFxuXFxuYnV0dG9uLmNhbmNlbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgY29sb3I6ICMwMDlDQjY7XFxuICBtYXJnaW4tdG9wOiA4cHg7XFxufVxcbmJ1dHRvbi5jYW5jZWw6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjtcXG59XFxuXFxuYnV0dG9uLmxvY2FsZS1zd2l0Y2gge1xcbiAgY29sb3I6ICMwMDljYjY7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICBkaXNwbGF5OiBpbmxpbmU7XFxufVxcbmJ1dHRvbi5sb2NhbGUtc3dpdGNoOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG59XFxuXFxuLnNwaW5uZXIge1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgd2lkdGg6IDE2cHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMCk7XFxuICBib3JkZXItdG9wLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XFxuICBib3JkZXItcmlnaHQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICBhbmltYXRpb246IHJvdGF0aW9uIDFzIGluZmluaXRlIGxpbmVhciAwLjI1cztcXG5cXG4gIC8qIHRoZSBvcGFjaXR5IGlzIHVzZWQgdG8gbGF6eWxvYWQgdGhlIHNwaW5uZXIsIHNlZSBhbmltYXRpb24gZGVsYXkgKi9cXG4gIC8qIHRoaXMgYXZvaWQgdGhlIHNwaW5uZXIgdG8gYmUgZGlzcGxheWVkIHdoZW4gdmlzaWJsZSBmb3IgYSB2ZXJ5IHNob3J0IHBlcmlvZCBvZiB0aW1lICovXFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHJvdGF0aW9uIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzU5ZGVnKTtcXG4gIH1cXG59XFxuXFxuaW5wdXQge1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzkwOWI5ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG59XFxuXFxuaW5wdXQ6Zm9jdXN7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiAjMDA5Y2I2O1xcbn1cXG5cXG5pbnB1dCN1c2VybmFtZSB7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbn1cXG5cXG5pbnB1dC5lcnJvciwgaW5wdXQ6Zm9jdXMuZXJyb3Ige1xcbiAgYm9yZGVyLWNvbG9yOiAjZTk1YjUzO1xcbn1cXG5cXG5kaXYjZm9ybXMge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3cteTogb3ZlcmxheTtcXG59XFxuXFxuZm9ybSwgI2J1dHRvbnMge1xcbiAgd2lkdGg6IDI2MHB4O1xcbiAgbWFyZ2luOiAwIGF1dG87XFxufVxcbmZvcm0jbG9naW4tZm9ybSBsYWJlbCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5mb3JtI3JvbGVzLWZvcm0gbGFiZWwgLm5hbWUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmZvcm0jcm9sZXMtZm9ybSBsYWJlbCAuaXBpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jaW5mby1pbm5lci1ib3gsICNpbmZvLXRleHQtd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiBjb2x1bW47XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNpbmZvIGgxIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBsaW5lLWhlaWdodDogMi42cmVtO1xcbn1cXG4uc2xvZ2FuIHtcXG4gIGZvbnQtc2l6ZTogMy40cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDFyZW07XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbn1cXG4uc2xvZ2FuLnRoaW4ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gTGlnaHRcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuLnNsb2dhbi5ib2xkIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIEJsYWNrXFxcIjtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbiNpbmZvICNpbmZvLXRleHQge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG4jaW5mbyAjaW5mby1sb2NhbGUtc3dpdGNoIGEge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIEJvbGRcXFwiO1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMDAwcHgpIHtcXG4gICN2ZXJ0aWNhbC1hbGlnbmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gICAgbWluLWhlaWdodDogNTgwcHg7XFxuICB9XFxuICAjY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1mbG93OiBjb2x1bW4tcmV2ZXJzZTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgfVxcblxcbiAgI2xvYWRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgdG9wOiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgfVxcblxcbiAgI21haW4ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgcGFkZGluZzogNDNweCAwcHggMjBweCAwcHg7XFxuICAgIGJvdHRvbTogMDtcXG4gIH1cXG5cXG4gICNjb250YWluZXIgI21haW4gI2Zvcm1zICNlcnJvciwgI2NvbnRhaW5lciAjbWFpbiAjZm9ybXMgI2Vycm9yLnNjcm9sbCB7XFxuICAgIHBhZGRpbmc6IDAgMjBweDtcXG4gIH1cXG5cXG4gICNpbmZvIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgcGFkZGluZzogMHB4IDEwcHggMjBweCAxMHB4O1xcbiAgfVxcblxcbiAgI2luZm8taW5uZXItYm94IHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICB3aWR0aDogMjYwcHg7XFxuICAgIG1hcmdpbjogYXV0byBhdXRvIDAgYXV0bztcXG4gIH1cXG4gICNpbmZvLWlubmVyLWJveCBoMSB7XFxuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xcbiAgfVxcblxcbiAgI2luZm8tdGV4dC1idXR0b24ge1xcbiAgICB3aWR0aDogNTJweDtcXG4gICAgaGVpZ2h0OiA1MnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAyOHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjJweDtcXG4gICAgcmlnaHQ6IDI1cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDlDQjY7XFxuICB9XFxuXFxuICAjaW5mby10ZXh0LXdyYXBwZXIge1xcbiAgICAvKiBkaXNwbGF5OiBub25lOyAqL1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWZsb3c6IGNvbHVtbjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHRvcDogMjhweDtcXG4gICAgbGVmdDogMDtcXG4gICAgbWFyZ2luOiAyNHB4O1xcbiAgICBwYWRkaW5nOiAyNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAyNHB4O1xcbiAgICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAxMHB4IDEwcHggLTRweCByZ2JhKDAsMCwwLDAuNDYpO1xcbiAgICAtbW96LWJveC1zaGFkb3c6IDBweCAxMHB4IDEwcHggLTRweCByZ2JhKDAsMCwwLDAuNDYpO1xcbiAgICBib3gtc2hhZG93OiAwcHggMTBweCAxMHB4IC00cHggcmdiYSgwLDAsMCwwLjQ2KTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbiwgb3BhY2l0eSAwLjFzIGVhc2Utb3V0O1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgfVxcbiAgI2luZm8tdGV4dC13cmFwcGVyLnNob3ctaW4tbW9iaWxlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMXMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBlYXNlLWluO1xcbiAgfVxcblxcbiAgI2luZm8tdGV4dC13cmFwcGVyLW92ZXJsYXAge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgdG9wOiAwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzQsIDU1LCA2MSwgMC43NSk7XFxuICB9XFxuICAjaW5mby10ZXh0LXdyYXBwZXItb3ZlcmxhcC5zaG93LWluLW1vYmlsZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDJzIGxpbmVhcjtcXG4gIH1cXG5cXG4gICNpbmZvICNpbmZvLXRleHQge1xcbiAgICBvcmRlcjogMjtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxuICAgIGhlaWdodDogYXV0bztcXG4gIH1cXG5cXG4gIC5zbG9nYW4ge1xcbiAgICBmb250LXNpemU6IDIuNHJlbTtcXG4gIH1cXG5cXG4gIGJ1dHRvbi5sb2NhbGUtc3dpdGNoOmhvdmVyIHtcXG4gICAgY29sb3I6ICMwMDcwODM7XFxuICB9XFxufVxcblxcbmlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl0ge1xcbiAgICBvdXRsaW5lOiBub25lO1xcbn1cXG5pbnB1dFt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWQgKyBsYWJlbDpiZWZvcmUge1xcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCAjZDAwOyAqL1xcbiAgICBib3JkZXItY29sb3I6ICMwMDljYjYgIWltcG9ydGFudDtcXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAtOTk5OXB4O1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkICsgbGFiZWwsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06bm90KDpjaGVja2VkKSArIGxhYmVsXFxue1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHBhZGRpbmctbGVmdDogMjhweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBsaW5lLWhlaWdodDogMjBweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBjb2xvcjogIzY2NjtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YmVmb3JlIHtcXG4gICAgY29udGVudDogJyc7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMThweDtcXG4gICAgaGVpZ2h0OiAxOHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkICsgbGFiZWw6YWZ0ZXIsXFxuW3R5cGU9XFxcInJhZGlvXFxcIl06bm90KDpjaGVja2VkKSArIGxhYmVsOmFmdGVyIHtcXG4gICAgY29udGVudDogJyc7XFxuICAgIHdpZHRoOiAxMHB4O1xcbiAgICBoZWlnaHQ6IDEwcHg7XFxuICAgIGJhY2tncm91bmQ6ICMwMDljYjY7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA1cHg7XFxuICAgIGxlZnQ6IDVweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YWZ0ZXIge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWQgKyBsYWJlbDphZnRlciB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG59XFxuXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG52YXIgZXhwb3J0ZWQgPSBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDoge307XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkOyJdLCJzb3VyY2VSb290IjoiIn0=