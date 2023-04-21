const Store = require('electron-store');
const store = new Store();

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');



const profContainer = document.getElementById('class-list');



const headers = new Headers();
headers.append('Authorization', 'Bearer ' + accessToken);

fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
headers: headers
})
  .then(response => response.json())
  .then(data => {
    
    let classes = data;
  

    const displayClasses = (classes) => {
      profContainer.innerHTML = '';

      classes.forEach((classe) => {

      const newClass = document.createElement('div');
      newClass.classList.add('col');
            newClass.innerHTML =`<div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">${classe.name}</h5>
                                  <p class="card-text">${classe.day_of_week}, ${classe.start_time} - ${classe.end_time} <br> ${classe.code} <br> ${classe.instructor_name}
                                  </p>
                                </div>
                              </div>`;
              profContainer.appendChild(newClass);
  
  });

};


// Display all tasks by default
displayClasses(classes);

  });

//testing chart 
var chartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [{
      label: 'Course Schedule',
      data: [3, 2, 4, 1, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
  },
  {
      label: 'Tasks',
      data: [2, 1, 3, 2, 4],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
  }]
};

// Get the chart canvas element
var chartCanvas = document.getElementById('myChart');

// Create the chart object
var chart = new Chart(chartCanvas, {
  type: 'bar',
  data: chartData,
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
<<<<<<< HEAD
/*Choosing profile picture*/
$(document).ready(function() {
  $('#avatar-selector').change(function() {
    var selectedImage = $(this).val();
    $('.avatar').attr('src', 'Images/' + selectedImage);
  });
});


/*  
// Update name
document.getElementById('update-name').addEventListener('click', function() {
  // Show form to update name
  console.log('Update Name clicked');
});

// Update password
document.getElementById('update-password').addEventListener('click', function() {
  // Show form to update password
  console.log('Update Password clicked');
});

// Delete account
document.getElementById('delete-account').addEventListener('click', function() {
  // Show confirmation dialog
  var result = confirm("Are you sure you want to delete your account?");
  if (result) {
    console.log('Account deleted');
  }
});



*/
=======
>>>>>>> f8a78c8d20b79123626701a562473e03a5a052c0
  
