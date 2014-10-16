

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
    for(j = 1;j < 7; j++)
    {
    var li = document.getElementById("li"+j);
    li.className = "";
    }
    obj.className = "selected";
    var rootChild = document.getElementById('rootChild');
    document.getElementById('mainDiv').removeChild(rootChild);
    feedTitle = obj.innerHTML
    Init(obj.feed);
    
}



//called with every property and it's value
function process(key,value) {
    console.log(key + " : "+value);
}

function traverse(o,func) {
    for (var i in o) {
        func.apply(this,[i,o[i]]);  
        if (o[i] !== null && typeof(o[i])=="object") {
            //going on step down in the object tree!!
            traverse(o[i],func);
        }
    }
}

//that's all... no magic, no bloated framework


var feeds = ["http://www.mazamp3.com/feeds/posts/summary/-/New%20Mp3?max-results=50&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/old%20is%20gold?max-results=50&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Pop%2FRemix?max-results=50&alt=json-in-script&callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Ilayaraja?max-results=50&amp;alt=json-in-script&amp;callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Devotional?max-results=50&amp;alt=json-in-script&amp;callback=recentpostslist","http://www.mazamp3.com/feeds/posts/summary/-/Update?max-results=50&amp;alt=json-in-script&amp;callback=recentpostslist"]
var feedTitle = "";
function Display() 
{

    

for(j = 1;j < 7; j++)
{
    var li = document.getElementById("li"+j);
    li.onclick = function(obj) { ChangeSelection(this);}
    li.feed = feeds[j-1];
}

    var mainDiv = document.getElementById("mainDiv");
    var rootChild = document.createElement("div");
    rootChild.id = "rootChild";
    
    var regImage = /[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(png)|[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(jpg)/g
    var regSummary = /"summary":[A-Za-z0-9\'\\\–\"\:\,\(\)\$\{\|\.\-\ ]*/g
    var regMovieName =   /Movie Name :(.*?)*/g 
    var offset = 0 
    if( feedTitle == "Latest" || feedTitle == "Old" || feedTitle == "Pop / Remix" || feedTitle == "")
             {
                regMovieName = /Movie Name :.*?\\/g 
                offset = 2
             }

    var feedData = req.responseText
    var items = feedData.match(regImage);
    var titles = feedData.match(regMovieName);
    //traverse(req.responseText,process);
    
    //Create root div for each item
    for (var i = 0; i < items.length; i++) {
            
           // var movieName = titles[i].replace(/Movie Name : /g, '');
            var movieName = titles[i] == null ? "Dummy" : titles[i].substring(13)
            //console.log("i: "+i+"movieName : "+movieName);
            
            movieName = movieName.substring(0,movieName.length - offset)
            //movieName.replace(/Movie Name : /g, '');
            //var link = movieName.replace(/ /g,"%20");
           // link = movieName.replace(/ /g,"%20");
            var anchor = document.createElement("a");
            //anchor.text = movieName //titles[i]// movieName+" "+ link;
            //var link = movieName.replace(/\%C2\ |\ /g,' ')
            var link = encodeURI(movieName)
            link = link.replace("%C2%A0", '%20');
            link = link.replace("%E2%80%93",'-')
            console.log(link);
            anchor.junk = "http://dl69.unlimited9.com/0/omzl69djk7hxdn/"+ link +".zip";
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