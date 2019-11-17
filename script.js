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
            name: "Bowsey",
            pointsGained: 1
        },
        {
            name: "Bowser",
            pointsGained: 3,
            // speedOne: 
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
            speeds();
        }
    })
});

//CHARACTER APPEARANCES ================================

let randomDoorBowser, randomDoorBowsy, bowserSpeed, bowsySpeed; //selects a random door number from the doors array
bowserSpeed = 3500; //sets original speed
bowsySpeed = 1500;

//set timeout, change variable to bowser new speed, create an array with different speeds

const bowserAppear = function () { //Function makes Bowser appear randomly in a door

    setInterval(function () { //calls a random door whenever Bowser appears
        randomDoorBowser = Math.floor(Math.random() * doors.length)
    }, bowserSpeed);

    if (randomDoorBowser !== randomDoorBowsy){ //if Bowser's door !== Bowsy's door
        $(".door" + randomDoorBowser).append(`<img src="assets/bowser1.png" class="character bowser" alt="">`); //add the html of Bowser to DOM
    
        setTimeout(function () { //removes Bowser after a period of time
            $('.character').remove();
        }, 800)
    }
}


const bowsyAppear = function () { //Function makes Bowsy appear randomly in a door
    
    setInterval(function () { //calls a random door whenever Bowsy appears
        randomDoorBowsy = Math.floor(Math.random() * doors.length)
    }, bowsySpeed);
    
    if (randomDoorBowsy !== randomDoorBowser) { //if Bowsy's door !== Bowsers's door
        $(".door" + randomDoorBowsy).append(`<img src="assets/bowser0.png" class="character bowsy" alt="">`); //adds the html of Bowsy to DOM
        setTimeout(function () { //removes Bowsy after a period of time
            $('.character').remove();
        }, 900)
    }
}

// const speeds = function () {
//     const bowserSpeedIncrease = setInterval(function (){
//         bowserSpeed = bowserSpeed - 750;
//     }, 10000) //makes Bowser's speed increase every 10 seconds
//     const bowsySpeedIncrease = setInterval(function (){
//         bowsySpeed = bowsySpeed - 100;
        
//     }, 9000) //makes Bowser's speed increase every 10 seconds
//     setTimeout(function(){
//         clearInterval(bowsySpeedIncrease);
//     }, 30500) //stops speeds from increasing any further
// }

const bowserAppears = setInterval(bowserAppear, bowserSpeed); //Calls functions at diferent interval
const bowsyAppears = setInterval(bowsyAppear, bowsySpeed); 

//SET UP USER CONTROLS ===============================

let bowserLocation; //equal to door number where user presses

const keyFunction = function () {
    $(document).on("keydown", function (keypress) {
        //S Key
        if (keypress.keyCode === 83) {
            $('.key83').addClass('doorSelected'); //add a class of doorSelected to show that it was selected 
            $('.sKey').replaceWith(`<img src="assets/keys/sKeyPress.svg" alt="" class="key sKey">`);
            bowserLocation = 0;
        }
        //D Key
        if (keypress.keyCode === 68) {
            $(".key68").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.dKey').replaceWith(`<img src="assets/keys/dKeyPress.svg" alt="" class="key dKey">`);
            bowserLocation = 1;
        }
        //K Key
        if (keypress.keyCode === 75) {
            $(".key75").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.kKey').replaceWith(`<img src="assets/keys/kKeyPress.svg" alt="" class="key kKey">`);
            bowserLocation = 2;
        }
        //L Key
        if (keypress.keyCode === 76) {
            $(".key76").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.lKey').replaceWith(`<img src="assets/keys/lKeyPress.svg" alt="" class="key lKey">`);
            bowserLocation = 3;
        }
    })

    $(document).keyup(function () { //removes class of doorSelected when user lifts keys
        $('.key83').removeClass('doorSelected');
        $('.key68').removeClass('doorSelected');
        $('.key75').removeClass('doorSelected');
        $('.key76').removeClass('doorSelected');
        $('.sKey').replaceWith(`<img src="assets/keys/sKey.svg" alt="" class="key sKey">`);
        $('.dKey').replaceWith(`<img src="assets/keys/dKey.svg" alt="" class="key dKey">`);
        $('.kKey').replaceWith(`<img src="assets/keys/kKey.svg" alt="" class="key kKey">`);
        $('.lKey').replaceWith(`<img src="assets/keys/lKey.svg" alt="" class="key lKey">`);
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