// @fileOverview: js/popup.js
// Date: 2013- 7-17
// Time: 10:07
// @description: songtaste popup action
// @author: gongbing

/*jshint browser: true, nomen: true, indent: 4, maxlen: 80, strict: true, curly: true */
/*global define: true, $: true, _: true, App: true */

// @description: 
(function (win, doc, undefined) {
    'use strict';

    var html;
    $.ajax({
        url: 'http://songtaste.com/music/',
        success: function (data) {
            songList(data);
        }
    });

    // @method: songList
    // @description: 
    // @param: 
    // @return: 
    var songList = function (html) {
        var songlist = [];
        var list = html.match(/MSL(.+)/g);
        _.each(list, function (val, num) {
            console.log(val, num);
            var songId = val.split(',')[1];
            console.log(songId);
            if (/^\d+$/g.test(songId)) {
                songlist.push(songId);
            }
        });
    };
    

}(window, document));
