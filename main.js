//============= Variables ===================
//difficulty level
var mode = 'hard';
//array with colors for tabs
var colors;
//color which user need to guess
var colorToGuess;

//============= DOM holders =================
var tabs = document.querySelectorAll('.square');
var colorToGuessEl = document.querySelector('#colorToGuess');
var result = document.querySelector('.resultInfo');
var resetBtn = document.querySelector('button[class~=reset]');
var hardBtn = document.querySelector('button[class~=hard]');
var easyBtn = document.querySelector('button[class~=easy]');

//============= Initial setup =================
resetGame();

//============= Event Handlers =================
//handler for click event on resetBtn
resetBtn.addEventListener('click', function() {
	resetGame();
});
//handlers for click event on mode buttons
hardBtn.addEventListener('click', function() {
	mode = 'hard';
	markMode();
	resetGame();
});
easyBtn.addEventListener('click', function() {
	mode = 'easy';
	markMode();
	resetGame();
});
//add event listener for every square
for (var i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener('click', function() {
		//set clickedColor to clicked tab's background color
		var clickedColor = this.style.backgroundColor;
		//if clicked color matches color we're looking for
		if (clickedColor == colorToGuess) {
			//display proper information and change all tabs background to that color
			result.textContent = 'Correct!';
			result.classList.remove('resultinfo--wrong');
			result.classList.add('resultinfo--correct');
			colorToGuessEl.style.color = clickedColor;
			changeColors(clickedColor);
		} else {
			//otherwise display another message and make clicked square transparent
			result.textContent = 'Try again..';
			result.classList.remove('resultinfo--correct');
			result.classList.add('resultinfo--wrong');
			this.className = 'square-fail';
			this.disabled = true;
		}
	});
}

//============= Functions =================
//reset game setup
function resetGame() {
	//set array with colors for tabs
	if (mode === 'easy') {
		colors = generateRanCol(3);
	} else {
		colors = generateRanCol(6);
	}
	//set color to guess
	colorToGuess = getColorToGuess();
	//display color which user need to guess
	colorToGuessEl.textContent = colorToGuess;
	//set and display tabs
	setTabs();
	result.textContent = '';
	colorToGuessEl.style.color = '#000000';
}

//set display and background color for every tab
function setTabs() {
	var numTabs;
	if (mode === 'easy') {
		numTabs = 3;
		for (var i = tabs.length - 1; i > 2; i--) {
			tabs[i].style.display = 'none';
		}
	} else {
		numTabs = 6;
		for (var i = tabs.length - 1; i > 2; i--) {
			tabs[i].style.display = 'block';
		}
	}
	for (var i = 0; i < numTabs; i++) {
		tabs[i].className = 'square';
		tabs[i].disabled = false;
		tabs[i].style.backgroundColor = colors[i];
	}
}

//make an empty array and fill it with random rgb color strings
function generateRanCol(num) {
	var colsArr = [];
	for (var i = 0; i < num; i++) {
		var col = 'rgb(' + Math.floor(Math.random()* 256) + ', ' +
		Math.floor(Math.random()* 256) + ', ' + Math.floor(Math.random()* 256) +')';
		colsArr.push(col);
	}
	return colsArr;
}

//pick one color from array with colors
function getColorToGuess() {
	var rColor = Math.floor(Math.random() * colors.length);
	return colors[rColor];
}

//change background for all tabs to the same color
function changeColors(color) {
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].className = 'square';
		tabs[i].style.backgroundColor = color;
	}
}

//mark current mode
function markMode() {
	if (mode === 'hard') {
		hardBtn.classList.add('btn--selected');
		easyBtn.classList.remove('btn--selected');
	} else {
		easyBtn.classList.add('btn--selected');
		hardBtn.classList.remove('btn--selected');
	}
}
