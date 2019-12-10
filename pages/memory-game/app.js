/*
 * Create a list that holds all of your cards
 */
const listOfCards = document.querySelectorAll('.card');

//let listOfCards = Array.from(nodeListOfCards)
console.log(listOfCards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function init() {

const shuffling = (cards) => {
  let shuffleHTML = Array.from(cards).map((i) => {
    return i.querySelector('i').className;
  });

  //Shuffle cards
  shuffle(shuffleHTML);

  //Change class names to shuffled values
  listOfCards.forEach((item, idx) => {
    item.querySelector('i').className = shuffleHTML[idx];
  });

}

//Remove other classes from the cards

const clearDeck = () => {
  listOfCards.forEach((item) => {
    item.classList.remove('open', 'show', 'match');
  });
}
clearDeck();
shuffling(listOfCards);
};

init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//console.log(listOfCards.classList.contains('li.card'));

listOfCards.forEach((item) => {
  item.addEventListener('click', () => {
    displaySymbol(item);
  })
});


 function displaySymbol(item) {
    item.classList.toggle('show');
    item.classList.toggle('open');
    matchingList(item);
 };

  
let toggledCards = [];

 function matchingList(item) {
  toggledCards.push(item);
  console.log(toggledCards);
  if(toggledCards.length == 2) {
      ifCardsMatch(toggledCards);
      incrementCounter();
    }
  };


  
 function ifCardsMatch(listToggled) {
  if (listToggled[0].firstElementChild.className ===
     listToggled[1].firstElementChild.className) {
       console.log("Match");
       cardsMatch(toggledCards);
     } else {
      console.log("do not match");
      cardsDoNotMatch(toggledCards);
     }
  }
 

function cardsMatch(listToggled) {
  listToggled.forEach(function(item){
    item.removeEventListener('click', () => {
    displaySymbol(item);
        })
    item.classList.toggle('match');
    }) 
  toggledCards = [];
};



function cardsDoNotMatch(listToggled) {
  setTimeout(() => {
  listToggled.forEach(function(item){
    item.classList.toggle('show');
    item.classList.toggle('open');
    });
  toggledCards = [];
}, 1000);
}

let moves = 0;
function incrementCounter() {
    const movesCounter = document.querySelector('.moves');
    moves++;
    movesCounter.innerHTML = moves;
    if (moves === 18 || moves === 32) {
      removeStars();
    }
}

function removeStars() {
  let star = document.querySelector('.stars');
  console.log(star);
  star.removeChild(star.firstElementChild);
}


const restart = document.querySelector('.restart');

function restartGame() {
  //const movesCounter = document.querySelector('.moves');
  //movesCounter.innerHTML = 0;
  location.reload();
  //init();
}
restart.addEventListener('click', restartGame);
