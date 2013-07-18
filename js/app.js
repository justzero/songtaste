chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create("window.html", {bounds: {width:357, height:400}});
});
