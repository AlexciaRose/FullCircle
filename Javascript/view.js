const { ipcRenderer } = require('electron');

const headers = new Headers();
headers.append('Content-Type', 'application/json');

const viewcontainer = document.querySelector('.classes-container'); // Replace with your container element
    viewcontainer.innerHTML = ``; // Clear the existing content

    fetch('https://rest-api-flask-python-fullcircle.onrender.com/courses', {
        headers: headers
      })

      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
      
        let cards = data;


        cards.forEach((card) => {
            const newCard = document.createElement('div');
            newCard.classList.add('card-body', 'w-100');
          
            newCard.setAttribute('data-id', card.id);
  
              newCard.innerHTML=`<h5 class="card-title">${card.code}, ${card.name}</h5>
              <p class="card-text mb- 2">${card.day_of_week_one} & ${card.day_of_week_two}, ${card.start_time} - ${card.end_time} <br> ${card.instructor_name}
              </p>
                                    `;
            viewcontainer.appendChild(newCard);
            
          });

      });


    