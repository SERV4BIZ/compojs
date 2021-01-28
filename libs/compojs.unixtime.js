class UnixTime {
    static unix() {
        return Math.round($.now() / 1000);
    };

    static toLocalDate(unix) {
        unix = unix || UnixTime.unix();
        let slipdate = moment.unix(unix).toDate();
        let year = Utility.padNumber(slipdate.getFullYear(), 4);
        let month = Utility.padNumber(slipdate.getMonth() + 1, 2);
        let day = Utility.padNumber(slipdate.getDate(), 2);
        let txtDateTime = year + "-" + month + "-" + day;
        return txtDateTime;
    };

    static toLocalTime(unix) {
        unix = unix || UnixTime.unix();
        let slipdate = moment.unix(unix).toDate();
        let hour = Utility.padNumber(slipdate.getHours(), 2);
        let minute = Utility.padNumber(slipdate.getMinutes(), 2);
        let second = Utility.padNumber(slipdate.getSeconds(), 2);
        let txtDateTime = hour + ":" + minute + ":" + second;
        return txtDateTime;
    };

    static toLocalString(unix) {
        return UnixTime.toLocalDate(unix) + " " + UnixTime.toLocalTime(unix);
    };

    static toUTCDate(unix) {
        unix = unix || UnixTime.unix();
        let slipdate = moment.unix(unix).toDate();
        let year = Utility.padNumber(slipdate.getUTCFullYear(), 4);
        let month = Utility.padNumber(slipdate.getUTCMonth() + 1, 2);
        let day = Utility.padNumber(slipdate.getUTCDate(), 2);
        let txtDateTime = year + "-" + month + "-" + day;
        return txtDateTime;
    };

    static toUTCTime(unix) {
        unix = unix || UnixTime.unix();
        let slipdate = moment.unix(unix).toDate();
        let hour = Utility.padNumber(slipdate.getUTCHours(), 2);
        let minute = Utility.padNumber(slipdate.getUTCMinutes(), 2);
        let second = Utility.padNumber(slipdate.getUTCSeconds(), 2);
        let txtDateTime = hour + ":" + minute + ":" + second;
        return txtDateTime;
    };

    static toUTCString(unix) {
        return UnixTime.toUTCDate(unix) + " " + UnixTime.toUTCTime(unix);
    };
};