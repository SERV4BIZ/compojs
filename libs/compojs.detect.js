class Detect {
    static isMobile() {
        let txtAgent = navigator.userAgent.toLocaleLowerCase();
        return txtAgent.indexOf("mobile") >= 0;
    };

    static isTablet() {
        let txtAgent = navigator.userAgent.toLocaleLowerCase();
        return txtAgent.indexOf("tablet") >= 0;
    };

    static isDesktop() {
        return !Detect.isMobile() && !Detect.isDesktop()
    };
};