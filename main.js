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

  