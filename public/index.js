// elements
const   display = document.getElementById("display"),
        startBtn = document.getElementById("startStop"),
        resetBtn = document.getElementById("reset"),
        timerBtns = document.getElementsByClassName("timerBtn");

// variables
var status = "stopped",
    timers = [],
    displTimers = [];
for(let i=0; i<3; i++){
    timers.push([0,0,0,0]);
    displTimers.push(["00","00","00", "00"]);
};
var timerNo = 0;

// stopwatch functionality

function stopWatch(){
    timers[timerNo][0]++;
    if(timers[timerNo][0] === 100){
        tick(0);
    } if(timers[timerNo][1] == 60){
        tick(1);
    } if(timers[timerNo][2] == 60){
        tick(2);
    }
    setDisplay(timerNo)
}

function tick(num){
    timers[timerNo][num] = 0;
    timers[timerNo][num+1]++;
}

function setDisplay(){
    time = standardiseTimes()
    display.textContent = time;
    timerBtns[timerNo].textContent = time;
}

function standardiseTimes(){
    for(let i=0; i<4; i++){
        if(timers[timerNo][i]<10){
            displTimers[timerNo][i] = `0${timers[timerNo][i]}`
        }
        else {
            displTimers[timerNo][i] = timers[timerNo][i];
        }
    }
    return `${displTimers[timerNo][3]}:${displTimers[timerNo][2]}:${displTimers[timerNo][1]}:${displTimers[timerNo][0]}`;
}

function start(){
    status = "running";
    interval = window.setInterval(stopWatch, 10);
    startBtn.textContent = "Stop"
    startBtn.classList.add("selected");
}

function stop(){
    status = "stopped";
    window.clearInterval(interval);
    startBtn.textContent = "Start"
    startBtn.classList.remove("selected");
}

function startStop(){
    if(status === 'stopped'){
        start()
    } else {
        stop()
    }
}

function reset(){
    if(status === 'running'){
        stop();
    }
    timers[timerNo] = [0,0,0,0]
    setDisplay();
}

// button functionality
startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
for(let i=0; i<timerBtns.length; i++){
    timerBtns[i].addEventListener('click', () =>{
        for(let j of timerBtns){
            j.classList.remove('selected');
        };
        timerNo = i;
        timerBtns[i].classList.add('selected');
        setDisplay()
    })
};