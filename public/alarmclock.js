const time = document.getElementById("clock");
const onOff = document.getElementById("onoff");
const inputTime = document.getElementById("timeInput");
const btn = document.getElementById("button-addon2");
const alarmSound = document.getElementById("alarmSound");
const alarms = document.getElementById("alarms");

let hour = new Date().getHours();
let alarmTime = { hour: 0, min: 0 };
let times = [];
let html = "";

let ampm = "AM";
let alarmOn = true;
let par = "";



JSON.parse(localStorage.getItem("key")) == null
  ? ampm
  : (times = JSON.parse(localStorage.getItem("key")));

onOff.addEventListener("click", function () {
  alarmOn == true ? (alarmOn = false) : (alarmOn = true);
  alarmOn == true
    ? (onOff.innerHTML = `Alarm ON <i class="fas fa-bell"></i>`)
    : (onOff.innerHTML = `Alarm OFF <i class="far fa-bell-slash"></i>`);
});

btn.addEventListener("click", function () {
 
  let val= inputTime.value
    alarmTime.hour = val[0]+val[1];
    alarmTime.min = val[3]+val[4];

    if(inputTime.value != ''){

    times.push(JSON.stringify(alarmTime));

    inputTime.value = "";

    localStorage.setItem("key", JSON.stringify(times)); //you cant store arrey or object in local storage only string
    showAlarms();
}
});

engine();

function engine() {


  setInterval(() => {
    showtime();
    alarm();
  }, 1000);
  
  showAlarms();
}

function showtime() {
  
  if (hour >= 12) {
    hour = hour - 12;
    
    ampm = "PM";
  } 
  let temp='';
  hour==0? temp=12:temp=hour;
  let cTime =
     temp +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds() +
    " " +
    ampm;

  time.innerHTML = cTime;
}

function alarm() {
  times.forEach((e) => {
    par = JSON.parse(e);

    if (
      par.hour == new Date().getHours() &&
      par.min == new Date().getMinutes()
    ) {
      if (alarmOn) {
        alarmSound.play();
        console.log("audio playing");
      }
    }
  });
}

function showAlarms() {
  html = "";
  let amorpm='PM'
  let temp='';
  times.forEach((e) => {
    par = JSON.parse(e);

    temp=par.hour;

    par.hour>=12 ? temp = par.hour-12 : amorpm='AM';

    temp==0? temp=12:1;

    html += ` <br> Alarm at ${temp}:${par.min} ${amorpm} <button class="btn btn-outline-secondary"  onClick='del(${par.hour},${par.min})' > Delete </button>`;

    console.log("showAlarms called");
  });
  alarms.innerHTML = html;
}


function del(h,m){

    
    let hr=0;
    let min=0;

  for (let i=0; i< times.length;) {

    hr=JSON.parse(times[i]).hour;
    min= JSON.parse(times[i]).min;

    if ( hr==h && min==m ) {
      times.splice(i, 1);
      console.log(hr==h,min==m);

     localStorage.clear();
     localStorage.setItem("key", JSON.stringify(times));
     showAlarms();
    
    } 
    else {
      ++i;
    }
  }
}
