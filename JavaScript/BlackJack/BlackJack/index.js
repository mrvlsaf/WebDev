
//this will contain the dataset used below
let blackJackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnOver': false
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit); //adding event listener when clicked

document.querySelector('#blackjack-stand-button').addEventListener('click', blackJackStand);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);


//function performed when someone click the HIT button
function blackJackHit() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

//picks up a random card number
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

//shows the card in the your-box area and makes the hit sound
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

//function performed when someone click the DEAL button
function blackJackDeal() {
    if (blackJackGame['turnOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = "black";

        blackJackGame['isStand'] = false;
        blackJackGame['turnOver'] = false;
    }
}

//it will update the score in the backend
function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += 1;
        }
    }
    else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}

//it will show the score on the frontend
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUSTED!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//function performed when someone click the STAND button
async function blackJackStand() {
    blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackJackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

        blackJackGame['turnOver'] = true;
        let winner = computeWinner();
        showResult(winner);
}


//compute who is the winner
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (DEALER['score'] > 21 || YOU['score'] > DEALER['score']) {
            winner = YOU;
            blackJackGame['wins']++;
        }
        else if (DEALER['score'] > YOU['score']) {
            winner = DEALER;
            blackJackGame['losses']++;
        }
        else if (DEALER['score'] === YOU['score']) {
            blackJackGame['draws']++;
        }
    } else {
        if (DEALER['score'] > 21) {
            blackJackGame['draws']++;
        }
        else {
            winner = DEALER;
            blackJackGame['losses']++;
        }
    }
    console.log('Winner is: ', winner);
    return winner;
}

//shows who is the winner at the place of text Let's Play!
function showResult(winner) {
    let message, messageColor;
    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = "You Won!";
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackJackGame['losses'];
        message = "You Lost!";
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = "You Drew!";
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}