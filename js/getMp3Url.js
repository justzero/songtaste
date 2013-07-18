chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    console.log(request);
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.type !== "songtaste") return;

    var mp3Url;
    $.ajax({
        url: request.url,
        success: function (data) {
            data.replace(/http:\/\/media.+\.mp3/g, function ($1) {
                mp3Url = $1;
                chrome.tabs.sendMessage(sender.tab.id, {type: "mp3Url", url: mp3Url}, function(response) {
                });
            });
        }
    });
    sendResponse({farewell: 'loading ...'});
});

