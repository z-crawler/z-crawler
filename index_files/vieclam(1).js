/*
 * Các function js dùng chung 
 */

function Set_Cookie( name, value, expires, path, domain, secure )
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	/*
	if the expires variable is set, make the correct
	expires time, the current script below will set
	it for x number of days, to make it for hours,
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires )
	{
	expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function GetXmlHttpObject(){
	var objXMLHttp = null;
	if( window.XMLHttpRequest){
		objXMLHttp = new XMLHttpRequest();
	}else if( window.ActiveXObject){
		objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return objXMLHttp;
}

function AjaxAction( where, url){	
	var xmlHttp = new GetXmlHttpObject();
	if(xmlHttp==null){
		return;
	}
	var bar = '<img src="/images/loading.gif" align="absmiddle" height="20px" width="20px" title="&#272;ang t&#7843;i d&#7919; li&#7879;u"/> &#272;ang t&#7843;i d&#7919; li&#7879;u';		
	document.getElementById( where).innerHTML = bar;	
	xmlHttp.onreadystatechange= function(){		
		if(xmlHttp.readyState==4 || xmlHttp.readyState == 200){		
			document.getElementById( where).innerHTML = xmlHttp.responseText
		}
	}
	// Set header so the called script knows that it's an XMLHttpRequest
	//xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xmlHttp.open( "GET", url, true);
	xmlHttp.send(null);
}

//Ham randomizeNumber() tra lai mot so ngau nhien
function randomizeNumber(){
	today=new Date();
	jran=today.getTime();
	number = 1000000;
	ia=9301;
	ic=49297;
	im=233280;
	jran = (jran*ia+ic) % im;
	return Math.ceil( (jran/(im*1.0)) *number);
}
//Ham chia se linkhay
function addto_linkhay(url)
{
	window.open('http://linkhay.com/submit?link_url='+url+'');
}
//Ham chia se facebook
function addto_facebook(url, title)
{
	window.open('http://www.facebook.com/share.php?u='+url+'&t='+title+'');
}
//Ham chia se twitter
function addto_twitter(url)
{
	window.open('http://twitter.com/home?status='+url+'');
}
//Ham chia se google
function addto_google(url,title)
{
	window.open('http://www.google.com/bookmarks/mark?op=edit&bkmk='+url+'&title='+title+'');
}
//Ham chia se buzz
function addto_buzz(url)
{
	window.open('http://buzz.yahoo.com/buzz?publisherurn=24H.COM.VN&targetUrl='+url+'');
}


/**
* @desc: 24h javascript quang cao
*
* @author: hoangnv@24h.com.vn @date: 2010/09/21 @desc: Co che banner moi
* @author: hoangnv@24h.com.vn @date: 2010/10/21 @desc: Bo sung co che troi ngu canh
* @author: hoangnv@24h.com.vn @date: 2010/10/07 @desc: Bo sung chuc nang dong banner
* @author: hoangnv@24h.com.vn @date: 2010/12/29 @desc: Bo sung banner richmedia vi tri luan phien
* @author: hoangnv@24h.com.vn @date: 2011/01/07 @desc: Sua loi vi tri top banner trang trong neu dang qua 3 banner
* @author: hoangnv@24h.com.vn @date: 2011/03/08 @desc: Them banner dang script
*/

var richZIndex = 10000;
var pageCookie = Math.floor(Math.random()*3);
var bannerDisplay = new Array();
if (c = getCookie('pageCookie')) {
	pageCookie = parseInt(c);
}
pageCookie = pageCookie%1000;
setCookie('pageCookie', ++pageCookie, 24, '/', '', '');

function getElement( elementID) {
	return document.getElementById(elementID);
}

function isIE() {
	if (navigator.appName=='Microsoft Internet Explorer') {
		return true;
	}
	return false;
}

function isIE6() {
	if (!window.XMLHttpRequest) {
		return true;
	}
	return false;
}

function f_filterResults( n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}
function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_clientWidth() {
	return f_filterResults (
		window.innerWidth ? window.innerWidth : 0,
		document.documentElement ? document.documentElement.clientWidth : 0,
		document.body ? document.body.clientWidth : 0
	);
}
function f_clientHeight() {
	return f_filterResults (
		window.innerHeight ? window.innerHeight : 0,
		document.documentElement ? document.documentElement.clientHeight : 0,
		document.body ? document.body.clientHeight : 0
	);
}

function scrollwindow( speed, callFunc){
	var pre = f_scrollLeft();
	window.scrollBy(speed,0);
	var current = f_scrollLeft();
	if (pre==current) {
		clearTimeout(doExpand);
		if (callFunc!='' && callFunc!=undefined) {
			eval(callFunc);
		}
	}
	else {
		doExpand = setTimeout('scrollwindow('+speed+', "'+callFunc+'")', 20);
	}
}

function smoothResize( elementID, v_width, v_height) {
	var speed = 6;
	var obj = getElement(elementID);
	var dx = (obj.offsetWidth<v_width) ? 1 : -1; dx = dx * speed;
	var dy = (obj.offsetHeight<v_height) ? 1 : -1; dy = dy * speed;
	if ( obj.offsetWidth!=v_width) {
		obj.style.width = obj.offsetWidth + dx + 'px';
		if ( (dx>0 && obj.offsetWidth>v_width) || (dx<0 && obj.offsetWidth<v_width)) {
			obj.style.width = v_width + 'px';
		}
	}
	if ( obj.offsetWidth!=v_height) {
		obj.style.height = obj.offsetHeight + dy + 'px';
		if ( (dy>0 && obj.offsetHeight>v_height) || (dy<0 && obj.offsetHeight<v_height)) {
			obj.style.height = v_height + 'px';
		}
	}
	
	if ( obj.offsetWidth!=v_width || obj.offsetHeight!=v_height) {
		setTimeout('smoothResize("'+elementID+'", '+v_width+', '+v_height+')', 20);
	}
}

function resize( elementID, v_width, v_height) {
	var obj = getElement(elementID);
	obj.style.left = '0px';
	obj.style.top = '0px';
	obj.style.width = v_width+'px';
	obj.style.height = v_height+'px';
}

function getPageSize(){	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function openPopBanner( elementID, path, bannerName, v_width, v_height, v_type) {
	eval(elementID.substring(0, elementID.lastIndexOf("_"))+".stopShow=true;");
	var c_width = f_clientWidth();
	var c_height = f_clientHeight();
	if ( !getElement(elementID+'_sub')) {
		var objBody = document.getElementsByTagName("body").item(0);
		var objOverlay = document.createElement("div");
		objOverlay.setAttribute('id', elementID+'_sub');
		objOverlay.style.position = 'absolute';
		objOverlay.style.zIndex = '1000';
		objOverlay.style.top = '0%';
		objOverlay.style.left = '0%';
		objOverlay.style.width = '100%';
		objBody.insertBefore(objOverlay, objBody.firstChild);
	}
	getElement(elementID+'_sub').style.display = 'block';
	getElement(elementID+'_sub').style.zIndex = richZIndex++;

	
	switch ( v_type) {
		case 'lightbox':
			if ( isIE6()) {
				var arrayPageSize = getPageSize();
				var elementStyle = 'position:absolute;top:0%;left:0%;width:100%;height:'+arrayPageSize[1]+'px;';
				var elementSubStyle = 'position:absolute;z-index:1002;overflow:auto;top:'+(f_scrollTop()+(c_height-v_height)/2)+'px;left:'+(c_width-v_width)/2+'px;width:'+v_width+'px;height:'+v_height+'px;';
			}
			else {
				var elementStyle = 'position:fixed;top:0%;left:0%;width:100%;height:100%;';
				var elementSubStyle = 'position:fixed;z-index:1002;overflow:auto;top:'+(c_height-v_height)/2+'px;left:'+(c_width-v_width)/2+'px;width:'+v_width+'px;height:'+v_height+'px;';
			}
			getElement(elementID+'_sub').innerHTML = '<div style="'+elementStyle+'background-color:black;z-index:1001;-moz-opacity:0.8;opacity:.80;filter:alpha(opacity=80);" onclick="closePopBanner(\''+elementID+'_sub\')"></div>';
			getElement(elementID+'_sub').innerHTML += '<div style="'+elementSubStyle+'"><embed type="application/x-shockwave-flash" src="'+path+bannerName+'" quality="high" allowscriptaccess="always" wmode="transparent" width="100%" height="100%" flashvars="divID='+elementID+'_sub" /></div>';
			break;
		case 'takeover':
		default:
			getElement(elementID+'_sub').innerHTML = '<div style="position:absolute;top:0%;left:'+(c_width-v_width)/2+'px;width:'+v_width+'px;height:'+v_height+'px;"><embed type="application/x-shockwave-flash" src="'+path+bannerName+'" quality="high" allowscriptaccess="always" wmode="transparent" width="100%" height="100%" flashvars="divID='+elementID+'_sub" /></div>';
			break;
	}
}

function closePopBanner( elementID) {
	getElement(elementID).innerHTML = '';
	getElement(elementID).style.display = 'none';
}

function closeBanner( elementID) {
	var strObj = elementID.substring(0, elementID.lastIndexOf("_"));
	document.getElementById(eval(strObj).aNodes[elementID.substring(elementID.lastIndexOf("_")+1)].name).style.display = "none";
	eval(strObj).aNodes.splice(elementID.substring(elementID.lastIndexOf("_")+1), 1);
	eval(strObj).changeBanner();
	setCookie(elementID, elementID, 24, '/', '', '');
}

function expand( elementID, v_width1, v_height1, v_width2, v_height2, v_direction, v_type) {
	eval(elementID.substring(0, elementID.lastIndexOf("_"))+".stopShow=true;");
	getElement(elementID).style.zIndex = richZIndex++;
	var objSub = getElement(elementID+'_sub');
	var objChild = getElement(elementID+'_child');
	switch ( v_type) {
		case 'sitekick':
			objSub.style.width = v_width2+'px';
			objSub.style.height = v_height2+'px';
			scrollwindow(10); // speed = 10
			break;
		case 'breakpage':
			smoothResize(elementID, v_width2, v_height2);
			smoothResize(elementID+'_sub', v_width2, v_height2);
			break;
		default:
			objSub.style.width = v_width2+'px';
			objSub.style.height = v_height2+'px';
			objChild.style.top = '0px';
			objChild.style.left = '0px';
			switch ( v_direction) {
				case 'phai_xuong':
					break;
				case 'phai_len':
					objSub.style.top = (v_height1-v_height2)+'px';
					break;
				case 'trai_xuong':
					objSub.style.left = (v_width1-v_width2)+'px';
					break;
				case 'trai_len':
					objSub.style.left = (v_width1-v_width2)+'px';
					objSub.style.top = (v_height1-v_height2)+'px';
					break;
				case 'len_xuong':
					objSub.style.top = (v_height1-v_height2)/2+'px';
					break;
			}
	}
}

function collapse( elementID, v_width1, v_height1, v_width2, v_height2, v_direction, v_type) {
	switch ( v_type) {
		case 'breakpage':
			smoothResize(elementID+'_sub', v_width1, v_height1);
			smoothResize(elementID, v_width1, v_height1);
			break;
		case 'sitekick':
			scrollwindow(-10, "resize('"+elementID+"_sub',"+v_width1+","+v_height1+")");
			break;
		default:
			resize( elementID+'_sub', v_width1, v_height1);
			objChild = getElement(elementID+'_child');
			switch ( v_direction) {
				case 'phai_len':
					objChild.style.top = (v_height1-v_height2) + 'px';
					break;
				case 'trai_len':
					objChild.style.left = (v_width1-v_width2) + 'px';
					objChild.style.top = (v_height1-v_height2) + 'px';
					break;
				case 'trai_xuong':
					objChild.style.left = (v_width1-v_width2) + 'px';
					break;
				case 'len_xuong':
					objChild.style.top = (v_height1-v_height2) / 2 + 'px';
					break;
			}
	}
}

function fw24h_getFlash( object) {
	var str = '<object id="swf_'+object.name+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" border="0" height="'+object.height+'" width="'+object.width+'"><param name="movie" value="'+object.bannerPath+'"><param name="AllowScriptAccess" value="always"><param name="quality" value="High"><param name="wmode" value="transparent"><embed src="'+object.bannerPath+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="'+object.height+'" width="'+object.width+'"></object>';
	if (_chrome_version() >= 27) {
        var str = '<embed src="'+object.bannerPath+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="'+object.height+'" width="'+object.width+'">';
    }
	return str;
}

function fw24h_getFloatFlash( object, flash_vars) {
	var str = '<object id="swf_'+object.name+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" border="0" height="100%" width="100%"><param name="movie" value="'+object.bannerPath+object.name1+'"><param name="AllowScriptAccess" value="always"><param name="quality" value="High"><param name="wmode" value="transparent"><param name="flashVars" value="'+flash_vars+'"><embed src="'+object.bannerPath+object.name1+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="100%" width="100%" flashVars="'+flash_vars+'"></object>';
	if (_chrome_version() >= 27) {
        var str = '<embed src="'+object.bannerPath+object.name1+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" height="100%" width="100%" flashVars="'+flash_vars+'">';
    }
	return str;
}

// BANNER OBJECT
function Banner(objName){
    this.obj = objName;
    this.aNodes = [];
    this.bNodes = [];
    this.currentBanner = 0;//Math.floor(Math.random()*3);
    this.intLoopCount = 1;
    this.intBannerFix = -1;
    this.intBannerLong = 0;
    this.stopShow = false;
};

// ADD NEW BANNER
Banner.prototype.add = function(bannerType, bannerPath, bannerDuration, height, width, hyperlink, desc, popup) {
    this.aNodes[this.aNodes.length] = new Node(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, '', popup);
};
// Add2
Banner.prototype.add2 = function(bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup) {
    this.bNodes[this.bNodes.length] = new Node(this.obj +"_"+ this.bNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup);
};
// Add3 - float media
Banner.prototype.add3 = function(bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2) {
    this.aNodes[this.aNodes.length] = new NodeRich(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2);
};

// Node object
function Node(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup) {
    this.name = name;
    this.bannerType = bannerType;
    this.bannerPath = bannerPath;
    this.bannerDuration = bannerDuration;
    this.height = height
    this.width = width;
    this.hyperlink= hyperlink;
    this.position= position;
    this.popup= popup;
};

function Node2(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position) {
    this.name = name;
    this.bannerType = bannerType;
    this.bannerPath = bannerPath;
    this.bannerDuration = bannerDuration;
    this.height = height
    this.width = width;
    this.hyperlink= hyperlink;
    this.position= position;
};

function NodeRich(name, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc) {
    this.name = name;
    this.bannerType = bannerType;
    this.bannerPath = bannerPath;
    this.bannerDuration = bannerDuration;
    this.height = height
    this.width = width;
    this.height2= height2;
    this.width2= width2;
    this.type= type;
    this.name1= name1;
    this.name2= name2;
    this.desc= desc;
};

function genBanner( bannerArr, bannerClass) {
	bannerClass = (bannerClass==undefined) ? 'm_banner_hide' : bannerClass;
	str = '';
    inlineCode = '';
    bannerArr.richbanner = (bannerArr.width2>0 && bannerArr.height2>0) ? true : false;
	if (bannerArr.richbanner) {
		if ( bannerArr.type=='lightbox' || bannerArr.type=='takeover') {
			str += '<div id="'+bannerArr.name+'" style="width:'+bannerArr.width+'px; height:'+bannerArr.height+'px;" class="'+bannerClass+'">';
			str += '</div>';
            bannerDisplay[bannerArr.name] = fw24h_getFloatFlash( bannerArr, 'divID='+bannerArr.name+'&path='+bannerArr.bannerPath+'&bannerName='+bannerArr.name2+'&bannerWidth='+bannerArr.width2+'&bannerHeight='+bannerArr.height2+'&typeOpen='+bannerArr.type);
		}
		else {
			switch (bannerArr.type) {
				case 'phai_xuong':
					childSdStyle = 'left:0px;';
					break;
				case 'phai_len':
					childStyle = 'left:0px;top:'+(bannerArr.height-bannerArr.height2)+'px;';
					break;
				case 'trai_xuong':
					childStyle = 'left:'+(bannerArr.width-bannerArr.width2)+'px;';
					break;
				case 'trai_len':
					childStyle = 'top:'+(bannerArr.height-bannerArr.height2)+'px;';
					childStyle += 'left:'+(bannerArr.width-bannerArr.width2)+'px;';
					break;
				case 'len_xuong':
					childStyle = 'left:0px;top:'+(bannerArr.height-bannerArr.height2)/2+'px;';
					break;
				default:
					childStyle = 'left:0px;';
			}
			str += '<div id="'+bannerArr.name+'" class="'+bannerClass+'"';
			str += 'style="position:relative;left:0px;width:'+bannerArr.width+'px;height:'+bannerArr.height+'px;">';
			str += '	<div id="'+bannerArr.name+'_sub" style="position:absolute;overflow:hidden;left:0px;width:';
			str += 		bannerArr.width+'px;height:'+bannerArr.height+'px;">';
			str += '		<div id="'+bannerArr.name+'_child" style="position:absolute;';
			str += '		width:'+bannerArr.width2+'px;height:'+bannerArr.height2+'px;'+childStyle+'">';
			str += '		</div>';
			str += '	</div>';
			str += '</div>';
            bannerDisplay[bannerArr.name+'_child'] = fw24h_getFloatFlash( bannerArr, 'divID='+bannerArr.name+'&path='+bannerArr.bannerPath+'&filename1='+bannerArr.name1+'&filename2='+bannerArr.name2+'&width1='+bannerArr.width+'&height1='+bannerArr.height+'&width2='+bannerArr.width2+'&height2='+bannerArr.height2+'&directionOpen='+bannerArr.type+'&typeOpen='+bannerArr.type);
		}
	}
	else {
		bannerStr = new Array();
		bannerArr.aBanner = bannerArr.bannerPath.split('|');
		bWidth = (bannerArr.width>bannerArr.height && bannerArr.aBanner.length>1) ? bannerArr.width*2+5 : bannerArr.width;
		for ( i=0; i<bannerArr.aBanner.length; i++) {
			if ( i==0) {
				bannerArr.bannerPath = bannerArr.aBanner[0];
			}
			else {
				//bannerStr[i] += '&nbsp;';//khoang cach giua 2 banner
				bParams = bannerArr.aBanner[i].split('::');
				bannerArr.bannerType = bParams[0];
				bannerArr.bannerPath = bParams[1];
				bannerArr.height = bParams[2];
				bannerArr.width = bParams[3];
				bannerArr.hyperlink = bParams[4];
				bannerArr.popup = bParams[5];
			}
			bannerStr[i] = '';
			if (bannerArr.hyperlink != "" && bannerArr.bannerType == "IMAGE"){
				bannerStr[i] += '<a href="'+bannerArr.hyperlink+'" '+((bannerArr.popup && bannerArr.popup==1)?'target="_blank"':'')+'>';
			}
				   
			if ( bannerArr.bannerType == "SCRIPT" ){
                inlineCode = bannerArr.bannerPath;
            }
			else if ( bannerArr.bannerType == "FLASH" ){
				bannerStr[i] += fw24h_getFlash( bannerArr);
			}else if ( bannerArr.bannerType == "IMAGE" ){
				bannerStr[i] += '<img src="'+bannerArr.bannerPath+'" ';
				bannerStr[i] += 'border="0" ';
				bannerStr[i] += 'alt="" ';
				bannerStr[i] += 'height="'+bannerArr.height+'" ';
				bannerStr[i] += 'width="'+bannerArr.width+'">';
			}

			if( bannerArr.bannerType == "TEXT") {
				bannerStr[i] += '<iframe width="'+bannerArr.width+'" height="'+bannerArr.height+'" src="'+bannerArr.bannerPath+'" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>'
			}

			if (bannerArr.hyperlink != "" && bannerArr.bannerType == "IMAGE"){
				bannerStr[i] += '</a>';
			}
		}
		str += '<span name="'+bannerArr.name+'" '
		str += 'id="'+bannerArr.name+'" ';
		str += 'class="'+bannerClass+'" ';
		str += 'bgcolor="#FFFCDA" ';        // CHANGE BANNER COLOR HERE
		str += 'align="center" ';
		str += 'valign="top" ';
		if ( bannerArr.bannerType == "SCRIPT" && inlineCode != inlineCode.replace("google_ad_client", "")){
			str += ' >\n';
		} else {
			str += 'style="width:'+bWidth+'px; height:'+bannerArr.height+'px;" >\n';
		}
		
        str += inlineCode;
		str += '</span>';
		// Hien thi khoang trang giua 2 banner top
		if(bannerArr.name == 'ADS_2_15s_0'){
			str += '&nbsp;';
		}
        if (inlineCode=='') {
            bannerStr = bannerStr.sort( function(){ return Math.random()-0.5; });
            bannerDisplay[bannerArr.name] = bannerStr.join( '<img src="/images/blank.gif" width="5" height="5" alt="" />');
        }
	}
	return str;
}

function displayBanner()
{
    for (i in bannerDisplay) {
        divID = getElement(i);
        divID.innerHTML = bannerDisplay[i];
    }
}

// Outputs the banner to the page
Banner.prototype.toString = function() {
    // this.currentBanner = Math.floor(Math.random()*this.aNodes.length); // lay ngau nhien 1 banner
    this.currentBanner = pageCookie%this.aNodes.length;
    var str = ""
    for (var iCtr=0; iCtr < this.aNodes.length; iCtr++){
        if (getCookie(this.aNodes[iCtr].name)) {
            this.aNodes.splice(iCtr, 1);
            continue;
        }
        if (this.currentBanner!=iCtr) {
            continue;
        }
        else {
            str += genBanner( this.aNodes[iCtr], 'm_banner_show');
        }
    }
    document.write( str);
    str = '';
    return str;
};

// START THE BANNER ROTATION
Banner.prototype.start = function(){
	return true;
	if (this.aNodes.length==0)
	{
		return true;
	}
	if( this.stopShow) {
		return true;
	}
	this.changeBanner();
	var thisBannerObj = this.obj;
	// CURRENT BANNER IS ALREADY INCREMENTED IN cahngeBanner() FUNCTION
	setTimeout(thisBannerObj+".start()", this.aNodes[this.currentBanner].bannerDuration * 1000);
}

// CHANGE BANNER
Banner.prototype.changeBanner = function(){
    try {
		var thisBanner;
		var prevBanner = -1;
		if (this.currentBanner>this.aNodes.length-1)
		{
			this.currentBanner=0;
		}
		if (this.currentBanner < this.aNodes.length ){
			thisBanner = this.currentBanner;
			if (this.aNodes.length > 1){
				if ( thisBanner > 0 ){
					prevBanner = thisBanner - 1;
				}else{
					prevBanner = this.aNodes.length-1;
				}
			}
			if (this.currentBanner < this.aNodes.length - 1){
				this.currentBanner = this.currentBanner + 1;
			}else{
				this.currentBanner = 0;
			}
		}
		

		if (prevBanner >= 0){
			if (navigator.appName.indexOf ("Microsoft") !=-1 && !this.aNodes[prevBanner].richbanner && this.aNodes[prevBanner].aBanner.length==1 && this.aNodes.length>1) stopmovie('swf_'+this.aNodes[prevBanner].name);
			document.getElementById(this.aNodes[prevBanner].name).className = "m_banner_hide";
		}
		if (navigator.appName.indexOf ("Microsoft") !=-1 && !this.aNodes[thisBanner].richbanner && this.aNodes[thisBanner].aBanner.length==1 && this.aNodes.length>1) goAndPlay('swf_'+this.aNodes[thisBanner].name, 1);
		document.getElementById(this.aNodes[thisBanner].name).className = "m_banner_show";
		this.intLoopCount++;
		
	} catch(e) {}
}

function thisMovie(movieName) {
    // IE and Netscape refer to the movie object differently.
    // This function returns the appropriate syntax depending on the browser.
    if (navigator.appName.indexOf ("Microsoft") !=-1) {
        return window[movieName]
    } else {
        return document[movieName]
    }
}

// Checks if movie is completely loaded.
// Returns true if yes, false if no.
function movieIsLoaded (theMovie) {
    if (typeof(theMovie) != "undefined") {
        return theMovie.PercentLoaded() == 100;
    } else {
        return false;
    }
}

function playmovie(movieName) {
    if (movieIsLoaded(thisMovie(movieName))) {
        thisMovie(movieName).Play();
    }
}

function stopmovie(movieName) {
    if (movieIsLoaded(thisMovie(movieName))) {
        thisMovie(movieName).StopPlay();
    }
}

function goAndPlay(movieName, theFrame) {
    if (movieIsLoaded(thisMovie(movieName))) {
        thisMovie(movieName).GotoFrame(theFrame);
        thisMovie(movieName).Play();
    }
}


// d_Banner2
// Written by ThaoDX
function d_Banner2(objName){
    this.obj = objName;
    this.aNodes = [];
    this.bNodes = [];
    this.currentBanner = 0;
};
// ADD NEW BANNER
d_Banner2.prototype.add = function(bannerType, bannerPath, height, width, hyperlink, position, popup) {
    var bannerDuration = 0;
    this.aNodes[this.aNodes.length] = new Node(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup);
};
// add2
d_Banner2.prototype.add2 = function(bannerType, bannerPath, height, width, hyperlink, position, popup) {
    var bannerDuration = 0;
    this.bNodes[this.bNodes.length] = new Node2(this.obj +"_b_"+ this.bNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, position, popup);
};
// Richmedia
d_Banner2.prototype.add3 = function(bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc) {
    var bannerDuration = 0;
    this.aNodes[this.aNodes.length] = new NodeRich(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc);
};
// Richmedia co dinh xen ke luan phien
d_Banner2.prototype.add4 = function(bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc) {
    var bannerDuration = 0;
    this.aNodes[this.bNodes.length] = new NodeRich(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc);
};
// Outputs the banner to the page
d_Banner2.prototype.toString = function() {
    var str = "";
    var BannerPostion = Math.floor(Math.random()*12321) % this.aNodes.length;
    var i = 1;
    for (var iCtr=BannerPostion; iCtr < this.aNodes.length; iCtr++){
        // iB for loop
        //str += "I: " + i + "<HR>";
        for(var iB=0; iB < this.bNodes.length; iB++){
            if(i == this.bNodes[iB].position){
                str += genBanner( this.bNodes[iB], 'd_banner2_show');
                i++; continue;
            }
        }
        // End iB for loop
        str += genBanner( this.aNodes[iCtr], 'd_banner2_show');
        i++;
    }
    //BannerPostion = 0;
    //return str;
    //str += "<HR>a " + BannerPostion + "  a <HR>";;
    for (var iCtr=0; iCtr < BannerPostion; iCtr++){
        // iB for loop
        for(var iB=0; iB < this.bNodes.length; iB++){
            if(i == this.bNodes[iB].position){
                str += genBanner( this.bNodes[iB], 'd_banner2_show');
                i++; continue;
            }
            else{
                //str = str + 'i: e '+i;	
            }
        }
        // End iB for loop
        str += genBanner( this.aNodes[iCtr], 'd_banner2_show');
        i++;
    }
    for(x = 0; x < this.bNodes.length; x++) {
        if(this.bNodes[x].position >= i) {
            str += genBanner( this.bNodes[x], 'd_banner2_show');
        }
    }
    document.write( str);
    str = '';
    return str;
};

// d_Banner
// d_Banner
// Written by Dungpt
function d_Banner(objName){
    this.obj = objName;
    this.aNodes = [];
    this.currentBanner = 0;
};
// ADD NEW BANNER
d_Banner.prototype.add = function(bannerType, bannerPath, height, width, hyperlink, popup) {
    var bannerDuration = 0;
    this.aNodes[this.aNodes.length] = new Node(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, 0, popup);
};
// Outputs the banner to the page
d_Banner.prototype.toString = function() {
    var str = "";
    var BannerPostion = Math.floor(Math.random()*12321) % this.aNodes.length;
    for (var iCtr=BannerPostion; iCtr < this.aNodes.length; iCtr++){
            str += genBanner( this.aNodes[iCtr], 'd_banner_show');
    }
    for (var iCtr=0; iCtr < BannerPostion; iCtr++){
            str += genBanner( this.aNodes[iCtr], 'd_banner_show');
    }
    document.write( str);
    str = '';
    return str;
};
// Written by Dungpt
function dFloat_Banner(objName){
    this.obj = objName;
    this.aNodes = [];
    this.currentBanner = 0;
};
// ADD NEW BANNER
dFloat_Banner.prototype.add = function(bannerType, bannerPath, height, width, hyperlink, popup) {
    var bannerDuration = 0;
    this.aNodes[this.aNodes.length] = new Node(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, popup);
};
// Outputs the banner to the page
dFloat_Banner.prototype.toString = function() {
    var str = "";
    var BannerPostion = Math.floor(Math.random()*12321) % this.aNodes.length;
    for (var iCtr=BannerPostion; iCtr < this.aNodes.length; iCtr++){
            str += genBanner( this.aNodes[iCtr], 'd_Banner2_show');
    }
    for (var iCtr=0; iCtr < BannerPostion; iCtr++){
            str += genBanner( this.aNodes[iCtr], 'd_Banner2_show');
    }
    return str;
};

function flashWrite(url,w,h,id,bg,vars){
    var flashStr=
    "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='"+w+"' height='"+h+"' id='"+id+"' align='middle'>"+
    "<param name='allowScriptAccess' value='always' />"+
    "<param name='movie' value='"+url+"' />"+
    "<param name='FlashVars' value='"+vars+"' />"+
    "<param name='wmode' value='transparent' />"+
    "<param name='menu' value='false' />"+
    "<param name='quality' value='high' />"+
    "<embed src='"+url+"' FlashVars='"+vars+"' wmode='transparent' menu='false' quality='high' width='"+w+"' height='"+h+"' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />"+
    "</object>";
    document.write(flashStr);
}





// dungpt functions
function CreateBookmarkLink() {
	title = "24H.COM.VN - Th&#244;ng tin gi&#7843;i tr&#237; Vi&#7879;t Nam"; 
	url = "http://www.24h.com.vn";

	if (window.sidebar) { // Mozilla Firefox Bookmark
		window.sidebar.addPanel(title, url,"");
	} else if( window.external ) { // IE Favorite
		window.external.AddFavorite( url, title);
	} else if(window.opera && window.print) { // Opera Hotlist
		return true; 
	}
}

function MM_openBrWindow( theURL, winName, features) { //v2.0
	window.open(theURL,winName,features);
}

function j_substr( str, len) {
	str = String( str);
	if( str.length <= len) {
		document.write( str);
		return true;
	}
	var str2 = str.substring( 0, str.substring(0, len).lastIndexOf(" "));
	document.write( str2 + '...');
}

function parseScript(_source)
{
	var source = _source;
	var scripts = new Array();

	// Strip out tags
	while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
		var s = source.indexOf("<script");
		var s_e = source.indexOf(">", s);
		var e = source.indexOf("</script", s);
		var e_e = source.indexOf(">", e);

		// Add to scripts array
		scripts.push(source.substring(s_e+1, e));
		// Strip from source
		source = source.substring(0, s) + source.substring(e_e+1);
	}

	// Loop through every script collected and eval it
	for(var i=0; i<scripts.length; i++) {
		try {
			eval(scripts[i]);
		}
		catch(ex) {
			// do what you want here when a script fails
		}
	}
	// Return the cleaned source
	return source;
}


function AjaxActionPost(where, url, params, hasScript)
{
    hasScript = (typeof hasScript!="undefined") ? hasScript : false;
    var xmlHttp = new GetXmlHttpObject();
	if(xmlHttp==null){
		return;
	}
	xmlHttp.onreadystatechange= function(){
		if(xmlHttp.readyState==4 || xmlHttp.readyState == 200){
			if (hasScript) {
                document.getElementById( where).innerHTML += parseScript(xmlHttp.responseText)
            } else {
                document.getElementById(where).innerHTML += xmlHttp.responseText
            }
		}
	}
    xmlHttp.open( "POST", url, true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	xmlHttp.send(params);
}

function Banner2(objName){
    this.obj = objName;
    this.aNodes = [];
    this.currentBanner = 0;//Math.floor(Math.random()*3);
    this.intLoopCount = 0;
    this.intBannerFix = -1;
    this.stopShow = false;
};

// ADD NEW BANNER
Banner2.prototype.add = function(bannerType, bannerPath, bannerDuration, height, width, hyperlink, desc, popup) {
    if (this.aNodes.length>=3) return;
    this.aNodes[this.aNodes.length] = new Node3(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, hyperlink, desc, popup);
};
Banner2.prototype.add3 = function(bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc) {
    if (this.aNodes.length>=3) return;
    this.aNodes[this.aNodes.length] = new NodeRich(this.obj +"_"+ this.aNodes.length, bannerType, bannerPath, bannerDuration, height, width, height2, width2, type, name1, name2, desc);
};

// Node object
function Node3(name, bannerType, bannerPath, bannerDuration, height, width, hyperlink, desc, popup) {
    this.name = name;
    this.bannerType = bannerType;
    this.bannerPath = bannerPath;
    this.bannerDuration = bannerDuration;
    this.height = height
    this.width = width;
    this.hyperlink= hyperlink;
    this.desc= desc;
    this.popup= popup;
};

// Outputs the banner to the page
Banner2.prototype.toString = function() {
	this.currentBanner = Math.floor(Math.random()*this.aNodes.length); // lay ngau nhien 1 banner
    var str = ""
    for (var iCtr=0; iCtr < this.aNodes.length; iCtr++){
        if (getCookie(this.aNodes[iCtr].name)) {
            this.aNodes.splice(iCtr, 1);
            continue;
        }
        str += genBanner( this.aNodes[iCtr], 'm_banner_hide');
        // document.getElementById( this.obj + "_desc_" + iCtr).innerHTML = this.aNodes[iCtr].desc;
    }
    return str;
};

// START THE BANNER ROTATION
Banner2.prototype.start = function(){
	if (this.aNodes.length==0) {
		return true;
	}
	
	if( this.stopShow) {
		return true;
	}
	this.changeBanner();
	this.stopShow = true;
	var thisBannerObj = this.obj;
	// CURRENT BANNER IS ALREADY INCREMENTED IN cahngeBanner() FUNCTION
	return setTimeout(thisBannerObj+".start()", this.aNodes[this.currentBanner].bannerDuration * 1000);
}

// CHANGE BANNER
Banner2.prototype.changeBanner = function(){
    var thisBanner;
	if( this.currentBanner > this.aNodes.length-1) return true;
	var prevBanner = -1;
	if (this.currentBanner < this.aNodes.length ){
		thisBanner = this.currentBanner;
		if (this.aNodes.length > 1){
			if ( thisBanner > 0 ){
				prevBanner = thisBanner - 1;
			}else{
				prevBanner = this.aNodes.length-1;
			}
		}
		if (this.currentBanner < this.aNodes.length - 1){
			this.currentBanner = this.currentBanner + 1;
		}else{
			this.currentBanner = 0;
		}
	}
	for( ii=0; ii<this.aNodes.length; ii++) {
		if( document.getElementById(this.aNodes[ii].name)) {
			document.getElementById(this.aNodes[ii].name).className = "m_banner_hide";
			document.getElementById( this.obj + "_desc_" + ii).className = "m_banner_lost_focus";
		}
	}
	if (prevBanner >= 0){
		document.getElementById(this.aNodes[prevBanner].name).className = "m_banner_hide";
		document.getElementById( this.obj + "_desc_" + prevBanner).className = "m_banner_lost_focus";
	}
	document.getElementById(this.aNodes[thisBanner].name).className = "m_banner_show";
	document.getElementById( this.obj + "_desc_" + thisBanner).className = "m_banner_focus";
	
	//alert( this.currentBanner);
}

function getElementsByClassName(searchClass, node, tag) {
	var classElements = new Array();
	if (node == null) {
		node = document;
	}
	if (tag == null) {
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function findPos(obj){
	var posX = obj.offsetLeft;var posY = obj.offsetTop;
	while(obj.offsetParent){
		if(obj==document.getElementsByTagName('body')[0]){break}
		else{
			posX=posX+obj.offsetParent.offsetLeft;
			posY=posY+obj.offsetParent.offsetTop;
			obj=obj.offsetParent;
		}
	}
	var posArray=[posX,posY]
	return posArray;
}
function findYPos(obj){
	var posObj = findPos(obj);
	return posObj[1];
}
function doScroll(divID, fixPos, parentID) {
	var obj= document.getElementById(divID);
	var objParent= document.getElementById(parentID);
	//if (divID=="subLeft") document.getElementById('display').innerHTML =((f_scrollTop()+obj.offsetHeight)+'/'+(findYPos(objParent)+objParent.offsetHeight));
	var parentPos = findYPos(objParent);
	var floorPos = parentPos+objParent.offsetHeight;
	if ( f_scrollTop()>fixPos && fixPos+obj.offsetHeight!=floorPos) {
		if (f_scrollTop()+obj.offsetHeight >= floorPos) {
			obj.style.position = 'absolute';
			obj.style.top = (floorPos-obj.offsetHeight)+'px';
		}
		else {
			if (isIE6()) {
				obj.style.position = 'absolute';
				obj.style.top = f_scrollTop()+'px';
			}
			else {
				obj.style.position = 'fixed';
				obj.style.top = '0%';
			}
		}
	}
	else {
		if (isIE6()) {
			obj.style.display = 'block';
		}
		else {
			obj.style.top = '0%';
			obj.style.position = 'relative';
		}
	}
	//setTimeout("doScroll('"+divID+"', "+fixPos+", '"+parentID+"')", 20)
}

function doScrollSideBar(divID) {
	var obj = getElement(divID);
	if (!obj) return false;
	// obj.style.top = (f_scrollTop()+f_clientHeight()-obj.offsetHeight-30)+'px';
	scrollSideBar( divID, f_scrollTop()+f_clientHeight()-obj.offsetHeight-10);
}

function scrollSideBar( divID, newPos) {
	var obj = getElement(divID);
	clearTimeout( obj["at_timeout"]);
	if ( obj.offsetTop!=newPos) {
		offset = (newPos-obj.offsetTop<0) ? -1*Math.ceil((obj.offsetTop-newPos)/16) : Math.ceil((newPos-obj.offsetTop)/16);
		offset += obj.offsetTop;
		// obj.innerHTML = obj.offsetTop+' / '+newPos + ' / ' +offset;
		obj.style.top = offset+'px';
		obj["at_timeout"] = timeoutSideBar = setTimeout("scrollSideBar( '"+divID+"', "+newPos+")", 1);
	}
}

function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());

    if (expires) {
        expires = expires * 1000 * 60 * 60;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" + escape(value) +
		((expires) ? ";expires=" + expires_date.toGMTString() : "") +
		((path) ? ";path=" + path : "") +
		((domain) ? ";domain=" + domain : "") +
		((secure) ? ";secure" : "");
}

function getCookie(name) {

    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + "=" +
	((path) ? ";path=" + path : "") +
	((domain) ? ";domain=" + domain : "") +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}



/* copy: hailt 16/05/2012
 * last change: hailt 16/05/2012
 */
function fw24h_replace_bad_char(string)
{
	string = string.replace('&', '&#38;');
    string = string.replace('<', '&lt;');
    string = string.replace('>', '&gt;');
    string = string.replace('"', '&#34;');
    string = string.replace("'", '&#39;');
    string = string.replace('\\', '&#92;');
    string = string.replace('=', '&#61;');    
    string = string.replace('(', '&#40;');    
    string = string.replace(')', '&#41;'); 
	string = string.replace("-", '&#45;');	
	string = string.replace("|", '&#124;');
	
    return string;
}

function _chrome_version()
{
    var chrome_version = 0;
    if (/chrome/.test(navigator.userAgent.toLowerCase())) {
        var chrome_version = parseInt(window.navigator.userAgent.match(/Chrome\/(\d+)\./)[1], 10);
    }
    return chrome_version;
}


function set_focus(f){
	var i=0;
	while (i<f.length){
		var e=f.elements[i];
		if (((e.getAttribute("type")=='text')||(e.getAttribute("type")=='textarea'))&&(!e.disabled)&&(!e.readOnly)){
			e.focus();
			return true;
			}
		i=i+1;
	}
	return false;
}


function AjaxAction_loc_truong( where, url,p_sel){	
	var xmlHttp = new GetXmlHttpObject();
	if(xmlHttp==null){
		return;
	}
	var bar = '<img src="/images/loading.gif" align="absmiddle" height="20px" width="20px" title="&#272;ang t&#7843;i d&#7919; li&#7879;u"/> &#272;ang t&#7843;i d&#7919; li&#7879;u';		
	document.getElementById( where).innerHTML = bar;	
	xmlHttp.onreadystatechange= function(){		
		if(xmlHttp.readyState==4 || xmlHttp.readyState == 200){		
			document.getElementById( where).innerHTML = xmlHttp.responseText
			if(document.getElementById(p_sel)){
				var v_sel = document.getElementById(p_sel);	
				if(v_sel.length == 0){
					alert('Chua co DU LIEU ! Ban hay chon lai DIEU KIEN LOC !..');
				}
			}
		}
	}
	// Set header so the called script knows that it's an XMLHttpRequest
	//xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xmlHttp.open( "GET", url, true);
	xmlHttp.send(null);
}

// Ham loc nhanh theo ten + ma
var searching=null;	
function chon_nhanh(p_text_input,p_sel_arr,event){	
	if(null!=searching)clearTimeout(searching);	
	if(event.keyCode==13){return;}
	searching=setTimeout("searchNow('"+p_text_input+"','"+p_sel_arr+"')",100);	
}

// ham tim kiem tren mang
function searchNow(p_text_input,p_sel_arr){
	if(null!=searching)clearTimeout(searching);	
	var input=locdau(document.getElementById(p_text_input).value).toUpperCase();	
	var selectList=document.getElementById(p_sel_arr);
	var selectOptions=selectList.getElementsByTagName('option');
	if(document.getElementById(p_text_input).value==''){
		selectOptions[0].selected=true;
		return;
	}	
	var found;
	found=false;
	var foundCount;
	foundCount=0;
	var opt;		
	for(var i=0;i<selectOptions.length;i++){
		opt=selectOptions[i];				
		var obj = locdau(opt.title).toUpperCase();		
		if(obj.indexOf(input)>=0){						
			if(!found){									
				if(i>0){										
					selectList.removeChild(opt);					
					selectList.insertBefore(opt,selectOptions[0]);					
				}
				opt.selected=true;
				found=true;				
			}else{			
				
				selectList.removeChild(opt);				
				if(selectOptions[foundCount]){
					selectList.insertBefore(opt,selectOptions[foundCount]);				
				}else{
					selectList.insertBefore(opt,selectOptions[foundCount-1]);				
				}				
			}
			foundCount++;
		}else{
			opt.selected=false;
		}
	}
	if(!found){
		selectOptions[0].selected=true;
	}
}	

//Ham chuyen chu co dau sang khong dau
function locdau(str) {  
   str= str.toLowerCase();  
   str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");  
   str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");  
   str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");  
   str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");  
   str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");  
   str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");  
   str= str.replace(/đ/g,"d");     
   return str;  
}


// Ham chuyen trang box thong tin huu ich
// p_trang : So hieu trang
function thong_tin_huu_ich_1_page_change(p_trang,p_so_tin){	
	// Hien thi trang can xem	
	v_url='/ajax/ajax_thong_tin_huu_ich_1.php?v_trang='+p_trang+'&v_so_tin='+p_so_tin+'&'+randomizeNumber();				
	AjaxAction('div_thong_tin_huu_ich_1',v_url);
}

// Ham background onclick
function background_onclick(p_new_window,p_url){			
	if(p_new_window=='1'){
		window.open(p_url);
	}else{
		window.location.href=p_url;
		
	}
}


/*
javascript tooltip
*/
var tooltip=function(){
	var id = 'tt';
	var top = 7;
	var left = 3;
	var maxw = 470;
	var speed = 10;
	var timer = 20;
	var endalpha = 96;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();


//chuc nang kiem hop du lieu khi nguoi dung "gop y"
function checkform(){	
	// kiem tra cac gia tri tren form da nhap du chua.
	var frm = document.frm_suggestions;
	if(frm.isSuggestion.value==''){
		if (frm.full_name.value==""){
			alert('Ban hay nhap ho ten!');
			frm.full_name.focus();
			return;
		}
		if (frm.phone.value==""){
			alert('Ban hay nhap so dien thoai!');
			frm.phone.focus();
			return;
		}
		if (frm.email.value==""){
			alert('Ban hay nhap email!');
			frm.email.focus();
			return;
		}
		if (frm.content.value==""){
			alert('Ban hay nhap noi dung gop y!');
			frm.content.focus();
			return;
		}	
		if (frm.security_code.value==""){
			alert('Ban hay nhap ma bao mat!');
			frm.security_code.focus();
			return;
		}
		if(frm.isSuggestion.value==''){
			frm.isSuggestion.value='1';	
			frm.target = "fr_submit";
			frm.action="../../modules/gopy/act_suggestions.php"	;	
			frm.submit();
		}
	}	
	return ;	
}

// chuc nang xoa trang du lieu khi bam nut lam lai
function Refresh_suggestions(frm){			
	if (frm.full_name){		
		frm.full_name.value="";		
	}	
	if (frm.phone){		
		frm.phone.value="";		
	}	
	if (frm.email){		
		frm.email.value="";		
	}	
	if (frm.content){		
		frm.content.value="";		
	}
	if (frm.security_code){		
		frm.security_code.value="";		
	}		
	return false;
}

function sent_email(p_title,p_url,p_style){
	p_window_url = "/ajax/dsp_sent_mail_gop_y.php?url="+p_url+"&title="+p_title+'&'+randomizeNumber();
	MM_openBrWindow(p_window_url,'',p_style);
}

// ham gan bien khi thay doi item menu
// p_menu_id: id menu
function change_menu_onclick(p_menu_id, p_color, p_image){	
	p_color = typeof p_color !== 'undefined' ? p_color : '#55377f';	
	p_image = typeof p_image !== 'undefined' ? p_image : '/images/sprites.gif';	
	v_menu_selected = document.getElementById("hdn_menu_selected");				
	if(document.getElementById("menu_lv2_"+v_menu_selected.value)){
		v_menu_lv2_old = document.getElementById("menu_lv2_"+v_menu_selected.value);					
	}
	if(document.getElementById("menu_lv2_"+p_menu_id)){
		v_menu_lv2_new = document.getElementById("menu_lv2_"+p_menu_id);			
	}
	
	if(document.getElementById("menu_lv2_"+p_menu_id)){	
		// an menu cu truoc do
		v_menu_lv1_li_old = document.getElementById("menu_lv1_li_"+v_menu_selected.value);				
		v_menu_lv1_li_old.style.background = '';	
		v_menu_lv1_a_old = document.getElementById("menu_lv1_a_"+v_menu_selected.value);				
		v_menu_lv1_a_old.style.color = '';			
	
		// hien thi thay doi menu cap 2
		if(document.getElementById("menu_lv2_"+v_menu_selected.value)){
			v_menu_lv2_old.style.display = "none";	
		}		
		v_menu_lv2_new.style.display = "";			
	
		// hien thi menu duoc chon
		v_menu_lv1_li_new = document.getElementById("menu_lv1_li_"+p_menu_id);				
		v_menu_lv1_li_new.style.background = 'url("'+p_image+'") 0 -564px no-repeat';			
		v_menu_lv1_a_new = document.getElementById("menu_lv1_a_"+p_menu_id);				
		v_menu_lv1_a_new.style.color = p_color;
		
		// cap nhat hidden menu duoc chon
		v_menu_selected.value = p_menu_id;	
	}			
}


//hailt
//ham reset lại trang hiện tại
function reset_trang_hien_tai(){	
	var dia_chi = location.href;
	var arr_dia_chi = dia_chi.split("#");
	location.href = arr_dia_chi[0];
	return false;
}
//hailt
//ham reset lại trang hiện tại
function reset_ve_trang_truoc(){	
	top.history.back();
	return false;
}

//hailt 14/05/2012
//ham tao lai key va hien thi lai box tim kiem trang quan ly tin tuyen dung cua ntd
function ntd_quan_tri_reset_trang_ttd(id_ttd){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntd-trang-quan-tri-tin-tuyen-dung.html?id_ttd='+id_ttd+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&trang_thai='+v_trang_thai+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;
	window.location.href = v_url;
	return false;
}
//hailt 16/06/2012
//ham reset lai box ds tin tuyen dung thu gon tren trang quan tri tuyen dung
function ntd_quan_tri_reset_box_ds_tin_td_thu_gon(id_ttd){	
	v_url='/ajax/ntd_quan_tri_thong_ke_tin_td/';			
	AjaxAction('div_tk_ttd',v_url);
	v_url='/ajax/ntd_quan_tri_tin_td_thu_gon/index?id_ttd='+id_ttd;			
	AjaxAction('div_ds_ttd',v_url);
	return false;
}
//hailt 14/05/2012
//ham tim kiem va hien thi lai danh sach tin tuyen dung trang quan ly tin tuyen dung cua ntd
function ntd_quan_tri_ds_ttd(id_ttd){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ajax/ntd_quan_tri_tin_tuyen_dung/index?id_ttd='+id_ttd+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&trang_thai='+v_trang_thai+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;			
	AjaxAction('div_ntd_quan_tri_tin_tuyen_dung',v_url);
}

// hailt 04/05/2012
// ntd xoa han 1 tin tuyen dung
function ntd_quan_tri_xoa_han_1_ttd(id_ttd){
	if(!confirm("Bạn có chắc chắn xoá hẳn không?")){
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/xoa_han/"+id_ttd;
	if(document.getElementById('tin_td_ds_thu_gon')!=null){
		if(document.getElementById('tin_td_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}
// hailt 15/05/2012
// ntd xoa han 1 list tin tuyen dung
function ntd_quan_tri_xoa_han_ds_ttd(){
	if(!confirm("Bạn có chắc chắn xoá hẳn các tin tuyển dụng không?")){
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/thao_tac_ds_ttd/xoa_han";
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}
// hailt 04/05/2012
// ntd doi trang thai cua tin tuyen dung
function ntd_quan_tri_doi_trang_thai_1_ttd(id_ttd,trang_thai){
	if(trang_thai=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/doi_trang_thai/"+id_ttd+"/"+trang_thai;
	if(document.getElementById('tin_td_ds_thu_gon')!=null){
		if(document.getElementById('tin_td_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();	
}

// hailt 16/05/2012
// ntd lay ds tin tuyen dung va doi trang thai ca ds nay
function ntd_quan_tri_doi_trang_thai_ds_ttd(trang_thai){
	var tong_so_tin = document.getElementById('tong_so_ttd').value;
	var i=0;
	for(i=0;i<tong_so_tin;i++){
		if(document.getElementById('checkbox_ttd['+i+']')!=null){
			if(document.getElementById('checkbox_ttd['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_tin){
		alert('Bạn chưa chọn Tin tuyển dụng nào!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	if(trang_thai=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	if(trang_thai=='dang_tin'){
		if(!confirm("Bạn có chắc chắn đăng các tin đã chọn không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/thao_tac_ds_ttd/doi_trang_thai/"+trang_thai;
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();	
}

// hailt 04/05/2012
// ntd gia han tin tuyen dung
function ntd_quan_tri_gia_han_1_ttd(id_ntd,id_ttd){
	var id = 'gia_han_' + id_ttd;
	var so_luot_con = document.getElementById(id).value;
	if( so_luot_con<=0 ){
		alert('Tin tuyển dụng đã hết số lượt gia hạn!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	ntd_quan_tri_show_box_popup_gia_han(id_ntd,id_ttd);
}
// hailt 16/05/2012
// ntd lay ds tin tuyen dung va gia han
function ntd_quan_tri_gia_han_ds_ttd(){
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/thao_tac_ds_ttd/gia_han";
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}
// hailt 04/05/2012
// ntd lam moi tin tuyen dung
function ntd_quan_tri_lam_moi_1_ttd(id_ttd){
	var id = 'lam_moi_' + id_ttd;
	var so_luot_con = document.getElementById(id).value;
	if( so_luot_con<=0 ){
		alert('Tin tuyển dụng đã hết số lượt làm mới!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/lam_moi/"+id_ttd;
	if(document.getElementById('tin_td_ds_thu_gon')!=null){
		if(document.getElementById('tin_td_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}

// hailt 15/05/2012
// ntd lam moi danh sach tin tuyen dung
function ntd_quan_tri_lam_moi_ds_ttd(id_ttd){
	var id = 'lam_moi_' + id_ttd;
	var so_luot_con = document.getElementById(id).value;
	if( so_luot_con<=0 ){
		alert('Tin tuyển dụng đã hết số lượt làm mới!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/thao_tac_ds_ttd/lam_moi";
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}
//hailt 05/05/2012
//hien thi popup gia han
function ntd_quan_tri_show_box_popup_gia_han(id_ntd,list_id_ttd){
	var v_url='/ajax/ntd_quan_tri_tin_tuyen_dung/popup_gia_han_list_ttd/'+list_id_ttd;
	$.post(v_url, function(data){
			show_box_popup(data,520,1550);
	}, "json");
}
// hailt 07/05/2012
// ntd gia han tin tuyen dung, chon ngay gia han tren calendar
//tam thoi van truyen id_ntd de check xoa dung cua ntd, sau nay dung session ko truyen tham so nua
function ntd_quan_tri_gia_han_ttd_chon_ngay(){
	var txt_ngay_thang_nam = document.getElementById('txt_calendar_ngay_gia_han').value;
	var arr_ngay = txt_ngay_thang_nam.split("-");
	var txt_ngay = arr_ngay[0];
	var txt_thang = arr_ngay[1];
	var txt_nam = arr_ngay[2];
	document.getElementById('giahan_ngay').value = txt_ngay;
	document.getElementById('giahan_thang').value = txt_thang;
	document.getElementById('giahan_nam').value = txt_nam;
}

//nhom function lay tu nhacvui de tao popup
/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */

(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});


/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/

 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

function show_box_popup(v_html,width,height) {
	v_top = 10;
	v_left = 10;
	//Opera Netscape 6 Netscape 4x Mozilla
	if (window.innerWidth || window.innerHeight){
		docwidth = window.innerWidth;
		docheight = window.innerHeight;
	}
	//IE Mozilla
	if (document.body.clientWidth || document.body.clientHeight){
		docwidth = document.body.clientWidth;
		docheight = document.body.clientHeight;
	}
	v_top = (f_clientHeight()-height)/2;
	if(v_top < 0){
		v_top = 0;
	}
	v_left = (docwidth-width)/2;
	if(v_left < 0){
		v_left = 0;
	}
	
	if (!document.getElementById('_box_popup')) {
		var v_popup_overlay = '<div class="popup-overlay" id="_box_overlay"></div><div class="box-popup"  id="_box_popup" style="left:'+v_left+'px;top:'+v_top+'px;"></div>';
		$("body").append(v_popup_overlay);
	} 
	$("#_box_popup").html(v_html);
	$('#_box_overlay').show();
	$('#_box_popup').show();
	document.getElementById('_box_popup').style.left = v_left+'px';
	document.getElementById('_box_popup').style.top = v_top+'px';
}


function close_box_popup() {
	$("#_box_popup").html('');
	$('#_box_overlay').hide();
	$('#_box_popup').hide();
}

function var_dump(obj) {
   if(typeof obj == "object") {
      return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
   } else {
      return "Type: "+typeof(obj)+"\nValue: "+obj;
   }
}//end function var_dump

//create: 		hailt 07/05/2012
//last change: 	hailt 07/05/2012
//script dung rieng cho xu ly calendar
//div_id: id div chua calendar
//txt_all_id: textbox thay doi ngay_thang_nam khi chon 1 ngay trong calendar
//txt_ngay: textbox thay doi ngay khi chon 1 ngay trong calendar
//txt_thang: textbox thay doi thang khi chon 1 ngay trong calendar
//txt_nam: textbox thay doi nam khi chon 1 ngay trong calendar
//select_box_id: box duoc chon
//close_popup: dong box nay sau khi click chon 1 ngay
//
function showCalendarInHTML(day,month,year,width,height,div_id,txt_all_id,txt_ngay,txt_thang,txt_nam,select_box_id,close_popup)
{	
	var temp="";
	var close_when_select_on_day = '';
	if(close_popup==1){
		close_when_select_on_day = 'close_box_popup();';
	}
	var weekday=new Array(7);
	var days_of_month = 32 - new Date(year, month, 32).getDate();
	var start_day_in_week = new Date(year, month, 1).getDay();
	weekday[0]="Su";
	weekday[1]="Mo";
	weekday[2]="Tu";
	weekday[3]="We";
	weekday[4]="Th";
	weekday[5]="Fr";
	weekday[6]="Sa";
	var i=0, j=0;
	var selected = '';
	var calendar_html = "";
	var now_year = new Date().getFullYear();
	var min_year = parseInt(now_year) - 70;
	var max_year = parseInt(now_year) + 10;
	calendar_html += '<table width="'+width+'px" height="22px" cellpadding="0" cellspacing="0" border="0">';
		calendar_html += '<tr>';
			calendar_html +='<td class="borderBot">';
				calendar_html +='Tháng:';
				calendar_html +='<select name="js_select_thang" id="js_select_thang" onchange="javascript: showCalendarInHTML(0,document.getElementById(\'js_select_thang\').value,'+year+','+width+','+height+',\''+div_id+'\',\''+txt_all_id+'\',\''+txt_ngay+'\',\''+txt_thang+'\',\''+txt_nam+'\',\''+select_box_id+'\','+close_popup+')">';
				for (j=1; j<13; j++) {
					if (j-1 == month) {
						selected = ' selected ';
					} else {
						selected = '';
					}
					calendar_html +='<option value="'+(j-1)+'" '+selected+'>'+j+'</option>';
				}
				calendar_html +='</select>';
				calendar_html +='&nbsp;&nbsp;Năm:';
				calendar_html +='<select name="js_select_nam" id="js_select_nam" onchange="javascript: showCalendarInHTML(0,'+month+',document.getElementById(\'js_select_nam\').value,'+width+','+height+',\''+div_id+'\',\''+txt_all_id+'\',\''+txt_ngay+'\',\''+txt_thang+'\',\''+txt_nam+'\',\''+select_box_id+'\','+close_popup+')">';
				for (j=min_year; j<max_year; j++) {
					if (j == year) {
						selected = ' selected ';
					} else {
						selected = '';
					}
					calendar_html +='<option value="'+j+'" '+selected+'>'+j+'</option>';
				}
				calendar_html +='</select>';
			calendar_html +='</td>';
		calendar_html += '</tr>';
	calendar_html += '</table>';
	calendar_html += '<table width="'+width+'px" height="'+(height-22)+'px" cellpadding="0" cellspacing="0" border="0">';
		calendar_html += '<col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/><col width="14%"/>';
		calendar_html += '<tr>';
			for(i=0;i<7;i++){
				calendar_html += '<td align="center">'+weekday[i]+'</td>';
			}
		calendar_html += '</tr>';
		var for_day = 1;
		var for_week = 0;
		calendar_html += '<tr>';
			for(for_week; for_week < start_day_in_week; for_week++){calendar_html += '<td></td>';}
			for(for_week; for_week < 7; for_week++){
				if(for_day <= days_of_month){
					temp="";
					if(txt_all_id!=''){ temp += 'document.getElementById(\''+txt_all_id+'\').value=\''+for_day+'-'+(parseInt(month)+1)+'-'+year+'\';';}
					if(txt_ngay!=''){ temp += 'document.getElementById(\''+txt_ngay+'\').value=\''+for_day+'\';';}
					if(txt_thang!=''){ temp += 'document.getElementById(\''+txt_thang+'\').value=\''+(parseInt(month)+1)+'\';';}
					if(txt_nam!=''){ temp += 'document.getElementById(\''+txt_nam+'\').value=\''+year+'\';';}
					if(select_box_id!=''){ temp += 'document.getElementById(\''+select_box_id+'\').checked=true;';}
					calendar_html += '<td align="center"><a href="javascript: '+temp+close_when_select_on_day+' showCalendarInHTML('+for_day+','+month+','+year+','+width+','+height+',\''+div_id+'\',\''+txt_all_id+'\',\''+txt_ngay+'\',\''+txt_thang+'\',\''+txt_nam+'\',\''+select_box_id+'\','+close_popup+');"';
					if(for_day==day){calendar_html +=' style="color:blue;text-decoration:underline"';}
					calendar_html += '>'+for_day+'</td>';	
					for_day++;
				}
			}
			for(for_day; for_day <= days_of_month;){
				calendar_html += '<tr>';
				for(for_week=0; for_week < 7; for_week++){
					if(for_day <= days_of_month){
						temp="";
						if(txt_all_id!=''){ temp += 'document.getElementById(\''+txt_all_id+'\').value=\''+for_day+'-'+(parseInt(month)+1)+'-'+year+'\';';}
						if(txt_ngay!=''){ temp += 'document.getElementById(\''+txt_ngay+'\').value=\''+for_day+'\';';}
						if(txt_thang!=''){ temp += 'document.getElementById(\''+txt_thang+'\').value=\''+(parseInt(month)+1)+'\';';}
						if(txt_nam!=''){ temp += 'document.getElementById(\''+txt_nam+'\').value=\''+year+'\';';}
						if(select_box_id!=''){ temp += 'document.getElementById(\''+select_box_id+'\').checked=true;';}
						calendar_html += '<td align="center"><a href="javascript: '+temp+close_when_select_on_day+' showCalendarInHTML('+for_day+','+month+','+year+','+width+','+height+',\''+div_id+'\',\''+txt_all_id+'\',\''+txt_ngay+'\',\''+txt_thang+'\',\''+txt_nam+'\',\''+select_box_id+'\','+close_popup+');"';
						if(for_day==day){calendar_html +=' style="color:blue;text-decoration:underline"';}
						calendar_html += '>'+for_day+'</td>';	
						for_day++;	
					}
					else{
						calendar_html += '<td></td>';
					}
				}
				calendar_html += '</tr>';
			}
		calendar_html += '</tr>';
	calendar_html += '</table>';
	if(document.getElementById(div_id)!=null){
		document.getElementById(div_id).innerHTML = calendar_html;
	}
}

//hailt 08/05/2012
//ham kiem tra ngay thang nhap vao co dung dinh dang
//ho tro check theo ca 3 truong hop: nhap theo 1 o, nhap ngay thang rieng(ko nam),nhap ngay thang nam rieng - uu tien nhap rieng hon
//id_text_all: textbox chua ca ngay thang nam dinh dang dd-mm-yyyy/d-m-yy
//id_text_ngay,id_text_thang,id_text_nam: textbox ngay,thang,nam
function checkdate(id_text_all,id_text_ngay,id_text_thang,id_text_nam){
	var nowdate = new Date();
	var i=0;
	var l=0;
	var kt=1;//0 is false
	var d=0,m=0,y=0;
	var date = '';
	if(id_text_all != ''){ date = document.getElementById(id_text_all).value;}
	var date_split=date.split("-");
	if(id_text_ngay != ''){
		date_split[0] = document.getElementById(id_text_ngay).value; 
		if(id_text_thang != ''){
			date_split[1] = document.getElementById(id_text_thang).value; 
		}
		if(id_text_thang != ''){
			date_split[2] = document.getElementById(id_text_nam).value; 
		}
		else{
			date_split[2] = nowdate.getFullYear();;
		}
	}
	//count numbers, if != 3 is false
	if(date_split.length!=3){
		kt=0;
	}
	//check chapter of string, if not number is false
	if(kt==1){
		for(i=0;i<date_split.length;i++){
			//date_split[i]=date_split[i].trim();
			//change function trim by a same function
			//remove ' ' in header
			for(l=0;l<date_split[i].length;l++){
				if((date_split[i].charAt(0) == ' ')||(date_split[i].charAt(l) == '0')){
					date_split[i] = date_split[i].substr(1,date_split[i].length-1);
				}
				else{
					break;
				}
			}
			//remove ' ' or '0' in footer
			for(l = date_split[i].length-1;l>=0;l--){
				if(date_split[i].charAt(l) == ' '){
					date_split[i] = date_split[i].substr(0,date_split[i].length-1);
				}
				else{
					break;
				}
			}
			if(date_split[i].length>0){
				for(l=0;l<date_split[i].length;l++){
					if(('0'>date_split[i].charAt(l))||('9'<date_split[i].charAt(l))){
						kt=0;
					}
				}
			}else{
				kt=0;
			}
		}
	}
	//check date is false or true
	if(kt==1){
		d = parseInt(date_split[0]);
		m = parseInt(date_split[1]);
		y = parseInt(date_split[2]);
		if((0<=y)&&(100>y)){
			y = y + 2000;
		}
		if((m==1)||(m==3)||(m==5)||(m==7)||(m==8)||(m==10)||(m==12)){
			if(d>31){
				kt=0;
			}
		}
		if((m==4)||(m==6)||(m==9)||(m==11)){
				if(d>30){
					kt=0;
				}
		}
		if(m==2){
				if((y%100!=0)&&(y%4==0)){
					if(d>29){
						kt=0;
					}
				}else{
					if(d>28){
						kt=0;
					}
				}
		}
		if((m>12)||(m<1)||(d<1)){
			kt=0;
		}
	}
	$newday = "";
	if(kt==0){
		//return now day
		//alert("Invalid date-time");
		d = nowdate.getDate();
		m = nowdate.getMonth()+1; //because getMonth() return a month from 0 to 11
		y = nowdate.getFullYear();
		}
	if((0<m)&&(m<10)){
		$newday = $newday + "0" + m;
	}else{
		$newday = $newday + m;
	}
	$newday = $newday + "-";
	if((0<d)&&(d<10)){
		$newday = $newday + "0" + d;
	}
	else{
		$newday = $newday + d;
	}
	$newday = $newday + "-" + y;
	if(id_text_all != ''){document.getElementById(id_text_all).value=$newday;}
	if(id_text_ngay != ''){document.getElementById(id_text_ngay).value=d;}
	if(id_text_thang != ''){document.getElementById(id_text_thang).value=m;}
	if(id_text_nam != ''){document.getElementById(id_text_nam).value=y;}
	return kt;
}

// hailt 08/05/2012
// ham check dieu kien khi nguoi dung dien ngay gia han
//div_id: id div chua calendar
//txt_ngay: textbox dien ngay
//txt_thang: textbox dien thang
//txt_nam: textbox dien nam
//select_box_id: box duoc chon
function ntd_ntv_quan_tri_gia_han_ttd_ttv_dien_ngay(width,height,div_id,txt_ngay,txt_thang,txt_nam,select_box_id){
	document.getElementById(select_box_id).checked=true;
	var kiem_tra_ngay_thang = checkdate('',txt_ngay,txt_thang,txt_nam);
	if(kiem_tra_ngay_thang==0){
		alert('Ngày tháng nhập vào sai định dạng!');
		var nowdate = new Date();
		showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
		return false;
	}else{
		var ngay = parseInt(document.getElementById(txt_ngay).value);
		var thang = parseInt(document.getElementById(txt_thang).value);
		var nam = parseInt(document.getElementById(txt_nam).value);
		showCalendarInHTML(ngay,(thang-1),nam,width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
	}
}

// hailt 16/06/2012
// ham kiem tra dieu kien ngay gia han tin tuyen dung/tin tim viec
// id_max_ngay: id text hidden chua ngay het han xa nhat cua cac tin tuyen dung/tin tim viec dang can gia han
function check_dk_gia_han(id_check_gia_han_so_ngay,id_text_so_ngay,id_select_ngay_thang,id_text_ngay,id_text_thang,id_text_nam,id_max_ngay){
	var check_gia_han_so_ngay = document.getElementById(id_check_gia_han_so_ngay).checked;
	var submit=1;
	//gia han them so ngay
	if(check_gia_han_so_ngay == true){
		var so_ngay = parseInt(document.getElementById(id_text_so_ngay).value);
		var chon_ngay_thang = document.getElementById(id_select_ngay_thang).value;
		if(isNaN(so_ngay)){
			alert('Ngày tháng phải nhập số!');
			submit=0;
			var nowdate = new Date();
			dat_trang_thai_xu_ly_xong();
			showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
			return false;
		}
		if(chon_ngay_thang=='ngay' && so_ngay<=0){
			alert('Bạn phải nhập ngày gia hạn là số dương!');
			submit=0;
			var nowdate = new Date();
			dat_trang_thai_xu_ly_xong();
			showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
			return false;
		}
		if(chon_ngay_thang=='thang' && (so_ngay<=0 || so_ngay>12)){
			alert('Bạn phải nhập tháng gia hạn là số dương và <=12!');
			submit=0;
			var nowdate = new Date();
			dat_trang_thai_xu_ly_xong();
			showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
			return false;
		}
	}
	else{
		//gia han toi ngay
		var kiem_tra_ngay_thang = checkdate('',id_text_ngay,id_text_thang,id_text_nam);
		if(kiem_tra_ngay_thang==0){
			alert('Ngày tháng nhập vào sai định dạng!');
			submit=0;
			var nowdate = new Date();
			dat_trang_thai_xu_ly_xong();
			showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
			return false;
		}
		var txt_max_ngay_het_han = document.getElementById(id_max_ngay).value;
		var txt_temp = txt_max_ngay_het_han.split('-');
		var max_ngay_het_han = new Date(parseInt(txt_temp[0]),parseInt(txt_temp[1])-1,parseInt(txt_temp[2]));
		var ngay = document.getElementById(id_text_ngay).value;
		var thang = document.getElementById(id_text_thang).value;
		var nam = document.getElementById(id_text_nam).value;
		var ngay_gia_han = new Date(nam,thang-1,ngay);
		if(ngay_gia_han <= max_ngay_het_han){
			alert('Thời gian gia hạn phải lớn hơn ngày hết hạn hiện tại');
			submit=0;
			var nowdate = new Date();
			dat_trang_thai_xu_ly_xong();
			showCalendarInHTML(nowdate.getDate(),nowdate.getMonth(),nowdate.getFullYear(),width,height,div_id,'',txt_ngay,txt_thang,txt_nam,select_box_id);
			return false;
		}
	}
	if(submit==1){
		if(document.getElementById('tin_td_ds_thu_gon')!=null){
			if(document.getElementById('tin_td_ds_thu_gon').value==1){
				document.forms['_frmGiahan'].action = document.forms['_frmGiahan'].action + "/1";
			}
		}else{
			if(document.getElementById('tin_tv_ds_thu_gon')!=null){
				if(document.getElementById('tin_tv_ds_thu_gon').value==1){
					document.forms['_frmGiahan'].action = document.forms['_frmGiahan'].action + "/1";
				}
			}
		}
		document.forms['_frmGiahan'].target = "fr_submit_gia_han";
		document.forms['_frmGiahan'].submit();
	}
}

/* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * ham thay doi gia tri tim kiem nhanh
 * param string p_control_name : ten control nhan gia tri
 * param string p_value: gia tri control can nhan
 * param integer p_loc_tai_trang: Che do loc tai trang hien thoi, hoac loc o trang tim kiem
 */
 function tim_kiem_nhanh(p_control_name, p_value, p_loc_tai_trang){
	if(document.getElementById(p_control_name).value != p_value){
		document.getElementById(p_control_name).value = p_value;		
	}else{
		document.getElementById(p_control_name).value = '-1';		
	}
	if(p_loc_tai_trang=='1'){
		document.frmtimviecnhanh.action = ""; 
	}else{
		document.frmtimviecnhanh.action = "/tim-kiem-viec-lam-nhanh/"; 
	}
	document.frmtimviecnhanh.submit(); 		
 }
 
 /* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * ham thay doi gia tri tim kiem nhanh
 * param string p_control_name : ten control nhan gia tri
 * param string p_value: gia tri control can nhan
 * param integer p_loc_tai_trang: Che do loc tai trang hien thoi, hoac loc o trang tim kiem
 */
 function tim_kiem_nhanh_selectbox(p_loc_tai_trang){	
	frm = document.frmtimviecnhanh;	
	chuoi_tim_kiem = '';
	if (frm.hdn_tu_khoa) {
		tu_khoa = frm.hdn_tu_khoa.value;
		if (tu_khoa == 'Nhập tiêu đề công việc') {
			tu_khoa = "";
		}					
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_tu_khoa=' + tu_khoa;	
	}
	if (frm.hdn_nganh_nghe_cap1) {
		nganh_nghe_cap_1 = frm.hdn_nganh_nghe_cap1.value;			
		nganh_nghe_cap_1 = nganh_nghe_cap_1 == '' ? '-1' : nganh_nghe_cap_1;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_nganh_nghe_cap1=' + nganh_nghe_cap_1;
	}
	if (frm.hdn_nganh_nghe_cap2) {
		nganh_nghe_cap_2 = frm.hdn_nganh_nghe_cap2.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_nganh_nghe_cap2=' + nganh_nghe_cap_2;
	}
	if (frm.hdn_dia_diem) {
		dia_diem = frm.hdn_dia_diem.value;	
		dia_diem = dia_diem == '' ? '-1' : dia_diem;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_dia_diem=' + dia_diem;
	}
	if (frm.hdn_muc_luong) {
		muc_luong = frm.hdn_muc_luong.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_muc_luong=' + muc_luong;
	}
	if (frm.hdn_cap_bac) {
		cap_bac = frm.hdn_cap_bac.value;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_cap_bac=' + cap_bac;
	}
	if (frm.hdn_bang_cap) {	
		bang_cap = frm.hdn_bang_cap.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_bang_cap=' + bang_cap;
	}
	if (frm.hdn_kinh_nghiem) {	
		kinh_nghiem = frm.hdn_kinh_nghiem.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_kinh_nghiem=' + kinh_nghiem;
	}
	if (frm.hdn_hinh_thuc) {	
		hinh_thuc_lam = frm.hdn_hinh_thuc.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_hinh_thuc=' + hinh_thuc_lam;
	}
	//if (nganh_nghe_cap_1 <= 0) {
		//alert('Bạn vui lòng chọn 1 ngành/nghề để tìm kiếm ứng viên phù hợp nhé');
		//return false;
	//}
	
	if(p_loc_tai_trang == '1'){
		document.location.href = chuoi_tim_kiem; 
	}else{		
		document.location.href = "/tim-kiem-viec-lam-nhanh/" + chuoi_tim_kiem; 
	}
	
	//document.frmtimviecnhanh.submit(); 		
	return false;
 }
 
  /* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * ham thay doi gia tri tim kiem ung vien nhanh
 * param string p_control_name : ten control nhan gia tri
 * param string p_value: gia tri control can nhan
 * param integer p_loc_tai_trang: Che do loc tai trang hien thoi, hoac loc o trang tim kiem
 */
 function tim_ung_vien_nhanh(p_control_name, p_value, p_loc_tai_trang){
	if(document.getElementById(p_control_name).value != p_value){
		document.getElementById(p_control_name).value = p_value;		
	}else{
		document.getElementById(p_control_name).value = '-1';		
	}
	if(p_loc_tai_trang=='1'){
		document.frmtimungviennhanh.action = ""; 
	}else{
		document.frmtimungviennhanh.action = "/tim-kiem-ung-vien-nhanh/"; 
	}
	document.frmtimungviennhanh.submit(); 		
 } 
 
 /* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * ham thay doi gia tri tim kiem ung vien nhanh
 * param string p_control_name : ten control nhan gia tri
 * param string p_value: gia tri control can nhan
 * param integer p_loc_tai_trang: Che do loc tai trang hien thoi, hoac loc o trang tim kiem
 */
 function tim_ung_vien_nhanh_selectbox(p_loc_tai_trang){
	frm = document.frmtimungviennhanh;	
	chuoi_tim_kiem = '';
	if (frm.hdn_tu_khoa) {
		tu_khoa = frm.hdn_tu_khoa.value;				
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_tu_khoa=' + tu_khoa;			
	}
	if (frm.hdn_nganh_nghe_cap1) {
		nganh_nghe_cap_1 = frm.hdn_nganh_nghe_cap1.value;			
		nganh_nghe_cap_1 = nganh_nghe_cap_1 == '' ? '-1' : nganh_nghe_cap_1;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_nganh_nghe_cap1=' + nganh_nghe_cap_1;
	}
	if (frm.hdn_nganh_nghe_cap2) {
		nganh_nghe_cap_2 = frm.hdn_nganh_nghe_cap2.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_nganh_nghe_cap2=' + nganh_nghe_cap_2;
	}
	if (frm.hdn_dia_diem) {
		dia_diem = frm.hdn_dia_diem.value;	
		dia_diem = dia_diem == '' ? '-1' : dia_diem;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_dia_diem=' + dia_diem;
	}
	if (frm.hdn_muc_luong) {
		muc_luong = frm.hdn_muc_luong.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_muc_luong=' + muc_luong;
	}
	if (frm.hdn_cap_bac) {
		cap_bac = frm.hdn_cap_bac.value;
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_cap_bac=' + cap_bac;
	}
	if (frm.hdn_bang_cap) {	
		bang_cap = frm.hdn_bang_cap.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_bang_cap=' + bang_cap;
	}
	if (frm.hdn_kinh_nghiem) {	
		kinh_nghiem = frm.hdn_kinh_nghiem.value;	
		if (chuoi_tim_kiem == '') {
			chuoi_tim_kiem = chuoi_tim_kiem + '?';
		} else {
			chuoi_tim_kiem = chuoi_tim_kiem + '&';
		}
		chuoi_tim_kiem = chuoi_tim_kiem + 'hdn_kinh_nghiem=' + kinh_nghiem;
	}	
		
	if (nganh_nghe_cap_1 <= 0) {
		alert('Bạn vui lòng chọn 1 ngành/nghề để tìm kiếm ứng viên phù hợp nhé');
		return false;
	}
	if(p_loc_tai_trang == '1'){
		document.location.href = chuoi_tim_kiem; 
	}else{		
		document.location.href = "/tim-kiem-ung-vien-nhanh/" + chuoi_tim_kiem; 	
	}
		
	
	//document.frmtimungviennhanh.submit(); 		
	return false;
 } 
 
 /* create: ducnq 15/05/2012
 * last change: ducnq 15/05/2012
 * ham huy bo cac gia tri tim kiem nhanh 
 */
 function huy_dieu_kien_tim_kiem(){  
	// bo loc tu khoa
	document.getElementById('hdn_tu_khoa').value = '';			
	// bo loc nganh	
	document.getElementById('hdn_nganh_nghe_cap1').value = -1;			
	// bo loc dia diem
	document.getElementById('hdn_dia_diem').value = -1;		
	// bo loc muc luong
	document.getElementById('hdn_muc_luong').value = -1;		
	// bo loc cap bac
	document.getElementById('hdn_cap_bac').value = -1;		
	// bo loc bang cap
	//document.getElementById('hdn_bang_cap').value = '-1';		
	// bo loc kinh nhgiem
	document.getElementById('hdn_kinh_nghiem').value = -1;		
	
	duong_dan = document.location.href;		
	rs_duong_dan = duong_dan.split("?");	
	duong_dan = rs_duong_dan[0];		
	document.location.href = duong_dan;	

	return false;
 }

/* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * Ham xem them cac tieu thuc loc
 * param string p_ul_id : id cua the ul/div 
 */
 function xem_them(p_ul_id){	
	p_control_ul = document.getElementById(p_ul_id);				
	p_control_ul.style.display = "";	
	p_control_a = document.getElementById('a_'+p_ul_id);			
	p_control_a.href = "javascript:thu_gon('"+p_ul_id+"')";
	p_control_a.innerHTML = '&gt;&gt;&nbsp;Thu gọn';
 }
 
 /* create: 		ducnq 07/05/2012
 * last change: ducnq 07/05/2012
 * Ham thu gon cac tieu thuc loc
 * param string p_ul_id : id cua the ul /div
 */
 function thu_gon(p_ul_id){	
	p_control_ul = document.getElementById(p_ul_id);				
	p_control_ul.style.display = "none";	
	p_control_a = document.getElementById('a_'+p_ul_id);			
	p_control_a.href = "javascript:xem_them('"+p_ul_id+"')";
	p_control_a.innerHTML = '&gt;&gt;&nbsp;Xem thêm';
 }
 
/* create: 		cuongnx 08/05/2012
 * last change: cuongnx 08/05/2012
 * Nút bấm Chọn hết
 * param int record_count : tổng số check box trong bảng danh sách 
 * param string element_id : Tên chung của các checkbox con
 */
 
 function checkall(record_count,element_id){

	for(i=0;i<record_count;i++){
		document.getElementById(element_id+i).checked = true;		
	}
}
/* create: 		cuongnx 08/05/2012
 * last change: cuongnx 08/05/2012
 * Nút bấm Bỏ Chọn hết
 * param int record_count : tổng số check box trong bảng danh sách 
 * param string element_id : Tên chung của các checkbox con
 */
function un_checkall(record_count,element_id){
	for(i=0;i<record_count;i++){
		document.getElementById(element_id+i).checked = false;		
	}
}
/* create: 		cuongnx 08/05/2012
 * last change: cuongnx 08/05/2012
 * Checkbox Chọn hết
 * param object  obj: Object là checkbox. nếu checked=true thì tất cả các item đều được check và ngược lại
 * param int record_count : tổng số check box trong bảng danh sách 
 * param string element_id : Tên chung của các checkbox con
 
 */
function check_all(obj,record_count,element_id){
	if(obj.checked==true){
		checkall(record_count,element_id);
	}else{
		un_checkall(record_count,element_id);
	}
}

/* create: 		cuongnx 08/05/2012
 * last change: cuongnx 08/05/2012
 * Javascript cho thao tác gửi mail cho bạn bè bao gồm:
 * Hàm gui_mail_ban_be() Gọi đến popup overlay thông qua ajax.
 * Hàm trim(inputString) Loại bỏ khoảng trắng khi truyền string
 * Hàm echeck(str) Kiểm tra định dạng email.
 * Hàm CheckData() Kiểm tra việc nhập dữ liệu form. Thực hiện validation.
 * Hàm ClearData() Xóa thông tin người dùng nhập vào.
 */
function gui_mail_ban_be( ){
	//v_str_pk_tin_tuyen_dung = document.getElementById('checkedvalues').value;
	v_tong_tin = document.getElementById('tong_tin').value;
	document.getElementById('checkedvalues').value = '';
	document.getElementById('nganh_list').value ='';
	document.getElementById('tieu_de_list').value ='';
	document.getElementById('mo_ta_list').value ='';		
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			v_count = v_count*1+1;
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('nganh_list').value += ",~,"+document.getElementById('nganh_cap_1'+i).value;
			document.getElementById('tieu_de_list').value += ",~,"+document.getElementById('tieu_de'+i).value;
			document.getElementById('mo_ta_list').value += ",~,"+document.getElementById('mo_ta'+i).value;		
		}
	}
	if(v_count>0){		
		v_str_pk_tin_tuyen_dung = document.getElementById('checkedvalues').value;		
		v_nganh_list = document.getElementById('nganh_list').value;
		v_tieu_de_list = document.getElementById('tieu_de_list').value;
		v_mo_ta_list = document.getElementById('mo_ta_list').value;
		url =  "/ajax/dsp_send_mail_to_friend.php";
		show_box_popup('',640,600);			
		AjaxActionPost( '_box_popup', url,"v_str_pk_tin_tuyen_dung="+v_str_pk_tin_tuyen_dung+"&nganh_list="+v_nganh_list+"&tieu_de_list="+v_tieu_de_list+"&mo_ta_list="+v_mo_ta_list+"&tong_tin="+v_tong_tin);	
	}else{
		alert('Bạn chưa chọn tin cần gửi!');
	}
	return;
}

// cuongnx 08/05/2012
// ham kiem tra dieu kien gui mail cho ban be
function trim(inputString) {
   // Removes leading and trailing spaces from the passed string. Also removes
   // consecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
	  retValue = retValue.substring(1, retValue.length);
	  ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
	  retValue = retValue.substring(0, retValue.length-1);
	  ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
	  retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function
function echeck(str) {

	var at="@"
	var dot="."
	var lat=str.indexOf(at)
	var lstr=str.length
	var ldot=str.indexOf(dot)
	if (str.indexOf(at)==-1){
	   return false
	}

	if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
	   return false
	}

	if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		return false
	}

	 if (str.indexOf(at,(lat+1))!=-1){
		return false
	 }

	 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		return false
	 }

	 if (str.indexOf(dot,(lat+2))==-1){
		return false
	 }
	
	 if (str.indexOf(" ")!=-1){
		return false
	 }

	 return true					
}
function CheckData() {
	
	email_nguoi_nhan = document.frmSendMail.txt_email_nguoi_nhan.value;
	if(email_nguoi_nhan==''){
		alert ('Vui lòng nhập email người nhận');
		document.frmSendMail.txt_email_nguoi_nhan.focus();
		return false;
	}else{
		if(email_nguoi_nhan.indexOf(';') !=-1){
			arr_email_nguoi_nhan = email_nguoi_nhan.split(';');
			for(i=0;i<arr_email_nguoi_nhan.length;i++){
				if (echeck(arr_email_nguoi_nhan[i]) == false){
					alert ('Email Người nhận không chính xác');
					document.frmSendMail.txt_email_nguoi_nhan.focus();
					return false;
				}
			}
		}
	}
	// if (echeck(document.frmSendMail.txt_email_nguoi_nhan.value) == false){
		// alert ('Email Người nhận không chính xác');
		// document.frmSendMail.txt_email_nguoi_nhan.focus();
		// return false;
	// }	
	if (echeck(document.frmSendMail.txt_email_cua_ban.value) == false){
		alert ('Email của Bạn không chính xác');
		document.frmSendMail.txt_email_cua_ban.focus();
		return false;
	}				
	if (trim(document.frmSendMail.txt_tieu_de.value) == ""){
		alert ('Vui Lòng nhập tiêu đề');
		document.frmSendMail.txt_tieu_de.focus();
		return false;
	}
	if(document.frmSendMail.dang_gui_mail.value==''){	
		document.frmSendMail.dang_gui_mail.value='1';	
		document.frmSendMail.target = "fr_submit_send_mail_to_friend";
		document.frmSendMail.action = "/ajax/act_send_mail_to_friend.php";	
		document.frmSendMail.submit();
	}	
	// close_box_popup();
	// document.getElementById('fr_submit').style.width="100%";
	// document.getElementById('fr_submit').style.height="100px";
	// document.getElementById('fr_submit').style.border="none";
	// document.getElementById('fr_submit').style.visibility="visible";
	// document.getElementById('email_box').style.display="none";
	
	return true;
	
}
function ClearData() {
	document.frmSendMail.txt_ten_nguoi_nhan.value='';
	document.frmSendMail.txt_email_nguoi_nhan.value='';
	document.frmSendMail.txt_ten_ban.value='';
	document.frmSendMail.txt_email_cua_ban.value='';
	document.frmSendMail.txt_ma_bao_mat.value='';
}
/*
* Kết thúc phần Gửi thông tin cho bạn bè.
*/

//hailt 11/05/2012
//xu ly tren box tim kiem trang quan li tin tuyen dung cua nha tuyen dung
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntd_quan_tri_tim_kiem_ttd(p_tien_to,p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-999;
	}
	document.getElementById('page').value=1;
	ntd_quan_tri_ds_ttd(-1);
}
//hailt 11/05/2012
//xu ly tren box tim kiem trang quan li tin tuyen dung cua nha tuyen dung
//function huy tim kiem khi bam nut huy tim kiem
function ntd_quan_tri_huy_tim_kiem_ttd() {
	v_url='/ntd-trang-quan-tri-tin-tuyen-dung.html';
	window.location.href = v_url;
}

//hailt 14/05/2012
//xu ly tren box tim kiem trang quan li tin tuyen dung cua nha tuyen dung
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntd_quan_tri_sap_xep_ttd(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntd_quan_tri_ds_ttd(-1);
}
//hailt 14/05/2012
//xu ly tren box ds ttd trang quan li tin tuyen dung cua nha tuyen dung
//function set tat ca gia tri cua 1 mang checkbox
//3 tham so : 
//tien_to :tien to dang truoc id cac checkbox,
//tien_to :hau to dang sau id cac checkbox,
//tong_so :tong so checkbox trong mang
//gia_tri :gia tri can dat:true, false
//co the dung lai o nhieu noi
function select_or_unselect_group_checkbox(tien_to,hau_to,tong_so,gia_tri) {
	for(var i=0;i<tong_so;i++){
		if(document.getElementById(tien_to + i + hau_to)!=null){
			document.getElementById(tien_to + i + hau_to).checked = gia_tri;
		}
	}
}

/* create: 		ducnq 15/05/2012
 * last change: ducnq 15/05/2012
 * Ham loc theo tu khoa onkeydown
 * param string p_loc_tai_trang : Che do loc tai trang hoac loc o trang tim kiem
 */
function func_tim_kiem_theo_tu_khoa_onkeydown(event,p_loc_tai_trang){	
	var keyCode = (document.layers) ? keyStroke.which : event.keyCode;
	// Phim Enter	
	if(keyCode == 13 || keyCode == '13'){		
		func_tim_kiem_theo_tu_khoa(p_loc_tai_trang);
		return;
	}
}

/* create: 		ducnq 15/05/2012
 * last change: ducnq 15/05/2012
 * Ham loc theo tu khoa
 * param string p_loc_tai_trang : Che do loc tai trang hoac loc o trang tim kiem
 */
function func_tim_kiem_theo_tu_khoa(p_loc_tai_trang){	
	
	if (document.getElementById('hdn_tu_khoa')) {
		document.getElementById('hdn_tu_khoa').value = document.getElementById('txt_tu_khoa_tim_kiem').value;
	} 
	if (document.getElementById('hdn_tu_khoa').value == 'Nhap tieu de cong viec, ten NTD, dia diem de tim kiem' || document.getElementById('hdn_tu_khoa').value == 'Nhập tiêu đề công việc, tên NTD, địa điểm để tìm kiếm') {
		document.getElementById('hdn_tu_khoa').value = '';
	} 
	if (document.getElementById('hdn_nganh_nghe_cap1')) {
		document.getElementById('hdn_nganh_nghe_cap1').value = $("#sel_nganh_nghe").val();;
	} 
	if ($("#sel_nganh_nghe").val() == "") {
		document.getElementById('hdn_nganh_nghe_cap1').value = -1;
	}
	if (document.getElementById('hdn_dia_diem')) {
		document.getElementById('hdn_dia_diem').value = $("#sel_dia_diem").val();
	} 
	if ($("#sel_dia_diem").val() == "") {
		document.getElementById('hdn_dia_diem').value = -1;
	}
	if (document.getElementById('hdn_muc_luong')) {
		document.getElementById('hdn_muc_luong').value = $("#sel_muc_luong").val();;
	} 
	
	if ($("#sel_muc_luong").val() == "") {
		document.getElementById('hdn_muc_luong').value = -1;
	}
	
	if(document.frmtimviecnhanh){
		var frm = document.frmtimviecnhanh;
		var frm_search = "/tim-kiem-viec-lam-nhanh/";
	}
	if(document.frmtimungviennhanh){
		var frm = document.frmtimungviennhanh;
		var frm_search = "/tim-kiem-ung-vien-nhanh/";
	}
	
	if(p_loc_tai_trang=='1'){
		frm.action = ""; 
	}else{
		frm.action = frm_search; 
	}
	frm.submit(); 		
}

/* Phan js hien thi tooltip 
 */
var tooltip=function(){
	var id = 'tt';
	var top = 7;
	var left = 3;
	var maxw = 470;
	var speed = 10;
	var timer = 20;
	var endalpha = 96;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();


/* create: ducnq 16/05/2012
 * last change: ducnq 16/05/2012
 * Ham luu tin viec lam
 * param string p_loc_tai_trang : Che do loc tai trang hoac loc o trang tim kiem
 */
function ntv_luu_tin(){	
	var frm =  document.frm_viec_lam_nhieu_nguoi_xem;
	v_tong_tin = document.getElementById('tong_tin').value;				
	document.getElementById('checkedvalues').value = '';
	document.getElementById('nganh_list').value ='';
	v_count = 0;	
    for(i=0;i<v_tong_tin;i++){
        
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('nganh_list').value += ",~,"+document.getElementById('nganh_cap_1'+i).value;
			v_count = v_count*1+1;			
		}
	}   
	if(v_count>0){
		if(frm.dang_luu_tin.value==''){	
			frm.dang_luu_tin.value='1';
			v_str_pk_tin_tuyen_dung = document.getElementById('checkedvalues').value;		
			v_nganh_list = document.getElementById('nganh_list').value;            
			frm.target = "fr_submit";		
			frm.action = "/ajax/ntv/luu_tin/"+v_str_pk_tin_tuyen_dung+"/"+v_nganh_list;	
			frm.submit();
		}else{
			alert('Hệ thống đang xử lý...!');
		}
	}else{
		alert('Bạn chưa chọn tin cần lưu!');
	}
}

/* create: ducnq 16/05/2012
 * last change: ducnq 16/05/2012
 * Ham to cao viec lam 
 */
function ntv_to_cao(){	
	v_tong_tin = document.getElementById('tong_tin').value;				
	document.getElementById('checkedvalues').value = '';
	document.getElementById('tai_khoan_list').value ='';	
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('tai_khoan_list').value += ",~,"+document.getElementById('tai_khoan'+i).value;
			v_count = v_count*1+1;			
		}
	}
	if(v_count>0){
		v_str_pk_tin_tuyen_dung = document.getElementById('checkedvalues').value;
		v_tai_khoan_list = document.getElementById('tai_khoan_list').value;
		document.frm_viec_lam_nhieu_nguoi_xem.target = "fr_submit";
		document.frm_viec_lam_nhieu_nguoi_xem.action = "/ajax/account/to_cao/"+v_str_pk_tin_tuyen_dung+" /"+v_tai_khoan_list+" /1";	
		document.frm_viec_lam_nhieu_nguoi_xem.submit();
	}else{
		alert('Bạn chưa chọn tin cần tố cáo!');
	}
}

/* create: ducnq 26/06/2012
 * last change: ducnq 26/06/2012
 * Ham luu tin ung vien
 * param string p_loc_tai_trang : Che do loc tai trang hoac loc o trang tim kiem
 */
function ntd_luu_ho_so(){
	var frm =  document.frm_ung_vien_main;
	v_tong_tin = document.getElementById('tong_tin').value;				
	document.getElementById('checkedvalues').value = '';
	document.getElementById('nganh_list').value ='';
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('nganh_list').value += ",~,"+document.getElementById('nganh_cap_1'+i).value;
			document.getElementById('tai_khoan_list').value += ",~,"+document.getElementById('tai_khoan'+i).value;
			v_count = v_count*1+1;			
		}
	}
	if(v_count>0){
		if(frm.dang_luu_ho_so.value==''){	
			frm.dang_luu_ho_so.value='1';
			v_str_pk_tin_tim_viec = document.getElementById('checkedvalues').value;		
			v_nganh_list = document.getElementById('nganh_list').value;
			v_tai_khoan_list = document.getElementById('tai_khoan_list').value;
			frm.target = "fr_submit";		
			frm.action = "/ajax/ntd/luu_ung_vien/"+v_str_pk_tin_tim_viec+"/"+v_nganh_list+"/"+v_tai_khoan_list;	
			frm.submit();
		}else{
			alert('Hệ thống đang xử lý...!');
		}
	}else{
		alert('Bạn chưa chọn ứng viên cần lưu!');
	}
}

/* create: ducnq 26/06/2012
 * last change: ducnq 26/06/2012
 * Ham luu ung vien duoc chon phong van
 * param ko co
 */
function ntv_luu_phong_van(){
	var frm =  document.frm_ung_vien_main;
	v_tong_tin = document.getElementById('tong_tin').value;				
	document.getElementById('checkedvalues').value = '';
	document.getElementById('nganh_list').value ='';
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('nganh_list').value += ",~,"+document.getElementById('nganh_cap_1'+i).value;
			v_count = v_count*1+1;			
		}
	}
	if(v_count>0){
		if(frm.dang_luu_phong_van.value==''){	
			frm.dang_luu_phong_van.value='1';
			v_str_pk_tin_tim_viec = document.getElementById('checkedvalues').value;		
			v_nganh_list = document.getElementById('nganh_list').value;
			frm.target = "fr_submit";		
			frm.action = "/ajax/ntd/luu_phong_van_ung_vien/"+v_str_pk_tin_tim_viec+"/"+v_nganh_list;	
			frm.submit();
		}else{
			alert('Hệ thống đang xử lý...!');
		}
	}else{
		alert('Bạn chưa chọn ứng viên cần lưu!');
	}
}

/* create: 		ducnq 26/06/2012
 * last change: ducnq 26/06/2012
 * Javascript cho thao tác gửi mail phan hoi ung vien:
 * Hàm gui_email_phan_hoi() Gọi đến popup overlay thông qua ajax.
 * Hàm trim(inputString) Loại bỏ khoảng trắng khi truyền string
 * Hàm echeck(str) Kiểm tra định dạng email.
 * Hàm CheckData() Kiểm tra việc nhập dữ liệu form. Thực hiện validation.
 * Hàm ClearData() Xóa thông tin người dùng nhập vào.
 */
function gui_email_phan_hoi(){
	//v_str_pk_tin_tuyen_dung = document.getElementById('checkedvalues').value;
	v_tong_tin = document.getElementById('tong_tin').value;
	var email_list = '';				
	var ten_list = '';				
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			v_count = v_count*1+1;
			email_list += ",~,"+document.getElementById('email_ntv'+i).value;				
			ten_list += ",~,"+document.getElementById('ten_ntv'+i).value;
		}
	}	
	if(v_count>0){
		url =  "/ajax/dsp_gui_email_phan_hoi.php";
		show_box_popup('',640,600);			
		AjaxActionPost( '_box_popup', url,"email_list="+email_list+"&ten_list="+ten_list,true);	
	}else{
		alert('Bạn chưa chọn ứng viên cần gửi!');
	}
	return;
}

/* create: 		ducnq 27/06/2012
 * last change: ducnq 27/06/2012
 * ham cap nhat guii email phan hoi ung vien: 
 */
function action_email_phan_hoi() {	
	var frm =  document.frmSendMail;
	if (document.frmSendMail.area_noi_dung.value == ''){
		alert ('Bạn chưa nhập nội dung phản hồi!');
		document.frmSendMail.area_noi_dung.focus();
		return false;
	}
	if (document.frmSendMail.txt_ma_bao_mat.value == ''){
		alert ('Bạn chưa nhập mã bảo mật!');
		document.frmSendMail.txt_ma_bao_mat.focus();
		return false;
	}
	if(frm.dang_gui_mail.value==''){	
		frm.dang_gui_mail.value='1';
		document.frmSendMail.target = "fr_submit";
		document.frmSendMail.action = "/ajax/act_send_email_phan_hoi.php";	
		document.frmSendMail.submit();	
		return true;
	}
}

/* create: 		ducnq 27/06/2012
 * last change: ducnq 27/06/2012
 * Xoa noi dung da nhap cho email phan hoi
 */
function nhap_lai_email_phan_hoi() {	
	document.frmSendMail.area_noi_dung.value='';	
}

/* create: ducnq 27/06/2012
 * last change: ducnq 27/06/2012
 * Ham to cao ung vien 
 */
function ntd_to_cao_ung_vien(){	
	v_tong_tin = document.getElementById('tong_tin').value;				
	document.getElementById('checkedvalues').value = '';
	document.getElementById('tai_khoan_list').value ='';	
	v_count = 0;	
	for(i=0;i<v_tong_tin;i++){
		if(document.getElementById('chk_item'+i) && document.getElementById('chk_item'+i).checked==true){
			document.getElementById('checkedvalues').value += ",~,"+document.getElementById('chk_item'+i).value;
			document.getElementById('tai_khoan_list').value += ",~,"+document.getElementById('tai_khoan'+i).value;
			v_count = v_count*1+1;			
		}
	}
	if(v_count>0){
		v_str_pk_tin_tim_viec = document.getElementById('checkedvalues').value;
		v_tai_khoan_list = document.getElementById('tai_khoan_list').value;
		document.frm_ung_vien_main.target = "fr_submit";
		document.frm_ung_vien_main.action = "/ajax/account/to_cao/"+v_str_pk_tin_tim_viec+" /"+v_tai_khoan_list+" /0";	
		document.frm_ung_vien_main.submit();
	}else{
		alert('Bạn chưa chọn ứng viên cần tố cáo!');
	}
}

/* copy: hailt 16/05/2012
 * last change: hailt 16/05/2012
 */
function fw24h_replace_bad_char(string)
{
	string = string.replace('&', '&#38;');
    string = string.replace('<', '&lt;');
    string = string.replace('>', '&gt;');
    string = string.replace('"', '&#34;');
    string = string.replace("'", '&#39;');
    string = string.replace('\\', '&#92;');
    string = string.replace('=', '&#61;');    
    string = string.replace('(', '&#40;');    
    string = string.replace(')', '&#41;'); 
	string = string.replace("-", '&#45;');	
	string = string.replace("|", '&#124;');
	
    return string;
}

/* create: ducnq 21/05/2012
 * last change: hailt 12/07/2012
 * Ham dang nhap 
 */
function dangnhap(){
	var temp = document.frmLogin;
	if (document.frmLogin == null && document.ifr_login_and_info != null && document.ifr_login_and_info.frmLogin != null) {
		temp = document.ifr_login_and_info.frmLogin;
	}
	if (temp.txt_ten_dang_nhap && (temp.txt_ten_dang_nhap.value=='' || temp.txt_ten_dang_nhap.value=='Email đăng nhập') ) {
		alert('Bạn chưa nhập tên đăng nhập!');		
		temp.txt_ten_dang_nhap.focus();
		return false;
	}
	if (temp.txt_mat_khau && temp.txt_mat_khau.value=='') {
		alert('Bạn chưa nhập mật khẩu!');		
		temp.txt_mat_khau.focus();		
		return false;
	}
	temp.target = "frmLogin_submit";
	temp.action = "/ajax/account/dang_nhap_tk/";
	temp.submit();
	return false;
}

// lay tieu de to cao duoc chon 
function lay_tieu_de_to_cao(p_obj){		
	var frm = document.frmToCao;
	v_soluong = frm.hdn_count.value;	
		
    var v_chuoi_ten = "";		
	for (x=0;x<v_soluong*1;x++)
	{	
		if(document.getElementById("chk_ly_do"+x)){
			p_chk = document.getElementById("chk_ly_do"+x);	
			if (p_obj!=p_chk && p_chk.checked)
			{	
				p_chk.checked = false;								
			}
		}
	}
	if(p_obj.checked){
		v_chuoi_ten = p_obj.getAttribute("c_tieu_de");					 	 
	}else{
		v_chuoi_ten = '';					 	 
	}
	frm.chk_ly_do_khac.checked = false
	ly_do_to_cao_khac_onclick(frm.chk_ly_do_khac);
	frm.hdn_tieu_de.value = v_chuoi_ten;
}

/* Ham an/hien text noi dung to cao khac
 */
function ly_do_to_cao_khac_onclick(p_obj){		
	if(p_obj.checked){
		document.getElementById("tr_noidung_khac").style.display = "";
		
		var frm = document.frmToCao;
		v_soluong = frm.hdn_count.value;	
		for (x=0;x<v_soluong*1;x++)
		{	
			if(document.getElementById("chk_ly_do"+x)){
				p_chk = document.getElementById("chk_ly_do"+x);	
				if (p_chk.checked) p_chk.checked = false;											
			}
		}
		frm.hdn_tieu_de.value = '';
	}else{
		document.getElementById("tr_noidung_khac").style.display = "none";
	}	
}

/* ham goi chuc nang to cao
 */
function check_data_to_cao(){	
	var frm = document.frmToCao;	
	if(frm.dang_to_cao.value==''){	
		frm.dang_to_cao.value='1';
		frm.target = "fr_submit";	
		frm.action = "/ajax/account/cap_nhat_to_cao/"+frm.pk_tin_list.value+" /"+frm.tai_khoan_list.value+" /"+frm.hdn_tieu_de.value+" /"+frm.area_noi_dung.value+" /"+frm.txt_ma_bao_mat.value+" /"+frm.hdn_loai_tai_khoan.value;	
		frm.submit();	
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}

/* create: hailt 25/05/2012
 * last change: hailt 25/05/2012
 * Ham dang xuat 
 */
function dang_xuat(){	
	var temp = document.frmLogin;
	if (document.frmLogin == null && document.ifr_login_and_info != null && document.ifr_login_and_info.frmLogin != null) {
		temp = document.ifr_login_and_info.frmLogin;
	}
	temp.action = "/ajax/account/dang_xuat_tk/";		
	temp.submit();	
}


/* Ham hien thi khi di chuot vao so sao binh chon
 */
var arr_sao_binh_chon= new Array('','','','','','','','','','')
function onmouseover_sao_binh_chon(p_index) {
	for(i=0;i<p_index;i++){
		arr_sao_binh_chon[i]=eval("document.getElementById('sao_binh_chon"+(i+1)+"').src");
		eval("document.getElementById('sao_binh_chon"+(i+1)+"').src=\"/images/star-orange.gif\"");
	}
}

/* Ham hien thi khi di chuot khoi so sao binh chon
 */
function onmouseout_sao_binh_chon(p_index) {
	for(i=0;i<p_index;i++){
		eval("document.getElementById('sao_binh_chon"+(i+1)+"').src='"+arr_sao_binh_chon[i]+"'");
		arr_sao_binh_chon[i]='';
	}
}

/* Ham hien thi form dang nhap tai khoan
 */
function hien_thi_popup(p_is_parent,p_url,p_x,p_y){
	v_parent = '';
	if(p_is_parent==1){
		v_parent = 'parent.';
	}		
	eval(v_parent+'show_box_popup("",'+p_x+','+p_y+')');				
	eval(v_parent+'AjaxAction( "_box_popup", "'+p_url+'")');		
}

/* Ducnq
 * Ham cap nhat danh gia 1 nha tuyen dung
 * param integer p_so_diem_danh_gia: So diem danh gia nha tuyen dung
 * param integer p_ntd_id: Id nha tuyen dung
 */
function cap_nhat_danh_gia_ntd(p_so_diem_danh_gia,p_ntd_id){
	if(p_so_diem_danh_gia<=0){
		alert('Bạn chưa chọn số điểm đánh giá!'); return;
	}
	if(p_ntd_id<=0){
		alert('Nhà tuyển dụng không hợp lệ!'); return;
	}
	var frm = document.frmDanhGiaBinhLuan;	
	if(frm.dang_danh_gia.value==''){	
		frm.dang_danh_gia.value='1';
		frm.target = "if_frmDanhGiaBinhLuan_submit";
		frm.action="/ajax/ntd/cap_nhat_danh_gia_ntd/"+p_so_diem_danh_gia+"/"+p_ntd_id;		
		frm.submit();	
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}

/* Ducnq
 * Ham cap nhat danh gia 1 nha tuyen dung
 * param integer p_so_diem_danh_gia: So diem danh gia nha tuyen dung
 * param integer p_ntd_id: Id nha tuyen dung
 */
function cap_nhat_binh_luan_ntd(p_ntd_id){
	var frm = document.frmDanhGiaBinhLuan;
	v_binh_luan = frm.txt_content_comment.value;	
	if(v_binh_luan==''){
		alert('Nội dung bình luận không được để rỗng!'); 
		frm.txt_content_comment.focus(); return false;
	}
	v_soluong_ky_tu = document.getElementById("obj_so_ky_tu_binh_luan_hien_tai").innerHTML;	
	if(v_soluong_ky_tu<50){
		alert('Bình luận phải dài hơn 50 ký tự!'); return false;
	}	
	if(p_ntd_id<=0){
		alert('Nhà tuyển dụng không hợp lệ!'); return false;
	}		
	if(frm.dang_binh_luan.value==''){	
		frm.dang_binh_luan.value='1';
		frm.target = "if_frmDanhGiaBinhLuan_submit";
		frm.action="/ajax/ntd/cap_nhat_binh_luan_ntd/";		
		frm.submit();	
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}

/* Ducnq
 * Ham Dem so luong ky yu binh luan
 * param integer p_so_diem_danh_gia: So diem danh gia nha tuyen dung
 * param integer p_ntd_id: Id nha tuyen dung
 */
function dem_so_luong_ky_tu_binh_luan(obj){	
	v_count = obj.value.length;
	if(document.getElementById("obj_so_ky_tu_binh_luan_hien_tai")){
		document.getElementById("obj_so_ky_tu_binh_luan_hien_tai").innerHTML = v_count;
	}
}

function print_preview(p_url,p_style){	
	alert('Cửa sổ hiện ra bạn hãy bấm tổ hợp 2 phím "Ctrl + P " để in!');
	MM_openBrWindow(p_url,'',p_style);	
}

/* Ducnq
 * Ham cap nhat danh gia 1 nha tuyen dung
 * param integer p_so_diem_danh_gia: So diem danh gia nha tuyen dung
 * param integer p_ntd_id: Id nha tuyen dung
 */
function cap_nhat_theo_doi_nha_tuyen_dung(p_ntd_id){	
	var frm = document.frmDanhGiaBinhLuan;
	if(p_ntd_id<=0){
		alert('Nhà tuyển dụng không hợp lệ!'); return false;
	}		
	frm.target = "if_frmDanhGiaBinhLuan_submit";
	frm.action="/ajax/ntd/cap_nhat_theo_doi_nha_tuyen_dung/"+p_ntd_id;		
	frm.submit();	
}

/* hailt 04/06/2012
 * Ham ghi lai 1 tin tuyen dung
 * 
 */
function ntd_quan_tri_ghi_lai_tin_td(thao_tac){
	document.forms['form_cap_nhat_tin_td'].target = "fr_submit_cap_nhat_tin_td";
	if(thao_tac=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá tin tuyển dụng này không?")){
			return;
		}else{
			document.forms['form_cap_nhat_tin_td'].action="/ajax/ntd_quan_tri_cap_nhat_tin_td/xoa_tam/";		
		}
	}else{
		document.forms['form_cap_nhat_tin_td'].action="/ajax/ntd_quan_tri_cap_nhat_tin_td/ghi_lai/"+thao_tac;		
	}
	document.forms['form_cap_nhat_tin_td'].submit();	
}

/* hailt 14/06/2012
 * Ham goi toi trang xem truoc tin tuyen dung
 * 
 */
function ntd_quan_tri_xem_truoc_tin_td(){
	var iframe_popup='<iframe name="fr_popup_xem_truoc" id="fr_popup_xem_truoc" width="960" height="550"></iframe>';
	show_box_popup(iframe_popup,960,550);
	document.forms['form_cap_nhat_tin_td'].target = "fr_popup_xem_truoc";
	document.forms['form_cap_nhat_tin_td'].action="/ajax/ntd_quan_tri_xem_truoc_tin_td/";		
	document.forms['form_cap_nhat_tin_td'].submit();
}

/* hailt 04/06/2012
 * Ham chon 1 nganh cap 1 khi cap nhat tin tuyen dung/tin tim viec
 * 
 */
function ntd_ntv_quan_tri_chon_nganh_cap1(id_nganh_cap1,stt){			
	var i=0;
	document.getElementById('nganh_nghe_cap_1').value=id_nganh_cap1;
	document.getElementById('list_nganh_cap2').value=document.getElementById('list_nganh_cap2_'+id_nganh_cap1).value;
	var tong_so_cap1 = document.getElementById('tong_so_nganh_cap1').value;
	for(i=0;i<tong_so_cap1;i++){
		document.getElementById('hien_thi_nganh_cap_2_'+i).style.display = 'none';
		document.getElementById('b_ten_nganh_cap1_'+i).style.color = 'black';
	}
	document.getElementById('hien_thi_nganh_cap_2_'+stt).style.display = '';
	document.getElementById('b_ten_nganh_cap1_'+stt).style.color = 'red';
	document.getElementById('div_listNganh').scrollTop = 28*(parseInt(stt)-2);
	var tong_so_cap2 = document.getElementById('tong_so_nganh_cap2_'+id_nganh_cap1).value;
	for(i=0;i<tong_so_cap2;i++){
		document.getElementById('check_box_nganh_cap_2_'+id_nganh_cap1+'['+i+']').checked = true;
	}
}

//hailt 04/06/2012
//chon 1 nganh cap 2 khi cap nhat tin tuyen dung
function ntd_ntv_quan_tri_chon_nganh_cap_2(id,ky_tu_phan_cach){	
	var list_nganh_cap2 = document.getElementById('list_nganh_cap2').value;
	var value = document.getElementById(id).value;
	if(list_nganh_cap2 != ''){
		list_nganh_cap2 = list_nganh_cap2.replace(ky_tu_phan_cach+value,'');
		list_nganh_cap2 = list_nganh_cap2.replace(value+ky_tu_phan_cach,'');
		list_nganh_cap2 = list_nganh_cap2.replace(value,'');
	}
	if(document.getElementById(id).checked){//add
		if(list_nganh_cap2 == ''){
			list_nganh_cap2 = value;
		}else{
			list_nganh_cap2 = list_nganh_cap2+ky_tu_phan_cach+value;
		}
	}
	document.getElementById('list_nganh_cap2').value = list_nganh_cap2;
}
//hailt 04/06/2012
//chon 1 tinh khi cap nhat tin tuyen dung
function ntd_ntv_quan_tri_chon_tinh(stt,ky_tu_phan_cach,so_tinh_toi_da){
	
	var list_tinh = document.getElementById('list_tinh').value;
	var value = document.getElementById('checkbox_tinh['+stt+']').value;
	var checked = document.getElementById('checkbox_tinh['+stt+']').checked;
	
	if(list_tinh.split(ky_tu_phan_cach).length >= so_tinh_toi_da && checked == true){
		alert('Bạn chỉ có thể chọn tối đa '+so_tinh_toi_da+' tỉnh!');
		document.getElementById('checkbox_tinh['+stt+']').checked = false;alert
	} else {
		if(list_tinh != ''){
			list_tinh = list_tinh.replace(ky_tu_phan_cach+value,'');
			list_tinh = list_tinh.replace(value+ky_tu_phan_cach,'');
			if (list_tinh == value) {
				list_tinh = '';
			}
		}
		if(checked == true){//add
			if(list_tinh == ''){
				list_tinh = value;
			}else{
				list_tinh = list_tinh+ky_tu_phan_cach+value;
			}
			document.getElementById('b_ten_tinh_'+stt).style.color = 'red';
		}else{//remove
			if(document.getElementById('radio_hien_thi_tinh_duoc_chon').checked){
				document.getElementById('hien_thi_tinh_'+stt).style.display = 'none';
			}
			document.getElementById('b_ten_tinh_'+stt).style.color = 'black';
		}
		document.getElementById('list_tinh').value = list_tinh;
	}
	document.getElementById('div_listTinh').scrollTop = 23*(parseInt(stt)-2);
}
/* hailt 05/06/2012
 * Ham chon 1 tinh tu suggestion khi cap nhat tin tuyen dung
 * 
 */
function ntd_ntv_quan_tri_them_tinh_tu_suggestion(ky_tu_phan_cach, so_tinh_toi_da){	
	var list = document.getElementById('list_tinh').value;
	if(list.split(ky_tu_phan_cach).length >= so_tinh_toi_da ){
		alert('Bạn chỉ có thể chọn tối đa '+so_tinh_toi_da+' tỉnh!');
	return false;
	} else {
		var id_tinh = document.getElementById('them_tinh_tu_suggestion').value;
		var i=0;
		var so_tinh = document.getElementById('tong_so_tinh').value;
		for(i=0;i<so_tinh;i++){
			if(document.getElementById('checkbox_tinh['+i+']').value == id_tinh){
				document.getElementById('checkbox_tinh['+i+']').checked = true;
				ntd_ntv_quan_tri_chon_tinh(i,ky_tu_phan_cach,so_tinh_toi_da);
				if(document.getElementById('radio_hien_thi_tinh_duoc_chon').checked){
					ntd_ntv_quan_tri_hien_thi_tinh_duoc_chon(1);
				}else{
					ntd_ntv_quan_tri_hien_thi_tinh_duoc_chon(0);
				}
				break;
			}
		}
	}
	return false;
}
/* hailt 05/06/2012
 * Ham chon 1 tinh tu suggestion khi cap nhat tin tuyen dung
 * 
 */
function ntd_ntv_quan_tri_them_nganh_cap_1_tu_suggestion(){			
	var id_nganh_cap1 = document.getElementById('them_nganh_cap1_tu_suggestion').value;
	var i=0;
	var so_nganh_cap1 = document.getElementById('tong_so_nganh_cap1').value;
	for(i=0;i<so_nganh_cap1;i++){
		if(document.getElementById('radio_nganh_cap_1['+i+']').value == id_nganh_cap1){
			document.getElementById('radio_nganh_cap_1['+i+']').checked = true;
			ntd_ntv_quan_tri_chon_nganh_cap1(id_nganh_cap1,i);
			if(document.getElementById('radio_hien_thi_nganh_duoc_chon').checked){
				ntd_ntv_quan_tri_hien_thi_nganh_duoc_chon(1);
			}else{
				ntd_ntv_quan_tri_hien_thi_nganh_duoc_chon(0);
			}
			break;
		}
	}
}
//hailt 05/06/2012
//chi hien thi cac tinh duoc chon hoac hien thi tat cac tinh trong trang cap nhat tin tuyen dung
function ntd_ntv_quan_tri_hien_thi_tinh_duoc_chon(hien_thi){			
	var so_tinh = document.getElementById('tong_so_tinh').value;
	var i=0;
	for(i=0;i<so_tinh;i++){
		if(hien_thi == '0'){
			document.getElementById('hien_thi_tinh_'+i).style.display = '';
		}else{
			if(!document.getElementById('checkbox_tinh['+i+']').checked){
				document.getElementById('hien_thi_tinh_'+i).style.display = 'none';
			}else{
				document.getElementById('hien_thi_tinh_'+i).style.display = '';
			}
		}
	}
}

//hailt 05/06/2012
//chi hien thi cac nganh cap 1 duoc chon hoac hien thi tat cac nganh cap 1 trong trang cap nhat tin tuyen dung
function ntd_ntv_quan_tri_hien_thi_nganh_duoc_chon(hien_thi){			
	var so_nganh_cap1 = document.getElementById('tong_so_nganh_cap1').value;
	var i=0;
	for(i=0;i<so_nganh_cap1;i++){
		if(hien_thi == '0'){
			document.getElementById('hien_thi_nganh_cap1_'+i).style.display = '';
		}else{
			if(!document.getElementById('radio_nganh_cap_1['+i+']').checked){
				document.getElementById('hien_thi_nganh_cap1_'+i).style.display = 'none';
			}else{
				document.getElementById('hien_thi_nganh_cap1_'+i).style.display = '';
			}
		}
	}
}
//hailt 05/06/2012
//Nhay tu 1 trang bat ki sang trang tim kiem tin tuyen dung
function ntd_quan_tri_sang_trang_tim_kiem_tin_tuyen_dung(){			
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntd-trang-quan-tri-tin-tuyen-dung.html?tu_khoa='+v_tu_khoa;
	window.location.href = v_url;
	return false;
}

//hailt 05/06/2012 copy tu diemthi sang, dung cho suggestion, co chinh sua them js goi toi khi chon 1 dong
function SetAutoComplete(p_json_string,p_id_control,p_id_next_control,p_hide_id,p_width,p_js_can_goi_khi_chon){
	$().ready(function() {
		$('#'+p_id_control).autocomplete(p_json_string, {
			minChars: 1,
			delay: 20,
			width: p_width,
			matchContains: true,
			autoFill: false,
			Portfolio:true,
			formatItem: function(row) {                    
				return row.m  +"@" + row.c_web;                                    
			},
			formatResult: function(row) {				
				return row.m.replace("&#39;","'")+'#'+row.c.replace("&#39;","'");                				
			},
			NextFocusControlId: p_id_next_control
			,				
			hideId: p_hide_id
			,
			js_can_goi_khi_chon_1_dong: p_js_can_goi_khi_chon
		});		
	});
}




/* Hailt 06/06/2012
 * Ham NTD cap nhat thong tin tai khoan cua minh
 */
function ntd_quan_tri_cap_nhat_thong_tin_tai_khoan(){	
	document.forms['form_cap_nhat_thong_tin_ntd'].target = "fr_submit_cap_nhat_thong_tin_ntd";
	var url = "/ajax/ntd_quan_tri_thong_tin_tai_khoan/cap_nhat/";
	document.forms['form_cap_nhat_thong_tin_ntd'].action = url;	
	document.forms['form_cap_nhat_thong_tin_ntd'].submit();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Ham SET chieu cao cho box viec lam da xem neu co
function display_viec_lam_da_xem(){	
	v_height = 59;	
	if(document.getElementById("fr_viec_lam_da_xem")){	
		var obj = document.getElementById("fr_viec_lam_da_xem");
		var innerDoc = obj.contentDocument || obj.contentWindow.document;	
		if(innerDoc.getElementById("vldx-group")){
			obj.height = innerDoc.getElementById("vldx-group").offsetHeight*1+v_height*1; 				
		}		
	}		
	if(document.getElementById("fr_ung_vien_da_xem")){	
		var obj = document.getElementById("fr_ung_vien_da_xem");
		var innerDoc = obj.contentDocument || obj.contentWindow.document;	
		if(innerDoc.getElementById("uvdx-group")){
			obj.height = innerDoc.getElementById("uvdx-group").offsetHeight*1+v_height*1; 				
		}		
	}
	if(document.getElementById("fr_ung_vien_tieu_bieu")){	
		var obj = document.getElementById("fr_ung_vien_tieu_bieu");
		var innerDoc = obj.contentDocument || obj.contentWindow.document;	
		if(innerDoc.getElementById("div_uvdx")){
			obj.height = innerDoc.getElementById("div_uvdx").offsetHeight*1+25; 				
		}		
	}
}

/* Hailt 07/06/2012
 * Ham NTD cap nhat thong tin tai khoan - xoa logo
 */
function ntd_quan_tri_xoa_logo_cty(){	
	document.forms['form_cap_nhat_thong_tin_ntd'].target = "fr_submit_cap_nhat_thong_tin_ntd";
	var url = "/ajax/ntd_quan_tri_thong_tin_tai_khoan/xoa_logo";
	document.forms['form_cap_nhat_thong_tin_ntd'].action = url;	
	document.forms['form_cap_nhat_thong_tin_ntd'].submit();
}

/* Hailt 07/06/2012
 * Ham NTD cap nhat thong tin tai khoan - xoa giay phep kinh doanh
 */
function ntd_quan_tri_xoa_gpkd_cty(){	
	document.forms['form_cap_nhat_thong_tin_ntd'].target = "fr_submit_cap_nhat_thong_tin_ntd";
	var url = "/ajax/ntd_quan_tri_thong_tin_tai_khoan/xoa_gpkd";
	document.forms['form_cap_nhat_thong_tin_ntd'].action = url;	
	document.forms['form_cap_nhat_thong_tin_ntd'].submit();
}

/* Hailt 12/06/2012
 * Ham NTD cap nhat thong tin tai khoan
 */
function ntd_quan_tri_thay_doi_thong_tin_ntd(){	
	document.forms['form_cap_nhat_tin_td'].target = "fr_submit_cap_nhat_tin_td";
	var url = "/ajax/ntd_quan_tri_thong_tin_tai_khoan/thay_doi_thong_tin_ntd";
	document.forms['form_cap_nhat_tin_td'].action = url;	
	document.forms['form_cap_nhat_tin_td'].submit();
}

/* Hailt 12/06/2012
 * Ham NTD cap nhat thong tin tai khoan
 */
function ntd_quan_tri_thay_doi_lien_he_ntd(){	
	document.forms['form_cap_nhat_tin_td'].target = "fr_submit_cap_nhat_tin_td";
	var url = "/ajax/ntd_quan_tri_thong_tin_tai_khoan/thay_doi_lien_he_ntd";
	document.forms['form_cap_nhat_tin_td'].action = url;	
	document.forms['form_cap_nhat_tin_td'].submit();
}

/* Hailt 13/06/2012
 * Ham NTD cap nhat thay doi ma bao mat chinh sua thong tin tai khoan trang dang/sua tin tuyen dung
 */
function ntd_quan_tri_reset_ma_bao_mat(div_id){	
	document.forms['form_cap_nhat_tin_td'].target = "fr_submit_cap_nhat_tin_td";
	var url = "/ajax/ntd_quan_tri_cap_nhat_tin_td/reset_ma_bao_mat/"+div_id;
	document.forms['form_cap_nhat_tin_td'].action = url;	
	document.forms['form_cap_nhat_tin_td'].submit();
}

// hailt 15/06/2012
// ntd xuat ban them 1 tin tuyen dung
function ntd_quan_tri_xuat_ban_them_1_ttd(id_ttd){
	document.forms['form_ds_ttd'].target = "fr_submit_ds_ttd";
	var url = "/ajax/ntd_quan_tri_tin_tuyen_dung/xuat_ban_them_1_tin_td/"+id_ttd;
	document.forms['form_ds_ttd'].action = url;	
	document.forms['form_ds_ttd'].submit();
}

//hailt 19/06/2012
//xu ly tren box tim kiem trang quan li tin tim viec cua nguoi tim viec
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntv_quan_tri_tim_kiem_ttv(p_tien_to,p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-999;
	}
	document.getElementById('page').value=1;
	ntv_quan_tri_ds_ttv(-1);
}
//hailt 19/06/2012
//xu ly tren box tim kiem trang quan li tin tim viec cua nguoi tim viec
//function huy tim kiem khi bam nut huy tim kiem
function ntv_quan_tri_huy_tim_kiem_ttv() {
	v_url='/ntv-trang-quan-tri-tin-tim-viec.html';
	window.location.href = v_url;
}

//hailt 19/06/2012
//xu ly tren box tim kiem trang quan li tin tim viec cua nguoi tim viec
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntv_quan_tri_sap_xep_ttv(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntv_quan_tri_ds_ttv(-1);
}

//hailt 19/06/2012
//ham tao lai key va hien thi lai box tim kiem trang quan ly tin tim viec cua ntv
function ntv_quan_tri_reset_trang_ttv(id_ttv){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntv-trang-quan-tri-tin-tim-viec.html?id_ttv='+id_ttv+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&trang_thai='+v_trang_thai+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;
	window.location.href = v_url;
	return false;
}
//hailt 19/06/2012
//ham reset lai box ds tin tim viec thu gon tren trang quan tri viec lam
function ntv_quan_tri_reset_box_ds_tin_tv_thu_gon(id_ttv){	
	v_url='/ajax/ntv_quan_tri_thong_ke_tin_tv/index/';			
	AjaxAction('div_tk_ttv',v_url);
	v_url='/ajax/ntv_quan_tri_tin_tv_thu_gon/index?id_ttv='+id_ttv;			
	AjaxAction('div_ds_ttv',v_url);
	return false;
}
//hailt 19/06/2012
//ham tim kiem va hien thi lai danh sach tin tim viec trang quan ly tin tim viec cua ntv
function ntv_quan_tri_ds_ttv(id_ttv){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ajax/ntv_quan_tri_tin_tim_viec/index?id_ttv='+id_ttv+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&trang_thai='+v_trang_thai+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;			
	AjaxAction('div_ntv_quan_tri_tin_tim_viec',v_url);
}

// hailt 19/06/2012
// ntv xoa han 1 tin tim viec
function ntv_quan_tri_xoa_han_1_ttv(id_ttv){
	if(!confirm("Bạn có chắc chắn xoá hẳn không?")){
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/xoa_han/"+id_ttv;
	if(document.getElementById('tin_tv_ds_thu_gon')!=null){
		if(document.getElementById('tin_tv_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();
}
// hailt 19/06/2012
// ntv xoa han 1 list tin tim viec
function ntv_quan_tri_xoa_han_ds_ttv(){
	if(!confirm("Bạn có chắc chắn xoá hẳn các tin tìm việc không?")){
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/thao_tac_ds_ttv/xoa_han";
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();
}
// hailt 19/06/2012
// ntv doi trang thai cua tin tim viec
function ntv_quan_tri_doi_trang_thai_1_ttv(id_ttv,trang_thai){
	if(trang_thai=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/doi_trang_thai/"+id_ttv+"/"+trang_thai;
	if(document.getElementById('tin_tv_ds_thu_gon')!=null){
		if(document.getElementById('tin_tv_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();	
}

// hailt 19/06/2012
// ntv lay ds tin tim viec va doi trang thai ca ds nay
function ntv_quan_tri_doi_trang_thai_ds_ttv(trang_thai){
	var tong_so_tin = document.getElementById('tong_so_ttv').value;
	var i=0;
	for(i=0;i<tong_so_tin;i++){
		if(document.getElementById('checkbox_ttv['+i+']')!=null){
			if(document.getElementById('checkbox_ttv['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_tin){
		alert('Bạn chưa chọn Tin tìm việc nào!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	if(trang_thai=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	if(trang_thai=='dang_tin'){
		if(!confirm("Bạn có chắc chắn đăng các tin đã chọn không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	}
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/thao_tac_ds_ttv/doi_trang_thai/"+trang_thai;
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();	
}

// hailt 19/06/2012
// ntv gia han tin tim viec
function ntv_quan_tri_gia_han_1_ttv(id_ntv,id_ttv){
	var id = 'gia_han_' + id_ttv;
	var so_luot_con = document.getElementById(id).value;
	// var so_ttv_da_dang = document.getElementById('tong_so_ttv_da_dang').value;
	if( so_luot_con<=0 ){
		alert('Tin tìm việc đã hết số lượt gia hạn!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	// // trungcq bổ xung
	// if(so_ttv_da_dang > 0 ){
		// alert('Bạn được phép tạo tối đa 10 hồ sơ tìm việc nhưng chỉ được phép đăng 1 hồ sơ!');
		// dat_trang_thai_xu_ly_xong();
		// return;
	// }
	ntv_quan_tri_show_box_popup_gia_han(id_ntv,id_ttv);
}
// hailt 19/06/2012
// ntv lay ds tin tim viec va gia han
function ntv_quan_tri_gia_han_ds_ttv(){
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/thao_tac_ds_ttv/gia_han";
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();
}
// hailt 19/06/2012
// ntv lam moi tin tim viec
function ntv_quan_tri_lam_moi_1_ttv(id_ttv){
	var id = 'lam_moi_' + id_ttv;
	var so_luot_con = document.getElementById(id).value;
	if( so_luot_con<=0 ){
		alert('Tin tìm việc đã hết số lượt làm mới!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/lam_moi/"+id_ttv;
	if(document.getElementById('tin_tv_ds_thu_gon')!=null){
		if(document.getElementById('tin_tv_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();
}

//hailt 19/06/2012
//hien thi popup gia han
function ntv_quan_tri_show_box_popup_gia_han(id_ntv,list_id_ttv){
	var v_url='/ajax/ntv_quan_tri_tin_tim_viec/popup_gia_han_list_ttv/'+list_id_ttv;
	$.post(v_url, function(data){
			show_box_popup(data,520,550);
	}, "json");
}


// hailt 19/06/2012
// ntv xuat ban them 1 tin tim viec
function ntv_quan_tri_xuat_ban_them_1_ttv(id_ttv){
	document.forms['form_ds_ttv'].target = "fr_submit_ds_ttv";
	var url = "/ajax/ntv_quan_tri_tin_tim_viec/xuat_ban_them_1_tin_tv/"+id_ttv;
	document.forms['form_ds_ttv'].action = url;	
	document.forms['form_ds_ttv'].submit();
}

//hailt 21/06/2012
//ham tao lai key va hien thi lai box tim kiem trang quan ly viec lam da luu cua ntv
function ntv_quan_tri_reset_trang_viec_lam_da_luu(id_viec_lam){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntv-trang-quan-tri-viec-lam-da-luu.html?id_viec_lam='+id_viec_lam+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&muc_luong='+v_muc_luong+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;
	window.location.href = v_url;
	return false;
}
//hailt 21/06/2012
//ham tim kiem va hien thi lai danh sach viec lam trang quan ly viec lam da luu cua ntv
function ntv_quan_tri_ds_viec_lam_da_luu(id_viec_lam){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ajax/ntv_quan_tri_viec_lam_da_luu/index?id_viec_lam='+id_viec_lam+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&muc_luong='+v_muc_luong+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;			
	AjaxAction('div_ntv_quan_tri_viec_lam_da_luu',v_url);
}

//hailt 21/06/2012
//xu ly tren box tim kiem trang quan li viec lam da luu cua nguoi tim viec
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntv_quan_tri_tim_kiem_viec_lam_da_luu(p_tien_to,p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-999;
	}
	document.getElementById('page').value=1;
	ntv_quan_tri_ds_viec_lam_da_luu(-1);
}
//hailt 21/06/2012
//xu ly tren box tim kiem trang quan li viec lam da luu cua nguoi tim viec
//function huy tim kiem khi bam nut huy tim kiem
function ntv_quan_tri_huy_tim_kiem_viec_lam_da_luu() {
	v_url='/ntv-trang-quan-tri-viec-lam-da-luu.html';
	window.location.href = v_url;
}

//hailt 21/06/2012
//xu ly tren box tim kiem trang quan li viec lam da luu cua nguoi tim viec
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntv_quan_tri_sap_xep_viec_lam_da_luu(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntv_quan_tri_ds_viec_lam_da_luu(-1);
}

// hailt 21/06/2012
// ntv xoa han 1 tin tuyen dung
function ntv_quan_tri_xoa_1_viec_lam_da_luu(id_viec_lam){
	if(!confirm("Bạn có chắc chắn xoá không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	document.forms['form_ds_viec_lam_da_luu'].target = "fr_submit_ds_viec_lam_da_luu";
	var url = "/ajax/ntv_quan_tri_viec_lam_da_luu/xoa/"+id_viec_lam;
	if(document.getElementById('viec_lam_da_luu_ds_thu_gon')!=null){
		if(document.getElementById('viec_lam_da_luu_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_viec_lam_da_luu'].action = url;	
	document.forms['form_ds_viec_lam_da_luu'].submit();
}
// hailt 22/06/2012
// ntv ung tuyen 1 list viec lam da luu
function ntv_quan_tri_ung_tuyen_ds_viec_lam_da_luu(ky_tu_phan_cach){
	var tong_so_viec_lam = document.getElementById('tong_so_viec_lam_da_luu').value;
	var i=0;
	var list_id_tin_td = '';
	for(i=0;i<tong_so_viec_lam;i++){
		if(document.getElementById('checkbox_viec_lam_da_luu['+i+']')!=null){
			if(document.getElementById('checkbox_viec_lam_da_luu['+i+']').checked==true){
				if (list_id_tin_td == '') {
					list_id_tin_td = document.getElementById('checkbox_viec_lam_da_luu['+i+']').value;
				} else {
					list_id_tin_td += ky_tu_phan_cach+document.getElementById('checkbox_viec_lam_da_luu['+i+']').value;
				}
			}
		}
	}
	if(list_id_tin_td == ''){
		alert('Bạn chưa chọn việc làm nào!');
		dat_trang_thai_xu_ly_xong();
	} else {
		var url = '/ntv-nop-ho-so-truc-tuyen.html?ds_id_tin_td=' + list_id_tin_td;
		window.open(url, '_blank');	
	}
}

// hailt 21/06/2012
// ntv xoa han 1 list viec lam da luu
function ntv_quan_tri_xoa_ds_viec_lam_da_luu(){
	var tong_so_viec_lam = document.getElementById('tong_so_viec_lam_da_luu').value;
	var i=0;
	for(i=0;i<tong_so_viec_lam;i++){
		if(document.getElementById('checkbox_viec_lam_da_luu['+i+']')!=null){
			if(document.getElementById('checkbox_viec_lam_da_luu['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_viec_lam){
		alert('Bạn chưa chọn việc làm nào!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	if(!confirm("Bạn có chắc chắn xoá các việc làm đã chọn không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	document.forms['form_ds_viec_lam_da_luu'].target = "fr_submit_ds_viec_lam_da_luu";
	var url = "/ajax/ntv_quan_tri_viec_lam_da_luu/thao_tac_ds_viec_lam/xoa";
	document.forms['form_ds_viec_lam_da_luu'].action = url;	
	document.forms['form_ds_viec_lam_da_luu'].submit();
}

/* Hailt 22/06/2012
 * Ham NTV cap nhat thong tin tai khoan cua minh
 */
function ntv_quan_tri_cap_nhat_thong_tin_tai_khoan(){	
	document.forms['form_cap_nhat_thong_tin_ntv'].target = "fr_submit_cap_nhat_thong_tin_ntv";
	var url = "/ajax/ntv_quan_tri_thong_tin_tai_khoan/cap_nhat/";
	document.forms['form_cap_nhat_thong_tin_ntv'].action = url;	
	document.forms['form_cap_nhat_thong_tin_ntv'].submit();
}

/* Hailt 22/06/2012
 * Ham NTV cap nhat thong tin tai khoan - xoa anh dai dien
 */
function ntv_quan_tri_xoa_anh_dai_dien(){	
	document.forms['form_cap_nhat_thong_tin_ntv'].target = "fr_submit_cap_nhat_thong_tin_ntv";
	var url = "/ajax/ntv_quan_tri_thong_tin_tai_khoan/xoa_anh_dai_dien/";
	document.forms['form_cap_nhat_thong_tin_ntv'].action = url;	
	document.forms['form_cap_nhat_thong_tin_ntv'].submit();
}

/* Hailt 22/06/2012
 * Ham goi hien thi popup thay doi anh dai dien
 */
function ntv_quan_tri_show_box_popup_doi_anh_dai_dien(){	
	var v_url='/ajax/ntv_quan_tri_thong_tin_tai_khoan/popup_thay_doi_anh_dai_dien/';
	$.post(v_url, function(data){
			show_box_popup(data,300,300);
	}, "json");
}

/* Hailt 25/06/2012
 * Ham goi hien thi popup chon ngay
 */
function show_box_popup_calendar(day,month,year,txt_ngay_thang_nam,txt_ngay,txt_thang,txt_nam,select_ngay_thang_nam,mau_vien){	
	var text_border_color = '';
	if(mau_vien!=''){
		text_border_color = 'border-color:'+mau_vien+';';
	}
	var popup_calendar='<div class="popupContainer" style="width:175px;'+text_border_color+'">';
			popup_calendar += '<div class="popupTitle" id="popup_title">Chọn ngày:</div>';
			popup_calendar += '<div class="popupClose" title="Đóng Popup">';
			popup_calendar += '<input type="image" src="/images/iconClose.gif" onclick="javascript:close_box_popup();return false;" title="Đóng popup" />';
			popup_calendar += '</div>';
			popup_calendar += '<div name="popup_calendar" id="popup_calendar"></div>';
		popup_calendar += '</div>';
	show_box_popup(popup_calendar,180,180);
	showCalendarInHTML(day,month-1,year,175,175,'popup_calendar',txt_ngay_thang_nam,txt_ngay,txt_thang,txt_nam,select_ngay_thang_nam,1);
	document.getElementById('popup_title').style.color=mau_vien;
}

/* Hailt 26/06/2012
 * Ham goi hien thi div sua thong tin tai khoan ntv trang dang/sua tin tim viec
 */
function ntv_quan_tri_hien_thi_sua_thong_tin_tai_khoan(){
	document.getElementById('div_anh_dai_dien_da_duyet').style.display = 'none'; 
	document.getElementById('div_anh_dai_dien_cho_duyet').style.display = '';
	document.getElementById('thong_tin_ntv_da_duyet').style.display = 'none'; 
	document.getElementById('thong_tin_ntv_cho_duyet').style.display = ''; 
	ntv_quan_tri_reset_ma_bao_mat('div_ma_chinh_thong_tin');
}

/* Hailt 26/06/2012
 * Ham goi khong cho hien thi div sua thong tin tai khoan ntv trang dang/sua tin tim viec
 */
function ntv_quan_tri_khong_hien_thi_sua_thong_tin_tai_khoan(){
	document.getElementById('div_anh_dai_dien_da_duyet').style.display = ''; 
	document.getElementById('div_anh_dai_dien_cho_duyet').style.display = 'none';
	document.getElementById('thong_tin_ntv_da_duyet').style.display = ''; 
	document.getElementById('thong_tin_ntv_cho_duyet').style.display = 'none'; 
	ntv_quan_tri_reset_ma_bao_mat('div_ma_xac_minh');
}

/* Hailt 26/06/2012
 * Ham NTV thay doi ma bao mat chinh sua thong tin tai khoan trang dang/sua tin tim viec
 */
function ntv_quan_tri_reset_ma_bao_mat(div_id){	
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	var url = "/ajax/ntv_quan_tri_cap_nhat_tin_tv/reset_ma_bao_mat/"+div_id;
	document.forms['form_cap_nhat_tin_tv'].action = url;	
	document.forms['form_cap_nhat_tin_tv'].submit();
}

/* Hailt 26/06/2012
 * Ham goi hien thi div sua thong tin tai khoan ntv trang dang/sua tin tim viec
 */
function ntv_quan_tri_hien_thi_sua_thong_tin_lien_he(){
	document.getElementById('div_thong_tin_lien_he_da_duyet').style.display = 'none';
	document.getElementById('div_thong_tin_lien_he_cho_duyet').style.display = ''; 
	ntv_quan_tri_reset_ma_bao_mat('div_ma_chinh_lien_he');
}

/* Hailt 26/06/2012
 * Ham goi khong cho hien thi div sua thong tin tai khoan ntv trang dang/sua tin tim viec
 */
function ntv_quan_tri_khong_hien_thi_sua_thong_tin_lien_he(){
	document.getElementById('div_thong_tin_lien_he_da_duyet').style.display = '';
	document.getElementById('div_thong_tin_lien_he_cho_duyet').style.display = 'none'; 
	ntv_quan_tri_reset_ma_bao_mat('div_ma_xac_minh');
}

//hailt 26/06/2012
//chi hien thi cac truong duoc chon hoac hien thi tat cac truong trong trang cap nhat tin tim viec
function ntv_quan_tri_hien_thi_truong_duoc_chon(hien_thi){			
	var so_truong = document.getElementById('tong_so_truong').value;
	var i=0;
	for(i=0;i<so_truong;i++){
		if(hien_thi == '0'){
			document.getElementById('hien_thi_truong_'+i).style.display = '';
		}else{
			if(!document.getElementById('checkbox_truong['+i+']').checked){
				document.getElementById('hien_thi_truong_'+i).style.display = 'none';
			}else{
				document.getElementById('hien_thi_truong_'+i).style.display = '';
			}
		}
	}
}
/* hailt 26/06/2012
 * Ham chon 1 truong tu suggestion khi cap nhat tin tim viec
 * 
 */
function ntv_quan_tri_them_truong_tu_suggestion(ky_tu_phan_cach){	
	var id_truong = document.getElementById('chon_truong_tu_suggestion').value;
	var i=0;
	var so_truong = document.getElementById('tong_so_truong').value;
	for(i=0;i<so_truong;i++){
		if(document.getElementById('checkbox_truong['+i+']').value == id_truong){
			document.getElementById('checkbox_truong['+i+']').checked = true;
			ntv_quan_tri_chon_truong(i);
			if(document.getElementById('radio_hien_thi_truong_duoc_chon').checked){
				ntv_quan_tri_hien_thi_truong_duoc_chon(1);
			}else{
				ntv_quan_tri_hien_thi_truong_duoc_chon(0);
			}
			break;
		}
	}
	return false;
}

/* hailt 26/06/2012
 * Ham chon 1 truong tu suggestion khi cap nhat tin tim viec
 * 
 */
function ntv_quan_tri_chon_truong(i){
	var j=0;
	var so_truong = document.getElementById('tong_so_truong').value;
	for(j=0;j<so_truong;j++){
		if(j!=i){
			document.getElementById('checkbox_truong['+j+']').checked = false;
		}
		document.getElementById('b_ten_truong_'+j).style.color = 'black';
	}
	if(document.getElementById('checkbox_truong['+i+']').checked==true){
		document.getElementById('fk_truong_hoc').value = document.getElementById('checkbox_truong['+i+']').value;
		document.getElementById('b_ten_truong_'+i).style.color = 'red';
	}else{
		document.getElementById('fk_truong_hoc').value = -999;
	}
	document.getElementById('div_listTruong').scrollTop = 23*(parseInt(i)-2);	
}

/* hailt 27/06/2012
 * Ham them mau dien kinh nghiem
 * 
 */
function ntv_quan_tri_chen_kinh_nghiem(text_cach_dong_moi,text_kinh_nghiem_chen_them){
	var kinh_nghiem = document.getElementById('c_kinh_nghiem').value;
	if(kinh_nghiem==''){
		document.getElementById('c_kinh_nghiem').value = text_kinh_nghiem_chen_them;
	}else{
		document.getElementById('c_kinh_nghiem').value = kinh_nghiem+text_cach_dong_moi+text_kinh_nghiem_chen_them;
	}
}

/* hailt 27/06/2012
 * Ham them mau dien nguon tham khao
 * 
 */
function ntv_quan_tri_chen_tham_khao(text_cach_dong_moi,text_nguon_tham_khao_chen_them){
	var tham_khao = document.getElementById('c_nguon_tham_khao').value;
	if(tham_khao==''){
		document.getElementById('c_nguon_tham_khao').value = text_nguon_tham_khao_chen_them;
	}else{
		document.getElementById('c_nguon_tham_khao').value = tham_khao+text_cach_dong_moi+text_nguon_tham_khao_chen_them;
	}
}

/* hailt 27/06/2012
 * Ham ghi lai 1 tin tim viec
 * 
 */
function ntv_quan_tri_ghi_lai_tin_tv(thao_tac){
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	if(thao_tac=='xoa_tam'){
		if(!confirm("Bạn có chắc chắn xoá tin tìm việc này không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}else{
			document.forms['form_cap_nhat_tin_tv'].action="/ajax/ntv_quan_tri_cap_nhat_tin_tv/xoa_tam/";		
		}
	}else{
		document.forms['form_cap_nhat_tin_tv'].action="/ajax/ntv_quan_tri_cap_nhat_tin_tv/ghi_lai/"+thao_tac;		
	}
	document.forms['form_cap_nhat_tin_tv'].submit();	
}

/* Hailt 28/06/2012
 * Ham NTV cap nhat thong tin tai khoan
 */
function ntv_quan_tri_thay_doi_thong_tin_ntv(){	
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	var url = "/ajax/ntv_quan_tri_thong_tin_tai_khoan/thay_doi_thong_tin_ntv";
	document.forms['form_cap_nhat_tin_tv'].action = url;	
	document.forms['form_cap_nhat_tin_tv'].submit();
}

/* Hailt 28/06/2012
 * Ham NTD cap nhat thong tin tai khoan
 */
function ntv_quan_tri_thay_doi_lien_he_ntv(){	
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	var url = "/ajax/ntv_quan_tri_thong_tin_tai_khoan/thay_doi_lien_he_ntv";
	document.forms['form_cap_nhat_tin_tv'].action = url;	
	document.forms['form_cap_nhat_tin_tv'].submit();
}

/* hailt 28/06/2012
 * Ham goi toi trang xem truoc tin tim viec
 * 
 */
function ntv_quan_tri_xem_truoc_tin_tv(){
	var iframe_popup='<iframe name="fr_popup_xem_truoc" id="fr_popup_xem_truoc" width="960" height="550"></iframe>';
	show_box_popup(iframe_popup,960,550);
	document.forms['form_cap_nhat_tin_tv'].target = "fr_popup_xem_truoc";
	document.forms['form_cap_nhat_tin_tv'].action="/ajax/ntv_quan_tri_xem_truoc_tin_tv/index/";		
	document.forms['form_cap_nhat_tin_tv'].submit();
}

//hailt 02/07/2012
//Nhay tu 1 trang bat ki sang trang tim kiem tin tim viec
function ntv_quan_tri_sang_trang_tim_kiem_tin_tim_viec(){			
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntv-trang-quan-tri-tin-tim-viec.html?tu_khoa='+v_tu_khoa;
	window.location.href = v_url;
	return false;
}

//hailt 03/07/2012
//ghi lai thong tin ho so ca nhan
function ntv_quan_tri_cap_nhat_CV(){			
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	var url = "/ajax/ntv_quan_tri_ho_so_ca_nhan/ghi_lai";
	document.forms['form_cap_nhat_tin_tv'].action = url;	
	document.forms['form_cap_nhat_tin_tv'].submit();
}

//hailt 24/07/2012
//xoa ho so ca nhan
function ntv_quan_tri_xoa_CV(id_cv){		
	if(!confirm("Bạn có chắc chắn xoá CV này không?")){
		dat_trang_thai_xu_ly_xong();
		return;
	}
	document.forms['form_cap_nhat_tin_tv'].target = "fr_submit_cap_nhat_tin_tv";
	var url = "/ajax/ntv_quan_tri_ho_so_ca_nhan/xoa/" + id_cv;
	document.forms['form_cap_nhat_tin_tv'].action = url;	
	document.forms['form_cap_nhat_tin_tv'].submit();
}

//hailt 05/07/2012
//ham reset lai box ds tin tim viec thu gon tren trang quan tri viec lam
function ntv_quan_tri_reset_ds_viec_lam_da_luu_thu_gon(id_viec_lam){	
	v_url='/ajax/ntv_quan_tri_thong_ke_viec_lam_da_luu/index/';			
	AjaxAction('div_tk_viec_lam_da_luu',v_url);
	v_url='/ajax/ntv_quan_tri_viec_lam_da_luu_thu_gon/index?id_viec_lam='+id_viec_lam;			
	AjaxAction('div_ds_viec_lam_da_luu',v_url);
	return false;
}

//hailt 05/07/2012
//ham reset lai box ds tin tim viec thu gon tren trang quan tri viec lam
function show_popup_chon_vai_tro_dang_ky(kieu_trang_hien_tai){	
	if (kieu_trang_hien_tai == null || kieu_trang_hien_tai == '') {
		kieu_trang_hien_tai = 'ntv';
	}
	if (document.getElementById('kieu_trang_hien_tai') != null) {
		kieu_trang_hien_tai = document.getElementById('kieu_trang_hien_tai').value;
	}
	var v_url='/ajax/chon_vai_tro_dang_ky/index/'+kieu_trang_hien_tai;
	$.post(v_url, function(data){
			show_box_popup(data,320,300);
	}, "json");
}

//hailt 09/07/2012
//kiem tra su ton tai tai khoan mot email nguoi dung muon dang ky
function kiem_tra_ton_tai_tai_khoan(){	
	var email = document.getElementById('c_ten_dang_nhap').value;
	if (email != '' ) {
		document.forms['form_dang_ky'].target = "fr_submit_dang_ky";
		var url = "/ajax/account/kiem_tra_ton_tai_tai_khoan/"+email;
		document.forms['form_dang_ky'].action = url;	
		document.forms['form_dang_ky'].submit();
	}
}

//hailt 09/07/2012
//Dang ky tai khoan ntv
function dang_ky_tai_khoan_ntv(){	
	document.forms['form_dang_ky'].target = "fr_submit_dang_ky";
	var url = "/ajax/ntv_dang_ky/dang_ky/";
	document.forms['form_dang_ky'].action = url;	
	document.forms['form_dang_ky'].submit();
}

//hailt 10/07/2012
//Dang ky tai khoan ntd
function dang_ky_tai_khoan_ntd(){	
	document.forms['form_dang_ky'].target = "fr_submit_dang_ky";
	var url = "/ajax/ntd_dang_ky/dang_ky/";
	document.forms['form_dang_ky'].action = url;	
	document.forms['form_dang_ky'].submit();
}

/**
 * ducnq 10/07/2012
 * ham xem them danh sach rss cac nganh
 */
function xem_them_rss(){
	if (document.getElementById('tbl_rss_2')) {	
		v_tbl_rss_2 = document.getElementById('tbl_rss_2');
		v_tbl_rss_2.style.display = "";		
	}	
	if (document.getElementById('td_xem_them_rss')) {
		v_td_xem_them_rss = document.getElementById('td_xem_them_rss');
		v_td_xem_them_rss.innerHTML = '<a href="javascript: thu_gon_rss();" title="Thu gọn"><b style="color:red;font-size: 12px;">Thu gọn</b></a>';
	}	
}

/**
 * ducnq 10/07/2012
 * ham thu gon danh sach rss cac nganh
 */
function thu_gon_rss(){
	if (document.getElementById('tbl_rss_2')) {
		v_tbl_rss_2 = document.getElementById('tbl_rss_2');
		v_tbl_rss_2.style.display = 'none';
	}
	if (document.getElementById('td_xem_them_rss')) {
		v_td_xem_them_rss = document.getElementById('td_xem_them_rss');
		v_td_xem_them_rss.innerHTML = '<a href="javascript: xem_them_rss();" title="Xem thêm"><b style="color:red;font-size: 12px;">Xem thêm</b></a>';				
		window.location.hash = '#dm_rss';		
	}	
}	

/**
 * ducnq 12/07/2012
 * ham hien thi popup chi tiet thong bao
 */
function dsp_popup_chi_tiet_thong_bao(p_loai_giao_dien,p_loai_trang){	
	if(p_loai_trang>0){
		url =  "/ajax/thong_bao/index/"+p_loai_giao_dien+"/"+p_loai_trang;
		show_box_popup('',640,600);			
		AjaxAction('_box_popup', url);	
	}else{
		alert('Mã thông báo không tồn tại!');
	}
}
/**
 * huongtt2 20/5/2014
 * ham hien thi popup chi tiet thong bao
 */
function dsp_popup_thong_bao(p_loai_trang,p_loai_thong_bao){	
	if(p_loai_trang>0){
		url =  "/ajax/box_thong_bao/index/"+p_loai_trang+"/"+p_loai_thong_bao;
		show_box_popup('',640,600);			
		AjaxAction('_box_popup', url);	
	}else{
		alert('Mã thông báo không tồn tại!');
	}
}
/**
 * hailt 16/07/2012
 * ham kiem tra muc do manh cua mat khau
 */
function kiem_tra_do_manh_mat_khau(){
	var mat_khau = document.getElementById('c_mat_khau').value;
	var do_dai_mat_khau = mat_khau.length;
	var thong_bao = '';
	if (do_dai_mat_khau == 0) {
		thong_bao = '<img src=\'/images/warning.jpg\' height=12 width=13/> Chưa nhập mật khẩu';
	}
	if (do_dai_mat_khau > 0 && do_dai_mat_khau < 6) {
		thong_bao = '<img src=\'/images/warning.jpg\' height=12 width=13/> Mật khẩu có độ mạnh yếu!';
	}
	if (do_dai_mat_khau >= 6 && do_dai_mat_khau < 10) {
		thong_bao = '<img src=\'/images/ok.jpg\' height=12 width=13/> <span style=\'color:green\'>Mật khẩu có độ mạnh trung bình!</span>';
	}
	if (do_dai_mat_khau >= 10) {
		thong_bao = '<img src=\'/images/ok.jpg\' height=12 width=13/> <span style=\'color:blue\'>Mật khẩu có độ mạnh cao!<span>';
	}
	if (mat_khau == '123456') {
		thong_bao = '<img src=\'/images/warning.jpg\' height=12 width=13/> Mật khẩu quá đơn giản!';
	}
	if(document.getElementById("err_c_mat_khau")!=null){
		document.getElementById("err_c_mat_khau").innerHTML = thong_bao;
	}
}

/**
 * hailt 16/07/2012
 * ham kiem tra mat khau nhap 2 lan co giong nhau
 */
function kiem_tra_mat_khau_cua_2_o_nhap(){
	var mat_khau1 = document.getElementById('c_mat_khau').value;
	var mat_khau2 = document.getElementById('c_mat_khau_2').value;
	var thong_bao =''
	if (mat_khau1 != mat_khau2 ) {
		thong_bao = "<img src=\'/images/warning.jpg\' height=12 width=13/> Mật khẩu 2 lần nhập khác nhau!";
	}
	if(document.getElementById("err_c_mat_khau_2")!=null){
		document.getElementById("err_c_mat_khau_2").innerHTML = thong_bao;
	}
}

// hailt 16/07/2012
// gui mail kich hoat tai khoan
function gui_lai_mail_kich_hoat(){
	document.forms['form_kich_hoat'].target = "fr_submit_kich_hoat";
	var url = "/ajax/kich_hoat_tai_khoan/gui_lai_mail_kich_hoat/";
	document.forms['form_kich_hoat'].action = url;	
	document.forms['form_kich_hoat'].submit();
}

/**
 * ducnq 17/07/2012
 * ham link sang trang nop ho so truc tuyen
 */
function nop_ho_so_truc_tuyen(){
	var frm = document.frm_viec_lam_nhieu_nguoi_xem;
	frm.target = "";
	frm.action="/ntv-nop-ho-so-truc-tuyen.html";	
	frm.submit();
}

/**
 * ducnq 17/07/2012
 * ham cap nhat nop ho so truc tuyen
 */
function cap_nhat_nop_don_truc_tuyen(){
	var frm = document.frm_nop_ho_so_truc_tuyen;
	var tong_so_viec = document.getElementById('tong_so_viec').value;
	var i=0;
	for(i=0;i<tong_so_viec;i++){
		if(document.getElementById('checkbox_ut['+i+']')!=null){
			if(document.getElementById('checkbox_ut['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_viec){
		document.getElementById('td_thong_bao_chon_tin').innerHTML="<i><b style='color:red;'>Vui lòng chọn việc làm muốn nộp hồ sơ</b></i>" ;
		dat_trang_thai_xu_ly_xong();
		return;
	}
	if(frm.txt_tieu_de.value==''){
		document.getElementById('td_thong_bao_tieu_de').innerHTML="<i><b style='color:red;'>Vui lòng nhập tiêu đề thư giới thiệu</b></i>" ;
		dat_trang_thai_xu_ly_xong();
		return;
	}else{
		document.getElementById('td_thong_bao_tieu_de').innerHTML="" ;
	}
	if(frm.txta_noi_dung.value==''){
		document.getElementById('td_thong_bao_noi_dung').innerHTML="<i><b style='color:red;'>Vui lòng nhập nội dung thư giới thiệu</b></i>" ;
		dat_trang_thai_xu_ly_xong();
		return;
	}else{
		document.getElementById('td_thong_bao_noi_dung').innerHTML="" ;
	}
	if(frm.c_cv.value==-1){
		document.getElementById('err_c_trinh_do').innerHTML="<i><b style='color:red;'>Vui lòng chọn CV muốn gửi kèm</b></i>" ;
		dat_trang_thai_xu_ly_xong();
		return;
	}else{
		document.getElementById('err_c_trinh_do').innerHTML="" ;
	}	
	frm.target = "fr_submit";
	frm.action="/ajax/ntv_nop_ho_so_truc_tuyen/cap_nhat_nop_don_truc_tuyen/";	
	frm.submit();
}
/**
 * tiennm 17/07/2012
  * ham hien thi popup chi tiet thong bao
   */
function xem_thong_bao(id,type){
    var url='/ajax/xem_thong_bao/popup_thong_bao_chi_tiet/'+id+'/'+type;
	show_box_popup('', 720, 520);
	AjaxAction('_box_popup', url);
}
/**
 * ducnq 17/07/2012
 * ham set thu mau 
 */
function get_thu_mau(p_order){
	tieu_de = document.getElementById('thu_mau_tieu_de_'+p_order).value;
	noi_dung = document.getElementById('thu_mau_noi_dung_'+p_order).value;
	var frm = document.frm_nop_ho_so_truc_tuyen;
	frm.txt_tieu_de.value = tieu_de;
	frm.txta_noi_dung.value = noi_dung;
}

// hailt 18/07/2012
// gui lail lay lai mat khau
function gui_mail_lay_lai_mat_khau(){
	document.forms['form_lay_lai_mat_khau'].target = "fr_submit_lay_lai_mat_khau";
	var url = "/ajax/lay_lai_mat_khau/gui_mail_lay_lai_mat_khau/";
	document.forms['form_lay_lai_mat_khau'].action = url;	
	document.forms['form_lay_lai_mat_khau'].submit();
}

// hailt 18/07/2012
// goi ham doi lai mat khau khi quen mat khau
function lay_lai_mat_khau(){
	document.forms['form_lay_lai_mat_khau'].target = "fr_submit_lay_lai_mat_khau";
	var url = "/ajax/lay_lai_mat_khau/lay_lai_mat_khau/";
	document.forms['form_lay_lai_mat_khau'].action = url;	
	document.forms['form_lay_lai_mat_khau'].submit();
}

// hailt 19/07/2012
// goi ham doi lai mat khau khi da dang nhap
function doi_mat_khau(){
	document.forms['form_doi_mat_khau'].target = "fr_submit_doi_mat_khau";
	var url = "/ajax/doi_mat_khau/doi_mat_khau/";
	document.forms['form_doi_mat_khau'].action = url;	
	document.forms['form_doi_mat_khau'].submit();
}

// hailt 20/07/2012
// hien thi cac div an trong list div
// stt_div_duoc_chon: truyen cho nut an di, luôn phải hiển thị div được chọn
//stt cac div tu 1-max
function hien_thi_cac_div_an_trong_list_div(tien_to, tong_so_div, so_div_hien_thi_max, stt_div_duoc_chon, ten_nut_mo_rong ,ten_nut_thu_gon){
	var i = 0;
	for (i = 1; i <= tong_so_div; i++) {
		if (document.getElementById(tien_to + i) != null) {
			document.getElementById(tien_to + i).style.display = "inline";
		}
	}
	//them vao nut an cac div
	if (document.getElementById('nut_bam_' + tien_to) != null) {
		document.getElementById('nut_bam_' + tien_to).innerHTML = '<a href="javascript: an_cac_div_an_trong_list_div(\'' + tien_to + '\',' + tong_so_div + ',' + so_div_hien_thi_max + ',' + stt_div_duoc_chon + ',\'' + ten_nut_mo_rong + '\',\'' + ten_nut_thu_gon + '\')" title="Thu gọn list">' + ten_nut_thu_gon + '</a>';
	}
}

// hailt 20/07/2012
// an cac div an trong list div
// stt_div_duoc_chon: truyen cho nut hien thi, luôn phải hiển thị div được chọn
//stt cac div tu 1-max
function an_cac_div_an_trong_list_div(tien_to, tong_so_div, so_div_hien_thi_max, stt_div_duoc_chon, ten_nut_mo_rong ,ten_nut_thu_gon){
	var i = 0;
	for (i = so_div_hien_thi_max + 1; i <= tong_so_div; i++) {
		if (document.getElementById(tien_to + i) != null) {
			document.getElementById(tien_to + i).style.display = "none";
		}
	}
	if (document.getElementById(tien_to + stt_div_duoc_chon) != null) {
		document.getElementById(tien_to + stt_div_duoc_chon).style.display = "inline";
	}
	if (document.getElementById(tien_to + so_div_hien_thi_max) != null && so_div_hien_thi_max < stt_div_duoc_chon) {
		document.getElementById(tien_to + so_div_hien_thi_max).style.display = "none";
	}
	//them vao nut an cac div
	if (document.getElementById('nut_bam_' + tien_to) != null) {
		document.getElementById('nut_bam_' + tien_to).innerHTML = '<a href="javascript: hien_thi_cac_div_an_trong_list_div(\'' + tien_to + '\',' + tong_so_div + ',' + so_div_hien_thi_max + ',' + stt_div_duoc_chon + ',\'' + ten_nut_mo_rong + '\',\'' + ten_nut_thu_gon + '\')" title="Mở hết list">' + ten_nut_mo_rong + '</a>';
	}
}

/*
 * ducnq - 23/07/2012
 * chuc nang gui email "gop y"
 */
function act_gop_y(){	
	// kiem tra cac gia tri tren form da nhap du chua.
	var frm = document.frm_suggestions;
	if(frm.isSuggestion.value==''){
		if (frm.full_name.value==""){
			alert('Bạn hãy nhập họ tên!');
			frm.full_name.focus();
			return;
		}
		if (frm.phone.value==""){
			alert('Bạn hãy nhập số điện thoại!');
			frm.phone.focus();
			return;
		}
		if (frm.email.value==""){
			alert('Bạn hãy nhập email!');
			frm.email.focus();
			return;
		}
		if (frm.content.value==""){
			alert('Bạn hãy nhập nội dung góp ý!');
			frm.content.focus();
			return;
		}	
		if (frm.security_code.value==""){
			alert('Bạn hãy nhập mã bảo mật!');
			frm.security_code.focus();
			return;
		}
		if(frm.isSuggestion.value==''){
			frm.isSuggestion.value='1';	
			frm.target = "fr_submit";
			frm.action="/ajax/gop_y/act_gop_y/"	;	
			frm.submit();
		}
	}	
	return ;	
}

// chuc nang xoa trang du lieu khi bam nut lam lai
function Refresh_suggestions(frm){			
	if (frm.full_name){		
		frm.full_name.value="";		
	}	
	if (frm.phone){		
		frm.phone.value="";		
	}	
	if (frm.email){		
		frm.email.value="";		
	}	
	if (frm.content){		
		frm.content.value="";		
	}
	if (frm.security_code){		
		frm.security_code.value="";		
	}		
	return false;
}

//hailt 30/07/2012
//ham tao lai key va hien thi lai box tim kiem trang quan ly viec lam da ung tuyen cua ntv
function ntv_quan_tri_reset_trang_viec_lam_da_ung_tuyen(id_viec_lam){	
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntv-trang-quan-tri-viec-lam-da-ung-tuyen.html?id_viec_lam='+id_viec_lam+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&muc_luong='+v_muc_luong+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;
	window.location.href = v_url;
	return false;
}
//hailt 30/07/2012
//ham tim kiem va hien thi lai danh sach viec lam trang quan ly viec lam da ung tuyen cua ntv
function ntv_quan_tri_ds_viec_lam_da_ung_tuyen(id_viec_lam){
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ajax/ntv_quan_tri_viec_lam_da_ung_tuyen/index?id_viec_lam='+id_viec_lam+'&tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&muc_luong='+v_muc_luong+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;			
	AjaxAction('div_ntv_quan_tri_viec_lam_da_ung_tuyen',v_url);
}

//hailt 30/07/2012
//xu ly tren box tim kiem trang quan li viec lam da ung tuyen cua nguoi tim viec
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntv_quan_tri_tim_kiem_viec_lam_da_ung_tuyen(p_tien_to, p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-999;
	}
	document.getElementById('page').value=1;
	ntv_quan_tri_ds_viec_lam_da_ung_tuyen(-1);
}
//hailt 30/07/2012
//xu ly tren box tim kiem trang quan li viec lam da ung tuyen cua nguoi tim viec
//function huy tim kiem khi bam nut huy tim kiem
function ntv_quan_tri_huy_tim_kiem_viec_lam_da_ung_tuyen() {
	v_url='/ntv-trang-quan-tri-viec-lam-da-ung-tuyen.html';
	window.location.href = v_url;
}

//hailt 21/06/2012
//xu ly tren box tim kiem trang quan li viec lam da ung_tuyen cua nguoi tim viec
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntv_quan_tri_sap_xep_viec_lam_da_ung_tuyen(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntv_quan_tri_ds_viec_lam_da_ung_tuyen(-1);
}

// hailt 30/07/2012
// ntv xoa han 1 tin tuyen dung
function ntv_quan_tri_xoa_1_viec_lam_da_ung_tuyen(id_viec_lam){
	if(!confirm("Bạn có chắc chắn hủy ứng tuyển việc làm này không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	document.forms['form_ds_viec_lam_da_ung_tuyen'].target = "fr_submit_ds_viec_lam_da_ung_tuyen";
	var url = "/ajax/ntv_quan_tri_viec_lam_da_ung_tuyen/xoa/"+id_viec_lam;
	if(document.getElementById('viec_lam_da_ung_tuyen_ds_thu_gon')!=null){
		if(document.getElementById('viec_lam_da_ung_tuyen_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_viec_lam_da_ung_tuyen'].action = url;	
	document.forms['form_ds_viec_lam_da_ung_tuyen'].submit();
}

// hailt 30/07/2012
// ntv xoa han 1 list viec lam da ung tuyen
function ntv_quan_tri_xoa_ds_viec_lam_da_ung_tuyen(){
	var tong_so_viec_lam = document.getElementById('tong_so_viec_lam_da_ung_tuyen').value;
	var i=0;
	for(i=0;i<tong_so_viec_lam;i++){
		if(document.getElementById('checkbox_viec_lam_da_ung_tuyen['+i+']')!=null){
			if(document.getElementById('checkbox_viec_lam_da_ung_tuyen['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_viec_lam){
		alert('Bạn chưa chọn việc làm nào!');
		dat_trang_thai_xu_ly_xong();
		return;
	}
	if(!confirm("Bạn có chắc chắn hủy ứng tuyển các việc làm đã chọn không?")){
			dat_trang_thai_xu_ly_xong();
			return;
		}
	document.forms['form_ds_viec_lam_da_ung_tuyen'].target = "fr_submit_ds_viec_lam_da_ung_tuyen";
	var url = "/ajax/ntv_quan_tri_viec_lam_da_ung_tuyen/thao_tac_ds_viec_lam/xoa";
	document.forms['form_ds_viec_lam_da_ung_tuyen'].action = url;	
	document.forms['form_ds_viec_lam_da_ung_tuyen'].submit();
}

//hailt 30/07/2012
//ham reset lai box ds viec lam da ung tuyen thu gon tren trang quan tri viec lam
function ntv_quan_tri_reset_ds_viec_lam_da_ung_tuyen_thu_gon(id_viec_lam){	
	v_url='/ajax/ntv_quan_tri_viec_lam_da_ung_tuyen/box_thong_ke/';			
	AjaxAction('div_tk_viec_lam_da_ung_tuyen',v_url);
	v_url='/ajax/ntv_quan_tri_viec_lam_da_ung_tuyen_thu_gon/index?id_viec_lam='+id_viec_lam;			
	AjaxAction('div_ds_viec_lam_da_ung_tuyen',v_url);
	return false;
}
 

//tiennm 25/07/2012
//ham tim kiem va hien thi   danh sach theo doi tin tuyen dung tu NTD
function ntd_quan_tri_ds_theo_doi_tin_tuyen_dung( reset ){	
	 
	var v_nganh_cap_1 = parseInt(document.getElementById('check_nganh').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_chuc_vu =  parseInt(document.getElementById('check_chuc_vu').value);
	var v_tinh =  parseInt(document.getElementById('check_tinh').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	 
	if (typeof reset == 'undefined' ) reset = false;
	if (!reset){
		v_url='/ntv-trang-quan-tri-theo-doi-tin-tuyen-dung.html';
		window.location.href = v_url;
		return false;
	}
	else {
		v_url='/ajax/ntv_quan_tri_theo_doi_tin_tuyen_dung/index?tu_khoa='+v_tu_khoa+'&nganh_cap_1='+v_nganh_cap_1+'&muc_luong='+v_muc_luong+'&chuc_vu='+v_chuc_vu+'&tinh='+v_tinh+'&trinh_do='+v_trinh_do+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;	
		AjaxAction('div_ntv_quan_tri_theo_doi_tin_tuyen_dung',v_url);
	}
	
}

//tiennm 25/07/2012
//xu ly tren box filter trang theo doi cac tin tuyen dung cua nha tuyen dung
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntv_quan_tri_tim_kiem_theo_doi_tin_tuyen_dung(p_tien_to,p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-999;
	}
	document.getElementById('page').value=1;
	ntd_quan_tri_ds_theo_doi_tin_tuyen_dung(true);
}
 

//tiennm 31/07/2012 
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntv_quan_tri_sap_xep_theo_doi_tin_tuyen_dung(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntd_quan_tri_ds_theo_doi_tin_tuyen_dung(true);
}
/**
 * tiennm 31/07/2012
 * ham hien thi popup huy nhan tin tuyen dung
*/
function ntv_huy_theo_doi(){
    var url='/ajax/ntv_quan_tri_theo_doi_tin_tuyen_dung/popup_huy_theo_doi/';
	show_box_popup('',420,250);
	AjaxAction('_box_popup', url);
	
}
function ntv_quan_tri_ung_tuyen_ds_theo_doi_tin_tuyen_dung(ky_tu_phan_cach){
	var tong_so_viec_lam = document.getElementById('tong_so_theo_doi_tin_tuyen_dung').value;
	var i=0;
	var list_id_tin_td = '';
	for(i=0;i<tong_so_viec_lam;i++){
		if(document.getElementById('checkbox_theo_doi_tin_tuyen_dung['+i+']')!=null){
			if(document.getElementById('checkbox_theo_doi_tin_tuyen_dung['+i+']').checked==true){
				if (list_id_tin_td == '') {
					list_id_tin_td = document.getElementById('checkbox_theo_doi_tin_tuyen_dung['+i+']').value;
				} else {
					list_id_tin_td += ky_tu_phan_cach+document.getElementById('checkbox_theo_doi_tin_tuyen_dung['+i+']').value;
				}
			}
		}
	}
	if(list_id_tin_td == ''){
		alert('Bạn chưa chọn tin tuyển dụng nào!');
		return false;
	}
	var url = '/ntv-nop-ho-so-truc-tuyen.html?ds_id_tin_td=' + list_id_tin_td;
	window.open(url, '_blank');
}
 
function ntv_quan_tri_xoa_ds_theo_doi_tin_tuyen_dung(){
	var tong_so  = document.getElementById('tong_so_theo_doi_nha_tuyen_dung').value;
	var i=0;
	for(i=0;i<tong_so;i++){
		if(document.getElementById('checkbox_theo_doi_nha_tuyen_dung['+i+']')!=null){
			if(document.getElementById('checkbox_theo_doi_nha_tuyen_dung['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so){
		alert('Bạn chưa chọn nhà tuyển dụng nào!');
		return;
	}
	if(!confirm("Bạn có chắc chắn hủy không?")){
			return;
		}
 	document.forms['form_ds_theo_doi_nha_tuyen_dung'].target = "fr_submit_ds_theo_doi_tin_tuyen_dung";
	
	var url='/ajax/ntv_quan_tri_theo_doi_tin_tuyen_dung/thao_tac_huy_theo_doi/';
	if(document.getElementById('tin_theo_doi_ds_thu_gon')!=null){
		if(document.getElementById('tin_theo_doi_ds_thu_gon').value==1){
			url = url + "/1";
		}
	}
	document.forms['form_ds_theo_doi_nha_tuyen_dung'].action = url;	 
	document.forms['form_ds_theo_doi_nha_tuyen_dung'].submit();
}


//hailt 02/08/2012
//ham dat trang ve trang thai dang xu ly
function dat_trang_thai_dang_xu_ly(){	
	if (document.getElementById('dang_xu_ly') != null) {
		if (document.getElementById('dang_xu_ly').value == 1) {
			alert('Trang đang xử lý, vui lòng đợi...');
			return false;
		}
		document.getElementById('dang_xu_ly').value = 1;
	}
	return true;
}

//hailt 02/08/2012
//ham dat trang ve trang thai da xu ly xong, khong xu ly gi ca
function dat_trang_thai_xu_ly_xong(){	
	if (document.getElementById('dang_xu_ly') != null) {
		document.getElementById('dang_xu_ly').value = 0;
	}
}

//hailt 08/08/2012
//ham reset lai box ds tin tuyen dung cua nha tuyen dung dang theo doi
function ntv_quan_tri_reset_box_ds_theo_doi_tin_tuyen_dung_thu_gon(){
	close_box_popup();
	v_url='/ajax/ntv_quan_tri_theo_doi_tin_tuyen_dung_thu_gon/index/';			
	AjaxAction('div_ds_ttd_theo_doi',v_url);
	return false;
}

/* Ducnq - 10/08/2012
 * Ham chon loai ung vien tra phi 
 */
function loai_ung_vien_tra_phi_onclick(obj){
	if(obj.value == 'STICKY') {
		v_url='/ajax/ntv_dangky_hoso_tinhphi_sticky/index/';			
		AjaxAction('div_dang_ky_ho_so_tinh_phi',v_url);
		document.getElementById('sp_ungvien_tb').className = "active";
		document.getElementById('sp_ungvien_dd').className = "";
		document.getElementById('sp_ungvien_dd').className = "";
		document.getElementById('div_ho_so_hu_dd').style.display = "none";
		document.getElementById('div_ho_so_uv_tb').style.display = "";
	}else{
		v_url='/ajax/ntv_dangky_hoso_tinhphi_dodam/index/';			
		AjaxAction('div_dang_ky_ho_so_tinh_phi',v_url);
		document.getElementById('sp_ungvien_tb').className = "";
		document.getElementById('sp_ungvien_dd').className = "active";
		document.getElementById('div_ho_so_hu_dd').style.display = "";
		document.getElementById('div_ho_so_uv_tb').style.display = "none";
	}
}

/* Ducnq - 15/08/2012
 * Ham chon loai viec lam tra phi 
 */
function loai_viec_lam_tra_phi_onclick(obj){
	if(obj.value == 'STICKY') {
		v_url='/ajax/ntd_dangky_vieclam_tinhphi_sticky/index/';			
		AjaxAction('div_dang_ky_viec_lam_tinh_phi',v_url);
		document.getElementById('sp_vieclam_tb').className = "active";
		document.getElementById('sp_vieclam_dd').className = "";		
		document.getElementById('div_viec_lam_dd').style.display = "none";
		document.getElementById('div_viec_lam_tb').style.display = "";
	}else{	
		v_url='/ajax/ntd_dangky_vieclam_tinhphi_dodam/index/';					
		AjaxAction('div_dang_ky_viec_lam_tinh_phi',v_url);
		document.getElementById('sp_vieclam_tb').className = "";
		document.getElementById('sp_vieclam_dd').className = "active";
		document.getElementById('div_viec_lam_dd').style.display = "";
		document.getElementById('div_viec_lam_tb').style.display = "none";
	}
}

/* Ducnq - 10/08/2012
 * Ham hien thi form book cho tin tim viec
 */
function tim_cho_trong_onclick(){
	// lay ngay dang ky
	v_txt_ngay_dangky = document.getElementById('txt_ngay_dangky');
	if (v_txt_ngay_dangky.value == '') {
		alert('Vui lòng chọn ngày!');
		v_txt_ngay_dangky.focus();
	}
	
	// lay checkbox khoang thoi gian
	v_rad_khoang_thoi_gian = document.frm_moc_thoi_gian.rad_khoang_thoi_gian;	
	radioLength = v_rad_khoang_thoi_gian.length;			
	for(var i = 0; i < radioLength; i++) {
		if(v_rad_khoang_thoi_gian[i].checked) {
			var v_khoang_thoi_gian =  v_rad_khoang_thoi_gian[i].value;
		}
	}
	
	// lay noi xuat ban
	v_sel_noi_xuat_ban = document.getElementById('sel_noi_xuat_ban');
	if (v_sel_noi_xuat_ban.value == '') {
		alert('Vui lòng chọn nơi xuất bản!');
		v_sel_noi_xuat_ban.focus();
	}	
	
	v_url='/ajax/ntv_dangky_hoso_tinhphi_sticky/index/'+v_txt_ngay_dangky.value+'/'+v_khoang_thoi_gian+'/'+v_sel_noi_xuat_ban.value+'/0';				
	AjaxAction('HD-boxDanhSach',v_url);
	
	// Thay doi text ngay hien thi	
	v_text_ngay_hien_thi = document.getElementById('b_ngay_hien_thi');
	v_text_ngay_hien_thi.innerHTML = v_txt_ngay_dangky.value;
	
	// Thay doi text khoang thoi gian
	v_text_khoang_thoi_gian = document.getElementById('b_khoang_thoi_gian');	
	v_khoang_thoi_gian_duoc_chon = document.getElementById('hdn_khoang_thoi_gian'+v_khoang_thoi_gian);	
	v_text_khoang_thoi_gian.innerHTML = v_khoang_thoi_gian_duoc_chon.value;
	
	
	// Thay doi text noi xuat ban
	v_text_noi_xuat_ban = document.getElementById('b_noi_xuat_ban');		
	var str = v_sel_noi_xuat_ban.selectedIndex;
	str = v_sel_noi_xuat_ban.options[str].getAttribute("label");	
	v_text_noi_xuat_ban.innerHTML = str;
	
	v_sp_noi_xuat_ban = document.getElementById('sp_noi_xuat_ban');		
	v_sp_noi_xuat_ban.innerHTML = str;
	
	// Truyen cac gia tri dang chon vao hidden
	var frm = document.frm_book_cho;
	frm.hdn_book_khoang_thoi_gian.value = v_khoang_thoi_gian;
	frm.hdn_book_ngay_dangky.value = v_txt_ngay_dangky.value;
	frm.hdn_book_noi_xuatban.value = v_sel_noi_xuat_ban.value;		
	frm.hdn_ten_khoang_thoi_gian.value = v_khoang_thoi_gian_duoc_chon.value;	
	frm.hdn_ten_noi_xuatban.value = str;	
}

/* Ducnq - 13/08/2012
 * Ham kiem tra ma ho so nhap vao
 */
function kiem_tra_ma_ho_so_dat_cho() {
	var frm = document.frm_book_cho;
	if (frm.txt_ma_ho_so.value == '' || frm.txt_ma_ho_so.value == 'Nhập mã hồ sơ vào đây') {
		alert('Bạn chưa nhập mã hồ sơ!');
		return false;
	}
	if (frm.hdn_dang_kiem_tra.value == '') {	
		frm.hdn_dang_kiem_tra.value='1';	
		frm.target = "fr_book_cho";
		frm.action="/ajax/ntv_dangky_hoso_tinhphi_sticky/kiem_tra_ma_ho_so_dat_cho/";	
		frm.submit();				
	} else {
		alert('Hệ thống đang xử lý...!');
	}
	return;
}

/* Ducnq - 13/08/2012
 * Ham kiem tra ma ho so nhap vao
 */
function kiem_tra_ma_ho_so_do_dam() {
	var frm = document.frm_book_cho;
	if (frm.txt_ma_ho_so.value == '' || frm.txt_ma_ho_so.value == 'Nhập mã hồ sơ vào đây') {
		alert('Bạn chưa nhập mã hồ sơ!');
		return false;
	}
	if (frm.hdn_dang_kiem_tra.value == '') {	
		frm.hdn_dang_kiem_tra.value='1';	
		frm.target = "fr_book_cho";
		frm.action="/ajax/ntv_dangky_hoso_tinhphi_sticky/kiem_tra_ma_ho_so_do_dam/";	
		frm.submit();				
	} else {
		alert('Hệ thống đang xử lý...!');
	}
	return;
}

/* Ducnq - 13/08/2012
 * Ham kiem tra ma viec lam nhap vao
 */
function kiem_tra_ma_viec_lam() {
	var frm = document.frm_book_cho;
	if (frm.txt_ma_viec_lam.value == '' || frm.txt_ma_viec_lam.value == 'Nhập mã việc làm vào đây') {
		alert('Bạn chưa nhập mã việc làm!');
		return false;
	}
	if (frm.hdn_dang_kiem_tra.value == '') {	
		frm.hdn_dang_kiem_tra.value='1';	
		frm.target = "fr_book_cho";
		frm.action="/ajax/ntd_dangky_vieclam_tinhphi_sticky/kiem_tra_ma_viec_lam/";	
		frm.submit();				
	} else {
		alert('Hệ thống đang xử lý...!');
	}
	return;
}

/* Ducnq - 13/08/2012
 * Ham cap nhat dang ky book cho
 */
function cap_nhat_dang_ky_book_cho() {
	var frm = document.frm_book_cho;
	if (frm.txt_ma_ho_so.value == '' || frm.txt_ma_ho_so.value == 'Nhập mã hồ sơ vào đây') {
		alert('Bạn chưa nhập mã hồ sơ!');
		return false;
	}
	
	// kiem tra ngay dang ky
	v_txt_ngay_dangky = document.getElementById('txt_ngay_dangky');
	if (v_txt_ngay_dangky.value == '') {
		alert('Vui lòng chọn ngày!');
		v_txt_ngay_dangky.focus();
	}
		
	// lay noi xuat ban
	v_sel_noi_xuat_ban = document.getElementById('sel_noi_xuat_ban');
	if (v_sel_noi_xuat_ban.value == '') {
		alert('Vui lòng chọn nơi xuất bản!');
		v_sel_noi_xuat_ban.focus();
	}
	
	if (frm.hdn_dang_dat_cho.value == '') {	
		frm.hdn_dang_dat_cho.value='1';	
		frm.target = "fr_book_cho";
		frm.action="/ajax/ntv_dangky_hoso_tinhphi_sticky/cap_nhat_dang_ky_book_cho/";	
		frm.submit();				
	} else {
		alert('Hệ thống đang xử lý...!');
	}
	return;
}

/* Ducnq - 13/08/2012
 * Ham huy tim kiem
 */
function huy_tim_kiem_onclick(ngay_hien_tai,khoang_thoi_gian_hien_tai) {
	// lay ngay dang ky
	v_txt_ngay_dangky = document.getElementById('txt_ngay_dangky');
	v_txt_ngay_dangky.value = ngay_hien_tai
		
	// lay checkbox khoang thoi gian
	v_rad_khoang_thoi_gian = document.frm_moc_thoi_gian.rad_khoang_thoi_gian;	
	radioLength = v_rad_khoang_thoi_gian.length;			
	for(var i = 0; i < radioLength; i++) {
		if(v_rad_khoang_thoi_gian[i].value == khoang_thoi_gian_hien_tai) {
			v_rad_khoang_thoi_gian[i].checked = true;
		}
	}
		
	// lay noi xuat ban
	v_sel_noi_xuat_ban = document.getElementById('sel_noi_xuat_ban');
	v_sel_noi_xuat_ban.value = '7676';		
	tim_cho_trong_onclick();
	return;
}

/* Ducnq - 16/08/2012
 * Ham nhap lai book cho
 */
function nhap_lai_book_cho() {
	var frm = document.frm_book_cho;
	frm.txt_ma_ho_so.value = "";
	document.getElementById("sp_tieu_de").innerHTML = "";
	document.getElementById("sp_nganh_nghe").innerHTML = "";
	document.getElementById("sp_ngay_dang").innerHTML = "";					
	document.getElementById("sp_tinh_trang").innerHTML = "";					
	document.getElementById("sp_ngay_het_han").innerHTML = "";						
}

/* Ducnq - 16/08/2012
 * Ham huy ma dat cho
 */
function huy_book_cho() {
	var frm = document.frm_huy_book_cho;
	if (confirm('Hủy hiệu lực của mã đặt chỗ này, Bạn có chắc chắn muốn hủy?')) {
		frm.target = "fr_huy_book_cho";
		frm.action="/ajax/ntv_dangky_hoso_tinhphi_sticky/huy_dang_ky_book_cho/";	
		frm.submit();				
	}	
}

//hailt 19/09/2012
// Ham load lai box viec lam moi nhat trang chu khi nguoi su dung chon 1 tinh
// p_trang : So hieu trang
function viec_lam_moi_nhat_trang_chu_chon_1_tinh(){	
	var id_tinh = document.getElementById('vl_moi_nhat_select_tinh').value;	
// Thay doi ajax hien thi viec lam moi
	v_url='/ajax/ntv_viec_lam_moi_nhat_trang_chu/index/' + id_tinh;
	AjaxAction('div_ntv_viec_lam_moi_nhat_trang_chu',v_url);
}

//hailt 19/09/2012
// Ham load lai box viec lam moi nhat trang chu khi nguoi su dung chon 1 tinh
// p_trang : So hieu trang
function ung_vien_moi_nhat_trang_chu_chon_1_tinh(){	
	var id_tinh = document.getElementById('uv_moi_nhat_select_tinh').value;	
// Thay doi ajax hien thi viec lam moi
	v_url='/ajax/ntd_ung_vien_moi_nhat_trang_chu/index/' + id_tinh;
	AjaxAction('div_ntd_ung_vien_moi_nhat_trang_chu',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntv sap xep theo ten nganh nghe
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntv_theo_ten(){	
	v_url='/ajax/ntv_danh_sach_nganh_nghe_trang_chu/sap_xep_theo_ten/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntv',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntv sap xep theo nganh nghe cap 1 hot
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntv_theo_nhom_nganh(){	
	v_url='/ajax/ntv_danh_sach_nganh_nghe_trang_chu/sap_xep_theo_nhom_nganh/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntv',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntv sap xep theo ten nganh nghe
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntv_theo_nganh_hot(){	
	v_url='/ajax/ntv_danh_sach_nganh_nghe_trang_chu/index/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntv',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntd sap xep theo ten nganh nghe
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntd_theo_ten(){	
	v_url='/ajax/ntd_danh_sach_nganh_nghe_trang_chu/sap_xep_theo_ten/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntd',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntd sap xep theo nganh nghe cap 1 hot
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntd_theo_nhom_nganh(){	
	v_url='/ajax/ntd_danh_sach_nganh_nghe_trang_chu/sap_xep_theo_nhom_nganh/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntd',v_url);
}

//hailt 20/09/2012
// Ham load box danh sach nganh nghe trang chu ntv sap xep theo ten nganh nghe
// p_trang : So hieu trang
function ds_nganh_nghe_trang_chu_ntd_theo_nganh_hot(){	
	v_url='/ajax/ntd_danh_sach_nganh_nghe_trang_chu/index/';
	AjaxAction('div_ds_nganh_nghe_trang_chu_ntd',v_url);
}

//hailt 18/10/2012
//ham reset trang theo dieu kien tin tim viec khi chon tin tim viec tu select box trong trang ds ntd da xem ttv cua ntv
function ntv_quan_tri_ntd_da_xem_ho_so_chon_ttv_tu_selectbox(){	
	if (document.getElementById('sel_tin_tim_viec')) {
		var id_ttv = document.getElementById('sel_tin_tim_viec').value;
		v_url='/ntv-trang-quan-tri-ntd-da-xem-ho-so.html?id_ttv='+id_ttv;
		window.location.href = v_url;
	}
}


//hailt 19/01/2013
//ham an cac trang khong duoc chon va hien thi trang duoc chon tren cam nang tim viec
// p_so_trang : So trang hien tai
// p_tien_to_div : tien to truoc div chua noi dung moi trang
// p_tong_so_trang : tong so trang
function cam_nang_tim_viec_nhay_trang(p_so_trang, p_tien_to_div, p_tong_so_trang){	
	var i = 0;
	var tong_so_div_da_an = 0;
	
	for (i = 0; i< p_tong_so_trang; ++i) {
		if (document.getElementById(p_tien_to_div + i)) {
			if (i != p_so_trang) {
				//an cac trang ko phai trang duoc chon
				document.getElementById(p_tien_to_div + i).style.display = 'none';
				++tong_so_div_da_an;
			}
		}
	}
	
	if (document.getElementById(p_tien_to_div + p_so_trang)) {
		//hien thi trang duoc chon
		document.getElementById(p_tien_to_div + p_so_trang).style.display = '';
		div_cam_nang_tim_viec_trang_hien_tai = p_so_trang;
	} else {
		//neu ko tim dc trang duoc chon, hien thi trang dau tien
		if (document.getElementById(p_tien_to_div + 0)) {
			document.getElementById(p_tien_to_div + 0).style.display = '';
			div_cam_nang_tim_viec_trang_hien_tai = 0;
		}
	}
}

/**
 * hailt 06/04/2013
 * ham hien thi popup ho tro truc tuyen
 */
function dsp_popup_ho_tro_truc_tuyen(p_loai_giao_dien, p_loai_ho_tro){	
	url =  "/ajax/ho_tro_truc_tuyen/index/"+p_loai_giao_dien+'/'+p_loai_ho_tro;
	show_box_popup('',640,600);			
	AjaxAction('_box_popup', url);	
}

//hailt 29/05/2012
//cuongnx 31/07/2012
//ham tao lai key va hien thi lai box tim kiem trang quan ly ung vien da luu cua ntd
function ntd_quan_tri_reset_trang_ho_so_ung_vien(id_ung_vien){	
	var v_id_ttd = parseInt(document.getElementById('sel_vi_tri_tuyen_dung').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_gioi_tinh =  parseInt(document.getElementById('check_gioi_tinh').value);
	var v_tinh_trang_hon_nhan =  parseInt(document.getElementById('check_tinh_trang_hon_nhan').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_so_nam_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_tu_khoa_ttd =  document.getElementById('txt_vi_tri_tuyen_dung').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	var v_page =  parseInt(document.getElementById('page').value);
	var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ntd_trang_quan_tri_ho_so_ung_vien/index.php?id_ung_vien='+id_ung_vien+'&id_ttd='+v_id_ttd+'&tu_khoa='+v_tu_khoa+'&tu_khoa_ttd='+v_tu_khoa_ttd+'&trang_thai='+v_trang_thai+'&muc_luong='+v_muc_luong+'&trinh_do='+v_trinh_do+'&gioi_tinh='+v_gioi_tinh+'&tinh_trang_hon_nhan='+v_tinh_trang_hon_nhan+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items;
	window.location.href = v_url;
	return false;
}
//hailt 29/05/2012
//cuongnx 31/07/2012
//ham tim kiem va hien thi lai danh sach ung vien trang quan ly ung vien da luu cua Ntd
function ntd_quan_tri_ds_ho_so_ung_vien(id_ung_vien){	
	var v_id_ttd = parseInt(document.getElementById('sel_vi_tri_tuyen_dung').value);
	var v_trang_thai =  parseInt(document.getElementById('check_trang_thai_tuyen_dung').value);
	var v_muc_luong =  parseInt(document.getElementById('check_muc_luong').value);
	var v_trinh_do =  parseInt(document.getElementById('check_trinh_do').value);
	var v_gioi_tinh =  parseInt(document.getElementById('check_gioi_tinh').value);
	var v_tinh_trang_hon_nhan =  parseInt(document.getElementById('check_tinh_trang_hon_nhan').value);
	var v_kinh_nghiem =  parseInt(document.getElementById('check_so_nam_kinh_nghiem').value);
	var v_tu_khoa =  document.getElementById('txt_tu_khoa_tim_kiem').value;
	var v_tu_khoa_ttd =  document.getElementById('txt_vi_tri_tuyen_dung').value;
	var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	v_page =1;
	v_number_items =20;
	// var v_sap_xep =  document.getElementById('select_sap_xep_top').value;
	// var v_page =  parseInt(document.getElementById('page').value);
	// var v_number_items =  parseInt(document.getElementById('number_items').value);
	if(v_tu_khoa=='Nhập từ khóa tìm kiếm nhanh...'){
		v_tu_khoa = '';
	}
	v_url='/ajax/ntd_quan_tri_ho_so_ung_vien/index?id_ung_vien='+id_ung_vien+'&id_ttd='+v_id_ttd+'&tu_khoa='+v_tu_khoa+'&tu_khoa_ttd='+v_tu_khoa_ttd+'&trang_thai='+v_trang_thai+'&muc_luong='+v_muc_luong+'&trinh_do='+v_trinh_do+'&gioi_tinh='+v_gioi_tinh+'&tinh_trang_hon_nhan='+v_tinh_trang_hon_nhan+'&kinh_nghiem='+v_kinh_nghiem+'&sap_xep='+v_sap_xep+'&page='+v_page+'&number_items='+v_number_items+'&box_tim_kiem=1';	
	AjaxAction('div_ntd_quan_tri_ho_so_ung_vien',v_url);
}

//hailt 29/05/2012
//cuongnx 31/07/2012
//xu ly tren box tim kiem trang quan li ung vien da luu cua nha tuyen dung
//function tim kiem khi 1 tieu chi loc tim duoc chon
function ntd_quan_tri_tim_kiem_ho_so_ung_vien(p_tien_to,p_stt) {
	var i=0;
	var gia_tri = document.getElementById(p_tien_to + p_stt).checked;
	var tong_so = parseInt(document.getElementById(p_tien_to + '_tong_so').value);
	for(i=0;i<tong_so;i++){
		document.getElementById(p_tien_to + i).checked = false;
	}
	document.getElementById(p_tien_to + p_stt).checked = gia_tri;
	if(gia_tri){
		document.getElementById(p_tien_to).value = document.getElementById(p_tien_to + p_stt).value;
	}else{
		document.getElementById(p_tien_to).value=-100;
	}
	document.getElementById('page').value=1;
	ntd_quan_tri_ds_ho_so_ung_vien(-1);
}
//hailt 29/05/2012
//cuongnx 31/07/2012
//xu ly tren box tim kiem trang quan li ung vien da luu cua nha tuyen dung
//function huy tim kiem khi bam nut huy tim kiem
function ntd_quan_tri_huy_tim_kiem_ho_so_ung_vien() {
	v_url='/ntd_trang_quan_tri_ho_so_ung_vien';
	window.location.href = v_url;
}

function xem_danh_sach_ttd_cua_ntd(){
	ntd_quan_tri_ds_ho_so_ung_vien(-1);
}

//hailt 29/05/2012
//cuongnx 31/07/2012
//xu ly tren box tim kiem trang quan li ung vien da luu cua nha tuyen dung
//function sap xep ket qua tim kiem theo cac cach sap xep dat san
//xu ly gia tri 2 select bang nhau, roi moi goi hien thi ds sap khi sap xep
function ntd_quan_tri_sap_xep_ho_so_ung_vien(id_select_start,id_select_end) {
	document.getElementById(id_select_end).value = document.getElementById(id_select_start).value;
	document.getElementById('page').value = 1;
	ntd_quan_tri_ds_ho_so_ung_vien(-1);
}

// hailt 29/05/2012
// ntd xoa 1 ung vien da luu
function ntd_quan_tri_xoa_1_ho_so_ung_vien(stt){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	ntd_quan_tri_chon_tat_ca_ho_so_ung_vien(tong_so_ung_vien,false);
	document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked=true;
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	ntd_quan_tri_xoa_ds_ho_so_ung_vien();
}
// hailt 29/05/2012
// ntd xoa han 1 list ung vien da luu
function ntd_quan_tri_xoa_ds_ho_so_ung_vien(){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào!');
		return;
	}
	if(!confirm("Bạn có chắc chắn xóa ứng viên đã chọn không ?")){
			return;
		}
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/xoa_ung_vien";
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}

// hailt 19/07/2012
// ntd chon 1 ung vien da luu
function ntd_quan_tri_chon_1_ho_so_ung_vien(stt){
	var giatri = document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked;
	if(giatri){
		document.getElementById('tr'+stt).style.backgroundColor="#e6effa";
	}else{
		document.getElementById('tr'+stt).style.backgroundColor="#fff";
	}
	document.getElementById('checkbox_nganh_cap_1_ho_so_ung_vien['+stt+']').checked = document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked;
	document.getElementById('checkbox_ten_ho_so_ung_vien['+stt+']').checked = document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked;
	document.getElementById('checkbox_email_ho_so_ung_vien['+stt+']').checked = document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked;
}

function ntd_quan_tri_chon_tat_ca_ho_so_ung_vien(max,gia_tri){
	if(document.getElementById('checkbox_ho_so_ung_vien_all')!=null){
		document.getElementById('checkbox_ho_so_ung_vien_all').checked = gia_tri;
	}
	for(var i=0;i<max;i++){
		
		if(gia_tri){
			document.getElementById('tr'+i).style.backgroundColor="#e6effa";
		}else{
			document.getElementById('tr'+i).style.backgroundColor="#fff";
		}
		
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked = gia_tri;
		}
		if(document.getElementById('checkbox_nganh_cap_1_ho_so_ung_vien['+i+']')!=null){
			document.getElementById('checkbox_nganh_cap_1_ho_so_ung_vien['+i+']').checked = gia_tri;
		}
		if(document.getElementById('checkbox_ten_ho_so_ung_vien['+i+']')!=null){
			document.getElementById('checkbox_ten_ho_so_ung_vien['+i+']').checked = gia_tri;
		}
		if(document.getElementById('checkbox_email_ho_so_ung_vien['+i+']')!=null){
			document.getElementById('checkbox_email_ho_so_ung_vien['+i+']').checked = gia_tri;
		}
		
	}
}
// cuongnx 4/08/2012
// ntd luu phong van 1 ho so ung vien
function ntd_quan_tri_luu_trang_thai_1_ho_so_ung_vien(id_ttd_ung_vien,p_chuc_nang,p_loi_nhan){
	if(!confirm(p_loi_nhan)){
			return;
		}
	
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/"+p_chuc_nang+"/"+id_ttd_ung_vien;
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}
// hailt 19/07/2012
// ntd luu phong van 1 list ung vien da luu
function ntd_quan_tri_doi_trang_thai_ds_ho_so_ung_vien(p_chuc_nang,p_loi_nhan){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào');
		return;
	}
	if(!confirm(p_loi_nhan)){
			return;
		}
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/thao_tac_ds_ung_vien/"+p_chuc_nang;
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}


// hailt 19/07/2012
// ntd gui phan hoi 1 ung vien da luu
function ntd_quan_tri_gui_phan_hoi_1_ho_so_ung_vien(stt){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	ntd_quan_tri_chon_tat_ca_ho_so_ung_vien(tong_so_ung_vien,false);
	document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked=true;
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	ntd_quan_tri_gui_phan_hoi_ds_ho_so_ung_vien();
}
// hailt 19/07/2012
// ntd gui phan hoi 1 list ung vien da luu
function ntd_quan_tri_gui_phan_hoi_ds_ho_so_ung_vien(){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào');
		return;
	}
	document.getElementById('sel_vi_tri_tuyen_dung').style.display = 'none';
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/gui_phan_hoi";
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}
function danh_gia_1_ung_vien(stt){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	ntd_quan_tri_chon_tat_ca_ho_so_ung_vien(tong_so_ung_vien,false);
	document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked=true;
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	danh_gia_ung_vien();
}
function danh_gia_ung_vien(){	
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào');
		return;
	}
	document.getElementById('sel_vi_tri_tuyen_dung').style.display = 'none';
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/danh_gia_ung_vien";
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}
function nhap_lai_danh_gia() {	
	getElement('area_noi_dung').value='';
	// document.frm_danh_gia_ung_vien.area_noi_dung.value='';	
}
function cap_nhat_danh_gia(){	
	var frm = document.frm_danh_gia_ung_vien;	
	if(frm.dang_danh_gia.value==''){
		// hen_ngay=0;
		// if(frm.chk_hen_ngay.checked){
			// hen_ngay=1;
		// }
		frm.dang_danh_gia.value='1';
		
		frm.target = "fr_submit";	
		frm.action = "/ajax/ntd_quan_tri_ho_so_ung_vien/cap_nhat_danh_gia";	
		frm.submit();
		return true;		
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}
function gui_mail_phan_hoi(){	
	var frm = document.frmSendMail;	
	if(frm.dang_gui_mail.value==''){
		hen_ngay=0;
		if(frm.chk_hen_ngay.checked){
			hen_ngay=1;
		}
		frm.dang_gui_mail.value='1';
		
		frm.target = "fr_submit";	
		frm.action = "/ajax/ntd_quan_tri_ho_so_ung_vien/cap_nhat_phan_hoi";	
		frm.submit();
		return true;		
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}
function hien_thi_chon_ngay(obj){
	obj_hen_ngay = document.getElementById('td_hen_ngay');
	obj_img_hen_ngay = document.getElementById('td_img_hen_ngay');
	obj_text_hen_ngay = document.getElementById('td_text_hen_ngay');
	if(obj.checked){
		obj_hen_ngay.style.display='';
		obj_img_hen_ngay.style.display='';
		obj_text_hen_ngay.style.display='';
	}else{
		obj_hen_ngay.style.display='none';
		obj_img_hen_ngay.style.display='none';
		obj_text_hen_ngay.style.display='none';
	}
}
function tu_choi_1_ung_vien(stt){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	ntd_quan_tri_chon_tat_ca_ho_so_ung_vien(tong_so_ung_vien,false);
	document.getElementById('checkbox_ho_so_ung_vien['+stt+']').checked=true;
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	tu_choi_ung_vien();
}
function tu_choi_ung_vien(){	
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào');
		return;
	}
	document.getElementById('sel_vi_tri_tuyen_dung').style.display = 'none';
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/tu_choi_ung_vien";
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}
function cap_nhat_tu_choi(){	
	var frm = document.frm_danh_gia_ung_vien;	
	if(frm.dang_danh_gia.value==''){
		frm.dang_danh_gia.value='1';
		
		frm.target = "fr_submit";	
		frm.action = "/ajax/ntd_quan_tri_ho_so_ung_vien/cap_nhat_tu_choi_ung_vien";	
		frm.submit();
		return true;		
	}else{
		alert('Hệ thống đang xử lý...!');
	}
}

function ntd_quan_tri_tao_file_excel(){
	var tong_so_ung_vien = document.getElementById('tong_so_ho_so_ung_vien').value;
	var i=0;
	for(i=0;i<tong_so_ung_vien;i++){
		if(document.getElementById('checkbox_ho_so_ung_vien['+i+']')!=null){
			if(document.getElementById('checkbox_ho_so_ung_vien['+i+']').checked==true){
				break;
			}
		}
	}
	if(i>=tong_so_ung_vien){
		alert('Bạn chưa chọn ứng viên nào');
		return;
	}
	document.forms['form_ds_ho_so_ung_vien'].target = "fr_submit_ds_ho_so_ung_vien";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/tao_file_excel";
	document.forms['form_ds_ho_so_ung_vien'].action = url;	
	document.forms['form_ds_ho_so_ung_vien'].submit();
}

function ntd_preview_ho_so_tim_viec(stt,id_ttv){
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	
	var url =  "/ajax/ntd_quan_tri_ho_so_ung_vien/preview_ho_so/"+id_ttv;
	show_box_popup('',840,600);			
	AjaxActionPost( '_box_popup', url);	
}

function ntd_preview_cv(stt,id_cv,id_nganh_cap1){
	ntd_quan_tri_chon_1_ho_so_ung_vien(stt);
	var thu_mau=getElement('thu_ung_tuyen'+stt).value;
	var url =  "/ajax/ntd_quan_tri_ho_so_ung_vien/preview_cv";
	show_box_popup('',840,600);			
	AjaxActionPost( '_box_popup', url,"id_cv="+id_cv+"&thu_mau="+thu_mau+"&id_nganh_cap1="+id_nganh_cap1,true);	
}

function ntd_quan_tri_tao_file_excel_preview_ho_so(){
	document.forms['form_button_preview_ho_so'].target = "fr_submit_preview_ho_so";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/tao_file_excel_preview_ho_so";
	document.forms['form_button_preview_ho_so'].action = url;	
	document.forms['form_button_preview_ho_so'].submit();
}

function ntd_quan_tri_tao_file_excel_preview_cv(){
	document.forms['form_button_preview_cv'].target = "fr_submit_preview_cv";
	var url = "/ajax/ntd_quan_tri_ho_so_ung_vien/tao_file_excel_preview_cv";
	document.forms['form_button_preview_cv'].action = url;	
	document.forms['form_button_preview_cv'].submit();
}

















// file ko cần sửa
/*vietuni8.js - R.19.10.01 @JOTREQFA@P*Veni*Vidi*Vici*
* by Tran Anh Tuan [tuan@physik.hu-berlin.de] 
* Copyright (c) 2001, 2002 AVYS e.V.. All Rights Reserved.
*
* Originally published and documented at http://www.avys.de/
* You may use this code without fee on noncommercial web sites. 
* You may NOT alter the code and then call it another name and/or resell it.
* The copyright notice must remain intact on srcipts.
*/

// interface for HTML:
         
var supported = (document.all || document.getElementById);
var disabled = false;
var charmapid = 1;
var keymodeid = 0;
var linebreak = 0;
var theTyper = null;

//--------------Added by BV.HUNG-----
var	Kbrd = 'telex';
function ChangeLinkHref(name) {
	name.href =	name.href +	'&Kbrd=' + Kbrd;
}

function initVietTyper(mode,font){
  setTypingMode(mode);
  switch (font)	{
	 case 'utf8'  :	charmapid = 1; break;
	 case 'vni'	  :	charmapid = 5; break;
	 case 'tcvn'  :	charmapid = 6; break;
	 case 'viscii':	charmapid = 7; break;
	 case 'vps'	  :	charmapid = 8; break;
	 case 'viqr'  : charmapid = 9; break;
	 default	  :	charmapid = 6;
 }
}
//---------------End BV.HUNG---------
reset = function(){}
telexingVietUC = initTyper;

function setTypingMode(mode) {
  keymodeid = mode;
  if (theTyper) theTyper.keymode= initKeys();
  if (!supported && !disabled) {
    disabled = true;  
  }
}
initCharMap = function() { return new CVietUniCodeMap(); }
initKeys = function() {
  switch (keymodeid) {
    case 1: return new CTelexKeys();
    case 2: return new CVniKeys();
    case 3: return new CViqrKeys();
    default: return new CVKOff();
  }
}
function initTyper(txtarea) {
  txtarea.vietarea= true;
  txtarea.onkeyup= null;
  if (!supported) return;
  txtarea.onkeypress= vietTyping;
  txtarea.getCurrentWord= getCurrentWord;
  txtarea.replaceWord= replaceWord;
  txtarea.onkeydown= onKeyDown;
  txtarea.onmousedown= onMouseDown;
}

function getEvt(evt) {
  return document.all? event.keyCode: (evt && evt.which)? evt.which: 0;
}

function onKeyDown(evt) {
  var c= getEvt(evt);
  if ((c==10) || (c==13)) { reset(1); linebreak= 1; }
  else if ((c<49) && (c!=16) && (c!=20)) { linebreak= 0; reset(c==32); }
  return true;
}

function onMouseDown(evt) { reset(0); linebreak= 0; return true; }

function vietTyping(evt) {
  var c= getEvt(evt);
  if(theTyper) theTyper.value= this.getCurrentWord();
  else theTyper= new CVietString(this.getCurrentWord());
  var changed= (c>32) && theTyper.typing(c);
  if (changed) this.replaceWord(theTyper.value);
  return !changed; 
}

function getCurrentWord() {
  if(!document.all) return this.value;
  var caret = this.document.selection.createRange();
  var backward = -10;
  do {
    var caret2 = caret.duplicate();
    caret2.moveStart("character", backward++);
  } while (caret2.parentElement() != this && backward <0);
  this.curword = caret2.duplicate();
  return caret2.text;
}

function replaceWord(newword) {
  if(!document.all) { this.value= newword; return; }
  this.curword.text = newword;
  this.curword.collapse(false);
}
// end interface

// "class": CVietString
//
function CVietString(str) {
  this.value= str;
  this.keymode= initKeys();
  this.charmap= initCharMap();
  this.ctrlchar= '-';
  this.changed= 0;

  this.typing= typing;
  this.Compose= Compose;
  this.findCharToChange= findCharToChange;
  return this;
}

function typing(ctrl) {
  this.changed = 0;
  this.ctrlchar = String.fromCharCode(ctrl);
  if (linebreak) linebreak= 0; else this.keymode.getAction(this);
  return this.changed;
}

function Compose(type) {
  var info = this.findCharToChange(type);
  if (!info) return;
  var telex;
  if (info[0]=='\\') telex= [1,this.ctrlchar,1];
  else if (type>6) telex= this.charmap.getAEOWD(info[0], type, info[3]);
  else telex= this.charmap.getDau(info[0], type);
  if (!(this.changed = telex[0])) return;
  this.value = this.value.replaceAt(info[1],telex[1],info[2]);
  if (!telex[2]) { spellerror= 1; this.value+= this.ctrlchar; }
}

function findCharToChange(type) {
  var lastchars= this.charmap.lastCharsOf(this.value, 5);
  var i= 0, c=lastchars[0][0], chr=0;
  if (c=='\\') return [c,this.value.length-1,1];
  if (type==15) while (!(chr=this.charmap.isVD(c))) {
    if ((c < 'A') || (i>=4) || !(c=lastchars[++i][0])) return null;
  }
  else while( "cghmnpt".indexOf(c)>=0) {
    if ((c < 'A') || (i>=2) || !(c=lastchars[++i][0])) return null;
  }
  c = lastchars[0][0].toLowerCase();
  var pc = lastchars[1][0].toLowerCase();
  var ppc = lastchars[2][0].toLowerCase();
  if (i==2 && type<6) {
    var tmp = pc + c;
    if ((tmp!="ng") && (tmp!="ch") && (tmp!="nh")) return null;
    if (tmp=="ch" && type!=1 && type!=3) return null; 
  }
  else if (i==1 && type<6) {
    if((c=='g') || (c=="h")) return null;
    if ("cpt".indexOf(c) >=0 && type!=1 && type!=3) return null; 
  }
  else if (i==0 && type!=15) {
    if ( (chr=this.charmap.isVowel(lastchars[1][0]))
      && ("uyoia".indexOf(c)>=0) && !this.charmap.isUO(pc,c)
      && !((pc=='o' && c=='a') || (pc=='u' && c=='y'))
      && !((ppc=='q' && pc=='u') || (ppc=='g' && pc=='i')) ) ++i;
    if (c=='a' && (type==9 || type==7)) i= 0;
  }
  c= lastchars[i][0];
  if ((i==0 || chr==0) && type!=15) chr= this.charmap.isVowel(c);
  if (!chr) return null;
  var clen= lastchars[i][1], isuo=0;
  if ((i>0) && (type==7 || type==8 || type==11)) {
    isuo=this.charmap.isUO(lastchars[i+1][0],c);
    if (isuo) { chr=isuo; clen+=lastchars[++i][1]; isuo=1; }
  }
  var pos= this.value.length;
  for (var j=0; j<= i; j++) pos -= lastchars[j][1];
  return [chr, pos, clen, isuo];
}
// end CVietString


// character-map template
//
function CVietCharMap() {
this.vietchars = null;
this.length = 149;
return this; 
}

CVietCharMap.prototype.charAt = function(ind) { 
  var chrcode = this.vietchars[ind];
  return chrcode ? String.fromCharCode(chrcode) : null; 
}

CVietCharMap.prototype.isVowel = function(chr) {
  var ind = this.length-5;
  while ((chr != this.charAt(ind)) && ind) --ind;
  return ind;
}

CVietCharMap.prototype.isVD = function (chr) {
  var ind = this.length-5;
  while ((chr != this.charAt(ind)) && (ind < this.length)) ++ind;
  return (ind<this.length)? ind: 0;
}
                         
CVietCharMap.prototype.isCol = function (col, chr){
  var i=12, ind=col+1;
  while (i>=0 && (this.charAt(i*12+ind)!=chr)) --i; 
  return (i>=0)? i*12+ind : 0;
}

CVietCharMap.prototype.isUO = function (c1, c2) {
  if (!c1 || !c2) return 0;
  var ind1= this.isCol(9, c1);
  if (!ind1) ind1= this.isCol(10, c1);
  if (!ind1) return 0;
  var ind2= this.isCol(6, c2);
  if (!ind2) ind2= this.isCol(7, c2);
  if (!ind2) ind2= this.isCol(8, c2);
  if (!ind2) return 0;
  return [ind1,ind2];
}

CVietCharMap.prototype.getDau = function (ind, type) {
  var accented= (ind < 25)? 0: 1;
  var ind_i= (ind-1) % 24 +1;
  var charset= (type == 6)? 0 : type;
  if ((type== 6) && !accented) return [0];
  var newind= charset*24 + ind_i;
  if (newind == ind) newind= ind_i;
  return [1, this.charAt(newind), newind>24 || type==6];
}

var map=[
[7,7,7,8,8, 8,9,10,11,15],
[0,3,6,0,6, 9,0, 3, 6, 0],
[1,4,7,2,8,10,1, 4, 7, 1]
];
CVietCharMap.prototype.getAEOWD = function (ind, type, isuo) {
  var c=0, i1=isuo? ind[0]: ind;
  var vc1= (type==15)? (i1-1)%2 : (i1-1)%12;
  if (isuo) {
    base= ind[1]-(ind[1]-1)%12;
    if (type==7 || type==11) c= this.charAt(i1-vc1+9)+this.charAt(base+7);
    else if (type==8) c= this.charAt(i1-vc1+10)+this.charAt(base+8);
    return [c!=0, c, 1];
  }
  var i= -1, shift= 0, del= 0;
  while (shift==0 && ++i<map[0].length) {
    if (map[0][i]==type) {
      if(map[1][i]==vc1) shift= map[2][i]-vc1;
      else if(map[2][i]==vc1) shift= map[1][i]-vc1;
    }
  }
  if (shift==0) {
    if (type==7 && (vc1==2 || vc1==8)) shift=-1;
    else if ((type==9 && vc1==2) || (type==11 && vc1==8)) shift=-1;
    else if (type==8 && (vc1==1 || vc1==7)) shift=1;
    del= 1;
  } else del=(shift>0);
  return [shift!=0, this.charAt(i1+shift), del];
}

CVietCharMap.prototype.lastCharsOf = function (str, num) {
  if (!num) return [str.charAt(str.length-1),1];
  var vchars = new Array(num);
  for (var i=0; i< num; i++) vchars[i]= [str.charAt(str.length-i-1),1];
  return vchars;
}
// end CVietCharMap prototype


String.prototype.replaceAt= function(i,newchr,clen) {
  return this.substring(0,i)+ newchr + this.substring(i+clen);
}

// output map: class CVietUniCodeMap
// 
function CVietUniCodeMap(){ var map = new CVietCharMap();
map.vietchars = new Array(
"UNICODE",
97, 226, 259, 101, 234, 105, 111, 244, 417, 117, 432, 121,
65, 194, 258, 69, 202, 73, 79, 212, 416, 85, 431, 89,
225, 7845, 7855, 233, 7871, 237, 243, 7889, 7899, 250, 7913, 253,
193, 7844, 7854, 201, 7870, 205, 211, 7888, 7898, 218, 7912, 221,
224, 7847, 7857, 232, 7873, 236, 242, 7891, 7901, 249, 7915, 7923,
192, 7846, 7856, 200, 7872, 204, 210, 7890, 7900, 217, 7914, 7922,
7841, 7853, 7863, 7865, 7879, 7883, 7885, 7897, 7907, 7909, 7921, 7925,
7840, 7852, 7862, 7864, 7878, 7882, 7884, 7896, 7906, 7908, 7920, 7924,
7843, 7849, 7859, 7867, 7875, 7881, 7887, 7893, 7903, 7911, 7917, 7927,
7842, 7848, 7858, 7866, 7874, 7880, 7886, 7892, 7902, 7910, 7916, 7926,
227, 7851, 7861, 7869, 7877, 297, 245, 7895, 7905, 361, 7919, 7929,
195, 7850, 7860, 7868, 7876, 296, 213, 7894, 7904, 360, 7918, 7928,
100, 273, 68, 272);
return map;
}

// input methods: class C...Keys
function CVietKeys() {
  this.getAction= function(typer) { 
    var i= this.keys.indexOf(typer.ctrlchar.toLowerCase());
    if(i>=0) typer.Compose(this.actions[i]);
  }
  return this;
}

function CVKOff() {
  this.off = true;
  this.getAction= function(){};
  return this;
}

function CTelexKeys() {
  var k= new CVietKeys();
  k.keys= "sfjrxzaeowd";
  k.actions= [1,2,3,4,5,6,9,10,11,8,15];
  k.istelex= true;
  return k;
}
             
function CVniKeys() {
  var k= new CVietKeys();
  k.keys= "0123456789";
  k.actions= [6,1,2,4,5,3,7,8,8,15];
  return k;
}

function CViqrKeys() {
  var k= new CVietKeys();
  k.keys= "\xB4/'`.?~-^(*+d";
  k.actions= [1,1,1,2,3,4,5,6,7,8,8,8,15];
  return k;
}

// end vietuni8.js

/*vumaps.js [optional]
* this file is part of the VIETUNI typing tool 
* by Tran Anh Tuan [tuan@physik.hu-berlin.de]
* Copyright (c) 2001, 2002 AVYS e.V.. All Rights Reserved.
*/

if (typeof(initCharMap) != 'undefined') {
  initCharMap = selectMap;
  if (theTyper) theTyper.charmap = initCharMap();
  vumaps = 1;
}
                        
function selectMap(id) {	
  var map = id? id: charmapid;
  switch (map) {
     case 1: return new CVietUniCodeMap();
     case 5: return new CVietVniMap();
     case 6: return new CVietTCVNMap();
     case 7: return new CVietVISCIIMap();
     case 8: return new CVietVPSMap();
     case 9: return new CVietViqrMap();
     default: return new CVietUniCodeMap();
  }
}

///////////////////////////

CVietCharMap.prototype.lowerCaseOf = function (chr, ind) {
  var i = ind? ind: this.isVowel(chr);
  if(i) return (i && ((i-1)%24 >= 12))? this.charAt(i-12): this.charAt(i); 
  if(!result[1]) result[1]= this.lowerCaseOf(0,charset*24 + ind_i); 
}

CVietCharMap.prototype.indexOf = function (chr,isnumber) {
  var c = isnumber? String.fromcharCode(chr) : chr;
  var ind = this.length-1;
  while ((c != this.charAt(ind)) && (ind > 0)) --ind;
  return ind;
}

CVietCharMap.prototype.regExpAt = function (i) {
  var c=this.charAt(i);
  return c? new RegExp(c,'g') : 0;
}

CVietCharMap.prototype.convertTxtTo = function (txt, newmap) {
  var i, regexp, res;
  for (i=this.length-1; i>0; i--) {
    if(regexp=this.regExpAt(i)) txt= txt.replace(regexp, "::"+i+"::");
  }
  while (res = /::(\d+)::/gi.exec(txt)) {
    regexp = new RegExp("::"+res[1]+"::",'g');
    txt= txt.replace(regexp, newmap.charAt(parseInt(res[1],10)));
  }
  return txt;
}

function CVietTCVNMap() { var map = new CVietCharMap();
map.vietchars = new Array(
 "TCVN-3",
 97, 169, 168, 101, 170, 105, 111, 171, 172, 117, 173, 121, 
 65, 162, 161, 69, 163, 73, 79, 164, 165, 85, 166, 89,
 184, 202, 190, 208, 213, 221, 227, 232, 237, 243, 248, 253,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 181, 199, 187, 204, 210, 215, 223, 229, 234, 239, 245, 250,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 185, 203, 198, 209, 214, 222, 228, 233, 238, 244, 249, 254,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 182, 200, 188, 206, 211, 216, 225, 230, 235, 241, 246, 251,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 183, 201, 189, 207, 212, 220, 226, 231, 236, 242, 247, 252,
 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 100, 174, 68, 167);
return map;
}

function CVietVISCIIMap() { var map = new CVietCharMap();
map.vietchars = new Array(
"VISCII",
97, 226, 229, 101, 234, 105, 111, 244, 189, 117, 223, 121,
65, 194, 197, 69, 202, 73, 79, 212, 180, 85, 191, 89,
225, 164, 237, 233, 170, 237, 243, 175, 190, 250, 209, 253,
193, 8222, 129, 201, 352, 205, 211, 143, 8226, 218, 186, 221,
224, 165, 162, 232, 171, 236, 242, 176, 182, 249, 215, 207,
192, 8230, 8218, 200, 8249, 204, 210, 144, 8211, 217, 187, 376,
213, 167, 163, 169, 174, 184, 247, 181, 254, 248, 241, 220,
8364, 8225, 402, 8240, 381, 732, 353, 8220, 8221, 382, 185, 0,
228, 166, 198, 235, 172, 239, 246, 177, 183, 252, 216, 214,
196, 8224, 0, 203, 338, 8250, 8482, 8216, 8212, 339, 188, 0,
227, 231, 199, 168, 173, 238, 245, 178, 222, 251, 230, 219,
195, 0, 0, 710, 141, 206, 0, 8217, 179, 157, 255, 0,
100, 240, 68, 208);
return map;
}


function CVietVPSMap() { var map = new CVietCharMap();
map.vietchars = new Array(
"VPS-Win",
97, 226, 230, 101, 234, 105, 111, 244, 214, 117, 220, 121,
65, 194, 710, 69, 202, 73, 79, 212, 247, 85, 208, 89,
225, 195, 161, 233, 8240, 237, 243, 211, 167, 250, 217, 353,
193, 402, 141, 201, 144, 180, 185, 8211, 157, 218, 173, 221,
224, 192, 162, 232, 352, 236, 242, 210, 169, 249, 216, 255,
0, 8222, 0, 215, 8220, 181, 188, 8212, 0, 168, 175, 178,
229, 198, 165, 203, 338, 206, 8224, 182, 174, 248, 191, 339,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
228, 196, 163, 200, 8249, 204, 213, 176, 170, 251, 186, 8250,
129, 8230, 0, 222, 8221, 183, 189, 732, 376, 209, 177, 0,
227, 197, 164, 235, 205, 239, 245, 8225, 171, 219, 187, 207,
8218, 0, 0, 254, 8226, 184, 0, 8482, 166, 172, 0, 0,
100, 199, 68, 241);
return map;
}


function CVietMultibyteMap(superior) { 
var map= superior? superior: new CVietCharMap();

map.maxchrlen = 3;

map.charAt = function (ind) { 
  return this.vietchars[ind];
}

// return an array of num vietchars with variable length: [[chr,len][]..]
// extracted from str in reversed order
//
map.lastCharsOf = function (str, num) {
  var vchar = null;
  var i= this.maxchrlen;
  var mystr = str;
  while (!vchar && (i > 1)) {
    var c = mystr.substring(mystr.length-i);
    if (this.indexOf(c)) vchar=[c, i]; 
    --i;
  }
  if (!vchar) vchar=[mystr.charAt(mystr.length-1), 1]; 
  if (!num) return vchar;
  var vchars = new Array(num);
  vchars[0]= vchar; 
  for ( i=1; i< num; i++) {
    mystr= mystr.substring(0,mystr.length-vchars[i-1][1]);  
    vchars[i]= this.lastCharsOf(mystr);
  }
  return vchars;
}

return map;
}

function CVietVniMap() { var map = new CVietMultibyteMap();
map.maxchrlen = 2;    
map.vietchars = new Array(
"VNI-WIN",
"a","a\xe2","a\xea","e","e\xe2","i","o","o\xe2","\xf4","u","\xf6","y",
"A","A\xc2","A\xca","E","E\xc2","I","O","O\xc2","\xd4","U","\xd6","Y",
"a\xf9","a\xe1","a\xe9","e\xf9","e\xe1","\xed","o\xf9","o\xe1","\xf4\xf9","u\xf9","\xf6\xf9","y\xf9",
"A\xd9","A\xc1","A\xc9","E\xd9","E\xc1","\xcd","O\xd9","O\xc1","\xd4\xd9","U\xd9","\xd6\xd9","Y\xd9",
"a\xf8","a\xe0","a\xe8","e\xf8","e\xe0","\xec","o\xf8","o\xe0","\xf4\xf8","u\xf8","\xf6\xf8","y\xf8",
"A\xd8","A\xc0","A\xc8","E\xd8","E\xc0","\xcc","O\xd8","O\xc0","\xd4\xd8","U\xd8","\xd6\xd8","Y\xd8",
"a\xef","a\xe4","a\xeb","e\xef","e\xe4","\xf2","o\xef","o\xe4","\xf4\xef","u\xef","\xf6\xef","\xee",
"A\xcf","A\xc4","A\xcb","E\xcf","E\xc4","\xd2","O\xcf","O\xc4","\xd4\xcf","U\xcf","\xd6\xcf","\xce",
"a\xfb","a\xe5","a\xfa","e\xfb","e\xe5","\xe6","o\xfb","o\xe5","\xf4\xfb","u\xfb","\xf6\xfb","y\xfb",
"A\xdb","A\xc5","A\xda","E\xdb","E\xc5","\xc6","O\xdb","O\xc5","\xd4\xdb","U\xdb","\xd6\xdb","Y\xdb",
"a\xf5","a\xe3","a\xfc","e\xf5","e\xe3","\xf3","o\xf5","o\xe3","\xf4\xf5","u\xf5","\xf6\xf5","y\xf5",
"A\xd5","A\xc3","A\xdc","E\xd5","E\xc3","\xd3","O\xd5","O\xc3","\xd4\xd5","U\xd5","\xd6\xd5","Y\xd5",
"d","\xf1","D","\xd1");  
return map;
}

function CVietViqrMap() { var map = new CVietMultibyteMap();
map.vietchars = new Array(
 "VIQR",
 "a","a^","a(","e","e^","i","o","o^","o+","u","u+","y",
 "A","A^","A(","E","E^","I","O","O^","O+","U","U+", "Y",
 "a'","a^'","a('","e'","e^'","i'","o'","o^'","o+'","u'","u+'","y'", 
 "A'","A^'","A('","E'","E^'","I'","O'","O^'","O+'","U'","U+'","Y'", 
 "a`","a^`","a(`","e`","e^`","i`","o`","o^`","o+`","u`","u+`","y`", 
 "A`","A^`","A(`","E`","E^`","I`","O`","O^`","O+`","U`","U+`","Y`", 
 "a.","a^.","a(.","e.","e^.","i.","o.","o^.","o+.","u.","u+.","y.", 
 "A.","A^.","A(.","E.","E^.","I.","O.","O^.","O+.","U.","U+.","Y.", 
 "a?","a^?","a(?","e?","e^?","i?","o?","o^?","o+?","u?","u+?","y?", 
 "A?","A^?","A(?","E?","E^?","I?","O?","O^?","O+?","U?","U+?","Y?", 
 "a~","a^~","a(~","e~","e^~","i~","o~","o^~","o+~","u~","u+~","y~", 
 "A~","A^~","A(~","E~","E^~","I~","O~","O^~","O+~","U~","U+~","Y~",
 "d","dd","D","DD");

map.regExpAt = function(ind) {
  var c=this.charAt(ind);
  if (!c) return null;
  c = c.replace(/\+/g, "[\\+\\*]");
  c = c.replace(/'/g, "['´]");
  c = c.replace(/([\-\?\.\(\^])/g, "\\$1");
  c = c.replace(/(d)d/gi, "$1$1|\\-$1|$1\\-");
  return new RegExp(c,'g');
}

map.convertTxtTo = function (txt, newmap) {
  var i, regexp, res, tmp;
//  txt= txt.replace(/([\.\?]\s+[A-Z])/g, ";;;$1");
  txt= txt.replace(/(\.\.+|\?\?+)/g, ";;;$1");
//  txt= txt.replace(/([\.\?])(\s*[\n\r])/g, ";;;$1$2");
  while (res=/(\.[\w\@\-\.\/\\][\w\@\-\.\/\\][\w\@\-\.\/\\]+\s*)/g.exec(txt)){
    regexp= res[1].replace(/([\.\?\+\-\(\^\*\@\\)\]\}])/g,"\\$1");
    tmp= res[1].replace(/\./g,";;;.;;;");
    txt= txt.replace(new RegExp(regexp,'g'), tmp);
  }
  for (i=this.length-1; i>0; i--) {
    if(regexp=this.regExpAt(i)) txt= txt.replace(regexp, "::"+i+"::");
  }
  while (res = /::(\d+)::/gi.exec(txt)) {
    regexp = new RegExp("::"+res[1]+"::",'g');
    txt= txt.replace(regexp, newmap.charAt(parseInt(res[1],10)));
  }
  txt= txt.replace(/;;;/g,"");
  return txt;
}

return map;
}
// Combined Unicode (somewhat like VNI): character + ton mark
//
function CVietCombUCMap() { var map = new CVietMultibyteMap(new CVietUniCodeMap());
  map.maxchrlen = 2;
  var viettm = new Array("UNICODE-C", 769, 768, 803, 777, 771); // ('`.?~)

  for (var i = 1; i < map.length-4; i++ ) {
    var i_char = (i-1)%24;
    var i_tm = (i - i_char - 1)/24;
    var base_c = map.vietchars[i_char+1];
    if (i<25) base_c = String.fromCharCode(base_c);
    var tonmark = String.fromCharCode(viettm[i_tm]);
    map.vietchars[i] = i_tm? base_c + tonmark : base_c;
  }
  for (var i = map.length-4; i < map.length; i++ ) {
    map.vietchars[i] = String.fromCharCode(map.vietchars[i]);
  }
  return map;
}


var weekend = [0,6];
var weekendColor = "#e0e0e0";
var fontface = "Verdana";
var fontsize = 2;

var gNow = new Date();
var ggWinCal;
isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;

Calendar.Months = ["Th&#225;ng 1", "Th&#225;ng 2", "Th&#225;ng 3", "Th&#225;ng 4", "Th&#225;ng 5", "Th&#225;ng 6",
"Th&#225;ng 7", "Th&#225;ng 8", "Th&#225;ng 9", "Th&#225;ng 10", "Th&#225;ng 11", "Th&#225;ng 12"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
	if ((p_month == null) && (p_year == null))	return;

	if (p_WinCal == null)
		this.gWinCal = ggWinCal;
	else
		this.gWinCal = p_WinCal;
	
	if (p_month == null) {
		this.gMonthName = null;
		this.gMonth = null;
		this.gYearly = true;
	} else {
		this.gMonthName = Calendar.get_month(p_month);
		this.gMonth = new Number(p_month);
		this.gYearly = false;
	}

	this.gYear = p_year;
	this.gFormat = p_format;
	this.gBGColor = "white";
	this.gFGColor = "black";
	this.gTextColor = "black";
	this.gHeaderColor = "black";
	this.gReturnItem = p_item;
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;
Calendar.print = Calendar_print;

function Calendar_get_month(monthNo) {
	return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) {
	/* 
	Check for leap year ..
	1.Years evenly divisible by four are normally leap years, except for... 
	2.Years also evenly divisible by 100 are not leap years, except for... 
	3.Years also evenly divisible by 400 are leap years. 
	*/
	if ((p_year % 4) == 0) {
		if ((p_year % 100) == 0 && (p_year % 400) != 0)
			return Calendar.DOMonth[monthNo];
	
		return Calendar.lDOMonth[monthNo];
	} else
		return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

function Calendar_print() {
	ggWinCal.print();
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
	/* 
	Will return an 1-D array with 1st element being the calculated month 
	and second being the calculated year 
	after applying the month increment/decrement as specified by 'incr' parameter.
	'incr' will normally have 1/-1 to navigate thru the months.
	*/
	var ret_arr = new Array();
	
	if (incr == -1) {
		// B A C K W A R D
		if (p_Month == 0) {
			ret_arr[0] = 11;
			ret_arr[1] = parseInt(p_Year) - 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) - 1;
			ret_arr[1] = parseInt(p_Year);
		}
	} else if (incr == 1) {
		// F O R W A R D
		if (p_Month == 11) {
			ret_arr[0] = 0;
			ret_arr[1] = parseInt(p_Year) + 1;
		}
		else {
			ret_arr[0] = parseInt(p_Month) + 1;
			ret_arr[1] = parseInt(p_Year);
		}
	}
	
	return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();

Calendar.prototype.getMonthlyCalendarCode = function() {
	var vCode = "";
	var vHeader_Code = "";
	var vData_Code = "";
	
	// Begin Table Drawing code here..
	vCode = vCode + "<TABLE BORDER=1 BGCOLOR=\"" + this.gBGColor + "\">";
	
	vHeader_Code = this.cal_header();
	vData_Code = this.cal_data();
	vCode = vCode + vHeader_Code + vData_Code;
	
	vCode = vCode + "</TABLE>";
	
	return vCode;
}

Calendar.prototype.show = function() {
	var vCode = "";
	
	this.gWinCal.document.open();

	// Setup the page...
	this.wwrite("<html>");
	this.wwrite("<head><title>Calendar</title>");
	this.wwrite("</head>");

	this.wwrite("<body " + 
		"link=\"" + this.gLinkColor + "\" " + 
		"vlink=\"" + this.gLinkColor + "\" " +
		"alink=\"" + this.gLinkColor + "\" " +
		"text=\"" + this.gTextColor + "\">");
	this.wwriteA("<FONT FACE='" + fontface + "' SIZE=2><B>");
	this.wwriteA(this.gMonthName + " " + this.gYear);
	this.wwriteA("</B><BR>");

	// Show navigation buttons
	var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
	var prevMM = prevMMYYYY[0];
	var prevYYYY = prevMMYYYY[1];

	var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
	var nextMM = nextMMYYYY[0];
	var nextYYYY = nextMMYYYY[1];
	
	this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "'" +
		");" +
		"\"><<<\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\"><<\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"javascript:window.print();\">Print</A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">><\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "'" +
		");" +
		"\">>><\/A>]</TD></TR></TABLE><BR>");

	// Get the complete calendar code for the month..
	vCode = this.getMonthlyCalendarCode();
	this.wwrite(vCode);

	this.wwrite("</font></body></html>");
	this.gWinCal.document.close();
}

Calendar.prototype.showY = function() {
	var vCode = "";
	var i;
	var vr, vc, vx, vy;		// Row, Column, X-coord, Y-coord
	var vxf = 285;			// X-Factor
	var vyf = 200;			// Y-Factor
	var vxm = 10;			// X-margin
	var vym;				// Y-margin
	if (isIE)	vym = 75;
	else if (isNav)	vym = 25;
	
	this.gWinCal.document.open();

	this.wwrite("<html>");
	this.wwrite("<head><title>Calendar</title>");
	this.wwrite("<style type='text/css'>\n<!--");
	for (i=0; i<12; i++) {
		vc = i % 3;
		if (i>=0 && i<= 2)	vr = 0;
		if (i>=3 && i<= 5)	vr = 1;
		if (i>=6 && i<= 8)	vr = 2;
		if (i>=9 && i<= 11)	vr = 3;
		
		vx = parseInt(vxf * vc) + vxm;
		vy = parseInt(vyf * vr) + vym;

		this.wwrite(".lclass" + i + " {position:absolute;top:" + vy + ";left:" + vx + ";}");
	}
	this.wwrite("-->\n</style>");
	this.wwrite("</head>");

	this.wwrite("<body " + 
		"link=\"" + this.gLinkColor + "\" " + 
		"vlink=\"" + this.gLinkColor + "\" " +
		"alink=\"" + this.gLinkColor + "\" " +
		"text=\"" + this.gTextColor + "\">");
	this.wwrite("<FONT FACE='" + fontface + "' SIZE=2><B>");
	this.wwrite("Year : " + this.gYear);
	this.wwrite("</B><BR>");

	// Show navigation buttons
	var prevYYYY = parseInt(this.gYear) - 1;
	var nextYYYY = parseInt(this.gYear) + 1;
	
	this.wwrite("<TABLE WIDTH='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', null, '" + prevYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\" alt='Prev Year'><<<\/A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"javascript:window.print();\">Print</A>]</TD><TD ALIGN=center>");
	this.wwrite("[<A HREF=\"" +
		"javascript:window.opener.Build(" + 
		"'" + this.gReturnItem + "', null, '" + nextYYYY + "', '" + this.gFormat + "'" +
		");" +
		"\">>><\/A>]</TD></TR></TABLE><BR>");

	// Get the complete calendar code for each month..
	var j;
	for (i=11; i>=0; i--) {
		if (isIE)
			this.wwrite("<DIV ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");
		else if (isNav)
			this.wwrite("<LAYER ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");

		this.gMonth = i;
		this.gMonthName = Calendar.get_month(this.gMonth);
		vCode = this.getMonthlyCalendarCode();
		this.wwrite(this.gMonthName + "/" + this.gYear + "<BR>");
		this.wwrite(vCode);

		if (isIE)
			this.wwrite("</DIV>");
		else if (isNav)
			this.wwrite("</LAYER>");
	}

	this.wwrite("</font><BR></body></html>");
	this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) {
	this.gWinCal.document.writeln(wtext);
}

Calendar.prototype.wwriteA = function(wtext) {
	this.gWinCal.document.write(wtext);
}

Calendar.prototype.cal_header = function() {
	var vCode = "";
	
	vCode = vCode + "<TR>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Ch&#7911; nh&#7853;t</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 2</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 3</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 4</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 5</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='14%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 6</B></FONT></TD>";
	vCode = vCode + "<TD WIDTH='16%' align='CENTER'><FONT SIZE='2' FACE='" + fontface + "' COLOR='" + this.gHeaderColor + "'><B>Th&#7913; 7</B></FONT></TD>";
	vCode = vCode + "</TR>";
	
	return vCode;
}

Calendar.prototype.cal_data = function() {
	var vDate = new Date();
	vDate.setDate(1);
	vDate.setMonth(this.gMonth);
	vDate.setFullYear(this.gYear);

	var vFirstDay=vDate.getDay();
	var vDay=1;
	var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
	var vOnLastDay=0;
	var vCode = "";

	/*
	Get day for the 1st of the requested month/year..
	Place as many blank cells before the 1st day of the month as necessary. 
	*/

	vCode = vCode + "<TR>";
	for (i=0; i<vFirstDay; i++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(i) + "><FONT SIZE='2' FACE='" + fontface + "'> </FONT></TD>";
	}

	// Write rest of the 1st week
	for (j=vFirstDay; j<7; j++) {
		vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='2' FACE='" + fontface + "'>" + 
			"<A HREF='#' " + 
				"onClick=\"self.opener.document." + this.gReturnItem + ".value='" + 
				this.format_data(vDay) + 
				"';window.close();\">" + 
				this.format_day(vDay) + 
			"</A>" + 
			"</FONT></TD>";
		vDay=vDay + 1;
	}
	vCode = vCode + "</TR>";

	// Write the rest of the weeks
	for (k=2; k<7; k++) {
		vCode = vCode + "<TR>";

		for (j=0; j<7; j++) {
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j) + "><FONT SIZE='2' FACE='" + fontface + "'>" + 
				"<A HREF='#' " + 
					"onClick=\"self.opener.document." + this.gReturnItem + ".value='" + 
					this.format_data(vDay) + 
					"';window.close();\">" + 
				this.format_day(vDay) + 
				"</A>" + 
				"</FONT></TD>";
			vDay=vDay + 1;

			if (vDay > vLastDay) {
				vOnLastDay = 1;
				break;
			}
		}

		if (j == 6)
			vCode = vCode + "</TR>";
		if (vOnLastDay == 1)
			break;
	}
	
	// Fill up the rest of last week with proper blanks, so that we get proper square blocks
	for (m=1; m<(7-j); m++) {
		if (this.gYearly)
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) + 
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
		else
			vCode = vCode + "<TD WIDTH='14%'" + this.write_weekend_string(j+m) + 
			"><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
	}
	
	return vCode;
}

Calendar.prototype.format_day = function(vday) {
	var vNowDay = gNow.getDate();
	var vNowMonth = gNow.getMonth();
	var vNowYear = gNow.getFullYear();

	if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear)
		return ("<FONT COLOR=\"RED\"><B>" + vday + "</B></FONT>");
	else
		return (vday);
}

Calendar.prototype.write_weekend_string = function(vday) {
	var i;

	// Return special formatting for the weekend day.
	for (i=0; i<weekend.length; i++) {
		if (vday == weekend[i])
			return (" BGCOLOR=\"" + weekendColor + "\"");
	}
	
	return "";
}

Calendar.prototype.format_data = function(p_day) {
	var vData;
	var vMonth = 1 + this.gMonth;
	vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
	var vMon = Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
	var vFMon = Calendar.get_month(this.gMonth).toUpperCase();
	var vY4 = new String(this.gYear);
	var vY2 = new String(this.gYear.substr(2,2));
	var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;

	switch (this.gFormat) {
		case "MM\/DD\/YYYY" :
			vData = vMonth + "\/" + vDD + "\/" + vY4;
			break;
		case "MM\/DD\/YY" :
			vData = vMonth + "\/" + vDD + "\/" + vY2;
			break;
		case "MM-DD-YYYY" :
			vData = vMonth + "-" + vDD + "-" + vY4;
			break;
		case "MM-DD-YY" :
			vData = vMonth + "-" + vDD + "-" + vY2;
			break;

		case "DD\/MON\/YYYY" :
			vData = vDD + "\/" + vMon + "\/" + vY4;
			break;
		case "DD\/MON\/YY" :
			vData = vDD + "\/" + vMon + "\/" + vY2;
			break;
		case "DD-MON-YYYY" :
			vData = vDD + "-" + vMon + "-" + vY4;
			break;
		case "DD-MON-YY" :
			vData = vDD + "-" + vMon + "-" + vY2;
			break;

		case "DD\/MONTH\/YYYY" :
			vData = vDD + "\/" + vFMon + "\/" + vY4;
			break;
		case "DD\/MONTH\/YY" :
			vData = vDD + "\/" + vFMon + "\/" + vY2;
			break;
		case "DD-MONTH-YYYY" :
			vData = vDD + "-" + vFMon + "-" + vY4;
			break;
		case "DD-MONTH-YY" :
			vData = vDD + "-" + vFMon + "-" + vY2;
			break;

		case "DD\/MM\/YYYY" :
			vData = vDD + "\/" + vMonth + "\/" + vY4;
			break;
		case "DD\/MM\/YY" :
			vData = vDD + "\/" + vMonth + "\/" + vY2;
			break;
		case "DD-MM-YYYY" :
			vData = vDD + "-" + vMonth + "-" + vY4;
			break;
		case "DD-MM-YY" :
			vData = vDD + "-" + vMonth + "-" + vY2;
			break;

		default :
			vData = vY4 + "-" + vMonth + "-" + vDD;
	}

	return vData;
}

function Build(p_item, p_month, p_year, p_format) {
	var p_WinCal = ggWinCal;
	gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

	// Customize your Calendar here..
	gCal.gBGColor="white";
	gCal.gLinkColor="black";
	gCal.gTextColor="black";
	gCal.gHeaderColor="darkgreen";

	// Choose appropriate show function
	if (gCal.gYearly)	gCal.showY();
	else	gCal.show();
}

function show_calendar() {
	/* 
		p_month : 0-11 for Jan-Dec; 12 for All Months.
		p_year	: 4-digit year
		p_format: Date format (mm/dd/yyyy, dd/mm/yy, ...)
		p_item	: Return Item.
	*/

	p_item = arguments[0];
	if (arguments[1] == "" || arguments[1] == null)
		p_month = new String(gNow.getMonth());
	else
		p_month = arguments[1];
	if (arguments[2] == "" || arguments[2] == null)
		p_year = new String(gNow.getFullYear().toString());
	else
		p_year = arguments[2];
	if (arguments[3] == null)
		p_format = "YYYY-MM-DD";
	else
		p_format = arguments[3];

	vWinCal = window.open("", "Calendar", 
		"width=300,height=250,status=no,resizable=no,top=300,left=900");
	vWinCal.opener = self;
	ggWinCal = vWinCal;

	Build(p_item, p_month, p_year, p_format);
	return;
}

/*
Yearly Calendar Code Starts here
*/

function show_yearly_calendar(p_item, p_year, p_format) {
	// Load the defaults..
	if (p_year == null || p_year == "")
		p_year = new String(gNow.getFullYear().toString());
	if (p_format == null || p_format == "")
		p_format = "YYYY-MM-DD";

	var vWinCal = window.open("", "Calendar", "scrollbars=yes");
	vWinCal.opener = self;
	ggWinCal = vWinCal;

	Build(p_item, null, p_year, p_format);
}

/*
 * Ham hien thi ngau nhien cac san pham tren 1 box
 * @author ducnq
 * @param p_so_luot int So luot thay doi
 * @param p_div_id string ten div
 * @return string
 */
function hien_thi_ngau_nhien_1_luot_chia_se_tren_box(p_so_luot, p_div_id) {
	if (p_so_luot > 0) {
		for (i=0; i<p_so_luot; i++) {
			var div_tren_box = document.getElementById(p_div_id+i);
			if (div_tren_box && div_tren_box.style.display == '') {
				div_tren_box.style.display = 'none';
			}
		}
		// hien thi 1 trang ngau nhien khong trung voi trang truoc do da hien thi
		thu_tu_trang = Math.floor(Math.random()*p_so_luot);
		if (c = getCookie(p_div_id)) {
			thu_tu_trang = parseInt(c);
		}
		thu_tu_trang = thu_tu_trang%1000;
		setCookie(p_div_id, ++thu_tu_trang, 24, '/', '', '');

		thu_tu_trang_hien_thi = thu_tu_trang%p_so_luot;

		var div_hien_thi = document.getElementById(p_div_id+thu_tu_trang_hien_thi);
		if (div_hien_thi) {
			div_hien_thi.style.display = '';
		}
		return;
	}
}



/*
 * Ham hien thi trang danh sách tin tuyển dụng gấp theo điều kiện lọc ngành nghề cấp 1
 * @author ducnq
 * @param int p_id_nganh_cap1
 * @return string
 */
function viec_lam_tuyen_cap_trang_chu_chon_1_nganh_nghe_cap1(p_id_nganh_cap1, p_url){
	// sẽ xử lý sau khi hoàn thành trang danh sách tin tính phí tuyển gấp
	if(parseInt(p_id_nganh_cap1)>0) {
		v_url =p_url +'?hdn_tu_khoa=&hdn_nganh_nghe_cap1='+p_id_nganh_cap1+'&hdn_dia_diem=-1&hdn_muc_luong=-1&hdn_cap_bac=-1&hdn_bang_cap=-1&hdn_kinh_nghiem=-1';
		document.location.href = v_url; 
	}
}

/*
 * Ham hien thi trang danh sách tin tuyển dụng gấp theo điều kiện lọc tỉnh thành phố
 * @author ducnq
 * @param int p_id_tinh_thanh
 * @return string
 */
function viec_lam_tuyen_cap_trang_chu_chon_1_tinh_thanh(p_id_tinh_thanh, p_url){
    hien_thi_tin_tuyen_dung_theo_tinh_thanh(p_url, p_id_tinh_thanh);   
}
/*
* Hien thi an hien tin theo nganh nghe
* @author huongtt2
* @param obj objthis 
* @return string
*/
function hien_thi_mo_rong(objthis){ 
	if($(objthis).hasClass('xemThem')) {
		$(objthis).attr('class','thugon').text('Xem danh danh sách ngành nghề thu gọn');
		$('.div_40').show();
	} else {
		$(objthis).attr('class','xemThem').text('Xem tất cả các ngành nghề');
		$('.div_40').hide();
	}
}
function hien_thi_mo_ta(objthis){ 
	if($(objthis).hasClass('mota_ngan')) {
		$('#div_mota_ngan').hide();
		$('#div_mota_day_du').show();
	} else {
		$('#div_mota_ngan').show();
		$('#div_mota_day_du').hide();;
	}
}
/*
* Hien thi tin tuyen dung theo tinh thanh
* @author phuonghv
* @param string p_url url
* @param int p_tinh_thanh ID tinh thanh
* @return string
*/
function hien_thi_tin_tuyen_dung_theo_tinh_thanh(p_url, p_tinh_thanh){ 
    if (p_tinh_thanh>=0) {
        p_url = p_url +'?hdn_dia_diem='+p_tinh_thanh;
        document.location.href = p_url; 
    }    
}

/*
* Hien thi tooltip cho tin tuyen dung
*/
var tooltip=function(){
	var id = 'tt';
	var top = 7;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

/* create: 		phuonghv 24/04/2014
 * Ham tim kiem nha tuyen dung hang dau
 */
 function tim_kiem_nhanh_nha_tuyen_dung(){	
	frm = document.frmtimviecnhanh;	
	v_chuoi_tim_kiem = '';
	if (frm.hdn_tu_khoa) {
		v_tu_khoa = frm.hdn_tu_khoa.value;						
		if (v_chuoi_tim_kiem == '') {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '?';
		} else {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '&';
		}
		v_chuoi_tim_kiem = v_chuoi_tim_kiem + 'hdn_tu_khoa=' + v_tu_khoa;	
	}
	if (frm.hdn_dia_diem) {
		v_dia_diem = frm.hdn_dia_diem.value;	
		v_dia_diem = v_dia_diem == '' ? '-1' : v_dia_diem;
		if (v_chuoi_tim_kiem == '') {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '?';
		} else {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '&';
		}
		v_chuoi_tim_kiem = v_chuoi_tim_kiem + 'hdn_dia_diem=' + v_dia_diem;
	}
	if (frm.hdn_quy_mo) {
		v_quy_mo = frm.hdn_quy_mo.value;	
		v_quy_mo = v_quy_mo == '' ? '-1' : v_quy_mo;
		if (v_chuoi_tim_kiem == '') {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '?';
		} else {
			v_chuoi_tim_kiem = v_chuoi_tim_kiem + '&';
		}
		v_chuoi_tim_kiem = v_chuoi_tim_kiem + 'hdn_quy_mo=' + v_quy_mo;
	}
	document.location.href = v_chuoi_tim_kiem; 
	return false;
 }
 
 /* create: 		phuonghv 24/04/2014
 * Ham huy dieu kien tim kiem nha tuyen dung hang dau
 */
 function huy_dieu_kien_tim_kiem_nha_tuyen_dung(){
    frm = document.frmtimviecnhanh;	
    // bo loc tu khoa
	document.getElementById('hdn_tu_khoa').value = '';				
	// bo loc dia diem
	document.getElementById('hdn_dia_diem').value = '-1';			
	document.getElementById('hdn_quy_mo').value = '-1';			
	duong_dan = document.location.href;		
	rs_duong_dan = duong_dan.split("?");	
	duong_dan = rs_duong_dan[0];			
	document.location.href = duong_dan;	
	return false;    
 }

 // huongtt2 25/6/2014 - lấy tham số url
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}