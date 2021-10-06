(self["webpackChunkclient"] = self["webpackChunkclient"] || []).push([["app"],{

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((module) => {

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  container.innerHTML += (_main_html__WEBPACK_IMPORTED_MODULE_1___default());

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
      (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.apiPost)("initiate", getInitiateCallPayload(), null,
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

    (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.apiPost)("auth", data, null,
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
          rolesForm.innerHTML += "<input id=\"" + customer.globalID + "\" type=\"radio\" name=\"globalID\" value=\"" +
            customer.globalID + "\">" + "<label for=\"" + customer.globalID + "\"><span class=\"name\">" +
            customer.name + "</span>" + "<span class=\"ipi\">" + customer.globalID + "</span></label>";
        });
        show(rolesForm);
        rolesForm.addEventListener("change", (event) => {
          if (event.target && event.target.name=="globalID") {
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
      globalIDs: [ new FormData(rolesForm).get("globalID") ]
    };
    [...rolesForm.elements].forEach(disable);

    (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.apiPost)("verify", data, caucusToken,
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function() {
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

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/***/ ((module, exports, __webpack_require__) => {

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
exports.push([module.id, "@font-face {\n  font-family: \"Panton Regular\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Panton Light\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format(\"truetype\");\n}\n\n@font-face {\n  font-family: \"Panton Black\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"truetype\");\n}\n\nhtml, body {\n  font-family: \"Panton Regular\", 'Panton-Regular','Panton',sans-serif;\n}\n\n#vertical-aligner {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ");\n  background-size: cover;\n}\n\n#main {\n  width: 400px;\n  height: 411px;\n  box-sizing: border-box;\n  background-color: #ffffff;\n  padding: 37px 70px 35px 70px;\n  display: flex;\n  flex-flow: column;\n}\n\n#container #main #logo {\n  /* position: relative; */\n  width: 100%;\n  text-align: center;\n}\n#container #main #logo > span {\n  font-size: 2.2rem;\n  line-height: 1.5rem;\n}\n\n#container #main #error {\n  height: 100%;\n  width: 100%;\n  display: table;\n  text-align: center;\n  font-size: .9rem;\n  box-sizing: border-box;\n}\n\n#container #main #error.login {\n  height: auto;\n  width: auto;\n  color: #e95b53;\n}\n\n#container #main #error.scroll {\n  box-sizing: border-box;\n  padding-right: 17px;\n  text-align: left;\n}\n#container #main #error.compact {\n  height: auto;\n  margin: 10px 0 16px 0;\n}\n\n#container #main #error span {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n\n#main #buttons {\n  margin-top: 10px;\n}\n\n#info {\n  background-color: #1c212a;\n  color: #ffffff;\n  width: 576px;\n  height: 411px;\n  box-sizing: border-box;\n  padding: 43px 100px;\n}\n\n#info-text-wrapper-overlap {\n  display: none;\n}\n\na {\n  color: #009cb6;\n  text-decoration: none;\n}\n\ninput, label {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n}\n\nlabel {\n  font-family: \"Panton Bold\";\n  font-size: 0.875rem;\n  color: #1c212a;\n}\n\nbutton, .button-imitation {\n  font-size: 0.875rem;\n  line-height: 1.71;\n  color: #ffffff;\n  text-align: center;\n  text-transform: uppercase;\n  cursor: pointer;\n  user-select: none;\n  background-color: #009CB6;\n  border: 0;\n  border-radius: 5px;\n  transition: background 0.2s, color 0.25s;\n  word-break: break-word;\n  white-space: nowrap;\n  padding: 8px;\n  width: 100%;\n  width: 260px;\n  height: 40px;\n  box-sizing: border-box;\n  font-family: \"Panton Bold\";\n}\n.button-imitation {\n  cursor: default;\n}\nbutton:disabled {\n  opacity: 0.2;\n}\nbutton:disabled:hover {\n  cursor: default;\n}\nbutton:hover:not(:disabled) {\n  background-color: #007083;\n}\n\nbutton.cancel {\n  background-color: #ffffff;\n  color: #009CB6;\n  margin-top: 8px;\n}\nbutton.cancel:hover:not(:disabled) {\n  background-color: #e6e6e6;\n}\n\nbutton.locale-switch {\n  color: #009cb6;\n  background: none;\n  padding: 0;\n  margin-right: 5px;\n  width: auto;\n  display: inline;\n}\nbutton.locale-switch:hover {\n  color: #ffffff;\n  background: none;\n}\n\n.spinner {\n  margin: auto;\n  margin-top: 2px;\n  height: 16px;\n  width: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.0);\n  border-top-color: rgba(255, 255, 255, 0.8);\n  border-right-color: rgba(255, 255, 255, 0.8);\n  border-radius: 100%;\n  animation: rotation 1s infinite linear 0.25s;\n\n  /* the opacity is used to lazyload the spinner, see animation delay */\n  /* this avoid the spinner to be displayed when visible for a very short period of time */\n  opacity: 0;\n}\n\n@keyframes rotation {\n  from {\n    opacity: 1;\n    transform: rotate(0deg);\n  }\n  to {\n    opacity: 1;\n    transform: rotate(359deg);\n  }\n}\n\ninput {\n  padding: 0 10px;\n  height: 40px;\n  border: 1px solid #909b9e;\n  border-radius: 4px;\n}\n\ninput:focus{\n  outline: none;\n  border-color: #009cb6;\n}\n\ninput#username {\n  margin-bottom: 20px;\n}\n\ninput.error, input:focus.error {\n  border-color: #e95b53;\n}\n\ndiv#forms {\n  height: 100%;\n  overflow-y: overlay;\n}\n\nform, #buttons {\n  width: 260px;\n  margin: 0 auto;\n}\nform#login-form label {\n  margin-top: 20px;\n}\nform#roles-form label .name {\n  display: block;\n}\n\nform#roles-form label .ipi {\n  display: block;\n}\n\n#info-inner-box, #info-text-wrapper {\n  display: flex;\n  flex-flow: column;\n  height: 100%;\n}\n\n#info h1 {\n  margin: 0;\n  padding: 0;\n  line-height: 2.6rem;\n}\n.slogan {\n  font-size: 3.4rem;\n  line-height: 1rem;\n  text-transform: uppercase;\n}\n.slogan.thin {\n  font-family: \"Panton Light\";\n  font-weight: normal;\n}\n.slogan.bold {\n  font-family: \"Panton Black\";\n  font-weight: normal;\n}\n#info #info-text {\n  height: 100%;\n}\n#info #info-locale-switch a {\n  text-transform: uppercase;\n  font-family: \"Panton Bold\";\n  margin-right: 8px;\n}\n\n@media (max-width: 1000px) {\n  #vertical-aligner {\n    display: block;\n    background-position: center;\n    min-height: 580px;\n  }\n  #container {\n    display: flex;\n    flex-flow: column-reverse;\n    height: 100%;\n  }\n\n  #loader {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n  }\n\n  #main {\n    width: 100%;\n    padding: 43px 0px 20px 0px;\n    bottom: 0;\n  }\n\n  #container #main #forms #error, #container #main #forms #error.scroll {\n    padding: 0 20px;\n  }\n\n  #info {\n    display: flex;\n    background: none;\n    width: 100%;\n    height: 100%;\n    padding: 0px 10px 20px 10px;\n  }\n\n  #info-inner-box {\n    height: auto;\n    width: 260px;\n    margin: auto auto 0 auto;\n  }\n  #info-inner-box h1 {\n    line-height: 2rem;\n  }\n\n  #info-text-button {\n    width: 52px;\n    height: 52px;\n    border-radius: 28px;\n    position: absolute;\n    top: 22px;\n    right: 25px;\n    background-color: #009CB6;\n  }\n\n  #info-text-wrapper {\n    /* display: none; */\n    display: flex;\n    flex-flow: column;\n    position: absolute;\n    background-color: #ffffff;\n    height: auto;\n    top: 28px;\n    left: 0;\n    margin: 24px;\n    padding: 24px;\n    border-radius: 24px;\n    -webkit-box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    -moz-box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    box-shadow: 0px 10px 10px -4px rgba(0,0,0,0.46);\n    opacity: 0;\n    transition: all 0.4s ease-in, opacity 0.1s ease-out;\n    transform: scale(0);\n  }\n  #info-text-wrapper.show-in-mobile {\n    display: flex;\n    opacity: 1;\n    transform: scale(1);\n    transition: all 0.1s ease-out, opacity 0.2s ease-in;\n  }\n\n  #info-text-wrapper-overlap {\n    display: none;\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    background-color: rgba(34, 55, 61, 0.75);\n  }\n  #info-text-wrapper-overlap.show-in-mobile {\n    display: block;\n    opacity: 1;\n    transition: opacity 2s linear;\n  }\n\n  #info #info-text {\n    order: 2;\n    color: #000000;\n    height: auto;\n  }\n\n  .slogan {\n    font-size: 2.4rem;\n  }\n\n  button.locale-switch:hover {\n    color: #007083;\n  }\n}\n\ninput[type=\"radio\"] {\n    outline: none;\n}\ninput[type=\"radio\"]:checked + label:before {\n    /* border: 1px solid #d00; */\n    border-color: #009cb6 !important;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:checked,\n[type=\"radio\"]:not(:checked) {\n    position: absolute;\n    left: -9999px;\n}\n[type=\"radio\"]:checked + label,\n[type=\"radio\"]:not(:checked) + label\n{\n    position: relative;\n    padding-left: 28px;\n    cursor: pointer;\n    line-height: 20px;\n    display: inline-block;\n    color: #666;\n}\n[type=\"radio\"]:checked + label:before,\n[type=\"radio\"]:not(:checked) + label:before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 18px;\n    height: 18px;\n    border: 1px solid #ddd;\n    border-radius: 100%;\n    background: #fff;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:checked + label:after,\n[type=\"radio\"]:not(:checked) + label:after {\n    content: '';\n    width: 10px;\n    height: 10px;\n    background: #009cb6;\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    border-radius: 100%;\n    -webkit-transition: all 0.2s ease;\n    transition: all 0.2s ease;\n}\n[type=\"radio\"]:not(:checked) + label:after {\n    opacity: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n}\n[type=\"radio\"]:checked + label:after {\n    opacity: 1;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./background.jpg":
/*!************************!*\
  !*** ./background.jpg ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2a793e247b3548111a69d474e445d685.jpg";

/***/ }),

/***/ "./fonts/panton-black.ttf":
/*!********************************!*\
  !*** ./fonts/panton-black.ttf ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-black.ttf");

/***/ }),

/***/ "./fonts/panton-black.woff":
/*!*********************************!*\
  !*** ./fonts/panton-black.woff ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-black.woff");

/***/ }),

/***/ "./fonts/panton-black.woff2":
/*!**********************************!*\
  !*** ./fonts/panton-black.woff2 ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-black.woff2");

/***/ }),

/***/ "./fonts/panton-light.ttf":
/*!********************************!*\
  !*** ./fonts/panton-light.ttf ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-light.ttf");

/***/ }),

/***/ "./fonts/panton-light.woff":
/*!*********************************!*\
  !*** ./fonts/panton-light.woff ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-light.woff");

/***/ }),

/***/ "./fonts/panton-light.woff2":
/*!**********************************!*\
  !*** ./fonts/panton-light.woff2 ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-light.woff2");

/***/ }),

/***/ "./fonts/panton-normal.ttf":
/*!*********************************!*\
  !*** ./fonts/panton-normal.ttf ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-normal.ttf");

/***/ }),

/***/ "./fonts/panton-normal.woff":
/*!**********************************!*\
  !*** ./fonts/panton-normal.woff ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-normal.woff");

/***/ }),

/***/ "./fonts/panton-normal.woff2":
/*!***********************************!*\
  !*** ./fonts/panton-normal.woff2 ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fonts/panton-normal.woff2");

/***/ }),

/***/ "./main.html":
/*!*******************!*\
  !*** ./main.html ***!
  \*******************/
/***/ ((module) => {

module.exports = "<div id=\"main\" style=\"display:none\">\n  <div id=\"logo\"><span id=\"logo-text\" class=\"slogan bold\">Zyme-Caucus</span></div>\n  <div id=\"forms\">\n    <form id=\"login-form\" style=\"display: none;\">\n      <label id=\"username-label\" for=\"username\"></label>\n      <input id=\"username\" name=\"username\" type=\"text\" placeholder=\"\" tabindex=\"1\">\n\n      <label id=\"password-label\" for=\"password\"></label>\n      <input id=\"password\" name=\"password\" type=\"password\" placeholder=\"\" tabindex=\"2\">\n    </form>\n    <div id=\"error\" style=\"display:none\"></div>\n    <form id=\"roles-form\" style=\"display: none;\">\n      <input type=\"radio\" name=\"radio-group\" id=\"radio1\">\n      <label for=\"radio1\"><span class=\"name\">Option #1</span><span class=\"ipi\">12345678</span></label>\n      <input type=\"radio\" name=\"radio-group\" id=\"radio2\">\n      <label for=\"radio2\"><span class=\"name\">Option #2</span><span class=\"ipi\">192837465</span></label>\n      <input type=\"radio\" name=\"radio-group\" id=\"radio3\">\n      <label for=\"radio3\"><span class=\"name\">Option #3</span><span class=\"ipi\">735648291</span></label>\n    </form>\n  </div>\n  <div id=\"buttons\">\n    <button id=\"button-submit\" type=\"button\" value=\"\" class=\"submit\" disabled=\"disabled\"\n    style=\"display: none;\" data-phase=\"login\" tabindex=\"3\"></button>\n    <div id=\"button-submit-fake\" class=\"button-imitation\" style=\"display: block\"><div class=\"spinner\"></div></div>\n    <button id=\"button-cancel\" type=\"button\" tabindex=\"4\" class=\"cancel\" data-phase=\"back-to-caucus\"></button>\n  </div>\n</div>\n<div id=\"info\" style=\"display:none\">\n  <div id=\"info-inner-box\">\n    <h1><span id=\"slogan-thin\" class=\"slogan thin\">Rakkaudesta</span><br /><span id=\"slogan-bold\" class=\"slogan bold\">Musiikkiin</span></h1>\n    <div id=\"info-text-wrapper-overlap\"></div>\n    <div id=\"info-text-wrapper\">\n      <div id=\"info-text\"></div>\n      <div id=\"info-locale-switch\">\n        <button id=\"locale-switch-fi\" type=\"button\" data-locale=\"fi_FI\" class=\"locale-switch\">Fi</button>\n        <button id=\"locale-switch-en\" type=\"button\" data-locale=\"en_EN\" class=\"locale-switch\">En</button>\n        <button id=\"locale-switch-se\" type=\"button\" data-locale=\"sv_SE\" class=\"locale-switch\">Sve</button>\n      </div>\n    </div>\n    <div id=\"info-text-button\"></div>\n  </div>\n</div>\n";

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDcUI7QUFDYztBQUNNOztBQUV6Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4S0FBOEs7QUFDOUssR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsbURBQVE7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxnREFBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUVBOzs7O0FBSUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9hcGkuanMiLCJ3ZWJwYWNrOi8vY2xpZW50Ly4vYXBwLmpzIiwid2VicGFjazovL2NsaWVudC8uL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9jbGllbnQvLi9iYWNrZ3JvdW5kLmpwZyIsIndlYnBhY2s6Ly9jbGllbnQvLi9mb250cy9wYW50b24tYmxhY2sudHRmIiwid2VicGFjazovL2NsaWVudC8uL2ZvbnRzL3BhbnRvbi1ibGFjay53b2ZmIiwid2VicGFjazovL2NsaWVudC8uL2ZvbnRzL3BhbnRvbi1ibGFjay53b2ZmMiIsIndlYnBhY2s6Ly9jbGllbnQvLi9mb250cy9wYW50b24tbGlnaHQudHRmIiwid2VicGFjazovL2NsaWVudC8uL2ZvbnRzL3BhbnRvbi1saWdodC53b2ZmIiwid2VicGFjazovL2NsaWVudC8uL2ZvbnRzL3BhbnRvbi1saWdodC53b2ZmMiIsIndlYnBhY2s6Ly9jbGllbnQvLi9mb250cy9wYW50b24tbm9ybWFsLnR0ZiIsIndlYnBhY2s6Ly9jbGllbnQvLi9mb250cy9wYW50b24tbm9ybWFsLndvZmYiLCJ3ZWJwYWNrOi8vY2xpZW50Ly4vZm9udHMvcGFudG9uLW5vcm1hbC53b2ZmMiIsIndlYnBhY2s6Ly9jbGllbnQvLi9tYWluLmh0bWwiLCJ3ZWJwYWNrOi8vY2xpZW50Ly4vc3R5bGUuY3NzP2Y2OTYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBpID0gZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGFwaShtZXRob2QsIHBhdGgsIGJvZHksIHRva2VuLCBzdWNjZXNzLCBmYWlsdXJlKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKG1ldGhvZCwgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi9hcGkvXCIgKyBwYXRoLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgIGlmICh0b2tlbiAhPSB1bmRlZmluZWQgJiYgdHlwZW9mIHRva2VuID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIHRva2VuKTtcbiAgICB9XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICBzdWNjZXNzKHhoci5yZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZmFpbHVyZSAhPSBudWxsKSB7XG4gICAgICAgICAgZmFpbHVyZSh4aHIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChtZXRob2QgPT0gXCJQT1NUXCIgJiYgYm9keSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgfVxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGJvZHkpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXBpR2V0OiAocGF0aCwgdG9rZW4sIHN1Y2Nlc3MsIGZhaWx1cmUpID0+IHtcbiAgICAgIGFwaShcIkdFVFwiLCBwYXRoLCBudWxsLCB0b2tlbiwgc3VjY2VzcywgZmFpbHVyZSk7XG4gICAgfSxcbiAgICBhcGlQb3N0OiAocGF0aCwgYm9keSwgdG9rZW4sIHN1Y2Nlc3MsIGZhaWx1cmUpID0+IHtcbiAgICAgIGFwaShcIlBPU1RcIiwgcGF0aCwgYm9keSwgdG9rZW4sIHN1Y2Nlc3MsIGZhaWx1cmUpO1xuICAgIH1cbiAgfVxufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFwaTtcbiIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IG1haW5IdG1sIGZyb20gJy4vbWFpbi5odG1sJztcbmltcG9ydCB7YXBpUG9zdCwgYXBpR2V0fSBmcm9tICcuL2FwaS5qcyc7XG5cbmZ1bmN0aW9uIGhpZGUoZWxlbWVudCkgeyBzaG93KGVsZW1lbnQsIGZhbHNlKTsgfVxuZnVuY3Rpb24gc2hvdyhlbGVtZW50LCBtYWtlVmlzaWJsZSkge1xuICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAobWFrZVZpc2libGUgIT09IGZhbHNlKSA/IG51bGwgOiBcIm5vbmVcIjtcbn1cbmZ1bmN0aW9uIGRpc2FibGUoZWxlbWVudCkgeyBlbmFibGUoZWxlbWVudCwgZmFsc2UpOyB9XG5mdW5jdGlvbiBlbmFibGUoZWxlbWVudCwgbWFrZUVuYWJsZWQpIHtcbiAgaWYobWFrZUVuYWJsZWQgIT09IGZhbHNlKSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gIH1cbn1cblxuY29uc3QgaTE4bkV4dGVuc2lvbiA9IHtcbiAgXCJzbG9nYW4tdGhpblwiOiB7XG4gICAgZmlfRkk6IFwiUmFra2F1ZGVzdGFcIixcbiAgICBzdl9TRTogXCJBViBLw4RSTEVLXCIsXG4gICAgZW5fRU46IFwiRk9SIFRIRSBMT1ZFXCJcbiAgfSxcbiAgXCJzbG9nYW4tYm9sZFwiOiB7XG4gICAgZmlfRkk6IFwiTXVzaWlra2lpblwiLFxuICAgIHN2X1NFOiBcIlRJTEwgTVVTSUtFTlwiLFxuICAgIGVuX0VOOiBcIk9GIE1VU0lDXCJcbiAgfSxcbiAgdXNlcm5hbWU6IHtcbiAgICBmaV9GSTogXCJLw6R5dHTDpGrDpHR1bm51c1wiLFxuICAgIHN2X1NFOiBcIkFudsOkbmRhcm5hbW5cIixcbiAgICBlbl9FTjogXCJVc2VybmFtZVwiXG4gIH0sXG4gIHBhc3N3b3JkOiB7XG4gICAgZmlfRkk6IFwiU2FsYXNhbmFcIixcbiAgICBzdl9TRTogXCJMw7ZzZW5vcmRcIixcbiAgICBlbl9FTjogXCJQYXNzd29yZFwiXG4gIH0sXG4gIFwiYnV0dG9uLWxvZ2luXCI6IHtcbiAgICBmaV9GSTogXCJLaXJqYXVkdSBzaXPDpMOkblwiLFxuICAgIHN2X1NFOiBcIkxvZ2dhIGluXCIsXG4gICAgZW5fRU46IFwiTG9nIGluXCJcbiAgfSxcbiAgXCJidXR0b24tbG9naW4tYWdhaW5cIjoge1xuICAgIGZpX0ZJOiBcIktpcmphdWR1IHV1ZGVsbGVlblwiLFxuICAgIHN2X1NFOiBcIkxvZ2dhIGluIHDDpSBueXR0XCIsXG4gICAgZW5fRU46IFwiTG9nIGluIGFnYWluXCJcbiAgfSxcbiAgXCJidXR0b24tbGlua1wiOiB7XG4gICAgZmlfRkk6IFwiTMOkaGV0w6RcIixcbiAgICBzdl9TRTogXCJTw6RuZFwiLFxuICAgIGVuX0VOOiBcIlNlbmRcIlxuICB9LFxuICBcImJ1dHRvbi10cnktYWdhaW5cIjoge1xuICAgIGZpX0ZJOiBcIllyaXTDpCB1dWRlbGxlZW5cIixcbiAgICBzdl9TRTogXCJGw7Zyc8O2ayBww6Ugbnl0dFwiLFxuICAgIGVuX0VOOiBcIlRyeSBhZ2FpblwiXG4gIH0sXG4gIFwiYnV0dG9uLWJhY2stdG8tY2F1Y3VzXCI6IHtcbiAgICBmaV9GSTogXCJUYWthaXNpbiBDYXVjdXNpaW5cIixcbiAgICBzdl9TRTogXCJUaWxsYmFrYSB0aWxsIENhdWN1c1wiLFxuICAgIGVuX0VOOiBcIkJhY2sgdG8gQ2F1Y3VzXCJcbiAgfSxcbiAgXCJidXR0b24tY2FuY2VsXCI6IHtcbiAgICBmaV9GSTogXCJQZXJ1dXRhXCIsXG4gICAgc3ZfU0U6IFwiw4VuZ3JhXCIsXG4gICAgZW5fRU46IFwiQ2FuY2VsXCJcbiAgfSxcbiAgaW5mbzoge1xuICAgIGZpX0ZJOiBcIjxwPk9ISkU6IEtpcmphdWR1IHR1bm5pc3RhdXR1bWlzcGFsdmVsdXVuIFp5bWVuIHZlcmtrb3BhbHZlbHVuIGvDpHl0dMOkasOkdHVubnVrc2lsbGEuPC9wPlwiICtcblwiPHA+SFVPTSEgVHVubmlzdGF1dHVhIHZvaXZhdCB2YWluIGhlbmtpbMO2dCwgZWl2w6R0IHlyaXR5a3NldCB0YWkgeWh0eWVldC4gSm9zIHNpbnVsbGEgb24gbXnDtnMga3VzdGFudGFqYW4gdGFpIGVzaWludHlqw6RuIGvDpHl0dMOkasOkdHVubnVrc2V0LCDDpGzDpCBrw6R5dMOkIG5paXTDpCwgdmFhbiBraXJqYXVkdSBwYWx2ZWx1dW4gdGVraWrDpC1hc2lha2thYW4ga8OkeXR0w6Rqw6R0dW5udWtzaWxsYS48L3A+XCIsXG4gICAgc3ZfU0U6IFwiPHA+QU5WSVNOSU5HOiBMb2dnYSBpbiBww6UgYXV0ZW50aXNlcmluZ3N0asOkbnN0ZW4gbWVkIGFudsOkbmRhcm5hbW5ldCBmw7ZyIFp5bWVzIHdlYmJ0asOkbnN0LjwvcD5cIiArXG5cIjxwPk9CUyEgQXV0ZW50aXNlcmluZyBrYW4gZW5kYXN0IGfDtnJhcyBmw7ZyIHBlcnNvbmVyLCBpbnRlIGbDtnIgZsO2cmV0YWcgb2NoIG11c2lrZ3J1cHBlci4gT20gZHUgw6R2ZW4gaGFyIGFudsOkbmRhcm5hbW4gc29tIGbDtnJsw6RnZ2FyZSBlbGxlciBhcnRpc3QsIGFudsOkbmQgaW50ZSBkZW0sIHV0YW4gbG9nZ2EgaW4gcMOlIHRqw6Ruc3RlbiBtZWQgYW52w6RuZGFybmFtbmV0IGR1IGhhciBzb20gdXBwaG92c21hbm5ha3VuZC48L3A+XCIsXG4gICAgZW5fRU46IFwiPHA+SEVMUDogTG9nIGluIHRvIHRoZSBpZGVudGlmaWNhdGlvbiBzZXJ2aWNlIHVzaW5nIHlvdXIgWnltZSB3ZWIgc2VydmljZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuPC9wPlwiICtcblwiPHA+Tk9URTogSWRlbnRpZmljYXRpb24gaXMgb25seSBhdmFpbGFibGUgZm9yIGluZGl2aWR1YWxzLCBub3QgZm9yIGJ1c2luZXNzZXMgb3IgZ3JvdXBzLiBJZiB5b3UgYWxzbyBoYXZlIHRoZSB1c2VyIGNyZWRlbnRpYWxzIG9mIGEgcHVibGlzaGVyIG9yIGFuIGFydGlzdCwgZG8gbm90IHVzZSB0aGVtOyBpbnN0ZWFkLCBsb2cgaW4gdG8gdGhlIHN5c3RlbSB1c2luZyB5b3VyIG1lbWJlciB1c2VybmFtZSBhbmQgcGFzc3dvcmQuPC9wPlwiXG4gIH0sXG4gIFwiZXJyb3ItaW5pdGlhdGVcIjoge1xuICAgIGZpX0ZJOiBcIllodGV5ZGVzc8OkIGlsbWVuaSBvbmdlbG1pYS4gSGFsdWF0a28geXJpdHTDpMOkIHV1ZGVsbGVlbj9cIixcbiAgICBzdl9TRTogXCJBbnNsdXRuaW5nZW4gbWlzc2x5Y2thZGVzLiBWaWxsIGR1IGbDtnJzw7ZrYSBww6Ugbnl0dD9cIixcbiAgICBlbl9FTjogXCJDb25uZWN0aW9uIHVuc3VjY2Vzc2Z1bC4gRG8geW91IHdhbnQgdG8gdHJ5IGFnYWluP1wiXG4gIH0sXG4gIFwiZXJyb3ItbG9naW5cIjoge1xuICAgIGZpX0ZJOiBcIlZpcmhlZWxsaW5lbiBrw6R5dHTDpGrDpHR1bm51cyB0YWkgc2FsYXNhbmFcIixcbiAgICBzdl9TRTogXCJGZWxha3RpZ3QgYW52w6RuZGFybmFtbiBlbGxlciBsw7ZzZW5vcmRcIixcbiAgICBlbl9FTjogXCJJbmNvcnJlY3QgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIlxuICB9LFxuICBcImVycm9yLWxpbmtpbmdcIjoge1xuICAgIGZpX0ZJOiBcIkxpbmtpdHlzIGVpIG9ubmlzdHVudXQuIEhhbHVhdGtvIHlyaXR0w6TDpCB1dWRlbGxlZW4/XCIsXG4gICAgc3ZfU0U6IFwiTMOkbmtuaW5nZW4gbWlzc2x5Y2thZGVzLiBWaWxsIGR1IGbDtnJzw7ZrYSBww6Ugbnl0dD9cIixcbiAgICBlbl9FTjogXCJMaW5raW5nIHVuc3VjY2Vzc2Z1bC4gRG8geW91IHdhbnQgdG8gdHJ5IGFnYWluP1wiXG4gIH0sXG4gIFwiZXJyb3Itcm9sZXNcIjoge1xuICAgIGZpX0ZJOiBcIlZhbGl0c2Ugcm9vbGkgam9ua2EgaGFsdWF0IGxpbmtpdHTDpMOkIENhdWN1c2lpblwiLFxuICAgIHN2X1NFOiBcIlbDpGxqIGRlbiByb2xsIHNvbSBkdSB2aWxsIGzDpG5rYSB0aWxsIENhdWN1c1wiLFxuICAgIGVuX0VOOiBcIlNlbGVjdCB0aGUgcm9sZSB5b3Ugd2lzaCB0byBsaW5rIHRvIENhdWN1c1wiXG4gIH0sXG4gIFwiZXJyb3Itbm8tcm9sZXNcIjoge1xuICAgIGZpX0ZJOiBcIjxwPlRpZXRva2FubmFzdGFtbWUgZWkgbMO2eWR5IHJvb2xpYSwgam9ua2Egdm9pIGxpbmtpdHTDpMOkIENhdWN1c2lpbi4gT2xldGhhbiBaeW1lbiB0ZWtpasOkYXNpYWthcz88L3A+XCIgK1xuXCI8cD5LaXJqYXVkdSB0ZWtpasOkbiBrw6R5dHTDpGrDpHR1bm51a3NpbGxhIHRhaSBzaWlycnkgdGFrYWlzaW4gQ2F1Y3VzaWluLjwvcD5cIiArXG5cIjxwPkNhdWN1c2lpbiB2b2l2YXQgcmVraXN0ZXLDtml0ecOkIGFpbm9hc3RhYW4gWnltZW4gdGVraWrDpGFzaWFra2Fpa3NpIGxpaXR0eW5lZXQgaGVua2lsw7Z0IGVsaSBzw6R2ZWx0w6Rqw6R0LCBzYW5vaXR0YWphdCBqYSBzb3ZpdHRhamF0ICh0dW90dGFqYXQpLiBLdXN0YW50YWphdCB0YWkgZXNpaW50eWrDpHQgKG9ya2VzdGVyaXQpIGVpdsOkdCB2b2kga2lyamF1dHVhIENhdWN1c2lpbi48L3A+XCIgK1xuXCI8cD5LaXJqYXVkdSB0dW5uaXN0YXV0dW1pc3BhbHZlbHV1biB0ZWtpasOkbiB2ZXJra29wYWx2ZWx1dHVubnVrc2lsbGEuICBLaXJqYXVkdXR0dWFzaSBuw6RldCBrYWlra2kgdm9pbWFzc2Egb2xldmF0IHJvb2xpc2ksIG15w7ZzIG1haGRvbGxpc2V0IHBzZXVkb255eW1pdCwgam9zIGhhbHVhdCBrw6R5dHTDpMOkIG5paXTDpC48L3A+XCIsXG4gICAgc3ZfU0U6IFwiPHA+SSB2w6VyIGRhdGFiYXMgZmlubnMgaW5nZW4gcm9sbCBzb20ga2FuIGzDpG5rYXMgdGlsbCBDYXVjdXMuIER1IMOkciB2w6RsIHVwcGhvdnNtYW5uYWt1bmQgaG9zIFp5bWU/PC9wPlwiICtcblwiPHA+TG9nZ2EgaW4gbWVkIGFudsOkbmRhcm5hbW5ldCBmw7ZyIHVwcGhvdnNtYW4gZWxsZXIgZ8OlIHRpbGxiYWthIHRpbGwgQ2F1Y3VzLjwvcD5cIiArXG5cIjxwPkkgQ2F1Y3VzIGthbiBlbmRhc3QgcGVyc29uZXIgc29tIGFuc2x1dGl0IHNpZyBzb20gdXBwaG92c21hbm5ha3VuZGVyIGhvcyBaeW1lIHJlZ2lzdHJlcmEgc2lnLCBkdnMuIGtvbXBvc2l0w7ZyZXIsIHRleHRmw7ZyZmF0dGFyZSBvY2ggYXJyYW5nw7ZyZXIgKHByb2R1Y2VudGVyKS4gRsO2cmzDpGdnYXJlIG9jaCBhcnRpc3RlciAob3JrZXN0cmFyKSBrYW4gaW50ZSBsb2dnYSBpbiBpIENhdWN1cy4gPC9wPlwiICtcblwiPHA+TG9nZ2EgaW4gaSBhdXRlbnRpc2VyaW5nc3Rqw6Ruc3RlbiBtZWQgdXBwaG92c21hbm5lbnMgd2ViYnRqw6Ruc3Rrb2Rlci4gIE7DpHIgZHUgbG9nZ2F0IGluIHNlciBkdSBhbGxhIGRpbmEgYWt0dWVsbGEgcm9sbGVyLCDDpHZlbiBldmVudHVlbGxhIHBzZXVkb255bWVyLCBpZmFsbCBkdSB2aWxsIGFudsOkbmRhIGRlbS48L3A+XCIsXG4gICAgZW5fRU46IFwiT3VyIGRhdGFiYXNlIGRvZXMgbm90IGNvbnRhaW4gYSByb2xlIHRoYXQgY2FuIGJlIGxpbmtlZCB0byBDYXVjdXMuIFRoaXMgc2VydmljZSBpcyBvbmx5IGF2YWlsYWJsZSB0byBaeW1l4oCZcyBtZW1iZXJzLjwvcD5cIiArXG5cIjxwPlBsZWFzZSBsb2cgaW4gdXNpbmcgeW91ciBtZW1iZXLigJlzIHVzZXIgY3JlZGVudGlhbHMgb3IgZ28gYmFjayB0byBDYXVjdXMuPC9wPlwiICtcblwiPHA+T25seSB0aGUgaW5kaXZpZHVhbHMgcmVnaXN0ZXJlZCBhcyBaeW1l4oCZcyBtZW1iZXJzLCBpbiBvdGhlciB3b3JkcywgY29tcG9zZXJzLCBseXJpY2lzdHMgYW5kIGFycmFuZ2VycyAocHJvZHVjZXJzKSwgY2FuIHNpZ24gdXAgdG8gQ2F1Y3VzLiBQdWJsaXNoZXJzIG9yIGFydGlzdHMgKGdyb3VwcykgbWF5IG5vdCBsb2cgaW4gdG8gQ2F1Y3VzLjwvcD5cIiArXG5cIjxwPkxvZyBpbiB0byB0aGUgaWRlbnRpZmljYXRpb24gc2VydmljZSB1c2luZyB5b3VyIG1lbWJlcuKAmXMgb25saW5lIGJhbmtpbmcgc2VydmljZSBjcmVkZW50aWFscy4gIEFmdGVyIGxvZ2dpbmcgaW4sIHlvdSBjYW4gc2VlIGFsbCB5b3VyIHZhbGlkIHJvbGVzLCBpbmNsdWRpbmcgYW55IHBzZXVkb255bXMsIGlmIHlvdSB3aXNoIHRvIHVzZSB0aGVtLjwvcD5cIlxuICB9LFxuICAvLyBOb3RlLCBpbiBmYWN0IHRoaXMgaXMgbm90IGFuIGVycm9yIDopXG4gIFwiZXJyb3Itc3VjY2Vzc1wiOiB7XG4gICAgZmlfRkk6IFwiPHA+TGlua2l0eXMgb25uaXN0dWkhPC9wPlwiICtcblwiPHA+U2lpcnJ5dMOkw6RuIHRha2Fpc2luIENhdWN1c2lpbjwvcD5cIixcbiAgICBzdl9TRTogXCI8cD5Mw6Rua25pbmdlbiBseWNrYWRlcyE8L3A+XCIgK1xuICAgIFwiPHA+RHUgw7Z2ZXJmw7ZycyB0aWxsYmFrYSB0aWxsIENhdWN1czwvcD5cIixcbiAgICBlbl9FTjogXCI8cD5MaW5raW5nIHN1Y2Nlc3NmdWwhPC9wPlwiICtcbiAgICBcIjxwPkdvaW5nIGJhY2sgdG8gQ2F1Y3VzPC9wPlwiLFxuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVBcHBsaWNhdGlvbihpMThuKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xuICBjb250YWluZXIuaW5uZXJIVE1MICs9IG1haW5IdG1sO1xuXG4gIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIGNvbnN0IGxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGVyXCIpO1xuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpO1xuICBjb25zdCBzbG9nYW5UaGluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzbG9nYW4tdGhpblwiKTtcbiAgY29uc3Qgc2xvZ2FuQm9sZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2xvZ2FuLWJvbGRcIik7XG4gIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLXN1Ym1pdFwiKTtcbiAgY29uc3Qgc3VibWl0QnV0dG9uRmFrZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLXN1Ym1pdC1mYWtlXCIpO1xuICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvbi1jYW5jZWxcIik7XG4gIGNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcbiAgY29uc3Qgcm9sZXNGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb2xlcy1mb3JtXCIpO1xuICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIik7XG4gIGNvbnN0IHVzZXJuYW1lTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJuYW1lLWxhYmVsXCIpO1xuICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIik7XG4gIGNvbnN0IHBhc3N3b3JkTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkLWxhYmVsXCIpO1xuICBjb25zdCBpbmZvVGV4dFdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tdGV4dC13cmFwcGVyXCIpO1xuICBjb25zdCBpbmZvVGV4dFdyYXBwZXJPdmVybGFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvLXRleHQtd3JhcHBlci1vdmVybGFwXCIpO1xuICBjb25zdCBpbmZvVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby10ZXh0XCIpO1xuICBjb25zdCBpbmZvVGV4dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby10ZXh0LWJ1dHRvblwiKTtcbiAgY29uc3QgZXJyb3JCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yXCIpO1xuICBjb25zdCBsb2NhbGVTd2l0Y2hGaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYWxlLXN3aXRjaC1maVwiKSxcbiAgICAgICAgbG9jYWxlU3dpdGNoRW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2FsZS1zd2l0Y2gtZW5cIiksXG4gICAgICAgIGxvY2FsZVN3aXRjaFNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhbGUtc3dpdGNoLXNlXCIpO1xuICBsb2NhbGVTd2l0Y2hGaS5vbmNsaWNrID0gbG9jYWxlU3dpdGNoRW4ub25jbGljayA9IGxvY2FsZVN3aXRjaFNlLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbG9jYWxlID0gdGhpcy5kYXRhc2V0Wydsb2NhbGUnXTtcbiAgICBpMThuLnNldExvY2FsZShsb2NhbGUpO1xuICB9XG4gIGxldCBjYXVjdXNUb2tlbiwgenltZVRva2VuLCBsaW5rcztcblxuICBpbmZvVGV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0luZm9Qb3B1cCk7XG4gIGluZm9UZXh0V3JhcHBlck92ZXJsYXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dJbmZvUG9wdXApO1xuICBmdW5jdGlvbiBzaG93SW5mb1BvcHVwKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBcInNob3ctaW4tbW9iaWxlXCI7XG4gICAgaWYgKGluZm9UZXh0V3JhcHBlci5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgaW5mb1RleHRXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIGluZm9UZXh0V3JhcHBlck92ZXJsYXAuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvVGV4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgaW5mb1RleHRXcmFwcGVyT3ZlcmxhcC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVkaXJlY3RUbyh1cmwpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh1cmwpO1xuICB9XG5cbiAgaTE4bi5hcHBlbmQoaTE4bkV4dGVuc2lvbik7XG4gIGZ1bmN0aW9uIHNldFRleHQoZWxlbWVudCwgdGV4dElkKSB7XG4gICAgZWxlbWVudC5pbm5lclRleHQgPSBpMThuLmdldCh0ZXh0SWQpO1xuICB9O1xuICBmdW5jdGlvbiBzZXRIVE1MKGVsZW1lbnQsIHRleHRJZCkge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gaTE4bi5nZXQodGV4dElkKTtcbiAgfTtcbiAgZnVuY3Rpb24gdXBkYXRlVGV4dHMoZXZlbnQpIHtcbiAgICBzZXRUZXh0KHNsb2dhblRoaW4sIFwic2xvZ2FuLXRoaW5cIik7XG4gICAgc2V0VGV4dChzbG9nYW5Cb2xkLCBcInNsb2dhbi1ib2xkXCIpO1xuICAgIHNldFRleHQodXNlcm5hbWVMYWJlbCwgXCJ1c2VybmFtZVwiKTtcbiAgICBzZXRUZXh0KHBhc3N3b3JkTGFiZWwsIFwicGFzc3dvcmRcIik7XG4gICAgdXBkYXRlU3VibWl0QnV0dG9uTGFiZWwoKTtcbiAgICB1cGRhdGVDYW5jZWxCdXR0b25MYWJlbCgpO1xuICAgIHVwZGF0ZUVycm9yTWVzc2FnZSgpO1xuICAgIHNldEhUTUwoaW5mb1RleHQsIFwiaW5mb1wiKTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChwaGFzZSkgeyB1cGRhdGVCdXR0b25MYWJlbChzdWJtaXRCdXR0b24sIHBoYXNlKTsgfVxuICBmdW5jdGlvbiB1cGRhdGVDYW5jZWxCdXR0b25MYWJlbChwaGFzZSkgeyB1cGRhdGVCdXR0b25MYWJlbChjYW5jZWxCdXR0b24sIHBoYXNlKTsgfVxuICBmdW5jdGlvbiB1cGRhdGVCdXR0b25MYWJlbChidXR0b24sIHBoYXNlKSB7XG4gICAgcGhhc2UgPSBwaGFzZSA/IChidXR0b24uZGF0YXNldFtcInBoYXNlXCJdID0gcGhhc2UpIDogYnV0dG9uLmRhdGFzZXRbXCJwaGFzZVwiXTtcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gaTE4bi5nZXQoXCJidXR0b24tXCIgKyBwaGFzZSk7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlRXJyb3JNZXNzYWdlKCkge1xuICAgIGNvbnN0IGVycm9yVHlwZSA9IGVycm9yQm94LmRhdGFzZXRbJ3R5cGUnXTtcbiAgICBlcnJvckJveC5pbm5lckhUTUwgPSBlcnJvclR5cGUgPyBpMThuLmdldChcImVycm9yLVwiICsgZXJyb3JUeXBlKSA6IGVycm9yQm94LmlubmVySFRNTCA9IG51bGw7XG4gIH1cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2NhbGUtY2hhbmdlXCIsIHVwZGF0ZVRleHRzKTtcbiAgdXBkYXRlVGV4dHMoKTtcblxuICBmdW5jdGlvbiBzZXRCdXR0b25MaXN0ZW5lcihidXR0b24sIGxpc3RlbmVyKSB7XG4gICAgaWYgKGxpc3RlbmVyICYmICh0eXBlb2YgbGlzdGVuZXIpID09IFwic3RyaW5nXCIpIHtcbiAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4geyByZWRpcmVjdFRvKGxpc3RlbmVyKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24ub25jbGljayA9IGxpc3RlbmVyO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dFcnJvcihlcnJvclR5cGUsIGVycm9yQ2xhc3MpIHtcbiAgICBlcnJvckJveC5jbGFzc05hbWUgPSBlcnJvckNsYXNzO1xuICAgIHNldEVycm9yKGVycm9yVHlwZSwgZXJyb3JCb3gpO1xuICAgIHNob3coZXJyb3JCb3gpO1xuICAgIHNob3cobWFpbkNvbnRhaW5lcik7XG4gICAgc2hvdyhpbmZvQ29udGFpbmVyKTtcbiAgICBoaWRlKGxvYWRlcik7XG4gIH1cbiAgZnVuY3Rpb24gc2V0RXJyb3IoZXJyb3JUeXBlKSB7XG4gICAgZXJyb3JCb3guZGF0YXNldFsndHlwZSddID0gZXJyb3JUeXBlO1xuICAgIHVwZGF0ZUVycm9yTWVzc2FnZSgpO1xuICAgIGlmICghZXJyb3JUeXBlKSB7IGhpZGUoZXJyb3JCb3gpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0aWF0ZSgpIHtcbiAgICBpZiAodXJsUGFyYW1zLmhhcygnbm9uY2UnKSAmJiB1cmxQYXJhbXMuaGFzKCdjYWxsYmFja1VybCcpKSB7XG4gICAgICBhcGlQb3N0KFwiaW5pdGlhdGVcIiwgZ2V0SW5pdGlhdGVDYWxsUGF5bG9hZCgpLCBudWxsLFxuICAgICAgICAoaW5pdGlhdGVSZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGlmIChpbml0aWF0ZVJlc3BvbnNlLnN1Y2Nlc3MhPT10cnVlIHx8IGluaXRpYXRlUmVzcG9uc2UuY2F1Y3VzVG9rZW49PW51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVJbml0aWF0ZUVycm9yUmVzcG9uc2UoaW5pdGlhdGVSZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdWN1c1Rva2VuID0gaW5pdGlhdGVSZXNwb25zZS5jYXVjdXNUb2tlbjtcbiAgICAgICAgICBsaW5rcyA9IGluaXRpYXRlUmVzcG9uc2UubGlua3M7XG4gICAgICAgICAgc2hvd0xvZ2luRm9ybSgpO1xuICAgICAgICAgIGhpZGUobG9hZGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgKHhocikgPT4ge1xuICAgICAgICAgIGhhbmRsZUluaXRpYXRlRXJyb3JSZXNwb25zZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBnZXRJbml0aWF0ZUNhbGxQYXlsb2FkKCkge1xuICAgIHJldHVybiB7XG4gICAgICBub25jZTogdXJsUGFyYW1zLmdldChcIm5vbmNlXCIpLFxuICAgICAgbGlua3M6e2NhbGxiYWNrVXJsOntocmVmOnVybFBhcmFtcy5nZXQoJ2NhbGxiYWNrVXJsJyl9fVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlSW5pdGlhdGVFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmxpbmtzICYmIHJlc3BvbnNlLmxpbmtzLmVycm9yICYmIHJlc3BvbnNlLmxpbmtzLmVycm9yLnNjb3BlID09IFwicmVkaXJlY3RcIikge1xuICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHJlc3BvbnNlLmxpbmtzLmVycm9yLmhyZWYpO1xuICAgIH1cbiAgICBjb25zdCBsaW5rID0gKHJlc3BvbnNlICYmIHJlc3BvbnNlLmxpbmtzKSA/IChyZXNwb25zZS5saW5rcy5lcnJvciB8fCByZXNwb25zZS5saW5rcy5jYW5jZWwpIDogbnVsbDtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihjYW5jZWxCdXR0b24sIGxpbmsgPyBsaW5rLmhyZWYgOiB3aW5kb3cuaGlzdG9yeS5iYWNrKTtcbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgICBlbmFibGUoc3VibWl0QnV0dG9uKTtcbiAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcInRyeS1hZ2FpblwiKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIGluaXRpYXRlQWdhaW4pO1xuICAgIHNob3dFcnJvcihcImluaXRpYXRlXCIpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRpYXRlQWdhaW4oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhpZGUoc3VibWl0QnV0dG9uKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIG51bGwpO1xuICAgIHNob3coc3VibWl0QnV0dG9uRmFrZSk7XG4gICAgaW5pdGlhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dMb2dpbkZvcm0oKSB7XG4gICAgc2V0RXJyb3IoKTtcbiAgICBzaG93KGxvZ2luRm9ybSk7XG4gICAgc2hvdyhtYWluQ29udGFpbmVyKTtcbiAgICBzaG93KGluZm9Db250YWluZXIpO1xuICAgIHVzZXJuYW1lLnJlYWRPbmx5ID0gcGFzc3dvcmQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICB1c2VybmFtZS52YWx1ZSA9IHBhc3N3b3JkLnZhbHVlID0gbnVsbDtcbiAgICBzZXRMb2dpbkZvcm1MaXN0ZW5lcnMoKTtcbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNldEJ1dHRvbkxpc3RlbmVyKHN1Ym1pdEJ1dHRvbiwgYXV0aGVudGljYXRlKTtcbiAgICBkaXNhYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgc2hvdyhzdWJtaXRCdXR0b24pO1xuICAgIHVwZGF0ZVN1Ym1pdEJ1dHRvbkxhYmVsKFwibG9naW5cIik7XG5cbiAgICB1cGRhdGVDYW5jZWxCdXR0b25MYWJlbChcImJhY2stdG8tY2F1Y3VzXCIpO1xuICAgIC8vIEF0IHRoaXMgbW9tZW50IHZhcmlhYmxlICdsaW5rcycgbXVzdCBiZSBpbml0YWxpemVkIHdpdGggbGlua3Mgb2JqZWN0ZWQgZmV0Y2hlZCB2aWEgJ2luaXRpYXRlJyBjYWxsXG4gICAgaWYgKGxpbmtzICYmIGxpbmtzLmNhbmNlbCAmJiBsaW5rcy5jYW5jZWwuaHJlZikge1xuICAgICAgc2V0QnV0dG9uTGlzdGVuZXIoY2FuY2VsQnV0dG9uLCBsaW5rcy5jYW5jZWwuaHJlZik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHNldExvZ2luRm9ybUxpc3RlbmVycygpIHtcbiAgICBjb25zdCBvcmlnaW5hbFVzZXJuYW1lID0gdXNlcm5hbWUudmFsdWU7XG4gICAgY29uc3Qgb3JpZ2luYWxQYXNzd29yZCA9IHBhc3N3b3JkLnZhbHVlO1xuICAgIHVzZXJuYW1lLm9ua2V5dXAgPSBwYXNzd29yZC5vbmtleXVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICgodGhpcyA9PSB1c2VybmFtZSAmJiB0aGlzLnZhbHVlICE9IG9yaWdpbmFsVXNlcm5hbWUpIHx8XG4gICAgICAgICAgKHRoaXMgPT0gcGFzc3dvcmQgJiYgdGhpcy52YWx1ZSAhPSBvcmlnaW5hbFBhc3N3b3JkKSkge1xuICAgICAgICB1c2VybmFtZS5jbGFzc05hbWUgPSBwYXNzd29yZC5jbGFzc05hbWUgPSBudWxsO1xuICAgICAgICBzZXRFcnJvcigpO1xuICAgICAgfVxuICAgICAgaWYgKHVzZXJuYW1lLnZhbHVlICYmIHBhc3N3b3JkLnZhbHVlICYmIHVzZXJuYW1lLmNsYXNzTmFtZSAhPSBcImVycm9yXCIgJiYgcGFzc3dvcmQuY2xhc3NOYW1lICE9IFwiZXJyb3JcIikge1xuICAgICAgICBlbmFibGUoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGU9PTEzICYmIHRoaXM9PXBhc3N3b3JkKSB7XG4gICAgICAgICAgYXV0aGVudGljYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc2FibGUoc3VibWl0QnV0dG9uKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gYXV0aGVudGljYXRlKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cbiAgICBkaXNhYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgaGlkZShzdWJtaXRCdXR0b24pO1xuICAgIHNob3coc3VibWl0QnV0dG9uRmFrZSk7XG4gICAgdXNlcm5hbWUucmVhZE9ubHkgPSBwYXNzd29yZC5yZWFkT25seSA9IHRydWU7XG4gICAgdXNlcm5hbWUub25rZXl1cCA9IHBhc3N3b3JkLm9ua2V5dXAgPSBudWxsO1xuXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEobG9naW5Gb3JtKTtcbiAgICBjb25zdCBkYXRhID0ge3VzZXJuYW1lOmZvcm1EYXRhLmdldChcInVzZXJuYW1lXCIpLCBwYXNzd29yZDpmb3JtRGF0YS5nZXQoXCJwYXNzd29yZFwiKX07XG5cbiAgICBhcGlQb3N0KFwiYXV0aFwiLCBkYXRhLCBudWxsLFxuICAgICAgKGF1dGhSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAoYXV0aFJlc3BvbnNlLnN1Y2Nlc3MhPT10cnVlIHx8IGF1dGhSZXNwb25zZS5jdXN0b21lcnM9PW51bGwgfHwgYXV0aFJlc3BvbnNlLmN1c3RvbWVycy5sZW5ndGg9PTApIHtcbiAgICAgICAgICByZXR1cm4gaGFuZGxlQXV0aGVudGljYXRlRXJyb3JSZXNwb25zZShhdXRoUmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgenltZVRva2VuID0gYXV0aFJlc3BvbnNlLnp5bWVUb2tlbjtcblxuICAgICAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIHZlcmlmeSk7XG4gICAgICAgIGhpZGUoc3VibWl0QnV0dG9uRmFrZSk7XG4gICAgICAgIGRpc2FibGUoc3VibWl0QnV0dG9uKTtcbiAgICAgICAgc2hvdyhzdWJtaXRCdXR0b24pO1xuICAgICAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcImxpbmtcIik7XG4gICAgICAgIHVwZGF0ZUNhbmNlbEJ1dHRvbkxhYmVsKFwiY2FuY2VsXCIpO1xuICAgICAgICBzZXRCdXR0b25MaXN0ZW5lcihjYW5jZWxCdXR0b24sIGF1dGhlbnRpY2F0ZUFnYWluKTtcblxuICAgICAgICBoaWRlKGxvZ2luRm9ybSk7XG4gICAgICAgIHJvbGVzRm9ybS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBhdXRoUmVzcG9uc2UuY3VzdG9tZXJzLmZvckVhY2goY3VzdG9tZXIgPT4ge1xuICAgICAgICAgIHJvbGVzRm9ybS5pbm5lckhUTUwgKz0gXCI8aW5wdXQgaWQ9XFxcIlwiICsgY3VzdG9tZXIuZ2xvYmFsSUQgKyBcIlxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcImdsb2JhbElEXFxcIiB2YWx1ZT1cXFwiXCIgK1xuICAgICAgICAgICAgY3VzdG9tZXIuZ2xvYmFsSUQgKyBcIlxcXCI+XCIgKyBcIjxsYWJlbCBmb3I9XFxcIlwiICsgY3VzdG9tZXIuZ2xvYmFsSUQgKyBcIlxcXCI+PHNwYW4gY2xhc3M9XFxcIm5hbWVcXFwiPlwiICtcbiAgICAgICAgICAgIGN1c3RvbWVyLm5hbWUgKyBcIjwvc3Bhbj5cIiArIFwiPHNwYW4gY2xhc3M9XFxcImlwaVxcXCI+XCIgKyBjdXN0b21lci5nbG9iYWxJRCArIFwiPC9zcGFuPjwvbGFiZWw+XCI7XG4gICAgICAgIH0pO1xuICAgICAgICBzaG93KHJvbGVzRm9ybSk7XG4gICAgICAgIHJvbGVzRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0Lm5hbWU9PVwiZ2xvYmFsSURcIikge1xuICAgICAgICAgICAgZW5hYmxlKHN1Ym1pdEJ1dHRvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzaG93RXJyb3IoXCJyb2xlc1wiLCBcImNvbXBhY3RcIik7XG4gICAgICB9LFxuICAgICAgKHhocikgPT4ge1xuICAgICAgICBoYW5kbGVBdXRoZW50aWNhdGVFcnJvclJlc3BvbnNlKHhoci5yZXNwb25zZSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVBdXRoZW50aWNhdGVFcnJvclJlc3BvbnNlKGF1dGhSZXNwb25zZSkge1xuICAgIGlmIChhdXRoUmVzcG9uc2UgJiYgYXV0aFJlc3BvbnNlLmN1c3RvbWVycyAmJiBhdXRoUmVzcG9uc2UuY3VzdG9tZXJzLmxlbmd0aD09MCkge1xuICAgICAgaGlkZShsb2dpbkZvcm0pO1xuICAgICAgc2V0QnV0dG9uTGlzdGVuZXIoc3VibWl0QnV0dG9uLCBhdXRoZW50aWNhdGVBZ2Fpbik7XG4gICAgICBlbmFibGUoc3VibWl0QnV0dG9uKTtcbiAgICAgIHVwZGF0ZVN1Ym1pdEJ1dHRvbkxhYmVsKFwibG9naW4tYWdhaW5cIik7XG4gICAgICBzaG93RXJyb3IoXCJuby1yb2xlc1wiLCBcInNjcm9sbFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgW3VzZXJuYW1lLCBwYXNzd29yZF0uZm9yRWFjaChmdW5jdGlvbihpbnB1dCl7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9IFwiZXJyb3JcIjtcbiAgICAgICAgaW5wdXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgc2V0TG9naW5Gb3JtTGlzdGVuZXJzKCk7XG4gICAgICBzaG93RXJyb3IoXCJsb2dpblwiLCBcImxvZ2luXCIpO1xuICAgIH1cbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGF1dGhlbnRpY2F0ZUFnYWluKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH1cbiAgICB6eW1lVG9rZW4gPSBudWxsO1xuICAgIGhpZGUocm9sZXNGb3JtKTtcbiAgICByb2xlc0Zvcm0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzaG93TG9naW5Gb3JtKCk7XG4gIH1cblxuICBmdW5jdGlvbiB2ZXJpZnkoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfVxuXG4gICAgaGlkZShzdWJtaXRCdXR0b24pO1xuICAgIHNob3coc3VibWl0QnV0dG9uRmFrZSk7XG4gICAgc2V0QnV0dG9uTGlzdGVuZXIoc3VibWl0QnV0dG9uLCBudWxsKTtcblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICB6eW1lVG9rZW46IHp5bWVUb2tlbixcbiAgICAgIGxpbmtzOiB7IHZlcmlmeTogbGlua3MudmVyaWZ5IH0sXG4gICAgICBnbG9iYWxJRHM6IFsgbmV3IEZvcm1EYXRhKHJvbGVzRm9ybSkuZ2V0KFwiZ2xvYmFsSURcIikgXVxuICAgIH07XG4gICAgWy4uLnJvbGVzRm9ybS5lbGVtZW50c10uZm9yRWFjaChkaXNhYmxlKTtcblxuICAgIGFwaVBvc3QoXCJ2ZXJpZnlcIiwgZGF0YSwgY2F1Y3VzVG9rZW4sXG4gICAgICAodmVyaWZ5UmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHZlcmlmeVJlc3BvbnNlLnN1Y2Nlc3MhPT10cnVlIHx8IHZlcmlmeVJlc3BvbnNlLmxpbmtzPT1udWxsIHx8XG4gICAgICAgICAgdmVyaWZ5UmVzcG9uc2UubGlua3MuY2FsbGJhY2tVcmw9PW51bGwgfHwgdmVyaWZ5UmVzcG9uc2UubGlua3MuY2FsbGJhY2tVcmwuaHJlZj09bnVsbCkge1xuICAgICAgICAgIHJldHVybiBoYW5kbGVWZXJpZnlFcnJvclJlc3BvbnNlKHZlcmlmeVJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICBzaG93RXJyb3IoXCJzdWNjZXNzXCIpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh2ZXJpZnlSZXNwb25zZS5saW5rcy5jYWxsYmFja1VybC5ocmVmKTtcbiAgICAgIH0sXG4gICAgICAoeGhyKSA9PiB7XG4gICAgICAgIGhhbmRsZVZlcmlmeUVycm9yUmVzcG9uc2UoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZVZlcmlmeUVycm9yUmVzcG9uc2UodmVyaWZ5UmVzcG9uc2UpIHtcbiAgICBoaWRlKHN1Ym1pdEJ1dHRvbkZha2UpO1xuICAgIHNob3coc3VibWl0QnV0dG9uKTtcbiAgICBlbmFibGUoc3VibWl0QnV0dG9uKTtcbiAgICB1cGRhdGVTdWJtaXRCdXR0b25MYWJlbChcInRyeS1hZ2FpblwiKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIHZlcmlmeUFnYWluKTtcbiAgICBoaWRlKHJvbGVzRm9ybSk7XG4gICAgc2hvd0Vycm9yKFwibGlua2luZ1wiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeUFnYWluKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRFcnJvcigpO1xuICAgIHVwZGF0ZVN1Ym1pdEJ1dHRvbkxhYmVsKFwibGlua1wiKTtcbiAgICBzZXRCdXR0b25MaXN0ZW5lcihzdWJtaXRCdXR0b24sIHZlcmlmeSk7XG5cbiAgICBbLi4ucm9sZXNGb3JtLmVsZW1lbnRzXS5mb3JFYWNoKGVuYWJsZSk7XG4gICAgc2hvdyhyb2xlc0Zvcm0pO1xuICB9XG5cbiAgaW5pdGlhdGUoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGluaXRpYXRlOiAoaTE4bikgPT4ge1xuICAgICAgY29uc3QgZm9udHNMb2FkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvbnRzLWxvYWRlclwiKTtcbiAgICAgIHZhciBmb250TG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvbnRMb2FkZXIuc3R5bGUuZm9udEZhbWlseSA9IFwiUGFudG9uIExpZ2h0XCI7XG4gICAgICBmb250TG9hZGVyLmlubmVyVGV4dCA9IFwiQUJDXCI7XG4gICAgICBmb250c0xvYWRlci5hcHBlbmRDaGlsZChmb250TG9hZGVyKTtcbiAgICAgIGZvbnRMb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZm9udExvYWRlci5zdHlsZS5mb250RmFtaWx5ID0gXCJQYW50b24gUmVndWxhclwiO1xuICAgICAgZm9udExvYWRlci5pbm5lclRleHQgPSBcIkFCQ1wiO1xuICAgICAgZm9udHNMb2FkZXIuYXBwZW5kQ2hpbGQoZm9udExvYWRlcik7XG4gICAgICBmb250TG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGZvbnRMb2FkZXIuc3R5bGUuZm9udEZhbWlseSA9IFwiUGFudG9uIEJsYWNrXCI7XG4gICAgICBmb250TG9hZGVyLmlubmVyVGV4dCA9IFwiQUJDXCI7XG4gICAgICBmb250c0xvYWRlci5hcHBlbmRDaGlsZChmb250TG9hZGVyKTtcblxuICAgICAgbGV0IGNzc0NoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmZvbnRzLmNoZWNrKFwiMTBwdCBQYW50b24gUmVndWxhclwiKSAmJiBkb2N1bWVudC5mb250cy5jaGVjayhcIjEwcHQgUGFudG9uIExpZ2h0XCIpICYmIGRvY3VtZW50LmZvbnRzLmNoZWNrKFwiMTBwdCBQYW50b24gQmxhY2tcIikpIHtcbiAgICAgICAgICBmb250c0xvYWRlci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGZvbnRzTG9hZGVyKTtcbiAgICAgICAgICBjbGVhckludGVydmFsKGNzc0NoZWNrSW50ZXJ2YWwpO1xuICAgICAgICAgIGNzc0NoZWNrSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICAgIGNyZWF0ZUFwcGxpY2F0aW9uKGkxOG4pO1xuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fID0gcmVxdWlyZShcIi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1ub3JtYWwud29mZjJcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tbm9ybWFsLndvZmZcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSByZXF1aXJlKFwiLi9mb250cy9wYW50b24tbm9ybWFsLnR0ZlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1saWdodC53b2ZmMlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1saWdodC53b2ZmXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gcmVxdWlyZShcIi4vZm9udHMvcGFudG9uLWxpZ2h0LnR0ZlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNl9fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1ibGFjay53b2ZmMlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfN19fXyA9IHJlcXVpcmUoXCIuL2ZvbnRzL3BhbnRvbi1ibGFjay53b2ZmXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF84X19fID0gcmVxdWlyZShcIi4vZm9udHMvcGFudG9uLWJsYWNrLnR0ZlwiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOV9fXyA9IHJlcXVpcmUoXCIuL2JhY2tncm91bmQuanBnXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzZfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzdfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF83X19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF84X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfOF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzlfX18pO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIFJlZ3VsYXJcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gTGlnaHRcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gQmxhY2tcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF82X19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfN19fXyArIFwiKSBmb3JtYXQoXFxcIndvZmZcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOF9fXyArIFwiKSBmb3JtYXQoXFxcInRydWV0eXBlXFxcIik7XFxufVxcblxcbmh0bWwsIGJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gUmVndWxhclxcXCIsICdQYW50b24tUmVndWxhcicsJ1BhbnRvbicsc2Fucy1zZXJpZjtcXG59XFxuXFxuI3ZlcnRpY2FsLWFsaWduZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfOV9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbiNtYWluIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDExcHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG4gIHBhZGRpbmc6IDM3cHggNzBweCAzNXB4IDcwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiBjb2x1bW47XFxufVxcblxcbiNjb250YWluZXIgI21haW4gI2xvZ28ge1xcbiAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbiNjb250YWluZXIgI21haW4gI2xvZ28gPiBzcGFuIHtcXG4gIGZvbnQtc2l6ZTogMi4ycmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcXG59XFxuXFxuI2NvbnRhaW5lciAjbWFpbiAjZXJyb3Ige1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogLjlyZW07XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4jY29udGFpbmVyICNtYWluICNlcnJvci5sb2dpbiB7XFxuICBoZWlnaHQ6IGF1dG87XFxuICB3aWR0aDogYXV0bztcXG4gIGNvbG9yOiAjZTk1YjUzO1xcbn1cXG5cXG4jY29udGFpbmVyICNtYWluICNlcnJvci5zY3JvbGwge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE3cHg7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4jY29udGFpbmVyICNtYWluICNlcnJvci5jb21wYWN0IHtcXG4gIGhlaWdodDogYXV0bztcXG4gIG1hcmdpbjogMTBweCAwIDE2cHggMDtcXG59XFxuXFxuI2NvbnRhaW5lciAjbWFpbiAjZXJyb3Igc3BhbiB7XFxuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI21haW4gI2J1dHRvbnMge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuI2luZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFjMjEyYTtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgd2lkdGg6IDU3NnB4O1xcbiAgaGVpZ2h0OiA0MTFweDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiA0M3B4IDEwMHB4O1xcbn1cXG5cXG4jaW5mby10ZXh0LXdyYXBwZXItb3ZlcmxhcCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5hIHtcXG4gIGNvbG9yOiAjMDA5Y2I2O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbn1cXG5cXG5pbnB1dCwgbGFiZWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcblxcbmxhYmVsIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIEJvbGRcXFwiO1xcbiAgZm9udC1zaXplOiAwLjg3NXJlbTtcXG4gIGNvbG9yOiAjMWMyMTJhO1xcbn1cXG5cXG5idXR0b24sIC5idXR0b24taW1pdGF0aW9uIHtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBsaW5lLWhlaWdodDogMS43MTtcXG4gIGNvbG9yOiAjZmZmZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwOUNCNjtcXG4gIGJvcmRlcjogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycywgY29sb3IgMC4yNXM7XFxuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgd2lkdGg6IDI2MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUGFudG9uIEJvbGRcXFwiO1xcbn1cXG4uYnV0dG9uLWltaXRhdGlvbiB7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjI7XFxufVxcbmJ1dHRvbjpkaXNhYmxlZDpob3ZlciB7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbmJ1dHRvbjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MDgzO1xcbn1cXG5cXG5idXR0b24uY2FuY2VsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICBjb2xvcjogIzAwOUNCNjtcXG4gIG1hcmdpbi10b3A6IDhweDtcXG59XFxuYnV0dG9uLmNhbmNlbDpob3Zlcjpub3QoOmRpc2FibGVkKSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2O1xcbn1cXG5cXG5idXR0b24ubG9jYWxlLXN3aXRjaCB7XFxuICBjb2xvcjogIzAwOWNiNjtcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIGRpc3BsYXk6IGlubGluZTtcXG59XFxuYnV0dG9uLmxvY2FsZS1zd2l0Y2g6aG92ZXIge1xcbiAgY29sb3I6ICNmZmZmZmY7XFxuICBiYWNrZ3JvdW5kOiBub25lO1xcbn1cXG5cXG4uc3Bpbm5lciB7XFxuICBtYXJnaW46IGF1dG87XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICB3aWR0aDogMTZweDtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wKTtcXG4gIGJvcmRlci10b3AtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcXG4gIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcXG4gIGFuaW1hdGlvbjogcm90YXRpb24gMXMgaW5maW5pdGUgbGluZWFyIDAuMjVzO1xcblxcbiAgLyogdGhlIG9wYWNpdHkgaXMgdXNlZCB0byBsYXp5bG9hZCB0aGUgc3Bpbm5lciwgc2VlIGFuaW1hdGlvbiBkZWxheSAqL1xcbiAgLyogdGhpcyBhdm9pZCB0aGUgc3Bpbm5lciB0byBiZSBkaXNwbGF5ZWQgd2hlbiB2aXNpYmxlIGZvciBhIHZlcnkgc2hvcnQgcGVyaW9kIG9mIHRpbWUgKi9cXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbkBrZXlmcmFtZXMgcm90YXRpb24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcbiAgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpO1xcbiAgfVxcbn1cXG5cXG5pbnB1dCB7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjOTA5YjllO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG5pbnB1dDpmb2N1c3tcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6ICMwMDljYjY7XFxufVxcblxcbmlucHV0I3VzZXJuYW1lIHtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxufVxcblxcbmlucHV0LmVycm9yLCBpbnB1dDpmb2N1cy5lcnJvciB7XFxuICBib3JkZXItY29sb3I6ICNlOTViNTM7XFxufVxcblxcbmRpdiNmb3JtcyB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdy15OiBvdmVybGF5O1xcbn1cXG5cXG5mb3JtLCAjYnV0dG9ucyB7XFxuICB3aWR0aDogMjYwcHg7XFxuICBtYXJnaW46IDAgYXV0bztcXG59XFxuZm9ybSNsb2dpbi1mb3JtIGxhYmVsIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcbmZvcm0jcm9sZXMtZm9ybSBsYWJlbCAubmFtZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZm9ybSNyb2xlcy1mb3JtIGxhYmVsIC5pcGkge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNpbmZvLWlubmVyLWJveCwgI2luZm8tdGV4dC13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbjtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI2luZm8gaDEge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGxpbmUtaGVpZ2h0OiAyLjZyZW07XFxufVxcbi5zbG9nYW4ge1xcbiAgZm9udC1zaXplOiAzLjRyZW07XFxuICBsaW5lLWhlaWdodDogMXJlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcbi5zbG9nYW4udGhpbiB7XFxuICBmb250LWZhbWlseTogXFxcIlBhbnRvbiBMaWdodFxcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbn1cXG4uc2xvZ2FuLmJvbGQge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gQmxhY2tcXFwiO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuI2luZm8gI2luZm8tdGV4dCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcbiNpbmZvICNpbmZvLWxvY2FsZS1zd2l0Y2ggYSB7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJQYW50b24gQm9sZFxcXCI7XFxuICBtYXJnaW4tcmlnaHQ6IDhweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMDBweCkge1xcbiAgI3ZlcnRpY2FsLWFsaWduZXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgICBtaW4taGVpZ2h0OiA1ODBweDtcXG4gIH1cXG4gICNjb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWZsb3c6IGNvbHVtbi1yZXZlcnNlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICB9XFxuXFxuICAjbG9hZGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB0b3A6IDA7XFxuICAgIGxlZnQ6IDA7XFxuICB9XFxuXFxuICAjbWFpbiB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiA0M3B4IDBweCAyMHB4IDBweDtcXG4gICAgYm90dG9tOiAwO1xcbiAgfVxcblxcbiAgI2NvbnRhaW5lciAjbWFpbiAjZm9ybXMgI2Vycm9yLCAjY29udGFpbmVyICNtYWluICNmb3JtcyAjZXJyb3Iuc2Nyb2xsIHtcXG4gICAgcGFkZGluZzogMCAyMHB4O1xcbiAgfVxcblxcbiAgI2luZm8ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwcHggMTBweCAyMHB4IDEwcHg7XFxuICB9XFxuXFxuICAjaW5mby1pbm5lci1ib3gge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIHdpZHRoOiAyNjBweDtcXG4gICAgbWFyZ2luOiBhdXRvIGF1dG8gMCBhdXRvO1xcbiAgfVxcbiAgI2luZm8taW5uZXItYm94IGgxIHtcXG4gICAgbGluZS1oZWlnaHQ6IDJyZW07XFxuICB9XFxuXFxuICAjaW5mby10ZXh0LWJ1dHRvbiB7XFxuICAgIHdpZHRoOiA1MnB4O1xcbiAgICBoZWlnaHQ6IDUycHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI4cHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyMnB4O1xcbiAgICByaWdodDogMjVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwOUNCNjtcXG4gIH1cXG5cXG4gICNpbmZvLXRleHQtd3JhcHBlciB7XFxuICAgIC8qIGRpc3BsYXk6IG5vbmU7ICovXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZmxvdzogY29sdW1uO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgdG9wOiAyOHB4O1xcbiAgICBsZWZ0OiAwO1xcbiAgICBtYXJnaW46IDI0cHg7XFxuICAgIHBhZGRpbmc6IDI0cHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDI0cHg7XFxuICAgIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDEwcHggMTBweCAtNHB4IHJnYmEoMCwwLDAsMC40Nik7XFxuICAgIC1tb3otYm94LXNoYWRvdzogMHB4IDEwcHggMTBweCAtNHB4IHJnYmEoMCwwLDAsMC40Nik7XFxuICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDEwcHggLTRweCByZ2JhKDAsMCwwLDAuNDYpO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLCBvcGFjaXR5IDAuMXMgZWFzZS1vdXQ7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICB9XFxuICAjaW5mby10ZXh0LXdyYXBwZXIuc2hvdy1pbi1tb2JpbGUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4xcyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGVhc2UtaW47XFxuICB9XFxuXFxuICAjaW5mby10ZXh0LXdyYXBwZXItb3ZlcmxhcCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMHB4O1xcbiAgICB0b3A6IDBweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNCwgNTUsIDYxLCAwLjc1KTtcXG4gIH1cXG4gICNpbmZvLXRleHQtd3JhcHBlci1vdmVybGFwLnNob3ctaW4tbW9iaWxlIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMnMgbGluZWFyO1xcbiAgfVxcblxcbiAgI2luZm8gI2luZm8tdGV4dCB7XFxuICAgIG9yZGVyOiAyO1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgLnNsb2dhbiB7XFxuICAgIGZvbnQtc2l6ZTogMi40cmVtO1xcbiAgfVxcblxcbiAgYnV0dG9uLmxvY2FsZS1zd2l0Y2g6aG92ZXIge1xcbiAgICBjb2xvcjogIzAwNzA4MztcXG4gIH1cXG59XFxuXFxuaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICAgIG91dGxpbmU6IG5vbmU7XFxufVxcbmlucHV0W3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIGxhYmVsOmJlZm9yZSB7XFxuICAgIC8qIGJvcmRlcjogMXB4IHNvbGlkICNkMDA7ICovXFxuICAgIGJvcmRlci1jb2xvcjogIzAwOWNiNiAhaW1wb3J0YW50O1xcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOm5vdCg6Y2hlY2tlZCkge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IC05OTk5cHg7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWQgKyBsYWJlbCxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWxcXG57XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgcGFkZGluZy1sZWZ0OiAyOHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGNvbG9yOiAjNjY2O1xcbn1cXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpjaGVja2VkICsgbGFiZWw6YmVmb3JlLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDpiZWZvcmUge1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHdpZHRoOiAxOHB4O1xcbiAgICBoZWlnaHQ6IDE4cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOmNoZWNrZWQgKyBsYWJlbDphZnRlcixcXG5bdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmNoZWNrZWQpICsgbGFiZWw6YWZ0ZXIge1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgd2lkdGg6IDEwcHg7XFxuICAgIGhlaWdodDogMTBweDtcXG4gICAgYmFja2dyb3VuZDogIzAwOWNiNjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDVweDtcXG4gICAgbGVmdDogNXB4O1xcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XFxufVxcblt0eXBlPVxcXCJyYWRpb1xcXCJdOm5vdCg6Y2hlY2tlZCkgKyBsYWJlbDphZnRlciB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG59XFxuW3R5cGU9XFxcInJhZGlvXFxcIl06Y2hlY2tlZCArIGxhYmVsOmFmdGVyIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcbn1cXG5cIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMmE3OTNlMjQ3YjM1NDgxMTFhNjlkNDc0ZTQ0NWQ2ODUuanBnXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL3BhbnRvbi1ibGFjay50dGZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWJsYWNrLndvZmZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWJsYWNrLndvZmYyXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL3BhbnRvbi1saWdodC50dGZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWxpZ2h0LndvZmZcIjsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZm9udHMvcGFudG9uLWxpZ2h0LndvZmYyXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL3BhbnRvbi1ub3JtYWwudHRmXCI7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImZvbnRzL3BhbnRvbi1ub3JtYWwud29mZlwiOyIsImV4cG9ydCBkZWZhdWx0IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJmb250cy9wYW50b24tbm9ybWFsLndvZmYyXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcIm1haW5cXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPlxcbiAgPGRpdiBpZD1cXFwibG9nb1xcXCI+PHNwYW4gaWQ9XFxcImxvZ28tdGV4dFxcXCIgY2xhc3M9XFxcInNsb2dhbiBib2xkXFxcIj5aeW1lLUNhdWN1czwvc3Bhbj48L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcImZvcm1zXFxcIj5cXG4gICAgPGZvcm0gaWQ9XFxcImxvZ2luLWZvcm1cXFwiIHN0eWxlPVxcXCJkaXNwbGF5OiBub25lO1xcXCI+XFxuICAgICAgPGxhYmVsIGlkPVxcXCJ1c2VybmFtZS1sYWJlbFxcXCIgZm9yPVxcXCJ1c2VybmFtZVxcXCI+PC9sYWJlbD5cXG4gICAgICA8aW5wdXQgaWQ9XFxcInVzZXJuYW1lXFxcIiBuYW1lPVxcXCJ1c2VybmFtZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgcGxhY2Vob2xkZXI9XFxcIlxcXCIgdGFiaW5kZXg9XFxcIjFcXFwiPlxcblxcbiAgICAgIDxsYWJlbCBpZD1cXFwicGFzc3dvcmQtbGFiZWxcXFwiIGZvcj1cXFwicGFzc3dvcmRcXFwiPjwvbGFiZWw+XFxuICAgICAgPGlucHV0IGlkPVxcXCJwYXNzd29yZFxcXCIgbmFtZT1cXFwicGFzc3dvcmRcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBwbGFjZWhvbGRlcj1cXFwiXFxcIiB0YWJpbmRleD1cXFwiMlxcXCI+XFxuICAgIDwvZm9ybT5cXG4gICAgPGRpdiBpZD1cXFwiZXJyb3JcXFwiIHN0eWxlPVxcXCJkaXNwbGF5Om5vbmVcXFwiPjwvZGl2PlxcbiAgICA8Zm9ybSBpZD1cXFwicm9sZXMtZm9ybVxcXCIgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIj5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInJhZGlvLWdyb3VwXFxcIiBpZD1cXFwicmFkaW8xXFxcIj5cXG4gICAgICA8bGFiZWwgZm9yPVxcXCJyYWRpbzFcXFwiPjxzcGFuIGNsYXNzPVxcXCJuYW1lXFxcIj5PcHRpb24gIzE8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImlwaVxcXCI+MTIzNDU2Nzg8L3NwYW4+PC9sYWJlbD5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInJhZGlvLWdyb3VwXFxcIiBpZD1cXFwicmFkaW8yXFxcIj5cXG4gICAgICA8bGFiZWwgZm9yPVxcXCJyYWRpbzJcXFwiPjxzcGFuIGNsYXNzPVxcXCJuYW1lXFxcIj5PcHRpb24gIzI8L3NwYW4+PHNwYW4gY2xhc3M9XFxcImlwaVxcXCI+MTkyODM3NDY1PC9zcGFuPjwvbGFiZWw+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcInJhZGlvXFxcIiBuYW1lPVxcXCJyYWRpby1ncm91cFxcXCIgaWQ9XFxcInJhZGlvM1xcXCI+XFxuICAgICAgPGxhYmVsIGZvcj1cXFwicmFkaW8zXFxcIj48c3BhbiBjbGFzcz1cXFwibmFtZVxcXCI+T3B0aW9uICMzPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJpcGlcXFwiPjczNTY0ODI5MTwvc3Bhbj48L2xhYmVsPlxcbiAgICA8L2Zvcm0+XFxuICA8L2Rpdj5cXG4gIDxkaXYgaWQ9XFxcImJ1dHRvbnNcXFwiPlxcbiAgICA8YnV0dG9uIGlkPVxcXCJidXR0b24tc3VibWl0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHZhbHVlPVxcXCJcXFwiIGNsYXNzPVxcXCJzdWJtaXRcXFwiIGRpc2FibGVkPVxcXCJkaXNhYmxlZFxcXCJcXG4gICAgc3R5bGU9XFxcImRpc3BsYXk6IG5vbmU7XFxcIiBkYXRhLXBoYXNlPVxcXCJsb2dpblxcXCIgdGFiaW5kZXg9XFxcIjNcXFwiPjwvYnV0dG9uPlxcbiAgICA8ZGl2IGlkPVxcXCJidXR0b24tc3VibWl0LWZha2VcXFwiIGNsYXNzPVxcXCJidXR0b24taW1pdGF0aW9uXFxcIiBzdHlsZT1cXFwiZGlzcGxheTogYmxvY2tcXFwiPjxkaXYgY2xhc3M9XFxcInNwaW5uZXJcXFwiPjwvZGl2PjwvZGl2PlxcbiAgICA8YnV0dG9uIGlkPVxcXCJidXR0b24tY2FuY2VsXFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHRhYmluZGV4PVxcXCI0XFxcIiBjbGFzcz1cXFwiY2FuY2VsXFxcIiBkYXRhLXBoYXNlPVxcXCJiYWNrLXRvLWNhdWN1c1xcXCI+PC9idXR0b24+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGlkPVxcXCJpbmZvXFxcIiBzdHlsZT1cXFwiZGlzcGxheTpub25lXFxcIj5cXG4gIDxkaXYgaWQ9XFxcImluZm8taW5uZXItYm94XFxcIj5cXG4gICAgPGgxPjxzcGFuIGlkPVxcXCJzbG9nYW4tdGhpblxcXCIgY2xhc3M9XFxcInNsb2dhbiB0aGluXFxcIj5SYWtrYXVkZXN0YTwvc3Bhbj48YnIgLz48c3BhbiBpZD1cXFwic2xvZ2FuLWJvbGRcXFwiIGNsYXNzPVxcXCJzbG9nYW4gYm9sZFxcXCI+TXVzaWlra2lpbjwvc3Bhbj48L2gxPlxcbiAgICA8ZGl2IGlkPVxcXCJpbmZvLXRleHQtd3JhcHBlci1vdmVybGFwXFxcIj48L2Rpdj5cXG4gICAgPGRpdiBpZD1cXFwiaW5mby10ZXh0LXdyYXBwZXJcXFwiPlxcbiAgICAgIDxkaXYgaWQ9XFxcImluZm8tdGV4dFxcXCI+PC9kaXY+XFxuICAgICAgPGRpdiBpZD1cXFwiaW5mby1sb2NhbGUtc3dpdGNoXFxcIj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImxvY2FsZS1zd2l0Y2gtZmlcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1sb2NhbGU9XFxcImZpX0ZJXFxcIiBjbGFzcz1cXFwibG9jYWxlLXN3aXRjaFxcXCI+Rmk8L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImxvY2FsZS1zd2l0Y2gtZW5cXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1sb2NhbGU9XFxcImVuX0VOXFxcIiBjbGFzcz1cXFwibG9jYWxlLXN3aXRjaFxcXCI+RW48L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gaWQ9XFxcImxvY2FsZS1zd2l0Y2gtc2VcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgZGF0YS1sb2NhbGU9XFxcInN2X1NFXFxcIiBjbGFzcz1cXFwibG9jYWxlLXN3aXRjaFxcXCI+U3ZlPC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGlkPVxcXCJpbmZvLXRleHQtYnV0dG9uXFxcIj48L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=