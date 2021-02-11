
        // document.__defineSetter__("cookie", (cookieString) => {
        //     let setCookieData = {
        //         type: 'setCookie',
        //         url: window.location.href,
        //         cookieString: cookieString
        //     };
        //     console.log(setCookieData);
        // });

        // document.__defineGetter__("cookie", function(cookieString) {
        //     let setCookieData = {
        //         type: 'getCookie',
        //         url: window.location.href,
        //         cookieString: cookieString
        //     };
        // });

        function inspectStackA() {
            var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?������]))/ig;
            try {
                i.dont.exist += 0; // Will cause exception
            } catch (e) {
                var urls = e.stack.match(uri_pattern);
                return urls;
            }
    }

    function inspectStackStorage() {
        var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?������]))/ig;
        try {
        i.dont.exist += 0; // Will cause exception
        } catch(e) {
            var urls = e.stack.match(uri_pattern);
            return urls;
        }
    }

    var cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
    if (cookieDesc && cookieDesc.configurable) {
        Object.defineProperty(document, 'cookie', {
            get: function (params) {
                console.log(params);
                return cookieDesc.get.call(document);
            },
            set: function (val) {
                let stackTrace =  inspectStackA();
                console.log(val);
                cookieDesc.set.call(document, val);
            }
        });
    }

    (function () {
    const _setItemStorage = Storage.prototype.setItem;
    const _getItemStorage = Storage.prototype.getItem;

    Storage.prototype.setItem = function (key, value) {
        if (this === window.localStorage) {
            console.log("SET LOCAL STORAGE: key: " + key + " value: "+value);
        } else if (this === window.sessionStorage) {
            console.log("SET SESSION STORAGE: key: " + key + " value: "+value);
        }
        return _setItemStorage.apply(this, arguments);
    }

    Storage.prototype.getItem = function (key) {
        let stackTrace =  inspectStackStorage();
        if (this === window.localStorage) {
            console.log("GET LOCAL STORAGE: key: " + key);
        } else if (this === window.sessionStorage) {
            console.log("GET SESSION STORAGE: key: " + key);
        }
        return _getItemStorage.apply(this, arguments);
    }

    })();