
const { ipcRenderer } = require('electron');


let user;

const loginForm = document.getElementById('login-form');
console.log(loginForm);

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submission behavior

  // show the loading spinner
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  document.body.appendChild(spinner);

  // send login request
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const formdata = { email: email, password: password };


  fetch('https://rest-api-flask-python-fullcircle.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {

      user = data;
      // hide the loading spinner
      spinner.remove();

      ipcRenderer.send('access-token', data.access_token);
      ipcRenderer.send('refresh-token', data.refresh_token);
      

      // redirect to dashboard page
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      // hide the loading spinner
      spinner.remove();
  
      // display error message
      alert('Fetch error: ' + error.message);
    });
  
});

/*
fetch('https://rest-api-flask-python-fullcircle.onrender.com/users', {
  headers: {
    'Authorization': 'Bearer ' + user.access_Token
  }
})

    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      ipcRenderer.send('access-token', data.access_token);
     
    })
    .catch(error => {
      // hide the loading spinner
      spinner.remove();
  
      // display error message
      alert('Fetch error: ' + error.message);
    });
    */