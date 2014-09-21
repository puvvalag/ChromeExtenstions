
var req = new XMLHttpRequest();
//req.open("GET","http://doregama.info/feed",false);
req.open("GET","http://www.atozmp3.in/category/telugu-songs-download/feed",false);
req.overrideMimeType('text/xml');
req.onload = clickContinue;
//req.onload = Display;
req.send(null);

function clickContinue() {
    var button = document.getElementById("mainDiv");
    return button ? Display() : setTimeout(clickContinue, 100);
}

function Download(element)
{
  //alert(element.href)
  chrome.tabs.create({url: element.alt, selected: true});
}

function Display()
{

 var mainDiv  = document.getElementById("mainDiv");

  var feedData = req.responseXML;
  
  var items = feedData.getElementsByTagName("item");
  var itemsCount = items.length;
  
  
  //Create root div for each item
  for(var i=0; i< itemsCount; i++)
  {
    
     //Get image url from item feed
      var content = items[i].getElementsByTagName("encoded")[0].innerHTML;

      //image url for atoz mp3
      var imgUrl= "http://www.atozmp3.in/wp-content/themes/weekly/timthumb.php?src="
      imgUrl += content.substring(content.indexOf("src=")+5, content.indexOf(" alt=")-1);

      var title = items[i].getElementsByTagName("title")[0].innerHTML;
     
    var metadata = content.substring(content.indexOf("Cast &amp; Crew ::"),content.indexOf("Ripper ::"));
    metadata = metadata.replace(/amp;/g,"");
    metadata = metadata.replace(/<span style="color: #008000;"><strong>/g,"");
    metadata = metadata.replace(/<\/strong>/g,"");
    metadata = metadata.replace(/<\/span><br \/>/g,"");
    metadata = metadata.replace(/: <\/strong>/g,"");
    metadata = metadata.replace(/::/g,":");

    var rockwayDirectDownload = content.match(/links.*DirectLink/g);
    var Download128kbpsUrl = "http://www.zindagijobs.net/links/?S*" + rockwayDirectDownload[1].substr(9,4);
    var anchor = document.createElement("a");
    anchor.id = "a"+i;
    anchor.alt = Download128kbpsUrl;
    anchor.onclick = function(){Download(this)};
    //anchor.title = "test";
    var movie = document.createElement("img");
    //movie.style = 'height:200px';
    movie.title =  metadata; 
    movie.src = imgUrl;
    mainDiv.className="polaroid-images";

    anchor.appendChild(movie);
    mainDiv.appendChild(anchor);
      
  }
  
}