
//SET UP MAIN GAMEPLAY PAGE ==========================

let score = [];

const doors = [".door0", ".door1"];

const keys = [
    {
        name: "S Key",
        key: 83
    },
    {
        name: "L Key",
        key: 76
    }
]

const characters = {
    bad: [
        {
            name: "Bowser",
            points: -5,
        }
    ]
}

let randomDoor; //selects a random array number

$(document).ready(function() {
    $('#game').hide();

    //When spacebar is pressed, 
    //- hide start page
    //- show game page
    //- activate s key
    //- activate l key
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 32) {
            $('#start').hide();
            $('#game').show();
            sKeyFunction();
            lKeyFunction()
            winOrLoseL();
            winOrLoseS()
        }
    })
});

//Function makes Bowser appear randomly in a door
const badCharAppear = function () {

    setInterval(function () { //calls a random door every second
        randomDoor = Math.floor(Math.random() * doors.length)
    }, 1000);

    $(".door" + randomDoor).append(`<img src="assets/bowser1.png" class="character" alt="">`); //adds the html of Bowser to DOM

    setTimeout(function () { //removes Bowser after 1 second
        $('img').remove();
    }, 1000)
}

const bowserAppears = setInterval(badCharAppear, 2500); //Bowser will appear every 2.5 seconds

//SET UP USER CONTROLS ===============================

//FOR S KEY
const sKeyFunction = function () {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 83) {
            //add a class of doorSelected to show that it was selected
            $(".key83").addClass('doorSelected');
        }
        console.log('sKeyFunction')
    })
}

//FOR L KEY
const lKeyFunction = function () {

    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 76) {
            //add a class of doorSelected to show that it was selected
            $(".key76").addClass('doorSelected');
        }
    })
}

//removes class of doorSelected when user lifts keys
$(document).keyup(function () {
    $('.key83').removeClass('doorSelected');
    $('.key76').removeClass('doorSelected');
});


//SET UP SCORING SYSTEM ==============================

score = [0];
let newScore, key76, key83;

function bowserInDoor0() {
    let bowserIsThere0 = $('.door0').find('img').val();
    if (bowserIsThere0 === undefined) { //Bowser is not there and S key is selected
        score--;
    } else if (bowserIsThere0 === '') { //Bowser is there and S key is selected
        score++;
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//Function that checks if Bowser is in door 2
function bowserInDoor1() {
    let bowserIsThere1 = $('.door1').find('img').val();
    if (bowserIsThere1 === undefined) { //Bowser is not there and S key is selected
        score--;
    } else if (bowserIsThere1 === '') { //Bowser is there and S key is selected
        score++;
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//If user presses L, checks if Bowser is there and updates score 
const winOrLoseL = function () {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 83) {
            bowserInDoor0(); // If Bowser is in Door 0 and S key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose!');
                clearInterval(bowserAppears);
            } else if (score > 10) {
                alert('You win!')
            }
        }
    })
}

//If user presses S, checks if Bowser is there and updates score 
const winOrLoseS = function() {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 76) {
            bowserInDoor1(); // If Bowser is in Door 1 and L key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose!');
                clearInterval(bowserAppears);
            } else if (score >= 10) {
                alert('You win!')
            }
        }
    })

    console.log('win or lose function ran')
}


//DISPLAY FINAL SCREENS (WIN/LOSE)====================
//1. Reset score
//2. Reset spacebar function

//SET UP GAMEPLAY SPEED (stretch) ====================

//SET UP CHARACTER ACTIONS (stretch) =================

    //1. Scoring system for each character