const cards = document.querySelectorAll('.card');
const reset = document.getElementById('reset');
const clicks = document.getElementById('clicks');
const bestScore = document.getElementById('score');
let currentOpenCards = [];
let cardsFlipped = 0;
let lockBoard = false;
let lowScore = localStorage.getItem("low-score");

document.addEventListener("DOMContentLoaded", function() {   
    shuffle();
    if (lowScore) {
        bestScore.innerText = lowScore;
    } else {
        bestScore.innerText = 0;
    }
    for (let card of cards) {
        card.addEventListener('click', handleClick)
    };    
}); 

function handleClick(e) {
    //turn off clicks on flipped cards
    if (!e.target.classList.contains('closed')) return;
    if (lockBoard) return;
    
    cardIsClicked(e);
    
    //if the data attributes of the card match, add the 'match' class and take away the event listener
    if(currentOpenCards.length === 2 && currentOpenCards[0].attributes["data-cat"].value === currentOpenCards[1].attributes["data-cat"].value){
        cardsMatch(currentOpenCards);
    } else if (currentOpenCards.length === 2) {
       cardsDoNotMatch(currentOpenCards)
    };

    if (cardsFlipped === 16) {
        endGame();
    };
}

function shuffle() {
    //Shuffle the cards, using the order property from Flexbox
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 17);
        card.style.order = randomPosition;
    })
};

function cardIsClicked(e) {
    //when card is clicked, toggle off 'closed' and toggle on 'open'
    e.target.classList.toggle('closed');
    e.target.classList.toggle('open');

    //increase the score 
    clicks.innerText = parseInt(clicks.innerText) + 1;

    //add selected card to the array to compare to the next click
    currentOpenCards.push(e.target);
}

function cardsMatch(arr) {
    cardsFlipped += 2;
    for(let matched of arr) {
        matched.classList.add('match');
        matched.removeEventListener('click', handleClick);
    }  
    currentOpenCards = [];
} 
    

function cardsDoNotMatch(arr) {
    lockBoard = true;
    //if the cards do no match, flip them back over after one second
    setTimeout(function() {
        for(let matched of arr) {
            matched.classList.toggle('open');
            matched.classList.toggle('closed');     
        }
        lockBoard = false;  
        currentOpenCards = [];
    }, 1000)
}

reset.addEventListener('click', function(e){
    location.reload();
});

function endGame() {
    if ((lowScore > clicks.innerText) || !lowScore) {
        localStorage.setItem("low-score", clicks.innerText);
        score.innerText = clicks.innerText;
    }
    alert('You won!')
}

