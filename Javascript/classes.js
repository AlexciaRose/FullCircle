const Store = require('electron-store');
const store = new Store();  //This allows for tokens to be stored locally

const { ipcRenderer } = require('electron');

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const courseID = store.get('course_id');

// Select the form element
const classform = document.getElementById('class-form');

console.log(classform)
  classform.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(classform);

  const end_time = formData.get('end_time');
  formData.set('end_time', `${end_time}:00`);
  
  const start_time = formData.get('start_time');
  formData.set('start_time', `${start_time}:00`);

  // Build the data object from the form data
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log(data);
  // Send the data to the server
  fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data submitted successfully');
      ipcRenderer.send('form-submitted', data, 'view.html');
    } else {
      throw new Error('Failed to submit form');
    }
  })
  .catch((error) => {
    console.error(error); 
    console.log('Form data submitted successfully');
  ipcRenderer.send('form-submitted', data, 'view.html');
  });
     
     

  
});




/*
 
 function editClasses(){
  classform.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(classform);

  const end_time = formData.get('end_time');
  formData.set('end_time', `${end_time}:00`);
  
  const start_time = formData.get('start_time');
  formData.set('start_time', `${start_time}:00`);

  // Build the data object from the form data
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log(data);
  // Send the data to the server
  fetch(`https://rest-api-flask-python-fullcircle.onrender.com/courses/${courseID}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then((response) => {
    if (response.ok) {
      console.log('Form data submitted successfully');
      ipcRenderer.send('form-submitted', data, 'view.html');
    } else {
      throw new Error('Failed to submit form');
    }
  })
  .catch((error) => {
    console.error(error);
  });
  console.log('Form data submitted successfully');
  ipcRenderer.send('form-submitted', data, 'view.html');
  
});

}
*/


/*
if(courseID){

  fetch(`https://rest-api-flask-python-fullcircle.onrender.com/courses/${courseID}`, {
    headers: headers
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((taskData) => {

    classform.innerHTML = `<div >
  <h1>What's school like?</h1>
  <header class="mb-3">Add Classes</header>
  <!-- Form fields for first class -->
  <div>
      <div class="row mb-4 mt-2">
          <div class="form-group col-5 ms-2">
              <label for="class-code" class="form-label mb-0 me-2">Class Code</label> <br>
              <input type="text" class="form-control" id="code"  name="code" placeholder="Class Code" value="${taskData.code}" autofocus>
          </div>
      <div class="row d-flex align-items-center">
          <div class="form-group col-5 ms-2">
              <label for="ClassName" class="form-label mb-0">Class Name</label>
              <input type="text" id="name" class="form-control" name="name" placeholder="Class Name" value="${taskData.name}" autofocus>
          </div>
      </div>
      <div class="row mb-4 mt-2">
          <div class="form-group col-5 ms-2">
              <label for="class-instructor" class="form-label mb-0 me-2">Instructor Name</label> <br>
              <input type="text" class="form-control" id="instructor_name"  name="instructor_name" placeholder="Instructor Name" value="${taskData.instructor_name}" autofocus>
          </div>
      </div>

      <h3>Weekly Schedule</h3>
      <div id="class-times-container">
          <div class="row" id="class-times">
          <div class="col-3 mt-0">
              <label for="classday" class="form-label mb-0">Day</label>
              <select id="day_of_week_one" name="day_of_week_one" class="form-select" type="text">
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
              </select>
        </div>
        <div class="col-3 mt-2">
          <label for="start-time">Start Time</label>
          <input type="time" id="start_time" class="form-control" name="start_time" value="${taskData.start_time}">
        </div>
        <div class="col-3 mt-2">
          <label for="end-time">End Time</label>
          <input type="time" id="end_time" class="form-control" name="end_time" value="${taskData.end_time}">
        </div>                               
        </div>
      </div>
      <div id="class-times-container">
          <div class="row" id="class-times">
          <div class="col-3 mt-0">
              <label for="classday" class="form-label mb-0">Day</label>
              <select id="day_of_week_two" name="day_of_week_two" class="form-select" type="text">
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
              </select>
        </div>
        </div>
      </div>
      
  </div>
</div>

<button class="mt-3 btn btn-sign btn-sm" type="submit" id="save-classes">
 <span>Save</span>
</button> `;
    
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });

editClasses();
  
}

*/


/*const doneButton = document.getElementById('all-done');

doneButton.addEventListener('click', function(){

  // Trigger the form-submitted event to open the login window
ipcRenderer.send('form-submitted', data, 'login.html');

});*/
