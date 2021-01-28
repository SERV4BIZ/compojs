class Utility {
  static variableIsset(variable) {
    return (typeof variable !== 'undefined');
  };

  static isset(variable) {
    return Utility.variableIsset(variable);
  };

  static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  static padFormat(val, len = 2, char = "0") {
    len = len || 2;
    char = char || "0";

    let buff = val.toString();
    for (let i = 0; i < len; i++) {
      if (buff.length < len) {
        buff = char + buff;
      }
    }
    return buff;
  };

  static padNumber(val, len, char = "0") {
    return Utility.padFormat(val, len, char);
  };

  static numberFormat(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k).toFixed(prec);
      };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  };
};