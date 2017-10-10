//start javascript only after the DOM's loaded
$(document).ready(function() {

    var minutes = 25;   //set time in minutes
    var count = minutes * 60; //multiply minutes by 60 to get seconds
    var countReset = count;
    
    var counter; //counter variable I'm using later
    var do_something = false;
    
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
        //$("#timer").innerHTML = minutes + ":" +seconds;
    }

    //print out the time left to <p id="timer"></p>
    $("#timer").text(printOut());

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
    });
    
    function click_handler() {
        do_something = true; //this checks if the function is already running, if true you won'r be able to click the button play twice
    }
    
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
        count = countReset;
        printOut(); 
        console.log("reset"); //console.log the event
    });
});