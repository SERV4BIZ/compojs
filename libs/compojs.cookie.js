class Cookie {
    static set(keyname, value, attr) {
        return $.cookie(keyname, value, attr);
    };

    static get(keyname) {
        return $.cookie(keyname);
    };

    static delete(keyname) {
        return $.removeCookie(keyname);
    };

    static remove(keyname) {
        return Cookie.delete(keyname);
    };
};