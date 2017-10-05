/*next thing I need to do is:
    1. configure startTimer(), pauseTimer() and resetTimer() functions
    2. when break is clicked, chenge the time to 5 minutes; when pomodoro is clicked, change the time to 25
        - maybe via tabs or just simple js code
*/

var minutes = 25;   //set time in minutes

var count = minutes * 60; //multiply minutes by 60 to get seconds

var counter=setInterval(timer, 1000); //counter will update every 1 second (1000 miliseconds)

function timer() {
    var minutes = Math.floor(count / 60); //get minutes left
    var seconds = count % 60; //get how many seconds are left with modulus (%)

    count--; //decrement by 1

    //if seconds are less then 10, add 0 and then the number left
    //example: 0:9 seconds are left; add 0 in front of 9; we'll get 0:09 seconds left
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //if count is less then 0, stop the interval
    if (count < 0) {
         clearInterval(counter);
    }

    //print out to HTML document
    document.getElementById("timer").innerHTML = minutes + ":" +seconds; // watch for spelling
    //Do code for showing the number of seconds here
}