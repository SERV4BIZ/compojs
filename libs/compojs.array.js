Array.prototype.clear = function () {
    while (this.length > 0) {
        this.shift();
    }
};

Array.prototype.clearAll = function () {
    this.clear();
};

Array.prototype.delete = function (index = 0) {
    this.splice(index, 1);
};

Array.prototype.remove = function (index = 0) {
    this.delete(index);
};