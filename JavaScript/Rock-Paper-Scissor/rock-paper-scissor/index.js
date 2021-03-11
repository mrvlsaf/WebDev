function rpsGame(yourChoice) {
    botChoice = choice(convert());
    // console.log(botChoice);
    humanChoice = yourChoice.id;  //nw it cntns rock, papr or scissor
    console.log(humanChoice, botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);

    message = finalMessage(results);
    console.log(message.message, message.color);

    rpsFrontEnd(humanChoice, botChoice, message);
}

//picks up random number(0,1,2)
function convert() {
    return (Math.floor(Math.random() * 3));   //picks up a random number 0,1,2
}

//returns the random bot choice as rock, paper or scissor
function choice(number) {
    return ['rock', 'paper', 'scissor'][number]; //return bot choice with either of them
}

//returns the winner in the form of (0, 1)(1, 0)or(0.5, 0.5)
function decideWinner(humanChoice, botChoice) {
    var rpsDatabase = {
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissor': 0 },
        'scissor': { 'paper': 1, 'scissor': 0.5, 'rock': 0 },
    };

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = rpsDatabase[botChoice][humanChoice];

    return [yourScore, botScore];
}

//returns who is the winner in the form of message with color
function finalMessage([yourScore, botScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    } else if (yourScore === 1) {
        return { 'message': 'You won!', 'color': 'green' };
    } else {
        return { 'message': 'You tied!', 'color': 'yellow' };
    }
}

//displays the winner message on the frontend
function rpsFrontEnd(yourChoiceImage, botChoiceImage, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    //removing the images now
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    //creating the divs for two images and one text
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[yourChoiceImage] + "'height=200 width=200 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)';>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botChoiceImage] + "'height=200 width=200 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)';>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

//chanigng the color of the button

var all_buttons = document.getElementsByTagName('button');

var copy_buttons = [];
for (let i = 0; i < (all_buttons.length); i++) {
    copy_buttons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(select) {
    if (select.value === 'red') {
        Red();
    } else if (select.value === 'random') {
        Random();
    } else if (select.value === 'green') {
        Green();
    } else if (select.value === 'yellow') {
        Yellow();
    } else if (select.value === 'blue') {
        Blue();
    } else {
        Reset()
    }
}

function Red() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');

    }

}
function Yellow() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning');

    }

}
function Green() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');

    }

}
function Blue() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-primary');

    }

}

function Random() {
    // const arr = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for (let i = 0; i < all_buttons.length; i++) {
        let rand = (Math.floor(Math.random() * 4));
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copy_buttons[rand]);
    }

}

function Reset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copy_buttons[i]);
    }
}