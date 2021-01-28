Object.defineProperty(Object.prototype, 'clear', {
    value: function () {
        for (key in this) {
            delete this[key];
        }
    }
});

Object.defineProperty(Object.prototype, 'clearAll', {
    value: function () {
        this.clear();
    }
});

Object.defineProperty(Object.prototype, 'delete', {
    value: function (key) {
        delete this[key];
    }
});

Object.defineProperty(Object.prototype, 'remove', {
    value: function (key) {
        delete this[key];
    }
});