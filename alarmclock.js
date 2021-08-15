const time = document.getElementById("clock");
const onOff = document.getElementById("onoff");
const inputTime = document.getElementById("timeInput");
const btn = document.getElementById("button-addon2");
const alarmSound = document.getElementById("alarmSound");
const alarms = document.getElementById("alarms");

let hour = new Date().getHours();
let times = [];
let html = "";


times = JSON.parse(localStorage.getItem("key"));

onOff.addEventListener("click", function () {
  alarmSound.volume==1 ? alarmSound.volume=0: alarmSound.volume=1;
  alarmSound.volume==1
    ? (onOff.innerHTML = `Alarm ON <i class="fas fa-bell"></i>`)
    : (onOff.innerHTML = `Alarm OFF <i class="far fa-bell-slash"></i>`);

    
});

btn.addEventListener("click", function () {
  let val = inputTime.value;

  if (val == "") return alert("select time!!!");

  let obj = {
    hour: val[0] + val[1],
    min: val[3] + val[4],
  };

  times.unshift(obj);

  inputTime.value = "";

  localStorage.clear();

  localStorage.setItem("key", JSON.stringify(times)); //you cant store arrey or object in local storage only string
  showAlarms();
  alarm();
});

engine();

function engine() {
  showtime();
  alarm();

  setInterval(() => {
    showtime();
    
  }, 1000);

  showAlarms();
}

function showtime() {
  let cTime =
    correct(hour)[0] +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds() +
    " " +
    correct(hour)[1];

  time.innerHTML = cTime;
}

function alarm() {
  times.forEach((e) => {
    let a = e.hour * 3600 + e.min * 60;
    let b = hour * 3600 + (new Date().getMinutes())*60 + new Date().getSeconds();
    console.log( (a-b) * 1000);

    if(a-b <0) return;
    
    setTimeout(() => {

     alarmSound.play();
      console.log("alarm Playing", (a-b) * 1000);
    }, (a-b) * 1000);
   
  });
}

function showAlarms() {
  html = "";
  let val;
  times.forEach((e, index) => {
    val = correct(e.hour);

    html += ` <br> Alarm at ${val[0]}:${e.min} ${val[1]} <button class="btn btn-outline-secondary"  onClick='del(${index})' > Delete </button>`;

    console.log("showAlarms called");
  });
  alarms.innerHTML = html;
}

function del(i) {
  times.splice(i, 1);
  localStorage.clear();
  localStorage.setItem("key", JSON.stringify(times));
  showAlarms();
}

// am pm correction
function correct(hr) {
  if (hr < 12 && hr != 0) return [hr, "AM"];

  if (hr == 0) return [12, "AM"];
  if (hr == 12) return [12, "PM"];
  return [hr - 12, "PM"];
}


