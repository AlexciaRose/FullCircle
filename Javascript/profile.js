const profContainer = document.getElementById('class-list');


fetch('Data/profile.json')
  .then(response => response.json())
  .then(data => {
    let classes = data.classes;
  

    const displayClasses = (classes) => {
      profContainer.innerHTML = '';

      classes.forEach((classe) => {

      const newClass = document.createElement('div');
      newClass.classList.add('col');
            newClass.innerHTML =`<div class="card">
                                <div class="card-body">
                                  <h5 class="card-title">${classe.title}</h5>
                                  <p class="card-text">${classe.day1}, ${classe.time1} <br> ${classe.day2}, ${classe.time2} <br> ${classe.complete} complete
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
  