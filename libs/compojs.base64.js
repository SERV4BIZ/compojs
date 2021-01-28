class Base64 {
    static encode(val) {
        return window.btoa(val);
    };

    static decode(val) {
        return window.atob(val);
    };
};