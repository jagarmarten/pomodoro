/*
next do to: 1. add a sound at the end of the timer - it should be peaceful and easy
            2. repair the play button - when the play button is clicked it will add 1 second every time
*/

//start javascript only after the DOM's loaded
$(document).ready(function() {

    var minutes = 25; //default value for time is 25 minutes

    var count = minutes * 60; //multiply minutes by 60 to get seconds
    
    var counter; //counter variable I'm using later
    var do_something = false;

    var pomodoroTime = $("#pomodoro");
    var breakTime =  $("#break");
    var play = $("#play"); //play button
    var pause = $("#pause"); //pause button
    var reset = $("#reset"); //reset button
    
    function printOut() {
        var minutes = Math.floor(count / 60); //get minutes left
        var seconds = count % 60; //get how many seconds are left with modulus (%)
    
        //if seconds are less then 10, add 0 and then the number left
        //example: 0:9 seconds are left; add 0 in front of 9; we'll get 0:09 seconds left
        if (seconds < 10) {
            seconds = "0" + seconds; //it won't be 9 but 09 seconds left
        }
    
        //print out to HTML document - minutes:seconds
        $("#timer").text(minutes + ":" + seconds);
    }

    $("#timer").text(printOut()); //print out the time left to <p id="timer"></p>
    
    //when play button is clicked, do this
    play.click( function timer() {
    
        clearTimeout(counter); //clear the timeout first
        printOut(); //calling for printOut(); function

        //.active class adds some fancy styles to the button
        play.addClass("active"); //add class active to play button
        
        //remove class .active from other elements if they have it
        if(pause.hasClass("active") || reset.hasClass("active")) {
            pause.removeClass("active"); //remove class .active
            reset.removeClass("active"); //remove class .active
        }
        
       //timer
        //play.prop('disabled', true);
        if (count == 0) {
            //if count is 0, stop the counter
            clearTimeout(counter); //clear the timeout
            console.log("stop"); //console.log the event
        } else {
            //else - continue the timer
            if(!do_something) {
                count--; //decrement by 1
                counter = setTimeout(timer, 1000); //set timeout to 1 second
                console.log("continue"); //console.log the event

            } else {
                click_handler();
            }
        }
        //play.prop('disabled', false);
    });
    
    //when pause button is clicked, do this
    pause.click( function pauseTimer() {
        //.active class adds some fancy styles to the button
        pause.addClass("active");  //add class active to pause button
        
        //remove class .active from other elements if they have it
        if(play.hasClass("active") || reset.hasClass("active")) {
            play.removeClass("active"); //remove class .active
            reset.removeClass("active"); //remove class .active
        }
    
        clearTimeout(counter); //pause the timer by clearing the Timeout
        console.log("pause"); //console.log the event
    });

    //timer reset function
    //when you want to reset the break timer, it would reset to 25 minutes, but we wanted it to reset to 5 minutes again
    //this function checks if pomodoro button or break time hasClass activeID, if yes then it prints out the correct reset value for the button
    function timerReset() {
        if(pomodoroTime.hasClass("activeID") == true) {
            count = 25 * 60;
        }

        if(breakTime.hasClass("activeID") == true) {
            count = 5 * 60;
        }
    }
    
    //when reset button is clicked, do this
    reset.click( function resetTimer() {
        //.active class adds some fancy styles to the button
        reset.addClass("active");  //add class active to reset button

        //remove class .active from other elements if they have it
        if(play.hasClass("active") || pause.hasClass("active")) {
            play.removeClass("active"); //remove class .active
            pause.removeClass("active"); //remove class .active
        }

        //reset the timer by clearing the timeout, then changing the number value to the default value and printing out the default value
        clearTimeout(counter); //clear timeout
        timerReset();
        printOut(); 
        console.log("reset"); //console.log the event
    });

    //function to remove classes
    function removeClasses() {
        play.removeClass("active"); //remove class active from play button
        pause.removeClass("active"); //remove class active from pause button
        reset.removeClass("active"); //remove class active from reset button
    }

    //if pomodoro button is clicked then do this
    pomodoroTime.click(function() {

        //if break button has class activeID then do this code
        if(breakTime.hasClass("activeID") == true) {
            clearTimeout(counter); //stop the timeout
            count = 25 * 60; //set the new count value
            printOut(); //print out the new count value

            breakTime.removeClass("activeID"); //remove class activeID from break button
            pomodoroTime.addClass("activeID"); //add class activeID to pomodoro button
            removeClasses();
        }
    });

    //if break button is clicked then do this
    breakTime.click(function() {

        //if pomodoro button has class activeID then do this code
        if(pomodoroTime.hasClass("activeID") == true) {
            clearTimeout(counter); //stop the timeout
            count = 5 * 60; //set the new count value
            printOut(); //print out the new count value

            pomodoroTime.removeClass("activeID"); //remove class activeID from pomodoro button
            breakTime.addClass("activeID"); //add class activeID to break button
            removeClasses();
        }
    });
});