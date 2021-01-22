
function getTime() {
    let currentDate = new Date();
    document.getElementById("showTime").innerHTML = "" + (currentDate.getHours()<10?"0":"")+currentDate.getHours()+":"+(currentDate.getMinutes()<10?"0":"")+currentDate.getMinutes()+":"+(currentDate.getSeconds()<10?"0":"")+currentDate.getSeconds();
    setTimeout(getTime, 1000);
}

function getDate() {
    let currentDate = moment();
    document.getElementById("showDate").innerHTML = "" + currentDate.format("DD MMM YYYY");
    setTimeout(getDate, 1000);
}

function callTimeDate() {
    getTime();
    getDate();
}
document.getElementById("stopwatch").innerHTML = "00:00:00:00";
class Stopwatch {
    hour = 0;
    minute = 0;
    second = 0;
    milisecond = 0;
    timerId;
    start() {
        document.getElementById("stopwatch").innerHTML = "" + (this.hour < 10 ? "0" : "") + this.hour + ":" + (this.minute < 10 ? "0" : "") + this.minute + ":" + (this.second < 10 ? "0" : "") + this.second + ":" + String(this.milisecond).slice(0, 2);
        this.milisecond += 10;
        if (this.milisecond == 1000) {
            this.milisecond = 0;
            this.second += 1;
        }
        if (this.second == 60) {
            this.second = 0;
            this.minute += 1;
        }
        if (this.minute == 60) {
            this.minute = 0;
            this.hour += 1;
        }
        this.timerId = setTimeout(start, 10);
    }
    stop() {
        clearTimeout(this.timerId);

    }
    resume() {
        this.start();
    }
    reset() {
        this.stop();
        this.hour = 0;
        this.milisecond = 0;
        this.minute = 0;
        this.second = 0;
        document.getElementById("stopwatch").innerHTML = "00:00:00:00";
    }

}
let st = new Stopwatch();



function start() {
    st.start();
    document.getElementById("stop").disabled=false;
    document.getElementById("resume").disabled=true;
    document.getElementById("start").disabled=true;
    document.getElementById("reset").disabled=false;
}
function stop() {
    st.stop();
    document.getElementById("stop").disabled=true;
    document.getElementById("resume").disabled=false;
    document.getElementById("start").disabled=true;
    document.getElementById("reset").disabled=false;
}
function resume() {
    st.resume();
    document.getElementById("stop").disabled=false;
    document.getElementById("resume").disabled=true;
    document.getElementById("start").disabled=true;
    document.getElementById("reset").disabled=false;
}
function reset() {
    st.reset();
    document.getElementById("stop").disabled=true;
    document.getElementById("resume").disabled=true;
    document.getElementById("start").disabled=false;
    document.getElementById("reset").disabled=true;
}