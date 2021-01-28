// Global Variable
var compojsGlobal = {
    "int_compoid": 0,
    "obj_staticcache": {},
    "obj_bundle": {},
    "txt_language": "en",
    "jsa_interval": [],
    "jsa_timeout": []
};

var compojsObject = {};

// Local Database
var compojsDB = localforage.createInstance({
    name: "compojs"
});

var compojsStaticCache = localforage.createInstance({
    name: "compojs_staticcache"
});

// Change global language to default setting
compojsGlobal["txt_language"] = compojsConfig["txt_language"];