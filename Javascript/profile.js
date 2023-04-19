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


  