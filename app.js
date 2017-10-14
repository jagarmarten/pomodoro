/*
next do to: 1. add a sound at the end of the timer - it should be peaceful and easy
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

    $("#audio").trigger('load');

    //function that takes 3 arguments - name of button1, button2 and class name we want to remove
    //we're using this function for styling reasons
    function classRemover(button1, button2, className) {
        //if button1 has className and button2 has className too then continue
        if(button1.hasClass(className) || button2.hasClass(className)) {
            //remove className from button1 and button2
            button1.removeClass(className);
            button2.removeClass(className);
        }
    }

    //audio function takes 1 argument
    function audio(task) {
        //if task == play
        if(task == "play") {
            $("#audio").trigger("play"); //play audio
        }

        //if task == stop
        if(task == "stop") {
            $("#audio").trigger("pause"); //pause the audio
            $("#audio").prop("currentTime", 0); //set the time to 0 (reset it)
        }
    }
    
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
        play.prop("disabled", true); //we're disabling the button, to prevent users from clicking it twice
    
        clearTimeout(counter); //clear the timeout first
        printOut(); //calling for printOut(); function

        //.active class adds some fancy styles to the button
        play.addClass("active"); //add class active to play button
        
        classRemover(pause, reset, "active"); //remove class active from pause and reset buttons

       //timer
        //play.prop('disabled', true);
        if (count == 0) {
            //if count is 0, stop the counter
            clearTimeout(counter); //clear the timeout

            audio("play"); //play audio

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
        play.prop("disabled", false);

        classRemover(play, reset, "active"); //remove class active from play and reset buttons
    
        clearTimeout(counter); //pause the timer by clearing the Timeout

        audio("stop"); //stop audio
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
        play.prop("disabled", false);

        classRemover(play, pause, "active"); //remove class active from play and pause buttons

        //reset the timer by clearing the timeout, then changing the number value to the default value and printing out the default value
        clearTimeout(counter); //clear timeout
        timerReset(); //timer reset value
        printOut(); //printout the time left

        audio("stop"); //stop audio
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
            removeClasses(); //remove class active from play, pause and reset buttons

            audio("stop"); //stop audio
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
            removeClasses(); //remove class active from play, pause and reset buttons

            audio("stop"); //stop audio
        }
    });
});