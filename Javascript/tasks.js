const Store = require('electron-store');
const store = new Store();

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');

const taskHeaders = new Headers();
taskHeaders.append('Authorization', 'Bearer ' + accessToken);
taskHeaders.append('Content-Type', 'application/json');


let hr = min = sec = ms = "0" + 0,
startTimer;

const startBtn = document.querySelector(".start"),
stopBtn = document.querySelector(".stop"),
resetBtn = document.querySelector(".reset");

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

let startTime = null;
let elapsedTime = 0;
let activeTaskId = null;


//starts timer
function start(event) {
  reset();
  const head = document.querySelector('.track');
  head.textContent = "You can start tracking...";
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");
  const clickedCard = event.target.closest('.task-card');

  let taskId = '';
  let taskName = '';
  if (clickedCard) {
    taskId = clickedCard.dataset.id;
    taskName = clickedCard.querySelector('.title').textContent;
    const track = document.querySelector('.track');
    track.textContent = taskName;
    activeTaskId = taskId;
    console.log(taskId);
  }

  startTime = Date.now() - elapsedTime;
  startTimer = setInterval(()=>{
    elapsedTime = Date.now() - startTime;
    ms = Math.floor(elapsedTime % 1000);
    sec = Math.floor(elapsedTime / 1000) % 60;
    min = Math.floor(elapsedTime / (1000 * 60)) % 60;
    hr = Math.floor(elapsedTime / (1000 * 60 * 60));

    ms = ms < 10 ? "0" + ms : ms;
    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;
    hr = hr < 10 ? "0" + hr : hr;

    putValue();
  },10); //1000ms = 1s
}

/* Stops the button
  Will only send data to api if a taskid is set */

function stop() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  clearInterval(startTimer);
  elapsedTime = Date.now() - startTime;
  elapsedMinutes = Math.floor(elapsedTime / 60000);  //converts time to minutes
  
  console.log(elapsedMinutes);
  
  
  if(activeTaskId){
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);
    headers.append('Content-Type', 'application/json');
    console.log(activeTaskId);
    const sendID = activeTaskId;
    fetch(`https://rest-api-flask-python-fullcircle.onrender.com/time/${activeTaskId}`, { //url for put
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ ElapsedTime: elapsedMinutes})
    })

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Elapsed time sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending elapsed time:', error);
    });

  }

}


//Resets the timer
function reset() {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("stopActive");
  clearInterval(startTimer);
  elapsedTime = 0;
  hr = min = sec = ms = "0" + 0;
  putValue();
}

function putValue() {
  document.querySelector(".millisecond").innerText = ms;
  document.querySelector(".second").innerText = sec;
  document.querySelector(".minute").innerText = min;
  document.querySelector(".hour").innerText = hr;
}


const taskForm = document.getElementById('tasks-form');

const taskmodal = new bootstrap.Modal(document.getElementById('exampleModal'));

taskForm.addEventListener('submit', function (event) {
  event.preventDefault();
  

  const formData = new FormData(taskForm);

  // Build the data object from the form data
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
    method: 'POST',
    headers: taskHeaders,
    body: JSON.stringify(data),
  })
  
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      taskmodal.hide();
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      console.log(data);
    });
});

/*
function deleteTask(event) {
  const clickedCard = event.target.closest('.task-card');
  let taskId = '';
  if (clickedCard) {
    taskId = clickedCard.dataset.id;
    activeTaskId = taskId;
    fetch(`https://rest-api-flask-python-fullcircle.onrender.com/tasks/${activeTaskId}`, {
      method: 'DELETE',
      headers: taskHeaders
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // handle successful response
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
}

*/

//Function that allows users to click title to view task info 
function addTitleListeners() {
  const titleElements = document.querySelectorAll('.task-card .title');
  const modalBody = document.getElementById('taskModal');
  titleElements.forEach(titleElement => {
    titleElement.addEventListener('click', function() {
      let clickId = this.parentNode.dataset.id;
      if (clickId){

        // Fetch task data from API using taskId
    fetch(`https://rest-api-flask-python-fullcircle.onrender.com/tasks/${clickId}`,
    {
      headers: headers
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((taskData) => {
      // Populate modal with task data
      modalBody.innerHTML = `
        <h2>${taskData.TaskName}</h2>
        <p>Due date: ${taskData.DueDate}</p>
        <p>Description: ${taskData.description}</p>
        <!-- Add more task data fields as necessary -->
      `;
      taskmodal.show(); // Show the modal
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

      })

    });
  }




const selectedCourse = document.querySelector('.selected-course');

  
const courseDropdown = document.querySelector('.btn-group .dropdown-menu');
   
    
//This code will populate and create list of tasks

      const taskCards = document.getElementById('task-cards');
      
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + accessToken);

      fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
        headers: headers
      })
      
      // Returns data from api
      .then(response => response.json())
      .then(data => {
      let card = data;
      console.log(card);


      const displayCards = (card) => {
        taskCards.innerHTML = ``;

        // Creates a card for each task
        card.forEach((card) => {
          const newCard = document.createElement('div');
          newCard.classList.add('task-card', 'w-100');
          console.log(card.id);
          newCard.setAttribute('data-id', card.id);
            newCard.innerHTML=` 
                                  <span class="icon" ></span><div class="title">${card.TaskName}</div>
                                    <div class="status"><div class="stat">
                                    ${card.Status}
                                    </div></div>
                                    <div class="prog">
                                      <progress value="${card.Progress}" max="100"></progress>
                                    </div>
                                    <div class="due-date">${card.DueDate}</div>
                                    <div class="time-remaining">${card.remaining_time} mins</div>
                                  `;
          
          taskCards.appendChild(newCard);

          /*
          const icon = newCard.querySelector('.icon');
          icon.addEventListener('click', deleteTask); */

        const time = newCard.querySelector('.time-remaining');
        time.addEventListener("click", start);
          
        });
      };
      displayCards(card)
      addTitleListeners();

      // Filter tasks based on the selected course
      courseDropdown.addEventListener('click', (event) => {
      if (event.target.classList.contains('dropdown-item')) {
      const selectedCourse = event.target.dataset.Course;
      const filteredTasks = selectedCourse === 'All Courses' ? card : card.filter(card => card.Courses === selectedCourse);
      document.querySelector('.selected-course').textContent = selectedCourse;
      displayCards(filteredTasks);
    }
  });

      const courseMenu = document.querySelector('.course-menu');
      const courses = new Set(card.map(card => card.Courses)); // Use a Set to get unique course names
      console.log(courses);
      //this will place course names in the dropdown menu
      courses.forEach(Course => {
      const courseItem = document.createElement('li');
      const courseLink = document.createElement('a');
      courseLink.classList.add('dropdown-item');
      courseLink.href = '#';
      courseLink.dataset.Course = Course;
      courseLink.textContent = Course;
      courseItem.appendChild(courseLink);
      courseMenu.appendChild(courseItem);
      
      courseLink.addEventListener('click', (event) => {
      selectedCourse.textContent = event.target.dataset.Course;
      });
    });


    })







  // Select the class for a task (modal form)
const classDropdown = document.getElementById('task-class');


fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
  headers: headers
})
    .then(response => response.json())
    .then(data => {

    const classes = new Set(data.map(item => item.name)); // Use a Set to get unique class names
    const codes = new Set(data.map(item => item.code));
    console.log(classes);

    classes.forEach(classes => {
      const classOption = document.createElement('option');
      classOption.value = classes;
      classOption.textContent = classes;
      classDropdown.appendChild(classOption);
    });
  })
  .catch(error => console.error(error)); 




  //Get dates
  const now = new Date();
  //Array of month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  //get current date and time
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const monthName = monthNames[now.getMonth()];

  document.getElementById('date').textContent = `${monthName} ${day}`;

  console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);


  
  
  

  //Inner Recs 
  const recsContainer = document.getElementById('inner_recs');


  fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
    headers: headers
  })
        .then(response => response.json())
        .then(data => {
            let recs = data;
        
            // Function to display tasks
            const displayRecs = (recs) => {
              recsContainer.innerHTML = '';
        
              recs.forEach((recs) => {
                const newRec = document.createElement('div');
                newRec.classList.add('card-body');
                 newRec.innerHTML =`
                              <div class="flex-row d-flex align-items-center justify-content-between">
                                  <h5 class="card-title">${recs.TaskName}</h5>
                                  
                              </div>
                            
                          `;
          recsContainer.appendChild(newRec);
              });
            };
            
            // Display all recs
            displayRecs(recs);         
        
            
          })






       
       
