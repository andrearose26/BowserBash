//SET UP MAIN GAMEPLAY PAGE ==========================
let score = []; //only doors and score REALLY needed

const doors = [".door0", ".door1", ".door2", ".door3"];


//When document starts, do the following: 
$(document).ready(function () {
    $('#game').hide(); //hide the game div
    keyFunction(); //- activate keys
    winOrLose(); //- start checking the score
    
    $(document).on("keydown", function (keypress) { //when the spacebar is pressed
        if (keypress.keyCode === 32) {
            $('#start').hide(); //- hide start page
            $('#game').show(); //- show game page
            speeds(); //set speed timer
        }
    })
})



//CONTROL CHARACTER APPEARANCES ============================

let randomDoorBowser, randomDoorBowsy, randomDoorMario, randomDoorWario, bowserSpeed, bowsySpeed, marioSpeed, warioSpeed; //selects a random door number from the doors array
bowserSpeed = 5000; //sets original speeds
bowsySpeed = 2500;
marioSpeed = 2000;
warioSpeed = 3500;

const doorGenerator = function() { //generates a random number whenever a character appears

    setInterval(function () { //calls a random door whenever Bowser appears
        randomDoorBowser = Math.floor(Math.random() * doors.length);
    }, bowserSpeed);
    
    setInterval(function () { //calls a random door whenever Bowsy appears
        randomDoorBowsy = Math.floor(Math.random() * doors.length);
    }, bowsySpeed);

    setInterval(function () { //calls a random door whenever Mario appears
        randomDoorMario = Math.floor(Math.random() * doors.length);
    }, marioSpeed);

    setInterval(function () { //calls a random door whenever Wario appears
        randomDoorWario = Math.floor(Math.random() * doors.length);
    }, warioSpeed);
}

const bowserAppear = function () { //Function makes Bowser appear randomly in a door

    if (randomDoorBowser !== randomDoorBowsy && randomDoorBowser !== randomDoorMario && randomDoorBowser !== randomDoorWario){ //if Bowser's door !== any other character's door
        $(".door" + randomDoorBowser).append(`<img src="assets/bowser1.png" class="character bowser" alt="">`); //add the html of Bowser to DOM
    
        setTimeout(function () { //removes Bowser after a period of time
            $('.bowser').remove();
        }, 800)
    }
}

const bowsyAppear = function () { //Function makes Bowsy appear randomly in a door

    if (randomDoorBowsy !== randomDoorBowser && randomDoorBowsy !== randomDoorMario && randomDoorBowsy !== randomDoorWario) { //if Bowsy's door !== another character's door
        $(".door" + randomDoorBowsy).append(`<img src="assets/bowser0.png" class="character bowsy" alt="">`); //adds the html of Bowsy to DOM
        setTimeout(function () { //removes Bowsy after a period of time
            $('.bowsy').remove();
        }, 900)
    }
}

const marioAppear = function () { //Function makes Mario appear randomly in a door

    if (randomDoorMario !== randomDoorBowsy && randomDoorMario !== randomDoorBowser && randomDoorMario !== randomDoorWario) { //if Mario's door !== another character's door
        $(".door" + randomDoorMario).append(`<img src="assets/mario0.png" class="character mario" alt="">`); //adds the html of Mario to DOM
        setTimeout(function () { //removes Mario after a period of time
            $('.mario').remove();
        }, 900)
    }
}

const warioAppear = function () { //Function makes Wario appear randomly in a door

    if (randomDoorWario !== randomDoorBowsy && randomDoorWario !== randomDoorBowser && randomDoorWario !== randomDoorMario) { //if Wario's door !== another character's door
        $(".door" + randomDoorWario).append(`<img src="assets/mario1.png" class="character wario" alt="Angry Wario">`); //adds the html of Wario to DOM
        setTimeout(function () { //removes Wario after a period of time
            $('.wario').remove();
        }, 900)
    }
}

let level = 1;
let increment = 1;

const speeds = function () { //holds speeds changes for characters

    //original speeds can be found under Character Appearances heading

    const speedIncrease = setInterval(function(){
        bowserSpeed = bowserSpeed - 750;
        bowsySpeed = bowsySpeed - 300;
        marioSpeed = marioSpeed - 200;
        warioSpeed = warioSpeed - 400;
        level = level + increment;
        $('.level').text(`Level ${level}`);
        $('audio').get(2).play();
    }, 9000)

    setTimeout(function(){
        clearInterval(speedIncrease)
    }, 60500) //stops speeds from increasing any further after 1 minute
}

const makeCharactersAppear = function() { //makes all previous functions run at the intervals previously set
    doorGenerator();
    setInterval(bowserAppear, bowserSpeed); //Calls functions at different interval
    setInterval(bowsyAppear, bowsySpeed); 
    setInterval(marioAppear, marioSpeed);
    setInterval(warioAppear, warioSpeed);
}

makeCharactersAppear();

//SET UP USER CONTROLS ===============================

//KEY PRESSES
let characterLocation; //equal to door number where user presses

const keyFunction = function () { //when the S, D, K or L keys are pressed, do the following:
    $(document).on('keydown', function (keypress) {
        //S Key
        if (keypress.keyCode === 83) {
            $('.key83').addClass('doorSelected'); //add a class of doorSelected to show that it was selected 
            $('.sKey').replaceWith(`<img src="assets/keys/sKeyPress.svg" alt="S key selected" class="key sKey desktop">`); //change the key graphic to look selected
            characterLocation = 0; //set character location to first door
        }
        //D Key
        if (keypress.keyCode === 68) {
            $(".key68").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.dKey').replaceWith(`<img src="assets/keys/dKeyPress.svg" alt="D key selected" class="key dKey desktop">`);//change the key graphic to look selected
            characterLocation = 1; //set character location to second door
        }
        //K Key
        if (keypress.keyCode === 75) {
            $(".key75").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.kKey').replaceWith(`<img src="assets/keys/kKeyPress.svg" alt="K key selected" class="key kKey desktop">`);//change the key graphic to look selected
            characterLocation = 2; //set character location to third door
        }
        //L Key
        if (keypress.keyCode === 76) {
            $(".key76").addClass('doorSelected'); //add a class of doorSelected to show that it was selected
            $('.lKey').replaceWith(`<img src="assets/keys/lKeyPress.svg" alt="L key selected" class="key lKey desktop">`);//change the key graphic to look selected
            characterLocation = 3; //set character location to fourth door
        }
    })

    $(document).keyup(function () { 
        //removes class of doorSelected when user lifts keys
        $('.key83').removeClass('doorSelected');
        $('.key68').removeClass('doorSelected');
        $('.key75').removeClass('doorSelected');
        $('.key76').removeClass('doorSelected');

        //return key graphic to unselected
        $('.sKey').replaceWith(`<img src="assets/keys/sKey.svg" alt="S Key on keyboard" class="key sKey desktop">`);
        $('.dKey').replaceWith(`<img src="assets/keys/dKey.svg" alt="D Key on keyboard" class="key dKey desktop">`);
        $('.kKey').replaceWith(`<img src="assets/keys/kKey.svg" alt="K Key on keyboard" class="key kKey desktop">`);
        $('.lKey').replaceWith(`<img src="assets/keys/lKey.svg" alt="L Key on keyboard" class="key lKey desktop">`);
    });
}

//SET UP SCORING SYSTEM ==============================

score = [0]; //sets initial score to 0
let locationValue, key76, key83, key68, key75;
let bowser, bowsy, mario, wario;

const whichCharacter = function () { //calculate whether a character is there
    bowser = $('.bowser').length;
    bowsy = $('.bowsy').length;
    mario = $('.mario').length;
    wario = $('.wario').length;
}

const characterPoints = function () { //sets different point increases/decreases for each character
    if (bowser === 1){ 
        score += 2;
    }
    if(bowsy === 1) {
        score++;
    }
    if(mario === 1) {
        score--;
    }
    if(wario === 1) {
        score -= 2;
    }
}

// let bowsyThere, bowserThere, warioThere, marioThere;

function bowserOrMario() { //determines whether the character in the door is a bowser or mario type on key press
    let bowsyThere = $('.door' + characterLocation).has('.bowsy');
    let bowserThere = $('.door' + characterLocation).has('.bowser');
    let warioThere = $('.door' + characterLocation).has('.wario');
    let marioThere = $('.door' + characterLocation).has('.mario');

    if (warioThere.length === 1) {
        marioInDoor(); //call mario scoring function
    } else if (marioThere.length === 1) {
        marioInDoor();
    } else if (bowsyThere.length === 1){
        bowserInDoor(); //call bowser scoring function
    } else if (bowserThere.length === 1){
        bowserInDoor();
    }
}

function bowserInDoor() { //checks if any Bowser is in the door
    //need separate function bc of bowser and mario have different sound effects

    locationValue = $('.door' + characterLocation).find('img').val(); //determines if someeone is there
    if (locationValue === undefined) { //If someone is not there and key is selected
        score--;
        $('audio').get(1).play(); //play bump sound
    } else if (locationValue === '') { //If someone is there and correct key is selected
        whichCharacter(); //Bowser or Bowsy
        characterPoints(); //assign appropriate points
        $('audio').get(0).play(); //play coin sound
    }

    $('.score').html(`${score}`); //updates the score in the DOM
}

function marioInDoor() { //checks if any Mario is in the door
    locationValue = $('.door' + characterLocation).find('img').val();
    if (locationValue === undefined) { //If someone is not there and correct key is selected
        score--;
        $('audio').get(0).play(); //play coin sound
    } else if (locationValue === '') { //If someone is there and correct key is selected
        whichCharacter();
        characterPoints();
        $('audio').get(1).play(); //play bump sound
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//IDENTIFY IF USER WINS OR LOSES ==============================

//If user presses a key, checks if Bowser is there and updates score 
const winOrLose = function () {
    $(document).on("keydown", function (keypress) {
        if (keypress.keyCode === 83) { //S Key
            bowserOrMario(); //finds out what kind of character is in the door, then determines score
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true); //refreshes page
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }

        if (keypress.keyCode === 68) { //D Key
            bowserOrMario(); //finds out what kind of character is in the door, then determines score
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }

        if (keypress.keyCode === 75) { //K Key
            bowserOrMario(); //finds out what kind of character is in the door, then determines score
            if (score < 0) {
                alert('You lose! Press okay to play again.');
                location.reload(true);
            } else if (score >= 20) {
                alert('You win! Press okay to play again.');
                location.reload(true);
            }
        }
        
        if (keypress.keyCode === 76) { //L Key
            bowserOrMario(); //finds out what kind of character is in the door, then determines score
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
