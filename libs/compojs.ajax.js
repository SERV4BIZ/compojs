class Ajax {
    static fetch(url, successBack = function (data, textStatus, jqXHR) {}, errorCall = function (jqXHR, textStatus, errorThrown) {}, downloadCall = function (event) {}, uploadCall = function (event) {}) {
        return new Promise(function (resolve, reject) {
            let request = $.ajax({
                async: true,
                type: 'GET',
                url: url,
                xhr: function () {
                    let xhr = $.ajaxSettings.xhr();
                    xhr.onprogress = function (event) {
                        // For downloads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        downloadCall(event);
                    };

                    xhr.upload.onprogress = function (event) {
                        // For uploads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        uploadCall(event);
                    };
                    return xhr;
                }
            });

            request.done(function (data, textStatus, jqXHR) {
                if (jqXHR.getResponseHeader("Content-Type").toLowerCase() === "application/json") {
                    if (typeof data === 'string' || data instanceof String) {
                        data = JSON.parse(data);
                    }
                }

                let objItem = {};
                objItem.txt_data = data;
                objItem.txt_status = textStatus;
                objItem.jso_jqxhr = jqXHR;

                compojsGlobal["obj_staticcache"][url] = objItem;
                compojsStaticCache.setItem(url, JSON.stringify(objItem));

                successBack(data, textStatus, jqXHR);
                resolve(data);
            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                errorCall(jqXHR, textStatus, errorThrown);
                reject(textStatus);
            });
        });
    };

    static get(url, successBack, errorCall, downloadCall, uploadCall) {
        return new Promise(function (resolve, reject) {
            if (JSON.exist(compojsGlobal["obj_staticcache"], url) && !compojsConfig["is_devmode"]) {
                let objItem = compojsGlobal["obj_staticcache"][url];
                successBack(objItem.txt_data, objItem.txt_status, objItem.jso_jqxhr);
                resolve(objItem.txt_data);
            } else {
                if (compojsConfig["is_devmode"]) {
                    Ajax.fetch(url, successBack, errorCall, downloadCall, uploadCall).then(resolve, reject);
                } else {
                    compojsStaticCache.getItem(url).then(function (value) {
                        if (value == null) {
                            Ajax.fetch(url, successBack, errorCall, downloadCall, uploadCall).then(resolve, reject);
                        } else {
                            let objItem = JSON.parse(value);
                            compojsGlobal["obj_staticcache"][url] = objItem;
                            successBack(objItem.txt_data, objItem.txt_status, objItem.jso_jqxhr);
                            resolve(objItem.txt_data);
                        }
                    });
                }
            }
        });
    };

    static request(url, params = {}, successBack = function (data, textStatus, jqXHR) {}, errorCall = function (jqXHR, textStatus, errorThrown) {}, downloadCall = function (event) {}, uploadCall = function (event) {}) {
        return new Promise(function (resolve, reject) {
            let request = $.ajax({
                async: true,
                type: 'POST',
                data: params,
                url: url,
                xhr: function () {
                    let xhr = $.ajaxSettings.xhr();
                    xhr.onprogress = function (event) {
                        // For downloads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        downloadCall(event);
                    };

                    xhr.upload.onprogress = function (event) {
                        // For uploads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        uploadCall(event);
                    };
                    return xhr;
                }
            });

            request.done(function (data, textStatus, jqXHR) {
                if (jqXHR.getResponseHeader("Content-Type").toLowerCase() === "application/json") {
                    if (typeof data === 'string' || data instanceof String) {
                        data = JSON.parse(data);
                    }
                }

                successBack(data, textStatus, jqXHR);
                resolve(data);
            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                errorCall(jqXHR, textStatus, errorThrown);
                reject(textStatus);
            });
        });
    };

    static post(url, params, successBack, errorCall, downloadCall, uploadCall) {
        return Ajax.request(url, params, successBack, errorCall, downloadCall, uploadCall);
    };

    static upload(url, params = {}, successBack = function (data, textStatus, jqXHR) {}, errorCall = function (jqXHR, textStatus, errorThrown) {}, downloadCall = function (event) {}, uploadCall = function (event) {}) {
        return new Promise(function (resolve, reject) {
            let request = $.ajax({
                async: true,
                type: 'POST',
                data: params,
                url: url,
                contentType: false,
                processData: false,
                mimeType: "multipart/form-data",
                xhr: function () {
                    let xhr = $.ajaxSettings.xhr();
                    xhr.onprogress = function (event) {
                        // For downloads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        downloadCall(event);
                    };

                    xhr.upload.onprogress = function (event) {
                        // For uploads callback
                        let percent = 0;
                        let position = event.loaded || event.position;
                        let total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil((position / total) * 100);
                        }
                        event.percent = percent;
                        uploadCall(event);
                    };
                    return xhr;
                }
            });

            request.done(function (data, textStatus, jqXHR) {
                if (jqXHR.getResponseHeader("Content-Type").toLowerCase() === "application/json") {
                    if (typeof data === 'string' || data instanceof String) {
                        data = JSON.parse(data);
                    }
                }

                successBack(data, textStatus, jqXHR);
                resolve(data);
            });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                errorCall(jqXHR, textStatus, errorThrown);
                reject(textStatus);
            });
        });
    };
};