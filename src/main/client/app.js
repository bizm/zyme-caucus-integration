import './style.css';
import mainHtml from './main.html';
import {apiPost, apiGet} from './api.js';

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
  container.innerHTML += mainHtml;

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
      apiPost("initiate", getInitiateCallPayload(), null,
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

    apiPost("auth", data, null,
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

    apiPost("verify", data, caucusToken,
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

export default (function() {
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
})();
