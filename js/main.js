var seconds = 0;
var tile = [
	{img: "icons01.jpg", id: 1 },
	{img: "icons02.jpg", id: 2 },
	{img: "icons03.jpg", id: 3 },
	{img: "icons04.jpg", id: 4 },
	{img: "icons05.jpg", id: 5 },
	{img: "icons06.jpg", id: 6 },
	{img: "icons07.jpg", id: 7 },
	{img: "icons08.jpg", id: 8 }
];

var tileDup = [];

for (var i = 0; i < tile.length; i++) {
	tileDup.push(tile[i]);
	tileDup.push(tile[i]);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(tileDup);

//Write a function that will make the board appear
function game() {
	var b = document.getElementById("board");
	for (var i = 0; i < tileDup.length; i++) {
		var content = "<div id='" + i + "' class='tile' data-id='" +  tileDup[i].id + "'><img class='under' src='imgs/" + tileDup[i].img + "'><img class='over' src='imgs/icons_top.jpg'></div>";
		b.insertAdjacentHTML('beforeend', content);
	}
	//Delete Start Button
	var parent = document.getElementById('scoreboard');
	var child = document.getElementById('intro');
	parent.removeChild(child);
	enableClick();

	//Create Timer
	var timerSeconds = document.getElementById('seconds');
	function increaseSeconds(){
		seconds = seconds + 1;
		timerSeconds.textContent = seconds;
	}
	setInterval(increaseSeconds, 1000);
}

var t = document.getElementsByClassName('tile');

//'Start' Event Listener
var elStart = document.getElementById('start');
elStart.addEventListener('click', game);

//Tile Click Event Listener for every tile
function enableClick(){
	for (var i = 0; i < t.length; i++) {
		t[i].addEventListener('click', tileClick)
	}
}

function disableClick(){
	for (var i = 0; i < t.length; i++){
		t[i].removeEventListener('click', tileClick)
	}
}

//Tile Click Logic
var clicked = [];
var flips = 0;
var matchedCount = 0;
//When a tile is clicked, "flip" the tile...
function tileClick(){
	this.lastChild.classList.add("hide");
	var matched = {
		id: this.getAttribute('id'),
		tileId: this.getAttribute('data-id')
	}
	//Store the tile in an array
	clicked.push(matched);
	//Add 1 to number of flips
	flips ++;
	var flipCount = document.getElementById("flips");
	flipCount.textContent = flips;
	console.log(clicked);
	console.log(flips);
	//if the array contains two tiles...
	if (clicked[1] != undefined){
		//and if the tile id's match, emtpy array, ++ score
		if (clicked[0].tileId == clicked[1].tileId) {
			clicked.length = 0;
			matchedCount ++;
			console.log(matchedCount);
			var score = document.getElementById("matches");
			score.textContent = matchedCount;
		} else {
			//If not, flip them back over after .5 secs, turn off tileClick event listener for this time, empty array
			disableClick();
			setTimeout(function () {
				document.getElementById(clicked[0].id).lastChild.classList.remove("hide");
				document.getElementById(clicked[1].id).lastChild.classList.remove("hide");
				clicked.length = 0;
				console.log(matchedCount);
				//Re-enable tileClick event listener
				enableClick();
			}, 1000 )	
		}
	}
	//End game if all matches are found
	if (matchedCount == 8) {
		var win = confirm("Congratulations, you've found all matches!" + 
			" Time: " + seconds + "s" +
			" Flips: " + flips + 
			" Play again?");
		if (win == true){
			location.reload();
		}
	}
}