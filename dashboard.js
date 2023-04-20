/*function fetchFirstName() {
    const userId = document.getElementById("userId").value;
    $.ajax({
      type: "GET",
      url: "/api/getFirstName",  //change to correct directory, and change any other variables where fit. 
      data: { userId },
      success: function(response) {
        const firstName = response.firstName;
        const welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.innerHTML = 'Welcome, ${firstName}!';
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  }
*/


//CIRCULAR PROGRESS BAR
let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

    const userTasks = {
      completedTasks: 5,
      totalTasks: 10
    };

    let progressStartValue = 0,
    progressEndValue = (userTasks.completedTasks / userTasks.totalTasks) * 100; //fix this with dummy data function 
    speed = 25;

let progress = setInterval(() => {
  progressStartValue++;

  progressValue.textContent = `${progressStartValue}%` //pull from api 
  circularProgress.style.background = `conic-gradient(#3065A9 ${progressStartValue * 3.6}deg, #ededed 0deg)`

  if(progressStartValue == progressEndValue){
    clearInterval(progress);
  }
  
}, speed);

const progressBarFill = document.querySelector('.progress-bar');


//USER DATA + WELCOME MESSAGE
const user = {
  name: 'John Doe', //tester data 
  email: 'johndoe@example.com', //tester data
  tasks_completed: 12,
  incomplete_tasks: [
    { id: 1, name: 'Task 1', progress: 50 },
    { id: 2, name: 'Task 2', progress: 25 },
    { id: 3, name: 'Task 3', progress: 75 }
  ]
};

document.getElementById('welcomeUser').innerHTML = `<p>Welcome, ${user.name}!</p>`;
document.getElementById('taskCompleted').innerHTML = user.tasks_completed;
document.getElementById('incompleteTasks').innerHTML = user.incomplete_tasks.length;

const taskList = document.getElementById('taskList');
user.incomplete_tasks.forEach(task => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${task.name}: ${task.progress}%`;
  taskList.appendChild(listItem);
});




const incomplete = document.querySelector('.progress-container');

fetch('Data/dashboard.json')

.then(response => response.json())
.then(data => {
  
  let inclTasks = data.tasks;


  const displayinclTasks = (inclTasks) => {
    incomplete.innerHTML = '';

    inclTasks.forEach((inclTask) => {

    const newincl = document.createElement('div');
    
          newincl.innerHTML =`<i class="fa-solid fa-circle"></i>
                                  <p id="task-1">${inclTask.title}
                                    <style>
                                      #task-1{
                                        margin-left: 30px;
                                        font-weight: 500;
                                      }
                                    </style>
                                    <div class="">
                                      <progress value="${inclTask.progress}" max="100" min="0"></progress><span style="color: black;">${inclTask.progress}%</span>
                                    </div>
                                  </p>`; 
            incomplete.appendChild(newincl);

});

};


// Display all tasks by default
  displayinclTasks(inclTasks);

});


// sticky note
const stickyNote = document.querySelector('.sticky-note');
const closeButton = stickyNote.querySelector('.sticky-note-close');

closeButton.addEventListener('click', () => {
  stickyNote.style.display = 'none';
});

const textArea = stickyNote.querySelector('.sticky-note-text');

textArea.addEventListener('input', () => {
  const text = textArea.value;
});

textArea.value = localStorage.getItem('stickyNoteText') || '';
