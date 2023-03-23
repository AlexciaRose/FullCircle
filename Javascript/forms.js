// Submit the form and save the data to localStorage
function saveFormData(formId, inputFields){
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    // Empty object to store form data
    const dataObject = {};

    // Stores the field name and value in the dataObject
    inputFields.forEach(function(field){
        const value = formData.get(field);
        dataObject[field] = value;
      });

    const dataString = JSON.stringify(dataObject);
    // Saves the JSON string to localStorage
    localStorage.setItem(`${formId}-data`, dataString);
}




const form = document.getElementById('create-account');
// Attaches an event listener to the form's submit event
form.addEventListener('submit', function(event) {
  event.preventDefault();
  saveFormData('create-account', ['FirstName', 'LastName', 'UserEmail', 'UserPassword']);
});


// Retrieve data from localStorage
const createformData = JSON.parse(localStorage.getItem('create-account-data'));

if (createformData) {
  // Get the first name from the data
  const firstName = createformData.FirstName;

  // Update the welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.textContent = `Welcome, ${firstName}!`;
}