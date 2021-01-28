class Fragment {
    constructor(compoParent = null, containerID = "containers", langCompo = compojsGlobal["txt_language"]) {
        this.compoParent = compoParent;
        this.containerID = containerID;
        this.lang = langCompo;
        this.compos = {};
    }

    length() {
        return Object.keys(this.compos).length;
    }

    load(pathCompo) {
        let mythis = this;
        return new Promise(function (resolve, reject) {
            let txtSelector = '#' + mythis.containerID;
            let isFound = false;

            $(txtSelector).children("div").each(function (index) {
                if ($(this).attr("path") == pathCompo) {
                    $(this).show();

                    let mycompo = mythis.get(pathCompo);
                    if (mycompo != null) {
                        mycompo.call("resume", mycompo.pmts);
                    }

                    isFound = true;
                } else {
                    if ($(this).is(":visible")) {
                        $(this).hide();

                        let mycompo = mythis.get(pathCompo);
                        if (mycompo != null) {
                            mycompo.call("pause", mycompo.pmts);
                        }
                    }
                }
            });

            if (isFound) {
                resolve(mythis.get(pathCompo));
            } else {
                CompoJS.create(mythis.compoParent, pathCompo, {
                    "lang": mythis.lang
                }, mythis.lang).then(function (compo) {
                    mythis.compos[pathCompo] = compo;
                    let pageText = "<div type='fragment' path='" + pathCompo + "' prefix='" + compo.prefix + "' ></div>";
                    let pageHTML = $(pageText).html(compo.render());
                    $(txtSelector).append(pageHTML);
                    compo.call("resume", compo.pmts);
                }).then(resolve, reject);
            }
        });
    }

    put(compoObj) {
        let mythis = this;
        return new Promise(function (resolve, reject) {
            if (compoObj == null || !Utility.isset(compoObj)) {
                reject();
            }

            let txtSelector = '#' + mythis.containerID;
            let isFound = false;

            $(txtSelector).children("div").each(function (index) {
                let prefix = $(this).attr("prefix");
                if ($(this).attr("path") == compoObj.path) {
                    $(this).show();

                    let mycompo = mythis.get(pathCompo);
                    if (mycompo != null) {
                        mycompo.call("resume", mycompo.pmts);
                    }

                    isFound = true;
                } else {
                    if ($(this).is(":visible")) {
                        $(this).hide();
                        
                        let mycompo = mythis.get(pathCompo);
                        if (mycompo != null) {
                            mycompo.call("pause", mycompo.pmts);
                        }
                    }
                }
            });

            if (isFound) {
                resolve(compoObj);
            } else {
                mythis.compos[compoObj.path] = compoObj;
                let pageText = "<div type='fragment' path='" + compoObj.path + "' prefix='" + compoObj.prefix + "' ></div>";
                let pageHTML = $(pageText).html(compoObj.render());
                $(txtSelector).append(pageHTML);
                compoObj.call("resume", compoObj.pmts);
                resolve(compoObj);
            }
        });
    }

    get(pathCompo) {
        let mythis = this;
        if (mythis.compos.hasOwnProperty(pathCompo)) {
            return mythis.compos[pathCompo];
        }
        return null;
    }

    delete(pathCompo) {
        let mythis = this;
        let compo = mythis.get(pathCompo);
        if (compo != null) {
            $("[type='fragment'][path='" + compoObj.path + "'][prefix='" + compoObj.prefix + "']").remove();

            compo.delete();
            delete mythis.compos[pathCompo];
        }
    }

    remove(pathCompo) {
        this.delete(pathCompo);
    }
}