
//SET UP MAIN GAMEPLAY PAGE ==========================

let score = [];
const doors = [".door1", "2"];
const characters = {
    bad: [
        {
            name: "Bowser",
            points: -5,
        }
    ]
}

        
//2. Set up appearances of bad character
    //PUT IT IN A LOOP after scoring system is set up. While score =< 15 || > 0,

let randomDoor; //selects a random array number
    
const badCharAppear = function (){

    setInterval(function () { //calls a random door every second
        randomDoor = Math.floor(Math.random() * doors.length)
    }, 1000);

    $(".door" + randomDoor).append(`<img src="assets/bowser1.png" class="character" alt="">`); //adds the html of Bowser to DOM

    setTimeout(function() { //removes Bowser after 1 second
        $('img').remove();
    },1000)
}

// setInterval(badCharAppear, 2500); //Bowser will appear every 2.5 seconds

//SET UP USER CONTROLS ===============================

//PROBLEM - key presses don't always work!!!!!

//1. Set up key presses
    //for spacebar(to start)

//FOR S KEY
$(document).on("keydown", function(keypress){
    if (keypress.keyCode === 83){
        //add a class of doorSelected to show that it was selected
        $(".key83").addClass('doorSelected');
    }
})

//removes class of doorSelected when user lifts keys
$(document).keyup(function() {
    $('.key83').removeClass('doorSelected');
});

//FOR L KEY
$(document).on("keydown", function(keypress){
    if (keypress.keyCode === 76){
        //add a class of doorSelected to show that it was selected
        $(".key76").addClass('doorSelected');
    }
})

//removes class of doorSelected when user lifts keys
$(document).keyup(function() {
    $('.key76').removeClass('doorSelected');
});

    //s = 83
    //l = 76
    //space = 32

//SET UP SCORING SYSTEM ==============================

score = [0];
let newScore;

//PROBLEM = must continously check if key has been selected. put in function??
// let key76Selected = $(".key76").hasClass('doorSelected'); //l key
// let key83Selected = $(".key83").hasClass('doorSelected'); //s key
let key76;

let key76Selected = function(){
    key76 = $(".key76").hasClass('doorSelected');
}

let key83;

let key83Selected = function(){
    key83 = $(".key83").hasClass('doorSelected');
}

// setInterval(function(){
//     key76Selected();
//     console.log(key76)
// }, 1);
//Function that checks if Bowser is in door 1
function bowserInDoor0 () { //S KEY
    //If the img of Bowser found in a door, get the value
    let bowserIsThere0 = $('.door0').find('img').val();
    if (bowserIsThere0 === undefined || key83Selected === true){ //Bowser is not there and S key is selected
        score--;
    } else if(bowserIsThere0 === '' || key83Selected === true) { //Bowser is there and S key is selected
        score++;
        console.log('bowser is there and key selected at same time');
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//Function that checks if Bowser is in door 2
function bowserInDoor1() { //L KEY
    //If the img of Bowser found in a door, get the value
    let bowserIsThere1 = $('.door1').find('img').val();
    if (bowserIsThere1 === undefined || key76 === true) { //Bowser is not there
        score--;
    } else if (bowserIsThere1 === '' || key76 === true) { //Bowser is there
        score++;
    }
    $('.score').html(`${score}`); //updates the score in the DOM
}

//2. If user presses S or L, check if Bowser is there and update score
$(document).on("keydown", function (keypress) {
    if (keypress.keyCode === 83 || keypress.keyCode === 76){
        key76Selected();
        key83Selected();
        bowserInDoor0();
        bowserInDoor1();
    }
})

//3. If score === 0, show loser screen
//4. If score >= 50, show winner screen
        
//DISPLAY FINAL SCREENS (WIN/LOSE)====================
//1. Reset score
//2. Reset spacebar function

//to stop interval, try clearInterval()

//SET UP GAMEPLAY SPEED (stretch) ====================

//SET UP CHARACTER ACTIONS (stretch) =================

    //1. Scoring system for each character