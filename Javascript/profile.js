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


  
 