//Timer

let hr = min = sec = ms = "0" + 0,
startTimer;

const startBtn = document.querySelector(".start"),
stopBtn = document.querySelector(".stop"),
resetBtn = document.querySelector(".reset");

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

function start() {
startBtn.classList.add("active");
stopBtn.classList.remove("stopActive");

startTimer = setInterval(()=>{
  ms++
  ms = ms < 10 ? "0" + ms : ms;

  if(ms == 100){
    sec++;
    sec = sec < 10 ? "0" + sec : sec;
    ms = "0" + 0;
  }
  if(sec == 60){
    min++;
    min = min < 10 ? "0" + min : min;
    sec = "0" + 0;
  }
  if(min == 60){
    hr++;
    hr = hr < 10 ? "0" + hr : hr;
    min = "0" + 0;
  }
  putValue();
},10); //1000ms = 1s

}

function stop() {
startBtn.classList.remove("active");
stopBtn.classList.add("stopActive");
clearInterval(startTimer);
}
function reset() {
startBtn.classList.remove("active");
stopBtn.classList.remove("stopActive");
clearInterval(startTimer);
hr = min = sec = ms = "0" + 0;
putValue();
}

function putValue() {
document.querySelector(".millisecond").innerText = ms;
document.querySelector(".second").innerText = sec;
document.querySelector(".minute").innerText = min;
document.querySelector(".hour").innerText = hr;
}


const courseMenu = document.querySelector('.course-menu');
const selectedCourse = document.querySelector('.selected-course');

fetch('Data/task-info.json')
  .then(response => response.json())
  .then(data => {
    const courses = new Set(data.tasks.map(task => task.course)); // Use a Set to get unique course names
    courses.forEach(course => {
      const courseItem = document.createElement('li');
      const courseLink = document.createElement('a');
      courseLink.classList.add('dropdown-item');
      courseLink.href = '#';
      courseLink.dataset.course = course;
      courseLink.textContent = course;
      courseItem.appendChild(courseLink);
      courseMenu.appendChild(courseItem);
      
      courseLink.addEventListener('click', (event) => {
        selectedCourse.textContent = event.target.dataset.course;
      });
    });
  })
  .catch(error => console.error(error));



  const email = 'group@gmail.com';
  const password = 'password';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjgxODgxMTc2LCJqdGkiOiJmMDUyMDcyMC03ZDMxLTRiNmItYjMyZi1mMzliZWE3YThhNjciLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODE4ODExNzYsImV4cCI6MTY4MTg4MjA3Nn0.6qBfwBQKm_iWjybSvTTbVDVHxTn5yAV6QXWkxgAc0Uk';
  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(email + ':' + password) + ', Bearer ' + token);

fetch('https://rest-api-flask-python-fullcircle.onrender.com/institutions', {
  headers: headers
})
    .then(response => response.json())
    .then(data => console.log(data));
    

// Populate tasks
const taskContainer = document.getElementById('task-container');
const courseDropdown = document.querySelector('.btn-group .dropdown-menu');

// Load tasks from the JSON file
fetch('Data/task-info.json')
  .then(response => response.json())
  .then(data => {
    let tasks = data.tasks;

    // Function to display tasks
    const displayTasks = (tasks) => {
      taskContainer.innerHTML = '';

      tasks.forEach((task) => {
        const newTask = document.createElement('div');
        newTask.innerHTML = `
          <div class="task" style="border-color: ${task.color};">
            <div class="flex-row d-flex align-items-center justify-content-between">
              <i class="fa-solid fa-circle-play fa-xl p-2" style="color: #ccd0d7;"></i>
              <h4 class="ms-n3">${task.title}</h4>
              <button type="button" class="btn btn-sm btn-light drop-class menu dropdown-toggle-split justify-self-right" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis-vertical fa-lg m-auto" style="color: #676767;"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
            <div>
              <p class="ms-5 me-4 mt-lg-2 mb-4">${task.description}</p>
            </div>
            <div class="flex-row d-flex align-items-center">
              <i class="fa-regular fa-circle-check fa-xl p-2" style="color: #ccd0d7;"></i>
              <progress class="ms-4 me-4" value="${task.progress}" max="100"></progress> <span class="me-5 pe-5">${task.progress}% complete</span>
              <ul class="list-inline ms-5 align-self-center">
                <li class="list-inline-item className" style=" background-color: ${task.color};" id="className">${task.course}</li>
                <li class="list-inline-item dueDate" id="dueDate"> <i class="fa-solid fa-calendar me-2" style="color: #a3a3a3;"></i> ${task['due-date']}</li>
                <li class="list-inline-item status" id="status">${task.status}</li>
              </ul>
            </div>
          </div>
        `;
        taskContainer.appendChild(newTask);
      });
    };

    // Display all tasks by default
    displayTasks(tasks);

    // Filter tasks based on the selected course
courseDropdown.addEventListener('click', (event) => {
  if (event.target.classList.contains('dropdown-item')) {
    const selectedCourse = event.target.dataset.course;
    const filteredTasks = selectedCourse === 'All Courses' ? tasks : tasks.filter(task => task.course === selectedCourse);
    document.querySelector('.selected-course').textContent = selectedCourse;
    displayTasks(filteredTasks);
  }
});

  })
  .catch(error => console.error(error));



  // Select the class for a task
const classDropdown = document.getElementById('task-class');

fetch('Data/task-info.json')
  .then(response => response.json())
  .then(data => {
    const classes = new Set(data.tasks.map(task => task.course)); // Use a Set to get unique class names
    classes.forEach(course => {
      const classOption = document.createElement('option');
      classOption.value = course;
      classOption.textContent = course;
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


  const recsContainer = document.getElementById('inner_recs');

  const newRec = document.createElement('div');
  newRec.classList.add('card-body');
        newRec.innerHTML =`
                              <div class="flex-row d-flex align-items-center justify-content-between">
                                  <h5 class="card-title">Mathematics Homework</h5>
                                  <i class="fa-solid fa-circle-play fa-lg" style="color: #4723D9;"></i>
                              </div>
                            <h6 class="card-subtitle mb-2 text-body-secondary">2pm - 3pm</h6>
                          `;
          recsContainer.appendChild(newRec);