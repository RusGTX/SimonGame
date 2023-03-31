var buttonColors = [ "red", "blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

//keep track of whether if the game has started or not
var started = false;

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$( document ).keypress( function () {

    if ( !started )
    {
        //when the game has started, change this to say "Level 0"
        $( "#level-title" ).text( 'Level ' + level );
        nextSequence();
        started = true;
    }

} )



//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$( '.btn' ).click( function () {

    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $( this ).attr( 'id' );
    // ADD created variable to the end of this new userClickedPattern
    userClickedPattern.push( userChosenColour );

    //play sound by clicking the button
    playSound( userChosenColour );
    //animate pressed button
    animationPress( userChosenColour );

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer( userClickedPattern.length - 1 );

} )


function nextSequence () {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //increase level by 1 every time nextSequence() is called
    level++;

    //update h1 with the change of level
    $( "#level-title" ).text( 'Level ' + level );

    //generate a random number between 0 and 3
    var randomNumber = Math.floor( Math.random() * 4 );

    //select random colors from the buttonColors array
    var randomChoosenColor = buttonColors[ randomNumber ];

    //add generated pattern to the end of the gamePatter
    gamePattern.push( randomChoosenColor );

    $( "#" + randomChoosenColor ).fadeOut( 100 ).fadeIn( 100 ).fadeOut( 100 ).fadeIn( 100 );

    //play sound by clicking color
    playSound( randomChoosenColor );

    //animate pressed button
    animationPress( randomChoosenColor );


    console.log( randomChoosenColor )

}



function checkAnswer ( currentLevel ) {

    //3.if the most recent user answer is the same as the game pattern - If so then log "success", otherwise log "wrong".

    if ( gamePattern[ currentLevel ] === userClickedPattern[ currentLevel ] )
    {
        console.log( 'success' );
        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if ( userClickedPattern.length === gamePattern.length )
        {
            // Call nextSequence() after a 1000 millisecond delay
            setTimeout( () => {
                nextSequence();
            }, 1000 )

        }

    } else
    {
        //play this sound if the user got one of the answers wrong
        playSound( 'wrong' );

        //apply this class to the body of the website when the user gets one of the answers wrong        
        $( 'body' ).addClass( 'game-over' );
        //and then remove it after 1000 milliseconds
        setTimeout( () => {
            $( 'body' ).removeClass( 'game-over' )
        }, 1000 )

        $( "#level-title" ).text( 'Game Over, Press Any Key To Restart' );

        console.log( 'wrong' );

        restartGame();
    }
}

//PLAY SOUNDS
function playSound ( name ) {
    var audio = new Audio( 'sounds/' + name + '.mp3' );
    audio.play();
}


function animationPress ( currentColor ) {

    //add class "pressed" to cliked button
    $( "#" + currentColor ).addClass( 'pressed' );

    //remove class after 100s
    setTimeout( () => {
        $( "#" + currentColor ).removeClass( 'pressed' )
    }, 100 );

}


//RESTARTING THE GAME
function restartGame () {
    //reseting the values;
    level = 0;
    gamePattern = [];
    started = false;
}