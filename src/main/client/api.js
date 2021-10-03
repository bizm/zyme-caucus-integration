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
