
const Store = require('electron-store');
const store = new Store();  //This allows for tokens to be stored locally

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');

const taskHeaders = new Headers(); //this header will be used for api requests that need the access token and a specification of content
taskHeaders.append('Authorization', 'Bearer ' + accessToken); 
taskHeaders.append('Content-Type', 'application/json');



document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});
//testing
document.addEventListener('DOMContentLoaded', function() {
var calendarEl = document.getElementById('calendar');


fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
  headers: taskHeaders
})
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  let cards = data;

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: []
  });

  // loop through each card
cards.forEach((card) => {

  // get the start and end time for the event
  let startTime = moment(card.start_time, 'HH:mm').format('HH:mm');
  let endTime = moment(card.end_time, 'HH:mm').format('HH:mm');

  // get the days of the week for the event
  let daysOfWeek = [];
  if (card.day_of_week_one === 'Monday' || card.day_of_week_two === 'Monday') {
    daysOfWeek.push(1); // add Monday to the list
  }
  if (card.day_of_week_one === 'Tuesday' || card.day_of_week_two === 'Tuesday') {
    daysOfWeek.push(2); // add Tuesday to the list
  }
  if (card.day_of_week_one === 'Wednesday' || card.day_of_week_two === 'Wednesday') {
    daysOfWeek.push(3); // add Wednesday to the list
  }
  if (card.day_of_week_one === 'Thursday' || card.day_of_week_two === 'Thursday') {
    daysOfWeek.push(4); // add Thursday to the list
  }
  if (card.day_of_week_one === 'Friday' || card.day_of_week_two === 'Friday') {
    daysOfWeek.push(5); // add Friday to the list
  }
  if (card.day_of_week_one === 'Saturday' || card.day_of_week_two === 'Saturday') {
    daysOfWeek.push(6); // add Saturday to the list
  }
  if (card.day_of_week_one === 'Sunday' || card.day_of_week_two === 'Sunday') {
    daysOfWeek.push(0); // add Sunday to the list
  }

  // add the event to the calendar
  calendar.addEvent({
    title: card.name,
    start: startTime,
    end: endTime,
    daysOfWeek: daysOfWeek,
    classNames: ['my-event-class']
  });
});

// render the calendar
calendar.render();

});


});

