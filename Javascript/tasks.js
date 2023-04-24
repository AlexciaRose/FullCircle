const Store = require('electron-store');
const store = new Store();  //This allows for tokens to be stored locally

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');

const taskHeaders = new Headers(); //this header will be used for api requests that need the access token and a specification of content
taskHeaders.append('Authorization', 'Bearer ' + accessToken); 
taskHeaders.append('Content-Type', 'application/json');

const headers = new Headers();
headers.append('Authorization', 'Bearer ' + accessToken); 

//sets time values to zero
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
  elapsedSeconds = elapsedTime / 1000;  //converts time to seconds
  const isoDuration = new Date(elapsedSeconds * 1000).toISOString().substr(11, 8);
  
  if(activeTaskId){
    console.log("this is the", isoDuration);
    console.log(activeTaskId);
    const sendID = activeTaskId;
    fetch(`https://rest-api-flask-python-fullcircle.onrender.com/time/${activeTaskId}`, { //url for put
      method: 'PATCH',
      headers: taskHeaders,
      body: JSON.stringify({ ElapsedTime: isoDuration})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      location.reload(true);
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

//All GLOBAL VARIABLES
showAtStart();
let modalBody = document.getElementById('descBody');
let editData;
let passId;
const footer = document.getElementById('footer');
let descmodal = new bootstrap.Modal(document.getElementById('editModal'));
const taskCards = document.getElementById('task-cards');
let editForm;

let globalcard;


function deleteTask() {
  console.log(passId);
  if (passId) {
    
    fetch(`https://rest-api-flask-python-fullcircle.onrender.com/tasks/${passId}`, {
      method: 'DELETE',
      headers: taskHeaders
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      descmodal.hide();
      location.reload(true);
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
}



// Dropdown Menu for editting the course for a task
function loadClassDropdowns() {
  const classDropdowns = document.querySelector('.task-class2');
  console.log(classDropdowns);
  if (classDropdowns) {
    fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
      headers: headers
    })
    .then(response => response.json())
    .then(data => {
      const classes = new Set(data.map(item => item.name));
      classes.forEach(classes => {
        const classOption = document.createElement('option');
        classOption.value = classes;
        classOption.textContent = classes;
        classDropdowns.appendChild(classOption);
      });
    })
    .catch(error => console.error(error)); 
  }
}



function handleEditButtonClick() {

 
  footer.innerHTML = `<button type="button" class="btn btn-light"  data-bs-dismiss="modal">Close</button>`;
  modalBody.innerHTML = `<form class="edit-tasks-form" method="patch">
                            <div class="mb-3">
                            <input type="text" class="form-control" name="TaskName" id="TaskName" placeholder="${editData.TaskName}">
                          </div>
                          <div class="mb-3">
                            <label for="task-class2" class="form-label mb-0">Course</label>
                                <select id="task-class2" name="Courses" class="form-select task-class2" type="text">
                                    <option disabled selected value="${editData.Courses}"></option>
                                </select>
                          </div>
                          <div class="mb-3">
                            <label for="due-date" class="col-form-label">Due Date:</label>
                            <div class="row d-flex p-2">
                              <input type="date" class="form-control col p-2" name="DueDate" id="due-date" value="${editData.DueDate}">
                            <input type="time" id="due-time" class="form-control col" style="width: 50px;" name="DueTime" value="${editData.DueTime}">
                            </div>
                            <div class="mb-3">
                            <label for="time-remaining" class="col-form-label">Time to Complete:</label>
                            <fieldset>
                              <div class="row" style="font-weight: lighter;">
                                <div class="col">
                                  <input class="form-control col" name="AllottedTime" id="hours" type="number" min="0" max="23" placeholder="${editData.AllottedTime}" value="${editData.AllottedTime}">
                              <label for="hours" class="col-form-label">Hours</label>
                                </div>
                              </div>
                              </fieldset>	  
                            </div>
                            <div class="mb-3">
                              <label for="task-description" class="col-form-label"></label>
                              <textarea class="form-control" name="description" maxlength="300" id="task-description" placeholder="${editData.description}" value="${editData.description}"></textarea>
                            </div>
                            </div> 
                            <div class="form-group foot">
                              <input type="submit" class="btn btn-primary" style="background-color: #28a6f9; border:none;" value="Save Changes">
                              <button type="button" class="btn btn-light" id="cancel">Cancel</button>
                            </div>
                          </form>`;

                          loadClassDropdowns();


                          editForm = document.querySelectorAll('.edit-tasks-form');
                          console.log(editForm);

                          editForm.forEach(form => {

                            form.addEventListener('submit', function (event) {
                              event.preventDefault();
                              
                              console.log(passId);
                              const formData = new FormData(form);
                            
                              // Build the data object from the form data
                              const data = {};
                              formData.forEach((value, key) => {
                                data[key] = value;
                              });
                              console.log(data);
                              console.log(passId);
                              fetch(`https://rest-api-flask-python-fullcircle.onrender.com/tasks/${passId}`, {
                                method: 'PATCH',
                                headers: taskHeaders,
                                body: JSON.stringify(data),
                              })
                              
                                .then((response) => {
                                  if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                  }
                                  return response.json();
                                  
                                })
                                .then(() => {
                                 showAtStart();
                                 descmodal.hide();
                                })
                                .catch((error) => {
                                  console.error('There was a problem with the fetch operation:', error);
                                });
                            });
                            });
                          

                          const cancelButton = document.getElementById('cancel');
                          cancelButton.addEventListener('click', function() {
                            populateModalWithData(editData, passId)
                        });
}


function handleDeleteButtonClick(){
    footer.innerHTML = `<button type="button" class="btn btn-light"  data-bs-dismiss="modal">Close</button>`;
  modalBody.innerHTML = `<p class="mb-2">Are you sure you want to delete this task?</p>
                            <div class="foot">
                              <input type="button" class="btn btn-primary" id="delete-confirm" style="background-color: #28a6f9; border:none;" value="Delete">
                              <button type="button" class="btn btn-light" id="cancel">Cancel</button>
                            </div>`;

                            const deleteconfirmButton = document.getElementById('delete-confirm');
                            deleteconfirmButton.addEventListener('click', function() {
                            console.log("deleted");
                            deleteTask();
                          });

                          const cancelButton = document.getElementById('cancel');
                            cancelButton.addEventListener('click', function() {
                              populateModalWithData(editData, passId)
                          });


}

 
function populateModalWithData(taskData, clickId) {
  editData = taskData;
  // Populate modal with task data
  modalBody.innerHTML = `
    <h2 class="mb-2">${taskData.TaskName}</h2>
    <span class="due"><h4>Course: </h4><p>${taskData.Courses}</p></span>
    <span class="due"><h4>Due Date:</h4><p>${taskData.DueDate}</p></span>
    <span class="due"><h4>Due Time:</h4><p>${taskData.DueTime}</p></span>
    <h4 style="margin-top: 2.5%;">Description:</h4>
    <p>${taskData.description}</p>
  `;
  footer.innerHTML = ` <div>
                        <button type="button" class="btn btn-light" style="background-color: #28a6f9; border:none;" id="editTask">Edit</button>
                        <button type="button" id="delete-task" class="btn btn-light" >Delete</button>
                      </div>
                      <button type="button" class="btn btn-light"  data-bs-dismiss="modal">Close</button>`;
  
  passId = clickId;
  const editButton = document.getElementById('editTask');
  editButton.addEventListener('click', function() {
    let editId = clickId;
    
    handleEditButtonClick(); // Use the taskId to load the edit form





  });

  const deleteButton = document.getElementById('delete-task');
  deleteButton.addEventListener('click', function() {
    handleDeleteButtonClick();
});

}


function populateCompleteModal(taskData) {
  // Populate modal with task data
  modalBody.innerHTML = `
    <h2 class="mb-2">${taskData.TaskName}</h2>
    <span class="due"><h4>Course: </h4><p>${taskData.Courses}</p></span>
    <span class="due"><h4>Due Date:</h4><p>${taskData.DueDate}</p></span>
    <span class="due"><h4>Due Time:</h4><p>${taskData.DueTime}</p></span>
    <h4 style="margin-top: 2.5%;">Description:</h4>
    <p>${taskData.description}</p>
  `;
  footer.innerHTML = `<button type="button" class="btn btn-light"  data-bs-dismiss="modal">Close</button>`;

}


//Function that allows users to click title to view task info
  function addTitleListeners() {
  const titleElements = document.querySelectorAll('.task-card .title');
  
  titleElements.forEach(titleElement => {
    titleElement.addEventListener('click', function() {
      console.log("help");
      let clickId = this.parentNode.dataset.id;
      console.log(clickId);
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
          
          populateModalWithData(taskData, clickId);
          descmodal.show(); // Show the modal
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    });
  });
}


//Function that allows users to click title to view task info
function addCompleteTitleListeners() {
  const titleElements = document.querySelectorAll('.complete-card .title');
  
  titleElements.forEach(titleElement => {
    titleElement.addEventListener('click', function() {
      console.log("help");
      let clickId = this.parentNode.dataset.id;
      console.log(clickId);
      if (clickId){
        // Fetch task data from API using taskId
        fetch(`https://rest-api-flask-python-fullcircle.onrender.com/incomplete/${clickId}`,
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
          
          populateCompleteModal(taskData);
          descmodal.show(); // Show the modal
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    });
  });
}



function addCompleteListeners() {
  const completeIcons = document.querySelectorAll('.task-card .complete-icon');
  
  completeIcons.forEach(completeIcon => {
    completeIcon.addEventListener('click', function() {
      let completeId = this.parentNode.dataset.id;
      console.log(completeId);
      if (completeId){
        // Fetch task data from API using taskId
        fetch(`https://rest-api-flask-python-fullcircle.onrender.com/completed/${completeId}`,
        {
          method: 'PATCH',
          headers: taskHeaders,
          body: JSON.stringify({completed: "yes"})
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          location.reload(true);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    });
  });
}


function addIncompleteListeners() {
  const incompleteIcons = document.querySelectorAll('.complete-card .incomplete-icon');
  
  incompleteIcons.forEach(incompleteIcon => {
    incompleteIcon.addEventListener('click', function() {
      console.log("help");
      let completeId = this.parentNode.dataset.id;
      console.log(completeId);
      if (completeId){
        // Fetch task data from API using taskId
        fetch(`https://rest-api-flask-python-fullcircle.onrender.com/incomplete/${completeId}`,
        {
          method: 'PATCH',
          headers: taskHeaders,
          body: JSON.stringify({completed: "no"})
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          location.reload(true);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
      }
    });
  });
}






const selectedCourse = document.querySelector('.selected-course');

const courseDropdown = document.querySelector('.btn-group .all-courses-menu');

const filterDropdown = document.querySelector('.btn-group .task-filter-menu');
   
    
//This code will populate and create list of tasks

function showAtStart(){
  document.querySelector('.selected-course').textContent = "All Courses";

      fetch('https://rest-api-flask-python-fullcircle.onrender.com/tasks', {
        headers: headers
      })
      
      // Returns data from api
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
      
        let card = data;
        // Filter tasks based on completion
        const courseMenu = document.querySelector('.course-menu');
        const courses = card ? new Set(card.map(card => card.Courses)) : new Set();    // Use a Set to get unique course names
        console.log(courses);
        courseDropdown.innerHTML=`<li><a class="dropdown-item" href="#" data-course="All Courses">All Courses</a></li>`;
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
  
        courseDropdown.addEventListener('click', (event) => {
          if (event.target.classList.contains('dropdown-item')) {
            const selectedCourse = event.target.textContent;
            let filteredTasks;
            if (selectedCourse === 'All Courses') {
              filteredTasks = card; // show all tasks
            } else {
              filteredTasks = card.filter(card => card.Courses === selectedCourse);
            }
            document.querySelector('.selected-course').textContent = selectedCourse;
            displayCards(filteredTasks);
          }
        });              

      globalcard = card;
      

                      displayCards(card);
                      addTitleListeners();
                      addCompleteListeners();


  })

}


    const displayCards = (globalcard) => {
      taskCards.innerHTML = ``;

  // Creates a card for each task
        globalcard.forEach((card) => {
          const newCard = document.createElement('div');
          newCard.classList.add('task-card', 'w-100');
        
          newCard.setAttribute('data-id', card.id);

            newCard.innerHTML=` 
                                  <span class="icon complete-icon"></span><div class="title">${card.TaskName}</div>
                                    <div class="status"><div class="stat">
                                    ${card.Status}
                                    </div></div>
                                    <div class="prog">
                                      <progress value="${card.Progress}" max="100"></progress>
                                    </div>
                                    <div class="due-date">${card.DueDate}</div>
                                    <div class="time-remaining">${card.remaining_time}</div>
                                  `;
          
          taskCards.appendChild(newCard);


        const time = newCard.querySelector('.time-remaining');
        time.addEventListener("click", start);
          
        });
};

   

      
//This code will populate and create list of completed tasks

function showCompleted (){
  document.querySelector('.selected-course').textContent = "All Courses";

fetch('https://rest-api-flask-python-fullcircle.onrender.com/getcomplete', {
  headers: headers
})

// Returns data from api
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
        let card = data;

         // Filter tasks based on completion
         const courseMenu = document.querySelector('.course-menu');
         const courses = card ? new Set(card.map(card => card.Courses)) : new Set();    // Use a Set to get unique course names
         console.log(courses);
         courseDropdown.innerHTML=`<li><a class="dropdown-item" href="#" data-course="All Courses">All Courses</a></li>`;
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
   
         courseDropdown.addEventListener('click', (event) => {
           if (event.target.classList.contains('dropdown-item')) {
             const selectedCourse = event.target.textContent;
             let filteredTasks;
             if (selectedCourse === 'All Courses') {
               filteredTasks = card; // show all tasks
             } else {
               filteredTasks = card.filter(card => card.Courses === selectedCourse);
             }
             document.querySelector('.selected-course').textContent = selectedCourse;
             displayComplete(filteredTasks);
           }
         });  





        const displayComplete = (card) => {
        taskCards.innerHTML = ``;

        // Creates a card for each task
              card.forEach((card) => {
                const newCard = document.createElement('div');
                newCard.classList.add('complete-card', 'w-100');
              
                newCard.setAttribute('data-id', card.id);

                  newCard.innerHTML=` 
                                        <span class="icon incomplete-icon" style="color: green;"></span><div class="title">${card.TaskName}</div>
                                          <div class="status"><div class="stat">
                                          Completed
                                          </div></div>
                                          <div class="prog">
                                            <progress value="100" max="100"></progress>
                                          </div>
                                          <div class="due-date">${card.DueDate}</div>
                                          <div class="done-time">${card.remaining_time}</div>
                                        `;
                
                taskCards.appendChild(newCard);

                
              });
      };


                displayComplete(card)
                addIncompleteListeners();
                addCompleteTitleListeners();

})

}


              // Filter tasks based on the selected course
              filterDropdown.addEventListener('click', (event) => {
                if (event.target.classList.contains('completed')) {
                      document.querySelector('.task-filter').textContent = "Completed Tasks";
                      showCompleted();
                      }else{
                        document.querySelector('.task-filter').textContent = "Ongoing Tasks";
                        showAtStart();
                      }
                    });







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


  fetch('https://rest-api-flask-python-fullcircle.onrender.com/recommended', {
    headers: headers
  })
        .then(response => response.json())
        .then(data => {
            let recs = data;
        
            console.log(recs);
            if(!recs){
              const newMessage = document.createElement('div');
                newMessage.classList.add('card-body');
                 newMessage.innerHTML =`
                              <div class="align-items-center"> 
                                  <h5 class="card-title">Keep Up the Good Work!</h5>                         
                              </div>`;
          recsContainer.appendChild(newMessage);

            } else{
               // Function to display recommended tasks
            const displayRecs = (recs) => {
              recsContainer.innerHTML = '';
        
              recs.forEach((recs) => {
                const newRec = document.createElement('div');
                newRec.classList.add('card-body');
                 newRec.innerHTML =`
                              <div class=" align-items-center"> 
                                  <h5 class="card-title">${recs.TaskName}</h5>
                                  <p>${recs.DueDate}</p>
                                  <p class="fifty-chars">${recs.description}</p>                                  
                              </div>
                            
                          `;
          recsContainer.appendChild(newRec);
              });
            };
            // Display all recs
            displayRecs(recs);  
            }

            
          })






       
       
       