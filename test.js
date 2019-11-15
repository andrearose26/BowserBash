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

$(document).ready(function () {
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
            keyFunction();
            winOrLose();
        }
    })
});

//Function makes Bowser appear randomly in a door
const bowserAppear = function () {

    setInterval(function () { //calls a random door every second
        randomDoor = Math.floor(Math.random() * doors.length)
    }, 1000);

    $(".door" + randomDoor).append(`<img src="assets/bowser1.png" class="character" alt="">`); //adds the html of Bowser to DOM

    setTimeout(function () { //removes Bowser after 1 second
        $('img').remove();
    }, 1000)
}

const bowserAppears = setInterval(bowserAppear, 2000); //Bowser will appear every 2.5 seconds

//SET UP USER CONTROLS ===============================

let bowserLocation; //equal to door number

const keyFunction = function () {
    $(document).on("keydown", function (keypress) {
        //S Key
        if (keypress.keyCode === 83) {
            //add a class of doorSelected to show that it was selected
            $(".key83").addClass('doorSelected');
            bowserLocation = 0;
        }
        //L Key
        if (keypress.keyCode === 76) {
            //add a class of doorSelected to show that it was selected
            $(".key76").addClass('doorSelected');
            bowserLocation = 1;
        }
    })
    //removes class of doorSelected when user lifts keys
    $(document).keyup(function () {
        $('.key83').removeClass('doorSelected');
        $('.key76').removeClass('doorSelected');
    });
}



//SET UP SCORING SYSTEM ==============================

score = [0];
let newScore, key76, key83;

function bowserInDoor() {
    let locationValue = $('.door' + bowserLocation).find('img').val();
    if (locationValue === undefined) { //Bowser is not there and correct key is selected
        score--;
    } else if (locationValue === '') { //Bowser is there and correct key is selected
        score++;
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//If user presses L, checks if Bowser is there and updates score 
const winOrLose = function () {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 83) {
            bowserInDoor(); // If Bowser is in Door 0 and S key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press ok to play again.');
                location.reload(true);
            } else if (score >= 10) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }

        if (keypress.keyCode === 76) {
            bowserInDoor(); // If Bowser is in Door 1 and L key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press ok to play again.');
                clearInterval(bowserAppears);
                location.reload(true);
            } else if (score >= 10) {
                alert('You win! Press okay to play again.')
                clearInterval(bowserAppears);
                location.reload(true);
            }
        }
    })
}


//SET UP GAMEPLAY SPEED (stretch) ====================

//SET UP CHARACTER ACTIONS (stretch) =================

    //1. Scoring system for each character