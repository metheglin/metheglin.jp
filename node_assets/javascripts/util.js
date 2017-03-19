var Util;

Util = {
  getHost: function() {
    return location.hostname;
  },

  getProtocol: function() {
    return location.protocol;
  },

  getOrigin: function() {
    return this.getProtocol().concat('//').concat( this.getHost() );
  },

  getUrlVars: function() {
    var vars = [], hash;
    var href = location.href;
    var hashes = href.slice(href.indexOf('?')+1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
  },

  // getUrlVarsの改良版. 必ずurldecodeした文字列を返します
  getUrlParams: function() {
    var params = {}
    var search = location.search.replace(/^\?/, '')
    if ( !search ) {
      return []
    }
    var searches = search.split('&')
    for ( var index in searches ) {
      var kv    = searches[index]
      var key   = decodeURIComponent( kv.split('=')[0] )
      var value = decodeURIComponent( kv.split('=')[1] )

      if ( key.search("\\[\\]") !== -1 ) { // In case of array parameter
        if ( typeof params[key] === "undefined" ) {
          params[key] = [value]
        } else {
          params[key].push(value)
        }
      } else { // In case of regular parameter
        params[key] = value
      }
    }
    return params
  },

  getUrlVar: function(key) {
    var vars = this.getUrlVars();
    if ( typeof vars[key] !== 'undefined') {
      return vars[key];
    } else {
      return null;
    }
  },

  getUrlParam: function(key) {
    var params = this.getUrlParams();
    if ( typeof params[key] !== 'undefined') {
      return params[key];
    } else {
      return null;
    }
  },

  getUrlPathes: function() {
    var href = location.href;
    var pathes = href.slice(0, href.indexOf('?')).split('/').slice(3);
    return pathes;
  },

  getPathKey: function(type) {
    if ( !type) {
      type = 'brand';
    }

    var href = location.href;
    var regex = new RegExp('\/' + type + '\/([^/?#]+)');
    var match = href.match(regex);
    if ( match ) {
      return match[1];
    }
    return null;
  },

  // http://sample.com?test=1#top => #top
  getUrlHash: function(url) {
    if ( !url ) {
      url = location.href;
    }
    var index = url.indexOf('#')
    if ( index < 0 ) {
      return null
    }
    var hash = url.slice(index);
    return hash;
  },

  // http://sample.com?test=1#top => http://sample.com?test=1
  getUrlExceptHash: function(url) {
    if ( !url ) {
      url = location.href;
    }
    return url.replace(/\#.*$/, '');
  },

  // http://sample.com/path/path?test=1 => http://sample.com/path/path?test1=1&test2=2
  getUrlWithParams: function(params) {
    var path    = location.pathname
    params = Object.assign(this.getUrlParams(), params)
    if ( !params ) {
      return path
    } else {
      return path + '?' + this.buildQueryString( params )
    }
  },

  buildQueryString: function(params) {
    var qs = "";
    for (var key in params) {
      var value = params[key];
      if ( Array.isArray(value) ) {
        for ( var i in value ) {
          qs += encodeURIComponent(key) + "=" + encodeURIComponent(value[i]) + "&";
        }
      } else {
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
    }
    if (qs.length > 0){
      qs = qs.substring(0, qs.length-1);
    }
    console.log(qs)
    return qs;
  },

  getUA: function() {
    return window.navigator.userAgent;
  },

  isSmartphone: function() {
    var regexp_iphone = /iPhone/;
    var regexp_android = /Android.*Mobile/;
    var regexp_winphone = /Windows.*Phone/;

    var ua = Util.getUA();
    if ( regexp_iphone.test(ua) || regexp_android.test(ua) || regexp_winphone.test(ua)) {
      return true;
    } else {
      return false;
    }
  },

  isTablet: function() {
    if ( Util.isSmartphone() ) return false
    var regexp_ipad    = /iPad/;
    var regexp_android = /Android/;
    var regexp_win     = /Windows*Touch/;
    var regexp_firefox = /Firefox*Tablet/;
    var regexp_kindle  = /(Kindle|Silk)/;

    var ua = Util.getUA();
    if ( 
      regexp_ipad.test(ua) || 
      regexp_android.test(ua) || 
      regexp_win.test(ua) ||
      regexp_firefox.test(ua) ||
      regexp_kindle.test(ua)
    ) {
      return true;
    } else {
      return false;
    }
  },

  hasKey: function(key) {
    var value = this.getUrlVar(key);
    if ( value === 'true' ) {
      return true;
    } else {
      return false;
    }
  },

  setCookie: function( cname, cvalue, exdays ) {
    exdays = exdays || 7;
    var date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  getCookie: function( cname ) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
  },

  getCurrentPage: function() {
    return this.getUrlVar('page')
  },

  isDeviceVertical: function() {
    return window.orientation % 180 == 0
  },

  effectiveDeviceWidth: function() {
    var deviceWidth = Util.isDeviceVertical() ? window.screen.width : window.screen.height;
    // iOS returns available pixels, Android returns pixels / pixel ratio
    // http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
    if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio) {
      deviceWidth = deviceWidth / window.devicePixelRatio;
    }
    return deviceWidth;
  }
};

var root  = Function("return this")();
root.Util = Util;

module.exports = Util;
