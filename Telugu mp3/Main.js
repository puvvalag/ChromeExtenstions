// Input 0
function clickContinue(){return document.getElementById("mainDiv")?Display():setTimeout(clickContinue,100)}function Download(f){chrome.tabs.create({url:f.alt,selected:!0})}
function Display(){for(var f=document.getElementById("mainDiv"),h=req.responseXML.getElementsByTagName("item"),l=h.length,e=0;e<l;e++){var a=h[e].getElementsByTagName("encoded")[0].innerHTML,k="http://www.atozmp3.in/wp-content/themes/weekly/timthumb.php?src=",k=k+a.substring(a.indexOf("src=")+5,a.indexOf(" alt=")-1),b=h[e].getElementsByTagName("title")[0].innerHTML+"\n"+a.substring(a.indexOf("Cast &amp; Crew ::"),a.indexOf("Ripper ::")),b=b.replace(/amp;/g,""),b=b.replace(/<span style="color: #008000;"><strong>/g,
""),b=b.replace(/<\/strong>/g,""),b=b.replace(/<\/span><br \/>/g,""),b=b.replace(/: <\/strong>/g,""),b=b.replace(/::/g,":"),d="",c=d="",g=0;0<a.indexOf("http://www.zindagijobs.net/links/")?(d=/links.*DirectLink/g,c="http://www.zindagijobs.net/links/?S*",g=9):0<a.indexOf("www.iknowblogging.com/new/")?(d=/new.*DirectLink/g,c="http://www.iknowblogging.com/new/?S*",g=7):0<a.indexOf("www.iknowblogging.com/links/")&&(d=/links.*DirectLink/g,c="http://www.iknowblogging.com/links/?S*",g=9);d=a.match(d);null!=
d&&(c+=d[1].substr(g,4),a=document.createElement("a"),a.id="a"+e,a.alt=c,a.onclick=function(){Download(this)},c=document.createElement("img"),c.title=b,c.src=k,f.className="polaroid-images",a.appendChild(c),f.appendChild(a))}}var req=new XMLHttpRequest;req.open("GET","http://www.atozmp3.in/category/telugu-songs-download/feed",!1);req.overrideMimeType("text/xml");req.onload=clickContinue;req.send(null);