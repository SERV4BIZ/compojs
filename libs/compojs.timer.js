class Timer {
    static clearAll() {
        Timer.clearInterval();
        Timer.clearTimeout();
    };

    static setInterval(callback, delay = 1000) {
        let timeid = window.setInterval(callback, delay);
        compojsGlobal["jsa_interval"].push(timeid);
    };

    static clearInterval(timeid = 0) {
        if (timeid > 0) {
            window.clearInterval(timeid);

            // Find time id in global
            for (let i = 0; i < compojsGlobal["jsa_interval"].length; i++) {
                if (compojsGlobal["jsa_interval"][i] == timeid) {
                    compojsGlobal["jsa_interval"].slice(i, 1);
                    break;
                }
            }
        } else {
            while (compojsGlobal["jsa_interval"].length > 0) {
                let timeid = compojsGlobal["jsa_interval"].shift();
                window.clearInterval(timeid);
            }
        }
    };

    static setTimeout(callback, delay = 1000) {
        let timeid = window.setTimeout(callback, delay);
        compojsGlobal["jsa_timeout"].push(timeid);
    };

    static clearTimeout(timeid = 0) {
        if (timeid > 0) {
            window.clearTimeout(timeid);

            // Find time id in global
            for (let i = 0; i < compojsGlobal["jsa_timeout"].length; i++) {
                if (compojsGlobal["jsa_timeout"][i] == timeid) {
                    compojsGlobal["jsa_timeout"].slice(i, 1);
                    break;
                }
            }
        } else {
            while (compojsGlobal["jsa_timeout"].length > 0) {
                let timeid = compojsGlobal["jsa_timeout"].shift();
                window.clearTimeout(timeid);
            }
        }
    };
};