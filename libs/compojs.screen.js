class Screen {
    static fullscreen(element) {
        if (screenfull.isEnabled) {
            screenfull.request(element);
        }
    };

    static exitFullscreen() {
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    };

    static toggleFullscreen(element) {
        if (screenfull.isEnabled) {
            screenfull.toggle(element);
        }
    };

    static isFullscreen() {
        return screenfull.isFullscreen;
    };

    static isPortrait() {
        return window.innerHeight > window.innerWidth;
    };

    static isLandscape() {
        return window.innerHeight < window.innerWidth;
    };

    static isExtraSmall() {
        return $(window).width() < 576;
    };

    static isSmall() {
        return $(window).width() >= 576 && $(window).width() < 768;
    };

    static isMedium() {
        return $(window).width() >= 768 && $(window).width() < 992;
    };

    static isLarge() {
        return $(window).width() >= 992 && $(window).width() < 1200;
    };

    static isExtraLarge() {
        return $(window).width() >= 1200 && $(window).width() < 1400;
    };

    static isSuperLarge() {
        return $(window).width() >= 1400;
    };

    static isMobileScreen() {
        if (Detect.isTablet() || Detect.isDesktop()) {
            return false;
        }
        return Screen.isExtraSmall();
    };

    static isTabletScreen() {
        if (Detect.isMobile() || Detect.isDesktop()) {
            return false;
        }
        return Screen.isSmall() || Screen.isMedium();
    };

    static isDesktopScreen() {
        if (Detect.isMobile() || Detect.isTablet()) {
            return false;
        }
        return Screen.isLarge() || Screen.isExtraLarge() || Screen.isSuperLarge();
    };
};