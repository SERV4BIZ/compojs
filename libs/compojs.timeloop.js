class TimeLoop {

    static step(loopCall = function (step, nextCall = function (val = -1) {}, reloopCall = function () {}, exitCall = function () {}) {}, delay = 1000, offset = 0, successCall = function () {}) {
        let step = offset;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            if (!isBusy) {
                isBusy = true;

                let nextCall = function (val = -1) {
                    if (val >= 0) {
                        step = val;
                    } else {
                        step++;
                    }
                    isBusy = false;
                    return true;
                };

                let reloopCall = function () {
                    isBusy = false;
                    return true;
                };

                let exitCall = function () {
                    Timer.clearInterval(timer);
                    isBusy = false;
                    successCall();
                };

                loopCall(step, nextCall, reloopCall, exitCall);
            }
        }, delay);

        return timer;
    };

    static array(loopCall = function (index, value, nextCall = function (more = true) {}, reloopCall = function () {}, exitCall = function () {}) {}, list = [], delay = 1000, offset = 0, limit = 0, successCall = function () {}) {
        let count = 0;
        let index = offset;
        let listing = list;
        let isBusy = false;


        let timer = Timer.setInterval(function () {
            let exitCall = function () {
                Timer.clearInterval(timer);
                isBusy = false;
                successCall();
            };

            if (index < listing.length) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function (more = true) {
                        isAction = true;
                        if (more) {
                            if ((index + 1) >= listing.length) {
                                exitCall();
                            } else {
                                count++;
                                index++;
                                isBusy = false;

                                if (limit > 0) {
                                    if (count >= limit) {
                                        exitCall();
                                        return false;
                                    }
                                }
                                return true;
                            }
                        } else {
                            exitCall();
                        }

                        return false;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[index];
                    loopCall(index, value, nextCall, reloopCall, exitCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            } else {
                exitCall();
            }
        }, delay);

        return timer;
    };

    static popArray(loopCall = function (value, nextCall = function (more = true) {}, reloopCall = function () {}, exitCall = function () {}) {}, list = [], delay = 1000, limit = 0, successCall = function () {}) {
        let count = 0;
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            let exitCall = function () {
                Timer.clearInterval(timer);
                isBusy = false;
                successCall();
            };

            if (listing.length > 0) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function (more = true) {
                        isAction = true;
                        if (more) {
                            listing.pop();
                            if (listing.length > 0) {
                                count++;
                                isBusy = false;

                                if (limit > 0) {
                                    if (count >= limit) {
                                        exitCall();
                                        return false;
                                    }
                                }
                                return true;
                            } else {
                                exitCall();
                            }
                        } else {
                            exitCall();
                        }

                        return false;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[listing.length - 1];
                    loopCall(value, nextCall, reloopCall, exitCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            } else {
                exitCall();
            }
        }, delay);

        return timer;
    };

    static shiftArray(loopCall = function (value, nextCall = function (more = true) {}, reloopCall = function () {}, exitCall = function () {}) {}, list = [], delay = 1000, limit = 0, successCall = function () {}) {
        let count = 0;
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            let exitCall = function () {
                Timer.clearInterval(timer);
                isBusy = false;
                successCall();
            };

            if (listing.length > 0) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function (more = true) {
                        isAction = true;
                        if (more) {
                            listing.shift();
                            if (listing.length > 0) {
                                count++;
                                isBusy = false;

                                if (limit > 0) {
                                    if (count >= limit) {
                                        exitCall();
                                        return false;
                                    }
                                }
                                return true;
                            } else {
                                exitCall();
                            }
                        } else {
                            exitCall();
                        }

                        return false;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[0];
                    loopCall(value, nextCall, reloopCall, exitCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            } else {
                exit(timer);
            }
        }, delay);

        return timer;
    };

    static infinityArray(loopCall = function (index, value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000) {
        let index = 0;
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            if (index < listing.length) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        index++;
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[index];
                    loopCall(index, value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

    static infinityPopArray(loopCall = function (value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000) {
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            if (listing.length > 0) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        listing.pop();
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[listing.length - 1];
                    loopCall(value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

    static infinityShiftArray(loopCall = function (value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000) {
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            if (listing.length > 0) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        listing.shift();
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[0];
                    loopCall(value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

    static scrollArray(loopCall = function (index, value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000, targetQuery = "body", markQuery = "#mark", offset = 0) {
        let index = 0;
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            let posTarget = $(targetQuery).position();
            let posMark = $(markQuery).position();
            let posLine = posTarget.top + $(targetQuery).height() + offset;
            if (index < listing.length && posMark.top < posLine) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        index++;
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[index];
                    loopCall(index, value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

    static scrollPopArray(loopCall = function (value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000, targetQuery = "body", markQuery = "#mark", offset = 0) {
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            let posTarget = $(targetQuery).position();
            let posMark = $(markQuery).position();
            let posLine = posTarget.top + $(targetQuery).height() + offset;
            if (listing.length > 0 && posMark.top < posLine) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        listing.pop();
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[listing.length - 1];
                    loopCall(value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

    static scrollShiftArray(loopCall = function (value, nextCall = function () {}, reloopCall = function () {}) {}, list = [], delay = 1000, targetQuery = "body", markQuery = "#mark", offset = 0) {
        let listing = list;
        let isBusy = false;

        let timer = Timer.setInterval(function () {
            let posTarget = $(targetQuery).position();
            let posMark = $(markQuery).position();
            let posLine = posTarget.top + $(targetQuery).height() + offset;

            if (listing.length > 0 && posMark.top < posLine) {
                if (!isBusy) {
                    isBusy = true;
                    let isAction = false;

                    let nextCall = function () {
                        isAction = true;
                        listing.shift();
                        isBusy = false;
                        return true;
                    };

                    let reloopCall = function () {
                        isAction = true;
                        isBusy = false;
                        return true;
                    };

                    let value = listing[0];
                    loopCall(value, nextCall, reloopCall);

                    if (!isAction) {
                        nextCall();
                    }
                }
            }
        }, delay);

        return timer;
    };

};