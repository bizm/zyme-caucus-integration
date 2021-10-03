import './init.css';
import './loader.css';

function makeI18n() {
  let currentLocale = "fi_FI";
  const data = {
    loading: {
      fi_FI: "Siirrytään Zymen verkkopalveluun…",
      sv_SE: "Överföring till Zymes webbtjänst ...",
      en_EN: "Entering Zyme’s web service…"
    }
  };
  return {
    setLocale: (locale) => {
      currentLocale = locale;
      window.dispatchEvent(new CustomEvent("locale-change"));
    },
    get: function(id) { return data[id] ? data[id][currentLocale] : null; },
    append: function(container) {
      for (var id in container) {
        data[id] = container[id];
      }
    }
  };
}
const i18n = makeI18n();


window.onload = (event) => {
  const loaderText = document.getElementById("loader-text");

  var fontsLoader = document.createElement("div");
  fontsLoader.id = "fonts-loader";
  document.body.appendChild(fontsLoader);
  var fontLoaderPantonBold = document.createElement("div");
  fontLoaderPantonBold.style.fontFamily = "Panton Bold";
  fontLoaderPantonBold.innerText = "ABC";
  fontsLoader.appendChild(fontLoaderPantonBold);

  let cssCheckInterval = setInterval(function() {
    if (document.fonts.check("10pt Panton Bold")) {
      clearInterval(cssCheckInterval);
      cssCheckInterval = 0;

      function updateLoaderText() {
        loaderText.innerText = i18n.get("loading");
      }
      window.addEventListener("locale-change", updateLoaderText);
      updateLoaderText();

      import(/* webpackChunkName: "app" */ './app').then(module => {
        const app = module.default;
        app.initiate(i18n);
      });
    }
  }, 100);
};
