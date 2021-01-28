class Form {
    static data(query) {
        return new FormData($(query)[0]);
    };

    static get(query) {
        return $(query).serialize();
    };
};