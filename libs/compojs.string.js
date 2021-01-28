String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

String.prototype.replaceTag = function (search, replacement) {
    var target = this;
    return target.replaceAll("{" + search + "}", replacement);
};

String.prototype.trimLeft = function (charlist) {
    charlist = charlist || " ";
    return this.replace(new RegExp("^[" + charlist + "]+"), "");
};

String.prototype.trimRight = function (charlist) {
    charlist = charlist || " ";
    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};

String.prototype.trim = function (charlist) {
    return this.trimLeft(charlist).trimRight(charlist);
};