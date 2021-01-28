class Clipboard {
    static writeText(data) {
        return clipboard.writeText(data);
    };

    static readText() {
        return clipboard.readText();
    };

    static write(data) {
        return clipboard.write(data);
    };

    static read() {
        return clipboard.read();
    };
};