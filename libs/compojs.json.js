JSON.exist = function (jsnobj, key) {
    if (Utility.variableIsset(jsnobj)) {
        return jsnobj.hasOwnProperty(key);
    }
    return false;
};

JSON.bool = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return false;
};

JSON.int = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return 0;
};

JSON.string = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return "";
};

JSON.double = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return 0.0;
};
JSON.float = JSON.double;

JSON.object = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return {};
};

JSON.array = function (jsnobj, key) {
    if (JSON.exist(jsnobj, key)) {
        return jsnobj[key];
    }
    return [];
};

JSON.keys = function(jsnobj) {
    return Object.keys(jsnobj);
}