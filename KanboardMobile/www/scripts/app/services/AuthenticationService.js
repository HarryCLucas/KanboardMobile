﻿app.factory('AuthenticationService', ['$http', '$q', function ($http, $q) {

    var base_url = '';

    function _authenticate(user, pass, url) {
        return $q(function (resolve, reject) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(user + ':' + pass);
            base_url = url;

            _getMyDetails().then(function (response) {
                resolve(true);
            }, function (response) {
                reject(false);
            });
        });
    }

    function _getBaseURL() {
        return base_url;
    }

    function _getAllUsers() {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: _getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getAllUsers",
                    "id": 887036325
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function (response) {
                //Success
                resolve(response.data.result);
            }, function (response) {
                //Failure
                reject(null);
            });
        });
    }

    function _getMyDetails() {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: _getBaseURL() + '/jsonrpc.php',
                data: { "jsonrpc": "2.0", "method": "getMe", "id": 1 },
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then(function (response) {
                //Success
                resolve(response.data.result);
            }, function (response) {
                //Failure
                console.log('Unable to get User Details');
                reject(null);
            });
        });
    }

    var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } };

    return {
        authenticate: _authenticate,
        getBaseURL: _getBaseURL,
        getAllUsers: _getAllUsers,
        getMyDetails: _getMyDetails
    };

}]);