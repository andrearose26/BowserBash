
//SET UP MAIN GAMEPLAY PAGE ==========================
    //1. Set up arrays
        //Create an array holding all the doors
        let score = [];
        const doors = [".door1", "2"];
        //Create an array holding all of the characters, dividing into good and bad
        const characters = {
            bad: [
                {
                    name: "Bowser",
                    points: -5,
                }
            ]
        }

        // console.log(characters.bad[0].name); //Bowser
        
    //2. Set up appearances of bad character

    //PUT IT IN A LOOP after scoring system is set up. While score =< 15 || > 0,

        //Randomly select a door
        let randomDoor = Math.floor(Math.random() * doors.length); //array number
        
        //need to randomize again after each setTimeout
        
        //creates an event where Bowser appears every 3 seconds
        const badCharAppear = function (){
            //adds the html of Bowser to DOM
            $(".door" + randomDoor).append(`<img src="assets/bowser1.png" class="character" alt="">`);

            //Removes Bowser after 1 second
            setTimeout(function(){
                $('img').remove();
            },1000)
        }

        // setInterval(badCharAppear, 2500);

//SET UP USER CONTROLS ===============================

//1. Set up key presses
    //for spacebar(to start)

    //FOR S KEY
    $(document).on("keydown", function(keypress){
        if (keypress.keyCode === 83){
            //add a class of doorSelected to show that it was selected
            $(".key83").addClass('doorSelected');
        }
    })
    
    //remove class of doorSelected when user lifts keys
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
    
    //remove class of doorSelected when user lifts keys
    $(document).keyup(function() {
        $('.key76').removeClass('doorSelected');
    });
    //if there is an image AND a class of door selected = 3 points


    //s = 83
    //l = 76
    //space = 32

//SET UP SCORING SYSTEM ==============================

score = [0];
let newScore;

let key76Selected = $(".key76").hasClass('doorSelected');
let key83Selected = $(".key83").hasClass('doorSelected');

//1. Create a function that checks if someone is in the div

        //Have to get this to run continuously? Can put in loop While score =< 15 || > 0, call the function
function isBowserThere () {
    //Is the img of Bowser found in a door, get the value
    let bowserIsThere = $('.door').find('img').val();
    
    if (bowserIsThere === undefined && (key76Selected === true || key83Selected === true) ){ //Bowser is not there
        newScore = score.map(function() {
            return score = parseInt(score - 3);
        });
        console.log('no Bowser and selected wrong door')
    } else { //Bowser is there
        newScore = score.map(function() {
            return score = parseInt(score + 3);
        });
    }
    $('.scoreTitle').append(`<p>${score}</p>`);
}

while (score >= 0 || score <= 10 ){
    isBowserThere();
    console.log('something')
}

//2. If there is a correct keypress, add 3 points to overall score. 
    //Find which div Bowser is in
    //if keypress while Bowser is in div, score add 3 points
//3. If score === 0, show loser screen
//4. If score >= 50, show winner screen
        
//DISPLAY FINAL SCREENS (WIN/LOSE)====================
//1. Reset score
//2. Reset spacebar function

//to stop interval, try clearInterval()

//SET UP GAMEPLAY SPEED (stretch) ====================

//SET UP CHARACTER ACTIONS (stretch) =================

    //1. Scoring system for each character