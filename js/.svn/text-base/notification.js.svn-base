window.onload = function () {
    var thisMsg, pubTime, imgTag, titleTag,
        subTitleTag, summeryTag, toSeeTag, snd, searchQuery, pubTime;

    pubTime = decodeURIComponent((window.location.search).match(/^\?id\=([0-9]*)/)[1]);
    thisMsg = JSON.parse(localStorage['push.notifyMsgs'])[pubTime];

    imgTag = document.querySelector(".img-wrapper img");
    titleTag = document.querySelector(".content h3 a");
    imgWrapTag = document.querySelector(".img-wrapper a");
    subTitleTag = document.querySelector(".content .sub-title");
    summeryTag = document.querySelector(".content .summary");
    toSeeTag = document.querySelector(".to-see");
    thisMsg.link = (thisMsg.link).indexOf("?") > 0 ?
        thisMsg.link + "&keyfrom=pushpopup" :
        thisMsg.link + "?keyfrom=pushpopup";

    imgTag.setAttribute("src", thisMsg.imageUrl);
    imgTag.setAttribute("alt", thisMsg.title);
    titleTag.setAttribute("href", thisMsg.link);
    toSeeTag.setAttribute("href", thisMsg.link);
    imgWrapTag.setAttribute("href", thisMsg.link);
    summeryTag.innerHTML = thisMsg.summary;
    subTitleTag.innerText = thisMsg.subTitle;
    titleTag.innerText = thisMsg.title;
    sendLog(["action=CHROMEPUSH_POPUP", "type=ARMANI_EXTENSION_POPUP"]);
}
