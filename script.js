//SET UP MAIN GAMEPLAY PAGE ==========================
let score = []; //only doors and score REALLY needed

const doors = [".door0", ".door1", ".door2", ".door3"];

const keys = [
    {
        name: "S Key",
        key: 83
    },
    {
        name: "D Key",
        key: 68
    },
    {
        name: "K Key",
        key: 75
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
            pointsGained: 3,
        },
        {
            name: "Bowsey",
            pointsGained: 1
        }
    ]
}

//When document starts, do the following: 
$(document).ready(function () {
    $('#game').hide(); //Hide the game div
    $(document).on("keydown", function (keypress) { //When the spacebar is pressed
        if (keypress.keyCode === 32) {
            $('#start').hide(); //- hide start page
            $('#game').show(); //- show game page
            keyFunction(); //- activate keys
            winOrLose(); //- start checking the score
        }
    })
});

//CHARACTER APPEARANCES ================================

let randomDoorBowser, randomDoorBowsy; //selects a random door number from the doors array

const bowserAppear = function () { //Function makes Bowser appear randomly in a door

    setInterval(function () { //calls a random door whenever Bowser appears
        randomDoorBowser = Math.floor(Math.random() * doors.length)
    }, 3500);

    if (randomDoorBowser !== randomDoorBowsy){ //if Bowser's door !== Bowsy's door
        $(".door" + randomDoorBowser).append(`<img src="assets/bowser1.png" class="character bowser" alt="">`); //add the html of Bowser to DOM
    
        setTimeout(function () { //removes Bowser after a period of time
            $('img').remove();
        }, 800)
    }
}

const bowsyAppear = function () { //Function makes Bowsy appear randomly in a door

    setInterval(function () { //calls a random door whenever Bowsy appears
        randomDoorBowsy = Math.floor(Math.random() * doors.length)
    }, 1500);

    if (randomDoorBowsy !== randomDoorBowser) { //if Bowsy's door !== Bowsers's door
        $(".door" + randomDoorBowsy).append(`<img src="assets/bowser0.png" class="character bowsy" alt="">`); //adds the html of Bowsy to DOM
        setTimeout(function () { //removes Bowsy after a period of time
            $('img').remove();
        }, 900)
    }

}

const bowserAppears = setInterval(bowserAppear, 3500); //Calls functions at diferent interval
const bowsyAppears = setInterval(bowsyAppear, 1500); 

//SET UP USER CONTROLS ===============================

let bowserLocation; //equal to door number where user presses

const keyFunction = function () {
    $(document).on("keydown", function (keypress) {
        //S Key
        if (keypress.keyCode === 83) {
            $(".key83").addClass('doorSelected'); //add a class of doorSelected to show that it was selected 
            bowserLocation = 0;
        }
        //D Key
        if (keypress.keyCode === 68) {
            $(".key68").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            bowserLocation = 1;
        }
        //K Key
        if (keypress.keyCode === 75) {
            $(".key75").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            bowserLocation = 2;
        }
        //L Key
        if (keypress.keyCode === 76) {
            $(".key76").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            bowserLocation = 3;
        }
    })

    $(document).keyup(function () { //removes class of doorSelected when user lifts keys
        $('.key83').removeClass('doorSelected');
        $('.key68').removeClass('doorSelected');
        $('.key75').removeClass('doorSelected');
        $('.key76').removeClass('doorSelected');
    });
}

//SET UP SCORING SYSTEM ==============================

score = [0]; 
let newScore, key76, key83, key68, key75;

function bowserInDoor() { //checks if any Bowser is in the door
    let locationValue = $('.door' + bowserLocation).find('img').val();
    if (locationValue === undefined) { //If someone is not there and correct key is selected
        score--;
        $('audio').get(1).play();
    } else if (locationValue === '') { //If someone is there and correct key is selected
        // score++;
        whichBowser();
        bowserPoints();
        $('audio').get(0).play();
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

let bowser, bowsy; //determines bowser's location

const whichBowser = function () {
    bowser = $('.bowser').length;
    bowsy = $('.bowsy').length;
}


//if door = bowser/bowsey.length 1 = they are there
const bowserPoints = function () {
    if (bowser === 1){ //bowser is there
        score += 2;
    }
    if(bowsy === 1) {
        score++;
    }
}

//If user presses L, checks if Bowser is there and updates score 
const winOrLose = function () {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 83) {
            bowserInDoor(); // If Bowser is in a door and S key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }

        if (keypress.keyCode === 68) {
            bowserInDoor(); // If Bowser is in a door and D key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }

        if (keypress.keyCode === 75) {
            bowserInDoor(); // If Bowser is in a door and K key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }
        
        if (keypress.keyCode === 76) {
            bowserInDoor(); // If Bowser is in a door and L key has been selected, increase score by 1
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.')
                location.reload(true);
            }
        }
    })
}


//SET UP GAMEPLAY SPEED (stretch) ====================

//SET UP CHARACTER ACTIONS (stretch) =================

    //1. Scoring system for each character