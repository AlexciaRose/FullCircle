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

let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

let progressStartValue = 0,
    progressEndValue = 90, //fix this with dummy data function 
    speed = 25;

let progress = setInterval(() => {
  progressStartValue++;

  progressValue.textContent = `${progressStartValue}%`
  circularProgress.style.background = `conic-gradient(#3065A9 ${progressStartValue * 3.6}deg, #ededed 0deg)`

  if(progressStartValue == progressEndValue){
    clearInterval(progress);
  }
  
}, speed);



const progressBarFill = document.querySelector('.progress-bar');

function updateProgressBar(progressPercentage) {
  progressBarFill.style.width = 80 + '%';

}



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


