// @description: 
(function (win, doc, undefined) {
    'use strict';
    var btnName = 'custom_1';
    var download = document.getElementById(btnName);
    if (!download) {
        return;
    }

    var musicName = $('.mid_tit').text();

    chrome.runtime.sendMessage({type: "songtaste", url: download.href}, function(response) {
    });
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
        if (request.type !== "mp3Url") return;
        $(download).attr('href', request.url)
        .attr('download', musicName + '.mp3')
        .css('color', 'blue');

    });

}(window, document));
