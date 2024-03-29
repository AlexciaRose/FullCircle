console.log('JavaScript file is being loaded');

const { ipcRenderer } = require('electron');
/*
// Submit the form and save the data to localStorage
function saveFormData(formId, inputFields){
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    // Empty object to store form data
    const dataObject = {};

    // Stores the field name and value in the dataObject
    inputFields.forEach(function(field){
        const value = formData.get(field);
        dataObject[field] = value;
      });

    const dataString = JSON.stringify(dataObject);
    // Saves the JSON string
    store.setItem(`${formId}-data`, dataString);
}


const form = document.getElementById('create-account');
// Attaches an event listener to the form's submit event
form.addEventListener('submit', function(event) {
  event.preventDefault();
  saveFormData('create-account', ['FirstName', 'LastName', 'UserEmail', 'UserPassword']);
  window.location.href = "student.html";
});


// Retrieve data from localStorage
const createformData = JSON.parse(store.getItem('create-account-data'));

if (createformData && createformData.FirstName) {
  // Get the first name from the data
  const firstName = createformData.FirstName;

  // Update the welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${firstName}!`;
} 

/*
// Collect data from student form
const studentForm = document.getElementById('student-form');

// Attach event listener to form submit event
studentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  saveFormData('student-form', ['UserSchool', 'Program', 'duration', 'current-year', 'semester', 'start', 'end']);

});
*/

const headers = new Headers();
headers.append('Content-Type', 'application/json');

// Send new account data to backend
const createform = document.getElementById('create-account');

createform.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(createform);

  // Build the data object from the form data
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });


  // Send the data to the server
  fetch('https://rest-api-flask-python-fullcircle.onrender.com/register', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data submitted successfully');

       // Trigger the form-submitted event to open the student window
       ipcRenderer.send('form-submitted', data, 'classes.html');
    } else {
      throw new Error('Failed to submit form');
    }
  })
  .catch((error) => {
    console.error(error);
  });
});



/*
document.addEventListener('DOMContentLoaded', () => {
  console.log('Content is loading');
  // Get references to the form-selects
  const durationSelect = document.getElementById('duration');
  const yearSelect = document.getElementById('current-year');

  // Set up an event listener for changes to the durationSelect
  durationSelect.addEventListener('change', () => {
    // Get the selected value from the durationSelect
    const selectedDuration = durationSelect.value;

    // Clear the options in the yearSelect
    yearSelect.innerHTML = '';

    // Create an array of options for the yearSelect based on the selectedDuration
    const options = [];
    for (let i = 1; i <= selectedDuration; i++) {
      options.push(`<option value="${i}">${i}</option>`);
    }

    // Add the options to the yearSelect
    yearSelect.innerHTML = options.join('');
  });
});
*/
/*
// Send school data to backend
const studentform = document.getElementById('student-form');

studentform.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const program = document.getElementById('program').value;
  const length = document.getElementById('program_length').value;
  const current = document.getElementById('current_year').value;
  const formdata = { name: name, program: program, program_length: length, current_year: current };

  const semester = document.getElementById('semname').value;
  const start = document.getElementById('start_date').value;
  const end = document.getElementById('end_date').value;
  const semdata = { name: semester, start_date: start, end_date: end };

  // Send the data to the server
  fetch('https://rest-api-flask-python-fullcircle.onrender.com/register/schools', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(formdata)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data submitted successfully');
    } else {
      throw new Error('Failed to submit form');
    }
  })
  .catch((error) => {
    console.error(error);
  });

  fetch('https://rest-api-flask-python-fullcircle.onrender.com/register/semesters', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(semdata)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data submitted successfully');
       // Trigger the form-submitted event to open the student window
       ipcRenderer.send('form-submitted', data, 'classes.html');
    } else {
      throw new Error('Failed to submit form');
    }
  })
  .catch((error) => {
    console.error(error);
  });


});
*/

/*
// adds area for new class time
const addClassTimeButton = document.getElementById('add-class-time');
const classTimeContainer = document.getElementById('class-times');
console.log(classTimeContainer);

// Attaches an event listener to the plus sign
addClassTimeButton.addEventListener('click', () => {
  const newClassTime = document.createElement('div'); // New form genrated to input class time
  newClassTime.innerHTML = `
  <div class="row class-times">
      <div class="col mt-0">
         <label for="classday" class="form-label mb-0">Day</label>
           <select id="classday" name="class-day[]" class="form-select" type="text">
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              </select>
      </div>
      <div class="col mt-2">
         <label for="start-time">Start Time</label>
         <input type="time" id="start-time" class="form-control" name="start-time[]" required>
       </div>
       <div class="col mt-2">
           <label for="end-time">End Time</label>
           <input type="time" id="end-time" class="form-control" name="end-time[]" required>
        </div>
       <button class="plus col-2 mt-3" id="remove-class-time-${classTimeContainer.children.length}" type="button"><i class="fa fa-minus" style="font-size:25px;color:rgb(251, 24, 24)"></i></button>
  </div>
  `;

  const removeClassTimeButton = newClassTime.querySelector(`#remove-class-time-${classTimeContainer.children.length}`);
  removeClassTimeButton.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.remove();
  });

  classTimeContainer.appendChild(newClassTime);
});
*/
/*
// Creates new area to add another class
const addClassButton = document.getElementById('add-class');
const classContainer = document.getElementById('class-container');
const classTemplate = document.querySelector('.class');

addClassButton.addEventListener('click', function() {
    const newClass = classTemplate.cloneNode(true);
    classContainer.appendChild(newClass);
 
}); */






function addViewContent() {
  if (window.location.href.indexOf("view.html") > -1) {
    const viewcontainer = document.querySelector('.classes-container');
    const viewClass = document.createElement('div');
    viewClass.innerHTML = `
    <div class="card-body">
    <div class="flex-row d-flex align-items-center justify-content-between">
        <h5 class="card-title">Biology</h5>
        <i class="fa-solid fa-circle-play fa-lg" style="color: #4723D9;"></i>
    </div>
    <div class="card-body">
    <div class="flex-row d-flex align-items-center justify-content-between">
        <h5 class="card-title">English</h5>
        <i class="fa-solid fa-circle-play fa-lg" style="color: #4723D9;"></i>
    </div>
    <div class="card-body">
    <div class="flex-row d-flex align-items-center justify-content-between">
        <h5 class="card-title">Mathematics</h5>
        <i class="fa-solid fa-circle-play fa-lg" style="color: #4723D9;"></i>
    </div>
    `;
    viewcontainer.appendChild(viewClass);
  }
}



/*// Your code for the view.html page goes here
    

for (let i = 0; i < classes.length; i++) {
  const classData = classes[i];
  const classCard = `
    <div class="card" style="width: 18rem; background-color: ${classData.color};">
      <div class="card-body">
        <h5 class="card-title">${classData.code}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${classData.name}</h6>
        <p class="card-text">${getClassTimes(classData)}</p>
      </div>
    </div>
  `;
  container.innerHTML += classCard;
}

function getClassTimes(classData) {
  let timesString = '';
  for (let j = 0; j < classData.times.length; j++) {
    const classTime = classData.times[j];
    timesString += `${classTime.day}: ${classTime.startTime} - ${classTime.endTime}<br>`;
  }
  return timesString;
}
*/

