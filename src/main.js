// Modules to control application life and create native browser window
const {app, dialog , BrowserWindow, Menu} = require('electron')
const ipc = require('electron').ipcMain

// auto update
require('update-electron-app')()

let mainWindow = null;
let modifiedState = false;
let bCloseConfirm = false;

ipc.on('modifiedState', (event, arg) => {
  // update modifiedState
  console.log("main modifiedState:"+arg) 
  modifiedState = arg;
})

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/home/img/jay-rond.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

   // menu vide
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)
  
  mainWindow.maximize();
  
  // pour debug
  //mainWindow.webContents.openDevTools()
  
  // and load the index.html of the app with version to show it
  mainWindow.loadURL(`file://${__dirname}/index.html#${app.getVersion()}`);
 // mainWindow.loadFile('index.html')
  //mainWindow.loadURL('http://127.0.0.1:8888/board.html')

  
// Event 'close'
mainWindow.on('close', (ev) => {   
   
    if (modifiedState === true && bCloseConfirm===false) {
    ev.preventDefault()

    dialog.showMessageBox({
      type: 'warning',
      buttons: ['Cancel and save your changes', 'Close without saving'],
      title: 'Do not forget to safe your changes',
      message: 'Your changes will be lost',
      cancelId: 0,
      defaultId: 1,
      noLink: true
    }).then((val) => {

      if (val.response === 0) {
        // Cancel the close process
      } else if (mainWindow) {
        bCloseConfirm = true
        app.quit()
      }
    })
  }
})
}




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.