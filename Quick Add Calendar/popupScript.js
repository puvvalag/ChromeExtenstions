function AddEvent()
{
	var text = document.getElementById('EventText');
	var calurl = 'http://www.google.com/calendar/event?ctext=+'+text.value+'+&action=TEMPLATE&pprop=HowCreated%3AQUICKADD';
	chrome.tabs.create({url: calurl, selected: true})
}

document.addEventListener('DOMContentLoaded', function () {

  var examples = new Array("Lunch with John at \"Taco Tuesdays\" Friday 12 pm",
  "Volleyball at 5pm",
  "<b>All day event :</b> Bank holiday 8/14",
  "Staff meeting next Monday at 13:00",
  "<b>Time intervals :</b> Running w/ Pat 2:15 tomorrow for 45 minutes",
  "<b>Time intervals :</b> Running w/ Pat 2:15 - 3 pm tomorrow",
  "<b>Date ranges :</b> National Conference 9/23 - 9/26 in Atlanta",
  "<b>Invite Guest :</b> Lunch at Charlie's tomorrow noon puvvalaganesh@gmail.com",
  "<b>3 letter time zone: </b> Call New York at 3 pm EDT"
  );
	document.getElementById("EventText").focus();
	document.getElementById("example").innerHTML = examples[Math.floor((Math.random()*9))];
    document.getElementById('btnAdd').addEventListener('click', AddEvent);
});
