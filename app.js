/*next thing I need to do is:
    1. configure startTimer(), pauseTimer() and resetTimer() functions - 90% DONE, need to repair the Play because if you click the play twice the timer will go 2 times faster
    2. when break is clicked, chenge the time to 5 minutes; when pomodoro is clicked, change the time to 25
        - maybe via tabs or just simple js code
*/

var minutes = 25;   //set time in minutes

var count = minutes * 60; //multiply minutes by 60 to get seconds
var countReset = count;

var counter;

function printOut() {
    var minutes = Math.floor(count / 60); //get minutes left
    var seconds = count % 60; //get how many seconds are left with modulus (%)

    //if seconds are less then 10, add 0 and then the number left
    //example: 0:9 seconds are left; add 0 in front of 9; we'll get 0:09 seconds left
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //print out to HTML document - minutes:seconds
    document.getElementById("timer").innerHTML = minutes + ":" +seconds;
}

function timer() {

    printOut();
    
    if (count == 0) {
        //if count is 0, stop the counter
        clearTimeout(counter);
        console.log("stop");
    } else {
        //else - continue the timer
        count--;
        counter = setTimeout(timer, 1000)
        console.log("continue");
    }
}

function pauseTimer() {
    //pause the timer by clearing the Timeout
    clearTimeout(counter);
    console.log("pause");
}

function resetTimer() {
    //reset the timer by clearing the timeout, then changing the number value to the default value and printing out the default value
    clearTimeout(counter);
    count = countReset;
    printOut();
    console.log("reset")
}