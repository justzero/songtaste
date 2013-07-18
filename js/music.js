// @fileOverview: js/music.js
// Date: 2013- 7-17
// Time: 10:07
// @description: songtaste music box
// @author: gongbing

/*jshint browser: true, nomen: true, indent: 4, maxlen: 80, strict: true, curly: true */
/*global define: true, $: true, _: true, App: true */

// @description: 
(function (win, doc, undefined) {
    'use strict';

    //  sl: array[songId] -- song list
    $.ajax({
        url: 'http://songtaste.com/music/',
        success: function (data) {
            var sl = songList(data);
            var songListInfo = formatListInfo(sl);
            player.update(songListInfo);
        }
    });

    // @method: songList
    // @description: parse html output songId list
    // @param: html fragment
    // @return: array -- songlist
    var songList = function (html) {
        var songlist = [];
        var list = html.match(/MSL(.+)/g);
        _.each(list, function (val, num) {
            val = val.replace(/^.+\((".+")\).+$/g, '$1')
                .replace(/\s*"\s*/g, '');
            var songId = val.split(',');
            songlist.push(songId);
        });
        return songlist;
    };

    // @method: formatListInfo
    // @description: formate songlist info
    // @param: array[array["string",....]]
    // @return: array[json]
    var formatListInfo = function (sl) {
        var list = [];
        _.each(sl, function (val) {
            var info = {
                name: val[0] || "",
                songId: val[1] || 0,
                author: val[2] || "",
                userId: val[3] || 0
            };
            list.push(info);
        });
        return list;
    };

}(window, document));
