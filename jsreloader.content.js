(function() {

    var shortcutSettings;
    
    function initialize() {
        document.addEventListener("keydown", onWindowKeyDown, false);
        chrome.extension.onRequest.addListener(onExtensionRequest);
        chrome.extension.sendRequest({'action' : 'getSettings'}, onGetSettings);
    }

    function reload() {
        var elements = document.querySelectorAll('script');
        for (var i = 0, element; element = elements[i]; i++) {
//console.log(elements[i].src);
            var src = element.src.replace(/[?&]jsReloader=([^&$]*)/,'');
            element.src = src + (src.indexOf('?')>=0?'&':'?') + 'jsReloader=' + (new Date().valueOf());
        }
    }

    function onGetSettings(settings) {
        shortcutSettings = settings;
    }

    function onWindowKeyDown(e) {
        if(e.keyIdentifier == shortcutSettings["keyIdentifier"] &&
        e.shiftKey ===  shortcutSettings["shiftKeySelected"] &&
        e.altKey === shortcutSettings["altKeySelected"] &&
        e.ctrlKey === shortcutSettings["controlKeySelected"])
        {
            reload();
        }
    }

    function onExtensionRequest(request, sender) {
        if (request.action == "reload") {
            reload();
        }
    }

    JSreloader = {
        reload : reload,
        initialize: initialize
    };

    JSreloader.initialize();

})();




