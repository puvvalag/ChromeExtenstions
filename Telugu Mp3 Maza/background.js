
function Download1(element) {
    //alert(element.href)
    var id = 0;
    chrome.windows.create({
        'url': element.junk,
         'type':'popup',
         'width':100,
         'height' : 100
        }//,function(tab){ id = tab.id}
        );
}




********



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

function Display() {

    var mainDiv = document.getElementById("mainDiv");
    var regImage = /[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(png)|[a-zA-Z0-9\-\.\%\/\\\_\-\:\+\(\)]*(jpg)/g
    var regSummary = /"summary":[A-Za-z0-9\'\\\–\"\:\,\(\)\$\{\|\.\-\ ]*/g
    var regMovieName = /Movie Name :[A-Za-z0-9\'\–\"\:\,\(\)\$\{\|\.\-\ ]*/g

    var feedData = req.responseText;

    var items = feedData.match(regImage);
    var titles = feedData.match(regMovieName);
    //Create root div for each item
    for (var i = 0; i < items.length; i++) {

            
            var anchor = document.createElement("a");
            //anchor.id = "a" + i;
            anchor.junk = "http://dl69.unlimited9.com/0/omzl69djk7hxdn/"+ titles[i].replace(/Movie Name : /g, '').replace(/ /g,"%20")+".zip";
            anchor.onclick = function() {
                Download(this)
            };
            //anchor.title = "test";
            var movie = document.createElement("img");
            //movie.style = 'height:200px';
            movie.title = titles[i].replace(/Movie Name :/g, '');
            var url = items[i].replace(/\//g, '');
            movie.src = url;
            mainDiv.className = "polaroid-images";

            anchor.appendChild(movie);
            mainDiv.appendChild(anchor);
        }

    

}

var req = new XMLHttpRequest();
//req.open("GET","http://doregama.info/feed",false);
req.open("GET", "http://www.mazamp3.com/feeds/posts/summary/-/old%20is%20gold?max-results=50&alt=json-in-script&callback=recentpostslist", false);
req.overrideMimeType('text/xml');
req.onload = clickContinue;
//req.onload = Display;
req.send(null);