// Get DOM elements
const currentTime = document.getElementById("time");
const setAlarm = document.getElementById("setAlarm");
const alarmList = document.getElementById("alarmList");
const stopAlarm = document.getElementById("stopAlarm");
const hourInput = document.getElementById("hour");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const formName = document.getElementById("form-name");
const alarmDelete = document.getElementsByClassName("delete_button");

// Create an audio object and set it to loop
const audio = new Audio("audio.mp3");
audio.loop = true;

// Create an array to store the set alarms
const alarmArray = [];

// Show current time on the screen
function currentTimeShow() {
  const date = new Date();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  // Add leading zero if hour/minute/second is less than 10
  hour = hh < 10 ? "0" + hh : hh;
  min = mm < 10 ? "0" + mm : mm;
  sec = ss < 10 ? "0" + ss : ss;

  // Create a string representation of the current time
  const currTime = `${hour} : ${min} : ${sec}`;

  // Update the current time on the screen
  currentTime.innerText = currTime;

  // If current time matches any of the set alarm times, ring the alarm
  if (alarmArray.includes(currTime)) {
    ringAlarm(currTime);
  }
}

// Call currentTimeShow every second to update the current time on the screen
setInterval(currentTimeShow, 1000);

// Set an alarm when the Set Alarm button is clicked
setAlarm.addEventListener("click", (e) => {
  e.preventDefault();

  // Get the hour, minute, and second values entered by the user
  const alarmHour = parseInt(hourInput.value);
  const alarmMinute = parseInt(minutesInput.value);
  const alarmSecond = parseInt(secondsInput.value);

  // Check if the entered time is valid
  if (
    isNaN(alarmHour) ||
    isNaN(alarmMinute) ||
    isNaN(alarmSecond) ||
    alarmHour < parseInt(hourInput.min) ||
    alarmHour > parseInt(hourInput.max) ||
    alarmMinute < parseInt(minutesInput.min) ||
    alarmMinute > parseInt(minutesInput.max) ||
    alarmSecond < parseInt(secondsInput.min) ||
    alarmSecond > parseInt(secondsInput.max)
  ) {
    alert("The entered time is not correct");
    return;
  }

  // Create a string representation of the alarm time
  const alarmTime = `${alarmHour.toString().padStart(2, "0")} : ${alarmMinute
    .toString()
    .padStart(2, "0")} : ${alarmSecond.toString().padStart(2, "0")}`;

  // Check if the alarm time is already in the alarmArray
  if (!alarmArray.includes(alarmTime)) {
    // Add the alarm time to the alarmArray
    alarmArray.push(alarmTime);
    // Create a list item to display the alarm time and a delete button
    const list = document.createElement("li");
    list.classList.add("upcoming_alarms");
    const del = document.createElement("div");
    del.innerText = "Delete";
    del.classList.add("delete_button");
    list.innerText = alarmTime;
    list.append(del);
    alarmList.append(list);

    // Reset the form
    formName.reset();
  } else {
    alert(`Alarm already exists in the list`);
  }
});

// Ring the alarm when the current time matches an alarm time
function ringAlarm(alarmTime) {
  audio.onplay = () => {
    alert("Wake up"); // Alert the user when the alarm starts ringing
  };
  audio.play();
}

// Stop the alarm when the Stop Alarm button is clicked
stopAlarm.addEventListener("click", () => {
  audio.pause();
});

// Remove an alarm from the list and the alarmArray when the delete button is clicked
alarmList.addEventListener("click", (e) => {
  e.target.parentElement.remove();
  alarmArray.pop();
});
