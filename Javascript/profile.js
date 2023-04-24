const Store = require('electron-store');
const store = new Store();

const accessToken = store.get('access_token');
const refreshToken = store.get('refresh_token');

  let userid;
  

const profContainer = document.getElementById('class-list');



const headers = new Headers();
headers.append('Authorization', 'Bearer ' + accessToken);


get('https://rest-api-flask-python-fullcircle.onrender.com/users/')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Do something with the data here
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

/*

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
/*Choosing profile picture*/
$(document).ready(function() {
  $('#avatar-selector').change(function() {
    var selectedImage = $(this).val();
    $('.avatar').attr('src', 'Images/' + selectedImage);
  });
});
/*Modal Code for Edit profile*/
  // Get the modal
  var modal = document.getElementById("exampleModal");
    
  // Get the button that opens the modal
  var btn = document.getElementById("edit-profile");

  // Get the <span> element that closes the modal
  var span = document.querySelector("#exampleModal .btn-close");

  // Get the form and submit button
  var form = document.getElementById("tasks-form");
  var submitBtn = document.querySelector("#exampleModal .modal-footer .btn-primary");

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks on the submit button, submit the form and close the modal
  submitBtn.onclick = function() {
    // Add your code to submit the form here
    form.submit();
    modal.style.display = "none";
    
    // Add a confirmation message
    var message = document.createElement("p");
    message.textContent = "Changes saved successfully!";
    message.style.color = "green";
    message.style.marginTop = "10px";
    modal.appendChild(message);
  }
/*Connecting edit profile to the database*/
/*
// Get the modal
const modal = document.getElementById("editModal");
    
// Get the button that opens the modal
const btn = document.getElementById("edit-profile");

// Get the <span> element that closes the modal
const span = document.querySelector("#editModal .btn-close");

// Get the form and submit button
const form = document.getElementById("edit-form");
const submitBtn = document.querySelector("#editModal .modal-footer .btn-primary");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  // Fetch data from API endpoint
  fetch('https://rest-api-flask-python-fullcircle.onrender.com/users/', {
headers: headers
})
    .then(response => response.json())
    .then(data => {
      // Update form fields with fetched data
      document.getElementById("edit-fname").value = data.fname;
      document.getElementById("edit-lname").value = data.lname;
      document.getElementById("edit-email").value = data.email;
      
      // Display the modal
      modal.style.display = "block";
    })
    .catch(error => {
      console.error("Error fetching data from API:", error);
    });
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on the submit button, submit the form and close the modal
submitBtn.onclick = function() {
  // Add your code to submit the form here
  form.submit();
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


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
  
