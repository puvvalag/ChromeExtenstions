function clickContinue(){return document.getElementById("mainDiv")?Display():setTimeout(clickContinue,100)}function Download(g){chrome.tabs.create({url:g.alt,selected:!0})}
function Display(){for(var g=document.getElementById("mainDiv"),h=req.responseXML.getElementsByTagName("item"),l=h.length,f=0;f<l;f++){var a=h[f].getElementsByTagName("encoded")[0].innerHTML,k="http://www.atozmp3.in/wp-content/themes/weekly/timthumb.php?src=",k=k+a.substring(a.indexOf("src=")+5,a.indexOf(" alt=")-1),b=h[f].getElementsByTagName("title")[0].innerHTML+"\n"+a.substring(a.indexOf("Cast &amp; Crew ::"),a.indexOf("Ripper ::")),b=b.replace(/amp;/g,""),b=b.replace(/<span style="color: #008000;"><strong>/g,
""),b=b.replace(/<\/strong>/g,""),b=b.replace(/<\/span><br \/>/g,""),b=b.replace(/: <\/strong>/g,""),b=b.replace(/::/g,":"),d="",c=d="",e=0;0<a.indexOf("http://www.zindagijobs.net/links/")?(d=/links.*DirectLink/g,c="http://www.zindagijobs.net/links/?S*",e=9):0<a.indexOf("www.iknowblogging.com/new/")?(d=/new.*DirectLink/g,c="http://www.iknowblogging.com/new/?S*",e=7):0<a.indexOf("www.iknowblogging.com/links/")?(d=/links.*DirectLink/g,c="http://www.iknowblogging.com/links/?S*",e=9):0<a.indexOf("http://www.zintata.org/links/")?
(d=/links.*DirectLink/g,c="http://www.zintata.org/links/?S*",e=9):0<a.indexOf("http://www.zintata.org/new/")&&(d=/new.*DirectLink/g,c="http://www.zintata.org/new/?S*",e=7);d=a.match(d);null!=d&&(c+=d[0].substr(e,4),a=document.createElement("a"),a.id="a"+f,-1<b.indexOf("S/O Satyamurthy")&&(c="http://www48.zippyshare.com/v/hRcBWQiL/file.html"),a.alt=c,a.onclick=function(){Download(this)},c=document.createElement("img"),c.title=b,c.src=k,g.className="polaroid-images",a.appendChild(c),g.appendChild(a))}}
var req=new XMLHttpRequest;req.open("GET","http://www.atozmp3.in/category/telugu-songs-download/feed",!1);req.overrideMimeType("text/xml");req.onload=clickContinue;req.send(null);