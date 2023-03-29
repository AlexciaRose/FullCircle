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
    // Saves the JSON string to localStorage
    localStorage.setItem(`${formId}-data`, dataString);
}




const form = document.getElementById('create-account');
// Attaches an event listener to the form's submit event
form.addEventListener('submit', function(event) {
  event.preventDefault();
  saveFormData('create-account', ['FirstName', 'LastName', 'UserEmail', 'UserPassword']);
});


// Retrieve data from localStorage
const createformData = JSON.parse(localStorage.getItem('create-account-data'));

if (createformData) {
  // Get the first name from the data
  const firstName = createformData.FirstName;

  // Update the welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${firstName}!`;
} */



const addClassTimeButton = document.getElementById('add-class-time');
const classTimeContainer = document.querySelector('.class-times');
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
       <button class="plus col-2 mt-3 remove-class-time" type="button"><i class="fa fa-minus" style="font-size:25px;color:rgb(251, 24, 24)"></i></button>
  </div>
  `;
  classTimeContainer.appendChild(newClassTime);
});

const removeClassTimeButton = document.getElementById('remove-class-time');

removeClassTimeButton.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.remove();
  
});

// Creates new area to add another class
const addClassButton = document.getElementById('add-class');
const classContainer = document.getElementById('class-container');
const classTemplate = document.querySelector('.class');

addClassButton.addEventListener('click', function() {
  // Check if all the required fields have values
  const allFields = Array.from(classTemplate.querySelectorAll('input, select'));
  const hasValue = allFields.every(field => field.value !== '');
  
  if (hasValue) {
    const newClass = classTemplate.cloneNode(true);
    classContainer.appendChild(newClass);
  } else {
    alert('Please fill out all fields before adding a new class.');
  }
});