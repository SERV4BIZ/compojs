class URL {
  static getPaths(pathUrl) {
    let sPageURL = pathUrl || window.location.pathname.substring(1).toLowerCase();
    sPageURL = sPageURL.replaceAll(compojsConfig["txt_baseurl"], "");
    sPageURL = sPageURL.trim("/");
    sPageURL = sPageURL.split('?')[0];
    let paths = sPageURL.split('/');
    let results = [];
    for (let i = 0; i < paths.length; i++) {
      if (paths[i] != "") {
        results.push(paths[i]);
      }
    }
    return results;
  };

  static getParams(paramUrl) {
    let jsoData = {}
    let sPageURL = paramUrl || window.location.search.substring(1);
    sPageURL = sPageURL.trim("?");
    sPageURL = sPageURL.trim("/");
    sPageURL = sPageURL.trim("&");
    if (sPageURL != "") {
      let sURLVariables = sPageURL.split('&');
      for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        jsoData[sParameterName[0].toLowerCase()] = sParameterName[1];
      }
    }
    return jsoData;
  };
};