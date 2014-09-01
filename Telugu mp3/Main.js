//req.responseXML.getElementsByTagName("item")[0].getElementsByTagName("encoded");


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

function Hello()
{
  alert('hi');
}


function Display()
{

 var mainDiv  = document.getElementById("mainDiv");

 var header = document.createElement("ul");
 header.className = "folders";
 var listItemq1 = document.createElement("li");
  listItemq1.innerHTML = "Telugu";
  //listItemq1.className = "selected"

var listItemq2 = document.createElement("li");
  listItemq2.innerHTML = "Hindi";

 // header.appendChild(listItemq1);
 // header.appendChild(listItemq2);
  mainDiv.appendChild(header);
//alert(mainDiv);
  var feedData = req.responseXML;
  
  var items = feedData.getElementsByTagName("item");
  var itemsCount = items.length;
  
  
  //Create root div for each item
  for(var i=0; i< itemsCount; i++)
  {
     var itemDiv = document.createElement("div");
     itemDiv.id = "itemDiv" +i;
     itemDiv.className = "Movie";

     var msTable = document.createElement("table");

     var msTR1 = document.createElement("tr");
     var msTD1 = document.createElement("td");
     var msTD2 = document.createElement("td");

     
     var table1 = document.createElement("table");
     var FileType320TR  = document.createElement("tr");
     var FileType320TD =  document.createElement("td");
     FileType320TD.colSpan=2

       var FileType128TR  = document.createElement("tr");
     var FileType128TD =  document.createElement("td");
     FileType128TD.colSpan = 2

     var infoRow = document.createElement("tr");
     var row320kbps = document.createElement("tr");
     row320kbps.className = "row320"

     var row128kbps = document.createElement("tr");
     row128kbps.className = "row128"

     var flacRow = document.createElement("tr");
     flacRow.className = "rowflac"
     
     var imgTD =  document.createElement("td");
     //imgTD.innerHTML = "Hellooo.." + i;
     var img =  document.createElement("img");
     img.id = "img" +i;
     
     //Get image url from item feed
      var content = items[i].getElementsByTagName("encoded")[0].innerHTML;

      // image url for doregama 
      //var imgUrl = content.substring(content.indexOf("<img src=")+10, content.indexOf(" alt=")-1);

      //image url for atoz mp3
      var imgUrl= "http://www.atozmp3.in/wp-content/themes/weekly/timthumb.php?src="
      imgUrl += content.substring(content.indexOf("src=")+5, content.indexOf(" alt=")-1);

      //alert(imgUrl);
      img.src = imgUrl;
      img.width = "120";
      img.height = "140";
      
      var descTD =  document.createElement("td");
      descTD.colSpan = 3;
      //Title
      var title = items[i].getElementsByTagName("title")[0].innerHTML;
      descTD.innerHTML = "<h5>" +title+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5><br/>";
      var tempDesc = items[i].getElementsByTagName("description")[0].innerHTML;
      
      //Cast
      /*var movieDetails = tempDesc.substring(tempDesc.indexOf("Cast :")+6, tempDesc.indexOf("Director :"));
      descTD.innerHTML = descTD.innerHTML + "<strong> Cast : </strong> "+ movieDetails
      descTD.className = "table_style";
      
      //Director
      movieDetails = tempDesc.substring(tempDesc.indexOf("Director :")+10, tempDesc.indexOf("Producer :"));
      descTD.innerHTML = descTD.innerHTML + "</br><strong> Director : </strong> "+ movieDetails
      
      //Producer
      movieDetails = tempDesc.substring(tempDesc.indexOf("Producer :")+10, tempDesc.indexOf("Music :"));
      descTD.innerHTML = descTD.innerHTML + "</br><strong> Producer : </strong> "+ movieDetails
      
      //Music Director
      movieDetails = tempDesc.substring(tempDesc.indexOf("Music :")+7, tempDesc.indexOf(".::"));
      descTD.innerHTML = descTD.innerHTML + "</br><strong> Music : </strong> "+ movieDetails*/

      var rockwayList = content.match(/S\*[a-z]*[0-9]*\w+/g);

      var DLurl320 = rockwayList[0];
      var SSurl320 = rockwayList[1];
      var FFurl320 = rockwayList[2];
      var ZSurl320 = rockwayList[3];
      //For doregama donot skip index numbers
      //var DLurl128 = rockwayList[4];
      var DLurl128 = rockwayList[6];
      var SSurl128 = rockwayList[7];
      var FFurl128 = rockwayList[8];
      var ZSurl128 = rockwayList[9];     

      //var DLurlFlac = rockwayList[9];
      /*var DLurlFlac = rockwayList[10];
      var SSurlFlac = rockwayList[11];
      var FFurlFlac = rockwayList[12];
      var ZSurlFlac = rockwayList[13]; */

      // doregama
      //var rockdawayUrlanchor = "<a target='_blank' href='http://rockdaway.com/?";

      //atozmp3
      var rockdawayUrlanchor = "<a target='_blank' href='http://www.zindagijobs.net/links/?";

      //Download links for 320kbps
      //var td320dl0 =  document.createElement("td");
      //td320dl0.innerHTML = "320kbps"
      FileType320TD.innerHTML = "320 kbps"

      var td320dl1 =  document.createElement("td");
      td320dl1.innerHTML = rockdawayUrlanchor +DLurl320+"'>DirectLink</a>"

      var td320dl2 =  document.createElement("td");
      td320dl2.innerHTML = rockdawayUrlanchor +SSurl320+"'>SendSpace</a>"

      var td320dl3 =  document.createElement("td");
      td320dl3.innerHTML = rockdawayUrlanchor +FFurl320+"'>FiredDrive</a>"

      var td320dl4 =  document.createElement("td");
      td320dl4.innerHTML = rockdawayUrlanchor +ZSurl320+"'>Zippy</a>"

      //row320kbps.appendChild(td320dl0);
      row320kbps.appendChild(td320dl1);
      row320kbps.appendChild(td320dl2);
      row320kbps.appendChild(td320dl3);
      row320kbps.appendChild(td320dl4);
      FileType320TR.appendChild(FileType320TD);

      // Download links for 128kbps
      //var td128dl0 =  document.createElement("td");
      //td128dl0.innerHTML = "128kbps"

      FileType128TD.innerHTML = "128 kbps";

      var td128dl1 =  document.createElement("td");
      td128dl1.innerHTML = rockdawayUrlanchor +DLurl128+"'> DirectLink </a>"

      var td128dl2 =  document.createElement("td");
      td128dl2.innerHTML = rockdawayUrlanchor +SSurl128+"'> SendSpace </a>"

      var td128dl3 =  document.createElement("td");
      td128dl3.innerHTML = rockdawayUrlanchor +FFurl128+"'> FiredDrive </a>"

      var td128dl4 =  document.createElement("td");
      td128dl4.innerHTML = rockdawayUrlanchor +ZSurl128+"'> Zippy</a>"

      //row128kbps.appendChild(td128dl0);
      row128kbps.appendChild(td128dl1);
      row128kbps.appendChild(td128dl2);
      row128kbps.appendChild(td128dl3);
      row128kbps.appendChild(td128dl4);
      FileType128TR.appendChild(FileType128TD);
      /*// Download links for Flac
      var tdFlacdl0 =  document.createElement("td");
      tdFlacdl0.innerHTML = "Flac"

      var tdFlacdl1 =  document.createElement("td");
      tdFlacdl1.innerHTML = rockdawayUrlanchor +DLurlFlac+"'>DL</a>"

      var tdFlacdl2 =  document.createElement("td");
      tdFlacdl2.innerHTML = rockdawayUrlanchor +SSurlFlac+"'>SS</a>"

      var tdFlacdl3 =  document.createElement("td");
      tdFlacdl3.innerHTML = rockdawayUrlanchor +FFurlFlac+"'>ZP</a>"

      var tdFlacdl4 =  document.createElement("td");
      tdFlacdl4.innerHTML = rockdawayUrlanchor +ZSurlFlac+"'>FF</a>"

      flacRow.appendChild(tdFlacdl0);
      flacRow.appendChild(tdFlacdl1);
      flacRow.appendChild(tdFlacdl2);
      flacRow.appendChild(tdFlacdl3);
      flacRow.appendChild(tdFlacdl4);*/

   
      
      msTD1.appendChild(img);
      //infoRow.appendChild(imgTD);
      infoRow.appendChild(descTD);

      table1.appendChild(imgTD);
      table1.appendChild(infoRow);
      table1.appendChild(FileType320TR);
      table1.appendChild(row320kbps);
      table1.appendChild(FileType128TR);
      table1.appendChild(row128kbps);
      //table1.appendChild(flacRow);
      msTD2.appendChild(table1);

      msTR1.appendChild(msTD1);
      msTR1.appendChild(msTD2);

      msTable.appendChild(msTR1);
	  itemDiv.appendChild(msTable);
	  mainDiv.appendChild(itemDiv);
    mainDiv.innerHTML += "<br/>";
      
  }
  
}