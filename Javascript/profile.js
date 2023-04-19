const profContainer = document.getElementById('class-list');



const email = 'group@gmail.com';
const password = 'password';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjgxODg5MjE1LCJqdGkiOiIxOTI0MzEwYy03YmIzLTQ3NzUtYTdjZC1kOTM4ZDJmODYxOWYiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODE4ODkyMTUsImV4cCI6MTY4MTg5MDExNX0.4O8Vhk1sapfRkZtPeyY_gLIvqQ8A77DGpwAfucftQOg';
const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(email + ':' + password) + ', Bearer ' + token);

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


  
 