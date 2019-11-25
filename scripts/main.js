let cardsArray = [
  {    'name': 'CSS',    'img': 'url(./image/css3-logo.png)',  },
  {    'name': 'HTML',    'img': 'url(./image/html5-logo.png)',  },
  {    'name': 'jQuery',    'img': 'url(./image/jquery-logo.png)',  },
  {    'name': 'JS',    'img': 'url(./image/js-logo.png)',  },
  {    'name': 'Node',    'img': 'url(./image/nodejs-logo.png)',  },
  {    'name': 'Photo Shop',    'img': 'url(./image/photoshop-logo.png)',  },
  {    'name': 'PHP',    'img': 'url(./image/php-logo.png)',  },
  {    'name': 'Python',    'img': 'url(./image/python-logo.png)',  },
  {    'name': 'Ruby',    'img': 'url(./image/rails-logo.png)',  },
  {    'name': 'Sass',    'img': 'url(./image/sass-logo.png)',  },
  {    'name': 'Sublime',    'img': 'url(./image/sublime-logo.png)',  },
  {    'name': 'Wordpress',    'img': 'url(./image/wordpress-logo.png)',  },
];

// Duplicate cardsArray to create a match for each card
let gameGrid = cardsArray.concat(cardsArray);

// Randomize game grid on each load
gameGrid.sort(function() {
  return 0.5 - Math.random();
})

// Grab the div with an id of game-board and assign to a variable game
let game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
let grid = document.createElement('section');
// Give section element a class of grid.
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Loop through each item in our cards array
for (i = 0; i < gameGrid.length; i++) {
  // create a div element and assign to variable card
  let card = document.createElement('div');
  // Apply a card class to that div
  card.classList.add('card');
  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = gameGrid[i].name;

  //Create front of card
  let front = document.createElement('div');
  front.classList.add("front");

  //Create back of card
  let back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = gameGrid[i].img;

  // Append the div to the grid section
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
}

let firstGuess = '';
let secondGuess = '';
// Set count to 0
let count = 0;
let previousTarget = null;
let delay = 1200;
let cardCount = 24;
let guessCount = 0;

// Add match CSS
let match = function() {
  let selected = document.querySelectorAll('.selected');
  // loop through the array like object containing `selected` class
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
    cardCount--;

    //when all cards are gone
    if (cardCount ==0){
        let endBox = document.createElement('div');
        endBox.classList.add('endBox');

        let endTitle = document.createElement('p');
        endTitle.classList.add('endTitle');
        endTitle.textContent = "Congratulations";

        let endMessage = document.createElement('p');
        endMessage.classList.add('endMessage');
        endMessage.textContent = `you did it in ${guessCount} guesses`;

        grid.appendChild(endBox);
        endBox.appendChild(endTitle);
        endBox.appendChild(endMessage);
     };
  }
};



// Reset guesses after two attempts
let resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll('.selected');
  for (i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
};


// Add event listener to grid
grid.addEventListener('click', function(event) {
  // Declare variable to target our clicked item
  let clicked = event.target;
  // Do not allow the grid section itself to be selected;
  // only select divs inside the grid
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // We only want to add `selected` class if the current count is less than 2
  if (count < 2) {
    count++;

    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    // If both guesses are not empty
    if (firstGuess !== '' && secondGuess !== '') {
      // And the firstGuess matches secondGuess
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match, delay);
        guessCount++;
        setTimeout(resetGuesses, delay);
      } else {
          guessCount++;
          setTimeout(resetGuesses, delay);
      }
    }
    previousTarget = clicked;
  }
});
