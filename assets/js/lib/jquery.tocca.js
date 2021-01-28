
$.fn.tap = function(callback = function(e,data){}) {
    $(this).on('tap',callback);
}

$.fn.dbltap = function(callback = function(e,data){}) {
    $(this).on('dbltap',callback);
}

$.fn.longtap = function(callback = function(e,data){}) {
    $(this).on('longtap',callback);
}

$.fn.swipeleft = function(callback = function(e,data){}) {
    $(this).on('swipeleft',callback);
}

$.fn.swiperight = function(callback = function(e,data){}) {
    $(this).on('swiperight',callback);
}

$.fn.swipeup = function(callback = function(e,data){}) {
    $(this).on('swipeup',callback);
}

$.fn.swipedown = function(callback = function(e,data){}) {
    $(this).on('swipedown',callback);
}