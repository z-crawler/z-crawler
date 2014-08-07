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
	var xmlHttp = new GetXmlHttpObject()
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