
var feedUrl = "http://feeds.nationalgeographic.com/ng/photography/photo-of-the-day/";

var req = new XMLHttpRequest();
var imageText
var itemIndex  = 0;
var MAX_ITEMS = 0;

document.addEventListener("DOMContentLoaded", function() {
  main(); 
});

function AddEvents()
{
  leftImage = document.getElementById("left");
  leftImage.onmouseover = function () { ChageImage('left'); };
  leftImage.onmouseout = function () { ChageImage('left'); };
  leftImage.onclick = function () { Move('-1'); };

  rightImage = document.getElementById("right");
  rightImage.onmouseover = function () { ChageImage('right'); };
  rightImage.onmouseout = function () { ChageImage('right'); };
  rightImage.onclick = function () { Move('1'); };

  feedback = document.getElementById("feedback");
  feedback.onclick = function(){chrome.tabs.create({url: "http://goo.gl/gaI0Pq", selected: true});};

}


function main()
{
  AddEvents();
  req.open("GET",feedUrl,false);
  req.overrideMimeType('text/xml')
  req.onload = Display;
  req.send(null);
}

function Display()
{ 
  var doc = req.responseXML;
  var items = doc.getElementsByTagName("item");
 
  var itemText = items[itemIndex].textContent
  imageText = itemText.slice(itemText.indexOf("<img src="),itemText.indexOf('.jpg"/>'))
  imageText= imageText+'.jpg" />'
  //alert(imageText);
  var myDiv = document.getElementById('myDiv');
  imageText = imageText.substring(imageText.indexOf('http'),imageText.indexOf('" />'));
	
  var imageId = imageText.substring(imageText.lastIndexOf('/')+1,imageText.lastIndexOf('_'));;
   if(MAX_ITEMS == 0) 
	MAX_ITEMS = items.length;

  var title = items[itemIndex].textContent;
  var titleDesc = title;
  var PicDate = title;
  var PhotoBy = title;
  var LnkMainPage = title

  title = title.substr(0, title.indexOf("http"));

var spanTitle = document.getElementById('title');
 spanTitle.innerHTML  = title;

 //titleDesc = titleDesc.substring(titleDesc.indexOf("</b></p>")+10, titleDesc.indexOf("</p>"));
 titleDesc = titleDesc.substring(titleDesc.indexOf("</b></p>"));
  titleDesc = titleDesc.substring(titleDesc.indexOf("<p>")+3);
  titleDesc = titleDesc.substring(0,titleDesc.indexOf("</p>"));
 //alert(titleDesc);
//titleDesc = titleDesc.substr(0,100);

  var pTitleDesc = document.getElementById('titleDesc');
 //pTitleDesc.innerHTML  = titleDesc;// +"..."; // Commented this as I didnot want to see desc.
//alert(imageText);

  var dt = new Date();
  var wallprId = imageId * (dt.getDay() + 7197)

  var imgObj = document.getElementById("imgCenter");
  imgObj.src = imageText;

 PicDate = PicDate.substring(PicDate.indexOf("MediaEnt.rss"), PicDate.indexOf("Photograph"));
 PicDate = PicDate.substring(PicDate.indexOf("/>")+2,PicDate.Length);
 PicDate = PicDate.substr(2,19);

 var spanDate = document.getElementById("Date");
 //spanDate.innerHTML = PicDate;

 PhotoBy = PhotoBy.substring(PhotoBy.indexOf("MediaEnt.rss"), PhotoBy.indexOf("Photograph")+75);
 PhotoBy = PhotoBy.substr(PhotoBy.indexOf("Photograph"),75);
 PhotoBy = PhotoBy.substr(0,PhotoBy.lastIndexOf(","));


 var spanPhotoBy = document.getElementById("photoBy");
 spanPhotoBy.innerHTML = PhotoBy;


  var dwnLink = document.getElementById("aDownloadLink");

	// Old style
	//http://images.nationalgeographic.com/wpf/media-live/photos/000/283/custom/28395_1280x1024-wallpaper-cb1289253003.jpg
	//http://images.nationalgeographic.com/wpf/media-live/photos/000/284/custom/28400_1600x1200-wallpaper-cb204565200.jpg
    //var DownldUrl = "http://images.nationalgeographic.com/wpf/media-live/photos/000/"+imageId.substr(0,3)+"/custom/"+
	//			imageId+"_1600x1200-wallpaper-cb"+wallprId+".jpg"
	
	//New
	//http://images.nationalgeographic.com/wpf/media-live/photos/000/596/cache/midsummer-night-bendiksen_59623_990x742.jpg
	var DownldUrl = "http://images.nationalgeographic.com/wpf/media-live/photos/000/"+imageId.substr(0,3)+"/cache/"+
				imageId.substr(0,5)+"_990x742.jpg"
   dwnLink.onclick = function(){
   chrome.tabs.create({url: DownldUrl, selected: false});
   };

  // chrome.browserAction.setBadgeBackgroundColor({color:[0, 255, 0, 100]});

  //  chrome.browserAction.setBadgeText({text:'2'});


  LnkMainPage = LnkMainPage.substring(LnkMainPage.indexOf("<a")+2,LnkMainPage.indexOf('">'));
  LnkMainPage = LnkMainPage.substring(LnkMainPage.indexOf('="')+2);
  var aMainPagrUrl = document.getElementById("lnkMainPage"); 
  aMainPagrUrl.href = LnkMainPage;
}

function ChageImage(imgId)
{
	image = document.getElementById(imgId);
	if(image.src.indexOf("On.png") > 0)
		image.src = imgId +'.png';
	else
		image.src = imgId+'On.png';
}

function Move(value)
{

	itemIndex = (Number(itemIndex) + Number(value)) > 14 ? 0 : (Number(itemIndex) + Number(value))  ;
	if(itemIndex >= 0)
	Display();
	else
	itemIndex = 0;
}