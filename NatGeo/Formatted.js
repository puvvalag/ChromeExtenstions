

$(document).ready(function(){
    AddEvents();
    var content;
    getRemote();
    function getRemote() {
        var url = dynamicUrl === "" ? currentMonthResourceUrl : dynamicUrl; 
        console.log(url);
     var content = $.ajax({
          type: "GET",
          url: url,
          success: function(data){
            PrepareCatalog(data);
            if(dynamicUrl === "")
              Display(0);
        }
      }).responseText; 
  }

  function PrepareCatalog(data)
  {
      var counter = 1;
      var dateString = data.items[0].publish_date;
      
      var dateObj = new Date(dateString);
      var monthCatalog = new Object();
      monthCatalog.month = dateObj.getMonth() + 1;
      monthCatalog.year = dateObj.getFullYear();
      monthCatalog.imagery = [];
      monthCatalog.totalImagesAvailable = data.items.length;
      monthCatalog.current = "https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.syndication-gallery."+ monthCatalog.year +"-"+ monthCatalog.month +".json";
      monthCatalog.prev = data.previous_endpoint;
      monthCatalog.next = data.next_endpoint;
      data.items.forEach(getImageArtifacts);
      function getImageArtifacts(i){
        var imageArtifacts = new Object();
        imageArtifacts.Title = i.image.title;
        imageArtifacts.PublishDate = i.publish_date;
        imageArtifacts.Month = dateObj.getMonth() + 1;
        imageArtifacts.Year = dateObj.getFullYear();
        imageArtifacts.Thumbnail = i.image.renditions[12].uri;
        imageArtifacts.DownloadLink = i.image.uri;
        imageArtifacts.Caption = i.image.caption;
        monthCatalog.imagery.push(imageArtifacts);
        ++maxImageCounter;
        completeImageCatalog[currentImageCounter] = imageArtifacts;
        ++currentImageCounter;
    };
    monthWiseImageCataog[monthCatalog.year +''+ monthCatalog.month] = monthCatalog;
  }
  
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
    
    var downloadLink = document.getElementById("aDownloadLink");
    downloadLink.onclick = function(){
      chrome.tabs.create({url: downloadUrl, selected: false});
      };

      var imgObj = document.getElementById("imgCenter");
      imgObj.onclick = function(){
        chrome.tabs.create({url: downloadUrl, selected: true});
        };
  
  }
  
  function Display(index)
  { 
    var imgObj = document.getElementById("imgCenter");
    var imageArtifacts = completeImageCatalog[index];

    if(imageArtifacts === undefined)
      {
        
        var year = Number(completeImageCatalog[index - 1].Year)
        var month = Number(completeImageCatalog[index - 1].Month)
        if(month == 1)
          {
            month = 12;
            year -= 1;
          }
          else{
            month -= 1;
          }

        dynamicUrl = "https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.syndication-gallery."+ year +"-"+ month +".json";
        console.log('dynamicUrl : ' + dynamicUrl);
        getRemote();
      }
      else{
        imgObj.src = imageArtifacts.Thumbnail;
        downloadUrl = imageArtifacts.DownloadLink;
      }
  
  }
  
  function ChageImage(imgId)
  {
      image = document.getElementById(imgId);
      if(image.src.indexOf("On.png") > 0)
          image.src = imgId +'.png';
      else
          image.src = imgId+'On.png';
  }
  
  var itemIndex  = 0;

  function Move(value)
  {

      itemIndex = itemIndex + Number(value); 
      if(itemIndex >= 0)
        Display(itemIndex);
      else
        itemIndex = 0;
  }
  });
  
var currentYear =  new Date().getFullYear();
var currentMonth =  new Date().getMonth() + 1;
var currentMonthResourceUrl = "https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.syndication-gallery."+ currentYear +"-"+ currentMonth +".json";
var dynamicUrl = "";
var maxImageCounter = 0;
var currentImageCounter = 0;
var displayImageCounter = 0;
var completeImageCatalog = new Object();
var monthWiseImageCataog = new Object();
var downloadUrl = "";