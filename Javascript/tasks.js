const Store = require('electron-store');
const store = new Store();

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');




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

function start() {
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");
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

function stop() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  clearInterval(startTimer);
  elapsedTime = Date.now() - startTime;
}

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



const courseMenu = document.querySelector('.course-menu');
const selectedCourse = document.querySelector('.selected-course');

/*fetch('Data/task-info.json')
  .then(response => response.json())
  .then(data => {
    
  })
  .catch(error => console.error(error));

*/

  

   //tasklist

      const taskCards = document.getElementById('task-cards');
      fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks')
      .then(response => response.json())
      .then(data => {
      let card = data;
      const displayCards = (card) => {
        taskCards.innerHTML = ``;

        card.forEach((card) => {
          const newCard = document.createElement('div');
          newCard.classList.add('task-card', 'w-100');
            newCard.innerHTML=` 
                                  <span class="icon" ></span><div class="title">${card.TaskName}</div>
                                    <div class="status"><div class="stat">
                                    behind
                                    </div></div>
                                    <div class="prog">
                                      <progress value="25" max="100"></progress>
                                    </div>
                                    <div class="due-date">${card.DueDate}</div>
                                    <div class="time-remaining">08:05 </div>
                                  `;

          taskCards.appendChild(newCard);


          const icon = newCard.querySelector('.icon');
        icon.addEventListener('click', function() {
          console.log('button was clicked');
    });
          
        });
      };
      displayCards(card)
    })



/*
// Populate tasks
const taskContainer = document.getElementById('task-container');
const courseDropdown = document.querySelector('.btn-group .dropdown-menu');


 const headers = new Headers();
 headers.append('Authorization', 'Bearer ' + accessToken);


fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
  headers: headers
})
    .then(response => response.json())
    .then(data => {
      
    let tasks = data;

    // Function to display tasks
    const displayTasks = (tasks) => {
      taskContainer.innerHTML = '';

      tasks.forEach((task) => {
        const newTask = document.createElement('div');
        newTask.innerHTML = `
          <div class="task" style="border-color: blue;">
            <div class="flex-row d-flex align-items-center justify-content-between">
              <i class="fa-solid fa-circle-play fa-xl p-2" style="color: #ccd0d7;"></i>
              <h4 class="ms-n3">${task.TaskName}</h4>
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
              <progress class="ms-4 me-4" value="${task.id}" max="100"></progress> <span class="me-5 pe-5">${task.id}% complete</span>
              <ul class="list-inline ms-5 align-self-center">
                <li class="list-inline-item className" style=" background-color: blue;" id="className">${task.Courses}</li>
                <li class="list-inline-item dueDate" id="dueDate"> <i class="fa-solid fa-calendar me-2" style="color: #a3a3a3;"></i> ${task.DueDate}</li>
                <li class="list-inline-item status" id="status">${task.DueTime}</li>
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
    const filteredTasks = selectedCourse === 'All Courses' ? tasks : tasks.filter(task => task.Courses === selectedCourse);
    document.querySelector('.selected-course').textContent = selectedCourse;
    displayTasks(filteredTasks);
  }
});

const courses = new Set(tasks.map(task => task.Courses)); // Use a Set to get unique course names
  console.log(courses);
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
  .catch(error => console.error(error));

*/
/*
  // Select the class for a task
const classDropdown = document.getElementById('task-class');


fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
  headers: headers
})
    .then(response => response.json())
    .then(data => {

      console.log(data)
    const classes = new Set(data.map(item => item.Courses)); // Use a Set to get unique class names
    console.log(classes);

    classes.forEach(classe => {
      const classOption = document.createElement('option');
      classOption.value = classe;
      classOption.textContent = classe;
      classDropdown.appendChild(classOption);
    });
  })
  .catch(error => console.error(error)); */


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


   fetch('Data/task-info.json')
        .then(response => response.json())
        .then(data => {
            let recs = data.tasks;
        
            // Function to display tasks
            const displayRecs = (recs) => {
              recsContainer.innerHTML = '';
        
              recs.forEach((task) => {
                const newRec = document.createElement('div');
                newRec.classList.add('card-body');
                 newRec.innerHTML =`
                              <div class="flex-row d-flex align-items-center justify-content-between">
                                  <h5 class="card-title">${task.title}</h5>
                                  <i class="fa-solid fa-circle-play fa-lg" style="color: #4723D9;"></i>
                              </div>
                            <h6 class="card-subtitle mb-2 text-body-secondary">2pm - 3pm</h6>
                          `;
          recsContainer.appendChild(newRec);
              });
            };
            
            // Display all recs
            displayRecs(recs);         
        
            
          })


       
       
