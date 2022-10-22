var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
BROWSER.ie = window.ActiveXObject && USERAGENT.indexOf('msie') != -1 && USERAGENT.substr(USERAGENT.indexOf('msie') + 5, 3);
BROWSER.firefox = USERAGENT.indexOf('firefox') != -1 && USERAGENT.substr(USERAGENT.indexOf('firefox') + 8, 3);
BROWSER.chrome = window.MessageEvent && !document.getBoxObjectFor && USERAGENT.indexOf('chrome') != -1 && USERAGENT.substr(USERAGENT.indexOf('chrome') + 7, 10);
BROWSER.opera = window.opera && opera.version();
BROWSER.safari = window.openDatabase && USERAGENT.indexOf('safari') != -1 && USERAGENT.substr(USERAGENT.indexOf('safari') + 7, 8);
BROWSER.other = !BROWSER.ie && !BROWSER.firefox && !BROWSER.chrome && !BROWSER.opera && !BROWSER.safari;
BROWSER.firefox = BROWSER.chrome ? 1 : BROWSER.firefox;


if (typeof(host_type) == "undefined") host_type="vip";

//处理Ajax返回事件
function DoPage(xmlObj){ 
 errMsg=xmlObj.getElementsByTagName("errMsg")[0].childNodes[0].nodeValue; 
 cmdState=xmlObj.getElementsByTagName("cmdState")[0].childNodes[0].nodeValue; 
 addCookie("zhujiwusysdomain",errMsg,4)
 if (cmdState=="操作成功")  window.location.reload();
} 




// 检测登录
function check_login(){
	show_AjaxDialog("正在验证密码......"); 
	var parameters="password="+encodeURIComponent($("password").value);
	var url="https://api.sanfengyun.com/www/break.php?cmd=visit_sysdomain&"+parameters
	if (BROWSER.ie) 
	  GetFormXML_IE(url);
	else
	  GetFormXML(url);
}




// 设置Cookis
function addCookie(objName,objValue,objHours){      //添加cookie
    var str = objName + "=" + escape(objValue);
    if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours*3600*1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
   }
   document.cookie = str;
}

var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
BROWSER.ie = window.ActiveXObject && USERAGENT.indexOf('msie') != -1 && USERAGENT.substr(USERAGENT.indexOf('msie') + 5, 3);
BROWSER.firefox = USERAGENT.indexOf('firefox') != -1 && USERAGENT.substr(USERAGENT.indexOf('firefox') + 8, 3);
BROWSER.chrome = window.MessageEvent && !document.getBoxObjectFor && USERAGENT.indexOf('chrome') != -1 && USERAGENT.substr(USERAGENT.indexOf('chrome') + 7, 10);
BROWSER.opera = window.opera && opera.version();
BROWSER.safari = window.openDatabase && USERAGENT.indexOf('safari') != -1 && USERAGENT.substr(USERAGENT.indexOf('safari') + 7, 8);
BROWSER.other = !BROWSER.ie && !BROWSER.firefox && !BROWSER.chrome && !BROWSER.opera && !BROWSER.safari;
BROWSER.firefox = BROWSER.chrome ? 1 : BROWSER.firefox;

//创建Ajax对象
function CreatAjax() {
		try {Ajax = new XMLHttpRequest();} 
		catch (trymicrosoft) { 
		try {Ajax = new ActiveXObject("Msxml2.XMLHTTP");} 
		catch (othermicrosoft) {
		try {Ajax = new ActiveXObject("Microsoft.XMLHTTP");} 
		catch (failed) {req = false;alert("Object Error!");} 
		} 
		} 
		return Ajax;
}

//根据ID获取对象
function $(obj) {
  return document.getElementById(obj);
}


//根据ip切换显示状态 (是或者否)
function display(id) {
    $(id).style.display = $(id).style.display == 'block' ? 'none' : 'block';
}

//判断一个对象是否已经存在
function isUndefined(variable) {
    return typeof variable == 'undefined' ? true : false;
}

//判断needle是否存在于数组haystack中
function in_array(needle, haystack) {
    if (typeof needle == 'string' || typeof needle == 'number') {
        for (var i in haystack) {
            if (haystack[i] == needle) {
                return true;
            }
        }
    }
    return false;
}

//返回浏览器输出的宽高
function getBrowserHeight() { 
	var intH = 0; 
	var intW = 0; 
	document.documentElement.clientHeight>document.documentElement.scrollHeight ? intH = document.documentElement.clientHeight : intH = document.documentElement.scrollHeight;
	document.documentElement.clientWidth>document.documentElement.scrollWidth ? intW = document.documentElement.clientWidth : intW = document.documentElement.scrollWidth;
	return { width: parseInt(intW), height: parseInt(intH) }; 
}  


document.write('<div id="Ajax_fwin_dialog_div" style="font-size:12px;"></div>');
document.write('<DIV id="Ajax_shadow_layer"></DIV>');

function showMenu(v) {
    var ctrlid = v
    var showid = v
    var menuid = v['menuid'];
    var ctrlObj = $(ctrlid);
    var menuObj = $(menuid);
    var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
    var pos = isUndefined(v['pos']) ? '43' : v['pos'];
    var layer = isUndefined(v['layer']) ? 1 : v['layer'];
    var zindex = isUndefined(v['zindex']) ? 300 : v['zindex'];
    if (!menuObj.initialized) {
        menuObj.initialized = true;
        menuObj.ctrlkey = ctrlid;
        menuObj.mtype = mtype;
        menuObj.layer = layer;
        if (ctrlObj && ctrlObj.getAttribute('fwin')) {
            menuObj.scrolly = true;
        }
        menuObj.style.position = 'absolute';
        menuObj.style.zIndex = zindex + layer;
        menuObj.onclick = function (e) {
            if (!e || BROWSER.ie) {
                window.event.cancelBubble = true;
                return window.event;
            } else {
                e.stopPropagation();
                return e;
            }
        };
       
    }
        menuObj.style.display = '';
        menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
        menuObj.style.opacity = 1;
    setMenuPosition(showid, menuid, pos);

}

function setMenuPosition(showid, menuid, pos) {
    var showObj = $(showid);
    var menuObj = menuid ? $(menuid) : $(showid + '_menu');
    if (isUndefined(pos)) pos = '43';
    var basePoint = parseInt(pos.substr(0, 1));
    var direction = parseInt(pos.substr(1, 1));
    var sxy = sx = sy = sw = sh = ml = mt = mw = mcw = mh = mch = bpl = bpt = 0;
    if (!menuObj || (basePoint > 0 && !showObj)) return;
    if (showObj) {
        sxy = fetchOffset(showObj);
        sx = sxy['left'];
        sy = sxy['top'];
        sw = showObj.offsetWidth;
        sh = showObj.offsetHeight;
    }
    mw = menuObj.offsetWidth;
    mcw = menuObj.clientWidth;
    mh = menuObj.offsetHeight;
    mch = menuObj.clientHeight;
    switch (basePoint) {
        case 1:
            bpl = sx;
            bpt = sy;
            break;
        case 2:
            bpl = sx + sw;
            bpt = sy;
            break;
        case 3:
            bpl = sx + sw;
            bpt = sy + sh;
            break;
        case 4:
            bpl = sx;
            bpt = sy + sh;
            break;
    }
    switch (direction) {
        case 0:
            menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
            mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
            break;
        case 1:
            ml = bpl - mw;
            mt = bpt - mh;
            break;
        case 2:
            ml = bpl;
            mt = bpt - mh;
            break;
        case 3:
            ml = bpl;
            mt = bpt;
            break;
        case 4:
            ml = bpl - mw;
            mt = bpt;
            break;
    }
    if (in_array(direction, [1, 4]) && ml < 0) {
        ml = bpl;
        if (in_array(basePoint, [1, 4])) ml += sw;
    } else if (ml + mw > document.documentElement.scrollLeft + document.body.clientWidth && sx >= mw) {
        ml = bpl - mw;
        if (in_array(basePoint, [2, 3])) ml -= sw;
    }
    if (in_array(direction, [1, 2]) && mt < 0) {
        mt = bpt;
        if (in_array(basePoint, [1, 2])) mt += sh;
    } else if (mt + mh > document.documentElement.scrollTop + document.documentElement.clientHeight && sy >= mh) {
        mt = bpt - mh;
        if (in_array(basePoint, [3, 4])) mt -= sh;
    }
    if (pos == '210') {
        ml += 69 - sw / 2;
        mt -= 5;
        if (showObj.tagName == 'TEXTAREA') {
            ml -= sw / 2;
            mt += sh / 2;
        }
    }
    if (direction == 0 || menuObj.scrolly) {
        if (BROWSER.ie && BROWSER.ie < 7) {
            if (direction == 0) mt += Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        } else {
            if (menuObj.scrolly) mt -= Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            menuObj.style.position = 'fixed';
        }
    }
    if (ml) menuObj.style.left = ml + 'px';
    if (mt) menuObj.style.top = mt + 'px';
    if (direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
        menuObj.style.position = 'absolute';
        menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
    }
    if (menuObj.style.clip && !BROWSER.opera) {
        menuObj.style.clip = 'rect(auto, auto, auto, auto)';
    }
}

function show_AjaxDialog(sTitle) {
    var menuObj = $('Ajax_fwin_dialog'); 
    menuObj = document.createElement('div');
    menuObj.style.display = 'none';
    menuObj.id = 'Ajax_fwin_dialog';	
    $('Ajax_fwin_dialog_div').appendChild(menuObj);
    var s = '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_c"></td><td class="t_c"></td><td class="t_c"></td></tr>';
    s += '<tr><td class="t_c"></td><td class="m_c" id="m_c"><div id="Ajax_Dialog_fcontent" class="fcontent"><h3 class="float_ctrl"><em><div id="Ajax_fwin_dialog_title">';
    s += '<img src=https://www.sanfengyun.com/webstop/break/img/loading.gif>'+sTitle
    s += '</div></em><span><a href="javascript:;" class="float_close" onclick="Ajax_closeDialog()" id="ajax_a_close" title="关闭">关闭</a></span></h3><div id="Ajax_fwin_dialog_content">';
    s += '</div></div></td><td class="t_c"></td></tr><tr><td class="t_c"></td><td class="t_c"></td><td class="t_c"></td></tr></table>';
    menuObj.innerHTML = s;
                var shadow = $("Ajax_shadow_layer");  
                var bws = getBrowserHeight(); 
                shadow.style.width = bws.width + 'px'; 
                shadow.style.height = bws.height + 'px'; 
                shadow = null; 
                $("Ajax_shadow_layer").style.display = 'block';
				
    showMenu({
        'mtype': 'dialog',
        'menuid': 'Ajax_fwin_dialog',
        'duration': 3,
        'pos': '00',
        'zindex': 2001,
        'cache': 0,
        'cover': ''
    });
}

function Ajax_closeDialog() {
	$("Ajax_shadow_layer").style.display="none";
	$("Ajax_fwin_dialog").parentNode.removeChild( $("Ajax_fwin_dialog"));
}

//-------------通过Ajax发送表单内容,然后执行客户端函数:DoPage()-------------
//   url :请求网址
//   method  :POST 或 GET
//   sTitle  :提示框标题
//   formObj :表单对象, 可选参数
//-----------------------------------------------------------------
function GetFormXML(url){  
	var req=CreatAjax();
	req.open("POST",url, true); 
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	req.onreadystatechange = function complete(){
			 //alert(url);  //调试，检测返回数据
			 //alert(decodeURIComponent(parameters));  //调试，检测返回数据
			//alert(req.responseText);
			//alert(req.readyState); 
			 
			  if (req.readyState == 4)
			  { 
			   if (req.status == 404) alert("未找到网址："+url);
			   if (req.status == 500) alert(req.responseText);
			   if (req.status == 200){ 
					 reqXML=req.responseXML;
				   //如果返回的是标准xml文档(包含cmdState,errMsg两个标签),对窗口做出相应处理,否则关闭窗口.
				   if( reqXML.getElementsByTagName("cmdState").length==1 && reqXML.getElementsByTagName("errMsg").length==1 ){
					   
					 $("Ajax_fwin_dialog_title").innerHTML=reqXML.getElementsByTagName("cmdState")[0].childNodes[0].nodeValue;  //窗口标题赋值
					 
					 if(reqXML.getElementsByTagName("errMsg")[0].childNodes[0] != null){
							$("Ajax_fwin_dialog_content").innerHTML=reqXML.getElementsByTagName("errMsg")[0].childNodes[0].nodeValue;  //窗口内容赋值
					 }
					 
					 if (reqXML.getElementsByTagName("cmdState")[0].childNodes[0].nodeValue=="ok") Ajax_closeDialog(); // cmdState如果是ok,关闭信息窗口
					 }
				   else
				   
					  Ajax_closeDialog();
					DoPage(reqXML);// 返回结果后客户端执行的函数
			   } 
			  } 	   
	};  
	req.send(null); 
} 

//IE浏览器下跨域请求
function GetFormXML_IE(url){  
    var xdr = new XDomainRequest();  
	xdr.onload = function(){  
		
		reqXML=xdr.responseText;
		var xmldocm =new ActiveXObject("Microsoft.XMLDOM");
		xmldocm.loadXML(reqXML);
		
		$("Ajax_fwin_dialog_title").innerHTML=xmldocm.getElementsByTagName("cmdState")[0].childNodes[0].nodeValue;  //窗口标题赋值
		if(xmldocm.getElementsByTagName("errMsg")[0].childNodes[0] != null){
		$("Ajax_fwin_dialog_content").innerHTML=xmldocm.getElementsByTagName("errMsg")[0].childNodes[0].nodeValue;  //窗口内容赋值
		}
		if (xmldocm.getElementsByTagName("cmdState")[0].childNodes[0].nodeValue=="ok") Ajax_closeDialog(); // cmdState如果是ok,关闭信息窗口
		DoPage(xmldocm);// 返回结果后客户端执行的函数
    };  
    xdr.onerror = function(){  
        alert("发生异常错误！");  
    };  
    xdr.open("POST", url,true);  
    xdr.send();  
}


