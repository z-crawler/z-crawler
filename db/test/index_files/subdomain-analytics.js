try { 
	v_url = location.href;
	if (typeof(_SERVER) == 'undefined'){
		_SERVER=0;
	}
	if (typeof(_CAT) == 'undefined'){
		_CAT=0;
	}
	if (typeof(_USERNAME) == 'undefined'){
		_USERNAME="";
	}
	if (v_url.indexOf('?')>=0) {
		v_url += "&server=" + _SERVER + "&cat=" + _CAT;
	}else{
		v_url += "?server=" + _SERVER + "&cat=" + _CAT;
	}
	if (_USERNAME!=""){
		v_url += "&username=" + _USERNAME;
	}	
	v_url = escape(v_url);
	if (v_url != "" ) {
		document.write("<img src='http://thongke.24h.com.vn/subdomain-analytics/subdomain-analytics.php?rand="+Math.random()+"&amp;url_tracker=" + v_url + "' height='0' width='0'>");
	}
} catch (e) {}