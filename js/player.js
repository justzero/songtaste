var player = (function () {

    var songlist = [
        //class music -- {
            //name: "music name",
            //songId: 0000,
            //author: "upload music user name",
            //userId: 0000
            //musicUrl: "xxxx" ? null(default)
        //}
    ];
    var playerlist = {
        //  same as {songlist}
    };

    var $audio = $('#player');
    var audio = $audio[0];


    return {

        // @method: catchMp3Url
        // @description: catch mp3 url from music info (songID)
        // @param: {music, fn}
        // @return: null
        catchMp3Url: function (music) {
            var callback = this.playMusic;
            if (music.musicUrl) {
                callback(music.musicUrl, music);
            }
            // http://huodong.duomi.com/songtaste/?songid={id}
            var url = "http://huodong.duomi.com/songtaste/?songid=" + music.songId;
            $.ajax({
                url: url,
                timeout: 5000,
                success: function (data) {
                    data.replace(/http:\/\/media.+\.mp3/g, function (mp3Url) {
                        //console.log(mp3Url);
                        music.musicUrl = mp3Url;
                        callback(mp3Url, music);
                    });
                },
                error: function () {
                    console.log("music url load error!");
                }
            });
        },

        // @method: update
        // @param: arr[music]
        update: function (sl) {
            songlist = sl;
            this.play();
        },

        // @method: randomMusic
        // @return: songID
        randomMusic: function () {
            var len = songlist.length;
            if (len === 0) {
                return null;
            }
            var index = Math.floor(Math.random(0, 1) * len);
            return songlist[index];
        },

        playMusic: function (mp3Url, music) {
            if (!mp3Url) {
                return;
            }

            $audio.attr('src', mp3Url);
            audio.play();
            UI.render(music, playerlist);
            //console.log("playerlist", music);
            playerlist[music.songId] = music;
        },

        play: function () {
            var self = this;
            var music  = self.randomMusic();
            if (!music) {
                console.log("No music list!");
                return;
            }
            audio.pause();
            self.catchMp3Url(music);
        },

        itemPlay: function (songId) {
            var music = playerlist[songId];
            if (!music) {
                error("error No this num in playlist!");
                return;
            }
            this.catchMp3Url(music);
        },

        destruct: function () {
            songlist = null;
            console.log(playerlist);
        }
    };

}());


var $audio = $('#player');
var play = player.play.bind(player);

// bind event
// play next when music ended
$audio.bind('ended', play);

//  next music
$(document).delegate("[node-type='next']", 'click', function (e) {
    console.log('next');
    var $self = $(this);
    $self.addClass('active');
    play();
})

//  click music play
.delegate('[node-type="play"]', "click", function (e) {
    e.preventDefault();
    var songId = $(this).data('id');
    if (!songId) {
        return;
    }
    player.itemPlay(songId);
});
