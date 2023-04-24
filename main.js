const { app, BrowserWindow, ipcMain } = require('electron')

let win;
const createWindow = () => {
    win = new BrowserWindow({
      autoHideMenuBar: true,
      width: 900,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false, // To use require() in the renderer process
      },
    }) 
  
    win.loadFile('create.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  

//using electron-store to store tokens
  const Store = require('electron-store');
  const store = new Store();
  
  ipcMain.on('access-token', (event, accessToken) => {
    store.set('access_token', accessToken);
  });
  
  ipcMain.on('refresh-token', (event, refreshToken) => {
    store.set('refresh_token', refreshToken);
  });

  ipcMain.on('message-with-id', (event, editId) => {
    store.set('course_id', editId);
    console.log(`Received message with ID value: ${editId}`);
    // Do something with the ID value, such as store it in a variable or database
  });

// Redirecting to other windows
function createStudentWindow(pageName) {
  win.loadFile(pageName);

  // Handle window close event to clear the reference
  win.on('closed', () => {
   win = null;
  });
}

// Listen for the form submission event from the renderer process
ipcMain.on('form-submitted', (event, data, pageName) => {
    createStudentWindow(pageName);
  console.log('Sucessfully redirected')
});

  