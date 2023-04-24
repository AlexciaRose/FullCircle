
//Submission of task form
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
      location.reload(true);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      location.reload(true);
    });
});

function loadCourseDropdown() {
    const classDropdowns = document.querySelector('.task-class');
    console.log(classDropdowns);
    if (classDropdowns) {
      fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
        headers: taskHeaders
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

  loadCourseDropdown();

