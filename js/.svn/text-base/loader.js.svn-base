/**
 * Copyright 2011 NetEase Youdao
 */

var docElement = document.documentElement;

var SCRIPT_URL = "http://shared.ydstatic.com/gouwuex/ext/script/extension_3_0.js?browser=chrome&version=3.0";
var SCRIPT_URL_B = "http://shared.ydstatic.com/gouwuex/ext/script/extension_3_0.js?browser=chrome&version=3.0";

chrome.extension.sendRequest(
    {type: "isshow", url: location.href}, 
    function(response) {
        if (response.isshow) {
            extension_load();
        }
    }
);
// 用户访问的页面是否触发订单list页面解析
chrome.extension.sendRequest(
    {type: "visitUrl", url: location.href}, 
    function(response) {
    }
);

function extension_load() {

chrome.extension.sendRequest(
    {type: "getOptions"},
    function(response) {
        var os = response.optionstr;
        var on = document.getElementById('youdaoGWZS_options');
        if (!on) {
            var wr = document.createElement("span");
            wr.id = "youdao_gouwu";
            wr.style.display = 'none';

            var conf = document.createElement("span");
            conf.id = "youdaoGWZS_config";
            conf.innerText = encodeURIComponent(response.conf);
            wr.appendChild(conf);

            on = document.createElement('span');
            on.id = 'youdaoGWZS_options';
            on.innerText = os;
            wr.appendChild(on);
            docElement.appendChild(wr);
            on.firstChild.addEventListener(
                'DOMCharacterDataModified', function() {
                    var opts = this.parentElement.innerText;
                    chrome.extension.sendRequest({
                        type: 'setOptions',optionstr: opts
                    });
                },
                false
            );
            
            loadJS(response.like === "true" ? SCRIPT_URL_B : SCRIPT_URL);
        }
    }
);

}

function loadJS(url, onload) {
    var domscript = document.createElement('script');
    domscript.src = url;
    domscript.charset = 'utf-8';
    if (onload) {
        domscript.onloadDone = false;
        domscript.onload = onload;

        domscript.onreadystatechange = function () {
            if ("loaded" === domscript.readyState && domscript.onloadDone) {
                domscript.onloadDone = true;
                domscript.onload();
                domscript.removeNode(true);
            }
        };

  }
  document.getElementsByTagName('head')[0].appendChild(domscript);
}


