var Aes={};
(function(g){g.cipher=function(b,f){for(var a=f.length/4-1,d=[[],[],[],[]],c=0;16>c;c++)d[c%4][Math.floor(c/4)]=b[c];d=g.addRoundKey(d,f,0,4);for(c=1;c<a;c++)d=g.subBytes(d,4),d=g.shiftRows(d,4),d=g.mixColumns(d,4),d=g.addRoundKey(d,f,c,4);d=g.subBytes(d,4);d=g.shiftRows(d,4);d=g.addRoundKey(d,f,a,4);a=Array(16);for(c=0;16>c;c++)a[c]=d[c%4][Math.floor(c/4)];return a};g.keyExpansion=function(b){for(var f=b.length/4,a=f+6,d=Array(4*(a+1)),c=Array(4),e=0;e<f;e++)d[e]=[b[4*e],b[4*e+1],b[4*e+2],b[4*e+
3]];for(e=f;e<4*(a+1);e++){d[e]=Array(4);for(b=0;4>b;b++)c[b]=d[e-1][b];if(0==e%f)for(c=g.subWord(g.rotWord(c)),b=0;4>b;b++)c[b]^=g.rCon[e/f][b];else 6<f&&4==e%f&&(c=g.subWord(c));for(b=0;4>b;b++)d[e][b]=d[e-f][b]^c[b]}return d};g.subBytes=function(b,f){for(var a=0;4>a;a++)for(var d=0;d<f;d++)b[a][d]=g.sBox[b[a][d]];return b};g.shiftRows=function(b,f){for(var a=Array(4),d=1;4>d;d++){for(var c=0;4>c;c++)a[c]=b[d][(c+d)%f];for(c=0;4>c;c++)b[d][c]=a[c]}return b};g.mixColumns=function(b,f){for(var a=
0;4>a;a++){for(var d=Array(4),c=Array(4),e=0;4>e;e++)d[e]=b[e][a],c[e]=b[e][a]&128?b[e][a]<<1^283:b[e][a]<<1;b[0][a]=c[0]^d[1]^c[1]^d[2]^d[3];b[1][a]=d[0]^c[1]^d[2]^c[2]^d[3];b[2][a]=d[0]^d[1]^c[2]^d[3]^c[3];b[3][a]=d[0]^c[0]^d[1]^d[2]^c[3]}return b};g.addRoundKey=function(b,f,a,d){for(var c=0;4>c;c++)for(var e=0;e<d;e++)b[c][e]^=f[4*a+e][c];return b};g.subWord=function(b){for(var f=0;4>f;f++)b[f]=g.sBox[b[f]];return b};g.rotWord=function(b){for(var f=b[0],a=0;3>a;a++)b[a]=b[a+1];b[3]=f;return b};
g.sBox=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,
61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];g.rCon=[[0,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0],[8,0,0,0],[16,0,0,0],[32,0,0,0],[64,
0,0,0],[128,0,0,0],[27,0,0,0],[54,0,0,0]];g.Ctr={};g.Ctr.encrypt=function(b,f,a){if(128!=a&&192!=a&&256!=a)return"";b=Utf8.encode(b);f=Utf8.encode(f);var d=a/8,c=Array(d);for(a=0;a<d;a++)c[a]=isNaN(f.charCodeAt(a))?0:f.charCodeAt(a);c=g.cipher(c,g.keyExpansion(c));c=c.concat(c.slice(0,d-16));f=Array(16);a=(new Date).getTime();var d=a%1E3,e=Math.floor(a/1E3),h=Math.floor(65535*Math.random());for(a=0;2>a;a++)f[a]=d>>>8*a&255;for(a=0;2>a;a++)f[a+2]=h>>>8*a&255;for(a=0;4>a;a++)f[a+4]=e>>>8*a&255;d="";
for(a=0;8>a;a++)d+=String.fromCharCode(f[a]);for(var c=g.keyExpansion(c),e=Math.ceil(b.length/16),h=Array(e),k=0;k<e;k++){for(a=0;4>a;a++)f[15-a]=k>>>8*a&255;for(a=0;4>a;a++)f[15-a-4]=k/4294967296>>>8*a;var l=g.cipher(f,c),n=k<e-1?16:(b.length-1)%16+1,m=Array(n);for(a=0;a<n;a++)m[a]=l[a]^b.charCodeAt(16*k+a),m[a]=String.fromCharCode(m[a]);h[k]=m.join("")}b=d+h.join("");return b=Base64.encode(b)};g.Ctr.decrypt=function(b,f,a){if(128!=a&&192!=a&&256!=a)return"";b=Base64.decode(b);f=Utf8.encode(f);var d=
a/8,c=Array(d);for(a=0;a<d;a++)c[a]=isNaN(f.charCodeAt(a))?0:f.charCodeAt(a);c=g.cipher(c,g.keyExpansion(c));c=c.concat(c.slice(0,d-16));f=Array(8);ctrTxt=b.slice(0,8);for(a=0;8>a;a++)f[a]=ctrTxt.charCodeAt(a);d=g.keyExpansion(c);c=Math.ceil((b.length-8)/16);a=Array(c);for(var e=0;e<c;e++)a[e]=b.slice(8+16*e,16*e+24);b=a;for(var h=Array(b.length),e=0;e<c;e++){for(a=0;4>a;a++)f[15-a]=e>>>8*a&255;for(a=0;4>a;a++)f[15-a-4]=(e+1)/4294967296-1>>>8*a&255;var k=g.cipher(f,d),l=Array(b[e].length);for(a=0;a<
b[e].length;a++)l[a]=k[a]^b[e].charCodeAt(a),l[a]=String.fromCharCode(l[a]);h[e]=l.join("")}b=h.join("");return b=Utf8.decode(b)}})(Aes);var Base64={};
(function(g){g.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";g.encode=function(b,f){var a=[],d="",c=g.code;var e=("undefined"==typeof f?0:f)?b.encodeUTF8():b;var h=e.length%3;if(0<h)for(;3>h++;)d+="=",e+="\x00";for(h=0;h<e.length;h+=3){var k=e.charCodeAt(h);var l=e.charCodeAt(h+1);var n=e.charCodeAt(h+2);var m=k<<16|l<<8|n;k=m>>18&63;l=m>>12&63;n=m>>6&63;m&=63;a[h/3]=c.charAt(k)+c.charAt(l)+c.charAt(n)+c.charAt(m)}a=a.join("");return a=a.slice(0,a.length-d.length)+d};g.decode=
function(b,f){f="undefined"==typeof f?!1:f;var a=[],d=g.code;var c=f?b.decodeUTF8():b;for(var e=0;e<c.length;e+=4){var h=d.indexOf(c.charAt(e));var k=d.indexOf(c.charAt(e+1));var l=d.indexOf(c.charAt(e+2));var n=d.indexOf(c.charAt(e+3));var m=h<<18|k<<12|l<<6|n;h=m>>>16&255;k=m>>>8&255;m&=255;a[e/4]=String.fromCharCode(h,k,m);64==n&&(a[e/4]=String.fromCharCode(h,k));64==l&&(a[e/4]=String.fromCharCode(h))}l=a.join("");return f?l.decodeUTF8():l}})(Base64);var Utf8={};
(function(g){g.encode=function(b){b=b.replace(/[\u0080-\u07ff]/g,function(b){b=b.charCodeAt(0);return String.fromCharCode(192|b>>6,128|b&63)});return b=b.replace(/[\u0800-\uffff]/g,function(b){b=b.charCodeAt(0);return String.fromCharCode(224|b>>12,128|b>>6&63,128|b&63)})};g.decode=function(b){b=b.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(b){b=(b.charCodeAt(0)&15)<<12|(b.charCodeAt(1)&63)<<6|b.charCodeAt(2)&63;return String.fromCharCode(b)});return b=b.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
function(b){b=(b.charCodeAt(0)&31)<<6|b.charCodeAt(1)&63;return String.fromCharCode(b)})}})(Utf8);module.exports.Aes=Aes;