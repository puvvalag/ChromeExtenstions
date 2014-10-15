

function clickContinue() {
    var button = document.getElementById("mainDiv");
    return button ? Display() : setTimeout(clickContinue, 100);
}

function Download(element) {
        chrome.windows.create({
        'url': element.junk,
         'type':'popup',
         'width':100,
         'height' : 100
        });
}

function ChangeSelection(obj)
{
    for(i = 1;i < 7; i++)
    {
    var li = document.getElementById("li"+i);
    li.className = "";
    }
    obj.className = "selected";
    var rootChild = document.getElementById('rootChild');
    document.getElementById('mainDiv').removeChild(rootChild);
    feedTitle = obj.innerHTML
    Init(obj.feed);
    
}
var feeds = ["http://www.mazamp3.com/feeds/posts/summary/-/New%20Mp3?max-results=50&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/old%20is%20gold?max-results=30&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Pop%2FRemix?max-results=25&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Ilayaraja?max-results=25&amp;alt=json-in-script&amp;callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Devotional?max-results=30&amp;alt=json-in-script&amp;callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Update?max-results=50&amp;alt=json-in-script&amp;callback=recentpostslist"]
var feedTitle = "";
function Display() 
{
  // alert('InDisplay')
for(i = 1;i < 7; i++)
{
    var li = document.getElementById("li"+i);
    li.onclick = function(obj) { ChangeSelection(this);}
    li.feed = feeds[i-1];
}

    /**************************/
//var li = document.getElementById("li1");
//li.className = "selected";


    /**************************/

    var mainDiv = document.getElementById("mainDiv");
    var rootChild = document.createElement("div");
    rootChild.id = "rootChild";
    
    var regImage = /[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(png)|[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(jpg)/g
    var regSummary = /"summary":[A-Za-z0-9\'\\\–\"\:\,\(\)\$\{\|\.\-\ ]*/g
    var regMovieName =  /Movie Name : .*?\\/g 

    var feedData = req.responseText;

    var items = feedData.match(regImage);
    var titles = feedData.match(regMovieName);
    req=feedData;
    
    //Create root div for each item
    for (var i = 0; i < items.length; i++) {
            
           // var movieName = titles[i].replace(/Movie Name : /g, '');
            var movieName = titles[i].substring(13)
            movieName = movieName.substring(0,movieName.length-2)
            //movieName.replace(/Movie Name : /g, '');
            //var link = movieName.replace(/ /g,"%20");
           // link = movieName.replace(/ /g,"%20");
            var anchor = document.createElement("a");
            //anchor.text = movieName //titles[i]// movieName+" "+ link;
            anchor.junk = "http://dl69.unlimited9.com/0/omzl69djk7hxdn/"+ titles[i] +".zip";
            anchor.onclick = function() {
                Download(this)
            };
            //anchor.title = "test";
            var movie = document.createElement("img");
            //movie.style = 'height:200px';
            movie.title = movieName;
            var url = items[i];
             if( feedTitle == "Latest" || feedTitle == "Old" || feedTitle == "Pop / Remix" || feedTitle == "" )
             {
                url = items[i].replace(/\//g,"")
                if(url.indexOf("http://") > 0)
                {
                    url.replace(/\/\//g,"\\")
                }
             }
            movie.src = url;
            mainDiv.className = "polaroid-images";

            anchor.appendChild(movie);
            
            rootChild.appendChild(anchor);
            mainDiv.appendChild(rootChild);

        }

    

}
var req ="";
Init("http://www.mazamp3.com/feeds/posts/summary/-/old%20is%20gold?max-results=50&alt=json-in-script&callback=recentpostslist");

function Init(url)
{
req = new XMLHttpRequest();
//req.open("GET","http://doregama.info/feed",false);
req.open("GET", url, false);
req.overrideMimeType('text/xml');
req.onload = clickContinue;
//req.onload = Display;
req.send(null);

}