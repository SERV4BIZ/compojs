class CompoJS {
    constructor(parent, path, name, pmts = {}, lang = compojsGlobal["txt_language"], data = {}) {
        compojsGlobal["int_compoid"]++;
        this.id = compojsGlobal["int_compoid"];
        this.prefix = "c" + this.id + "_";
        this.parent = parent;
        this.path = path;
        this.name = name;
        this.lang = lang;
        this.pmts = pmts;
        this.childs = [];

        this.data = data;
        this.data = this.data.replaceAll("$_", this.prefix);
        this.data = $.parseHTML(this.data, document, true);
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = $(this.data[i]).attr("compo", this.prefix)[0];
        }
        compojsObject[this.prefix] = this;
    };

    static create(parent, compoPath, parameters = {}, lang = compojsGlobal["txt_language"], successCall = function (compo) {}, errorCall = function (jqXHR, textStatus, errorThrown) {}) {
        return new Promise(function (resolve, reject) {
            CompoJS.langs(lang, function (jsoLang) {
                let datamapping = function (jsoLang, parameters, compoPath, buffer) {
                    // Language Mapping
                    Object.keys(jsoLang).forEach(function (key) {
                        var tag = "[" + key + "]";
                        buffer = buffer.replaceAll(tag, jsoLang[key]);
                    });

                    // Parameter Mapping
                    Object.keys(parameters).forEach(function (key) {
                        var tag = "{" + key + "}";
                        buffer = buffer.replaceAll(tag, parameters[key]);
                    });

                    let names = compoPath.split("/");
                    let name = names[names.length - 1];
                    let compo = new CompoJS(parent, compoPath, name, parameters, lang, buffer);
                    if (parent != null && parent != undefined) {
                        parent.childs.push(compo);
                    }

                    return compo;
                };

                let pathName = compoPath.toLowerCase();
                if (JSON.exist(compojsGlobal["obj_bundle"]["jso_compos"], pathName)) {
                    let buffer = compojsGlobal["obj_bundle"]["jso_compos"][pathName];
                    let compo = datamapping(jsoLang, parameters, compoPath, buffer);
                    successCall(compo);
                    resolve(compo);
                } else {
                    let url = compojsConfig["txt_baseurl"] + "/compos/" + compoPath + "/compo.obj?version=" + compojsConfig["txt_version"];
                    Ajax.get(url).then(function (data) {
                        let buffer = data;
                        let compo = datamapping(jsoLang, parameters, compoPath, buffer);
                        successCall(compo);
                        resolve(compo);
                    }, function (jqXHR, textStatus, errorThrown) {
                        errorCall(jqXHR, textStatus, errorThrown);
                        reject(textStatus);
                    });
                }
            }, function (jqXHR, textStatus, errorThrown) {
                errorCall(jqXHR, textStatus, errorThrown);
                reject(textStatus);
            });
        });
    };

    static langs(langCode, successCall = function (jsoLang) {}, errorCall = function (jqXHR, textStatus, errorThrown) {}) {
        return new Promise(function (resolve, reject) {
            let langname = langCode.toLowerCase();
            if (JSON.exist(compojsGlobal["obj_bundle"]["jso_langs"], langname)) {
                let jsoLang = compojsGlobal["obj_bundle"]["jso_langs"][langname];
                successCall(jsoLang);
                resolve(jsoLang);
            } else {
                let url = compojsConfig["txt_baseurl"] + "/langs/" + langname + ".json?version=" + compojsConfig["txt_version"];
                Ajax.get(url, successCall, errorCall).then(resolve, reject);
            }
        });
    };

    compo(compoPath, parameters, lang, successCall, errorCall) {
        let mythis = this;
        if(lang == null || !Utility.isset(lang)) {
            lang = mythis.lang;
        }
        
        return CompoJS.create(this, compoPath, parameters, lang, successCall, errorCall);
    };

    render(query = null) {
        if (query != null) {
            $(query).html(this.data);
        }
        return this.data;
    };

    call(name) {
        if (Utility.isset(this[name])) {
            let args = [];
            for(let i=1;i<arguments.length;i++) {
                args.push(arguments[i]);
            }
            return this[name].apply(this, args);
        }
        return null;
    };

    get(name) {
        if (Utility.isset(this[name])) {
            return this[name];
        }
        return null;
    };

    set(name, val = null) {
        this[name] = val;
    };

    delete() {
        this.call("destroy");
        $("#" + this.prefix).remove();
        $("[compo='" + this.prefix + "']").remove();

        // Clear all childs
        for (let i = 0; i < this.childs.length; i++) {
            let comItem = this.childs[i];
            if (comItem != null && comItem != undefined) {
                comItem.delete();
            }
        }
        this.childs.clearAll();

        // Clear child in parent
        if (this.parent != null && this.parent != undefined) {
            for (let i = 0; i < this.parent.childs.length; i++) {
                let comItem = this.parent.childs[i];
                if (comItem != null && comItem != undefined) {
                    if (comItem.id == this.id) {
                        this.parent.childs[i] = undefined;
                        this.parent.childs.splice(i, 1);
                        break;
                    }
                }
            }
        }

        // Clear compo object from global
        delete compojsObject[this.prefix];

        // Clear this object
        let keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            let keyname = keys[i];
            delete this[keyname];
        }
    };

    remove() {
        this.delete();
    };
};