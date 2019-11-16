//SET UP MAIN GAMEPLAY PAGE ==========================
let score = [];

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

let randomDoorBowser, randomDoorBowsy; //selects a random array number

//Function makes Bowser appear randomly in a door
const bowserAppear = function () {

    setInterval(function () { //calls a random door every second
        randomDoorBowser = Math.floor(Math.random() * doors.length)
        // console.log(randomDoorBowser);
    }, 3500);

    if (randomDoorBowser !== randomDoorBowsy){
        $(".door" + randomDoorBowser).append(`<img src="assets/bowser1.png" class="character bowser" alt="">`); //adds the html of Bowser to DOM
    
        setTimeout(function () { //removes Bowser after 1 second
            $('img').remove();
        }, 800)
    }
}

const bowsyAppear = function () {

    setInterval(function () { //calls a random door every second
        randomDoorBowsy = Math.floor(Math.random() * doors.length)
        // console.log(randomDoorBowsy);
    }, 1500);

    if(randomDoorBowsy !== randomDoorBowser){
        $(".door" + randomDoorBowsy).append(`<img src="assets/bowser0.png" class="character bowsy" alt="">`); //adds the html of Bowsy to DOM
        setTimeout(function () { //removes Bowsy after 1 second
            $('img').remove();
        }, 900)
    }

}
const bowserAppears = setInterval(bowserAppear, 3500); //Bowser will appear every 2.5 seconds
const bowsyAppears = setInterval(bowsyAppear, 1500); //Bowsy will appear every 2.5 seconds


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
        //D Key
        if (keypress.keyCode === 68) {
            //add a class of doorSelected to show that it was selected
            $(".key68").addClass('doorSelected');
            bowserLocation = 1;
        }
        //K Key
        if (keypress.keyCode === 75) {
            //add a class of doorSelected to show that it was selected
            $(".key75").addClass('doorSelected');
            bowserLocation = 2;
        }
        //L Key
        if (keypress.keyCode === 76) {
            //add a class of doorSelected to show that it was selected
            $(".key76").addClass('doorSelected');
            bowserLocation = 3;
        }
    })
    //removes class of doorSelected when user lifts keys
    $(document).keyup(function () {
        $('.key83').removeClass('doorSelected');
        $('.key68').removeClass('doorSelected');
        $('.key75').removeClass('doorSelected');
        $('.key76').removeClass('doorSelected');
    });
}



//SET UP SCORING SYSTEM ==============================

score = [0];
let newScore, key76, key83, key68, key75;

function bowserInDoor() {
    let locationValue = $('.door' + bowserLocation).find('img').val();
    if (locationValue === undefined) { //Someone is not there and correct key is selected
        score--;
        $('audio').get(1).play();
    } else if (locationValue === '') { //Someone is there and correct key is selected
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
    console.log(bowser);
    console.log(bowsy)
}


//if door = bowser/bowsey.length 1 = they are there
const bowserPoints = function () {
    if (bowser === 1){ //bowser is there
        score += 2;
        console.log('bowser is there');
    }
    if(bowsy === 1) {
        score++;
        console.log('bowsy is there');
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