$(document).ready(function () {

	// 提示登录
	var site = /site=(.*)/.exec(location.search);

	if(!!site && site.length==2){
        var params = ['action=CHROME_ORDER_LOGIN_POPUP', "site="+site,
            "type=ARMANI_EXTENSION_POPUP"];
        sendLog(params);
		askUserLogin(site[1]);
		return ;
	}

    var key = decodeURIComponent(/key=(.*?)&/.exec(location.search)[1]);
    var isNew = /isNew=(.*)/.exec(location.search)[1];
	try{
    	var val = JSON.parse(localStorage[key]);
	}catch(e){
		console.log(e);
		return;
	}
    var params = ['action=CHROME_ORDER_POPUP','isNew='+isNew, "site="+site,
        "type=ARMANI_EXTENSION_POPUP"];
	if(isNew.indexOf("true") != 0) {
		// 订单新状态的弹窗
		var index = /msgIndex=(.*)/.exec(location.search)[1];
		sendLog(params);
		orderNewStatus(key, val, index);	
	}
	else {
		// 新订单
		sendLog(params);
		newOrder(key, val);
	}
	
});

// 提示用户登录弹窗
function askUserLogin(site){
	var orderNum = 0;
	for(var orderKey in localStorage) {
    	if(orderKey.indexOf("order:") == 0) {
    		var orderValue = getOrderValue(orderKey);
    		if(!!orderValue && (orderValue['status'] == 'RUNNING' || orderValue['status'] == 'NEW')
    			 && orderKey.indexOf(site)>0)
				orderNum += 1;
       	}
	}  
	$("div.login").show();
	var name = getSiteDisName(site);
	$("ul > li > span.c-hl")[0].innerHTML = "有" + orderNum + "个待收货订单";
	$("ul > li > span.f-wb")[0].innerHTML = name;
	$("ul > li > a").attr("href", getSiteLoginUrl(site));
	$("ul > li > a").click(function(){
		window.close();
	});
	$("div.ft > a.fr").click(function(){
		window.close();
	});

	var configStr = localStorage['orderConfig']; 			
	if(!!configStr){
		try{
			var orderConfig = JSON.parse(configStr);
			$("a.faq-login").attr("href", orderConfig["global"].helpUrl);
		}catch(e){
			console.log(e);
		}
	}
}

// 订单新状态弹窗
function orderNewStatus(key, val, index){
	index = parseInt(index);
	var len = val.content.length;
	if(index<=0 || len<index)
		console.log("parse msgIndex error.");
	var record = val.content[len-index];
	var productName = val.productName.length>17?val.productName.substring(0,17)+"...":val.productName;
	$("div.new-status").show();
	$("dl.shipment-detail > dt")[0].innerHTML = getSiteDisName(key.split(":")[1])  + "（" + productName + "）";
	$("dl.shipment-detail > dd.time")[0].innerHTML = record.time;
	$("dl.shipment-detail > dd.context")[0].innerHTML = record.context;
	$("a.btn-submit").attr("href", val.detailLink);
	$("a.btn-submit").click(function(){
		window.close();
	});
	$("a.c-gray").click(function(){
		var val = getOrderValue(key);
		if(!!val){
			val['status'] = 'CANCEL';
			localStorage[key] = JSON.stringify(val);
		}
		window.close();
	});
}

function newOrder(key, val){
	console.log("新订单，询问用户是否需要提醒");
	var siteName =  getSiteDisName(key.split(":")[1]);
	var id = val.expressId;
	var productName = val.productName.length>15 ? val.productName.substring(0,15)+"...":val.productName;
	if(id.length!=0)
	    id = "(" + id + ")";
	$("div.new-order").show();
	$("ul > li > span.site")[0].innerHTML = siteName;
	$("ul > li > span.title")[0].innerHTML = productName;
	$("ul > li > span.id")[0].innerHTML = val.expressCompany + id;
	$("a.btn-submit").click(function(){
		window.close();
	});
	$("a.c-gray").click(function(){
		var val = getOrderValue(key);
		if(!!val){
			val['status'] = 'CANCEL';
			localStorage[key] = JSON.stringify(val);
		}
		window.close();
	});
}


function getOrderValue(orderKey){
		var tmpStr = localStorage[orderKey];
		if(tmpStr==null)
			return null;
		try{
			var orderValue = JSON.parse(tmpStr);
		}catch(e){
			localStorage.removeItem(orderKey);
			console.log(e);
		}
		return orderValue;
}	

function getSiteDisName(site){
		switch(site){
			case 'JD':
				var siteName = "京东商城";
				break;
			case 'TAOBAO':
				var siteName = "淘宝商城";
				break;
			case 'TMALL':
				var siteName = "天猫商城";
				break;
			case 'AMAZON':
				var siteName = "亚马逊";
				break;
		}
	return siteName;
}

function getSiteLoginUrl(site){
		switch(site){
			case 'JD':
				return 'http://passport.jd.com/new/login.aspx';
			case 'TAOBAO':
				return 'https://login.taobao.com/member/login.jhtml';
			case 'TMALL':
				return 'https://login.taobao.com/member/login.jhtml';
			case 'AMAZON':
				return 'https://www.amazon.cn';
		}
}
