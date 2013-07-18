// @fileOverview: js/UICtrol.js
// Date: 2013- 7-17
// Time: 16:21
// @description: music box UI update / event bind
// @author: gongbing

/*jshint browser: true, nomen: true, indent: 4, maxlen: 80, strict: true, curly: true */
/*global define: true, $: true, _: true, App: true */

// @description: 
var UI = (function () {
    "use strict";
    var $musicInfo = $('#music-info');
    var $playList = $('#play-list');
    var musicInfoTmpl = $('script[mod-name="music-info"]').html();
    var playListTmpl = $('script[mod-name="play-list"]').html();
    var $next = $('[node-type="next"]');

    return {
        render: function (music, playlist) {
            var html = tmpl(musicInfoTmpl, music);
            $musicInfo.html(html);
            html = "";
            _.each(playlist, function (item) {
                html += tmpl(playListTmpl, item);
            });
            $playList.html(html);
            $next.removeClass('active');
        }
    };
}());
