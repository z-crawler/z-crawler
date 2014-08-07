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

