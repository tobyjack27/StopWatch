// ––– elements –––
// variables
const   display = document.getElementById("display"),
        startBtn = document.getElementById("startStop"),
        resetBtn = document.getElementById("reset"),
        timerBtns = document.getElementsByClassName("timerBtn");
var status = "stopped",
    timers = [],
    displTimers = [];
for(let i=0; i<3; i++){
    timers.push([0,0,0,0]);
    displTimers.push(["00","00","00", "00"]);
};
var currentTimer = 0;

// ––– set up buttons –––
startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
for(let i=0; i<timerBtns.length; i++){
    timerBtns[i].addEventListener('click', () =>{
        for(let j of timerBtns){
            j.classList.remove('selected');
        };
        currentTimer = i;
        timerBtns[i].classList.add('selected');
        setDisplay()
    })
};

// ––– functions ––––
//start/stop button
function startStop(){
    if(status === 'stopped'){
        start()
    } else {
        stop()
    }
}

//reset clock
function reset(){
    if(status === 'running'){
        stop();
    }
    timers[currentTimer] = [0,0,0,0]
    setDisplay();
}

//start current timer
function start(){
    status = "running";
    interval = window.setInterval(stopWatch, 10);
    startBtn.textContent = "Stop"
    startBtn.classList.add("selected");
}

//stop current timer
function stop(){
    status = "stopped";
    window.clearInterval(interval);
    startBtn.textContent = "Start"
    startBtn.classList.remove("selected");
}

//stop watch functionality
function stopWatch(){
    timers[currentTimer][0]++;
    if(timers[currentTimer][0] === 100){
        tick(0);
    } if(timers[currentTimer][1] === 60){
        tick(1);
    } if(timers[currentTimer][2] === 60){
        tick(2);
    }
    setDisplay()
}

function tick(num){
    timers[currentTimer][num] = 0;
    timers[currentTimer][num+1]++;
}

//update displayed time
function setDisplay(){
    time = standardiseTimes()
    display.textContent = time;
    timerBtns[currentTimer].textContent = time;
}

//add extra '0's to display text where required
function standardiseTimes(){
    let t = timers[currentTimer];
    let d = displTimers[currentTimer]
    for(let i=0; i<4; i++){
        if(t[i]<10){
            d[i] = `0${t[i]}`
        }
        else {
            d[i] = t[i];
        }
    }
    return `${d[3]}:${d[2]}:${d[1]}:${d[0]}`;
}

