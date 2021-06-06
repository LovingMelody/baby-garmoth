const { app, BrowserWindow, Menu } = require('electron');
const { MenuItem } = require('electron/main');
const path = require('path');

const ctrl = process.platform === "darwin" ? "Cmd" : "Ctrl";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Baby Garmoth",
  })

  // Load Garmoth.com, login is done on this page
  mainWindow.loadURL("https://garmoth.com/");

  const menu = new Menu();
  menu.append(new MenuItem({
    label: "Market",
    submenu: [{
      role: "Central Market",
      label: "Central Market",
      accelerator: `${ctrl}+M`,
      click: () => {
        mainWindow.loadURL("https://garmoth.com/market");
      },
    },
    {
      role: "Pearl Items",
      label: "Pearl Items",
      accelerator: 'F3',
      click: () => { mainWindow.loadURL("https://garmoth.com/pearl-items") }
    },
    {
      role: "Imperial Crates",
      label: "Imperial Crates",
      accelerator: `${ctrl}+G`,
      click: () => { mainWindow.loadURL("https://garmoth.com/imperial-crates") }
    },
    {
      role: "Market Watcher",
      label: "Market Watcher",
      accelerator: `${ctrl}+W`,
      click: () => { mainWindow.loadURL("https://garmoth.com/market-watcher") }
    },
    ]
  }));
  menu.append(new MenuItem({
    label: "Enhancing",
    submenu: []
  }));
  menu.append(new MenuItem({
    label: "Tools",
    submenu: []
  }));
  

  mainWindow.setMenu(menu);

  // Check if dashboard exists on the page, only appears if user has logged in
  // This is a hacky method to check, for now it will do
  mainWindow.webContents.once('did-finish-load', () => {
    url = mainWindow.webContents.getURL();
    if (url !== "https://garmoth.com/") return;
    mainWindow.webContents.on('found-in-page', (_evnt, res) => {
      // User has logged in, take them to the dashboard
      // since garmoth.com doesnt auto redirect
      if (res.matches >= 1) mainWindow.loadURL("https://garmoth.com/dashboard");
    });

    mainWindow.webContents.findInPage("Dashboard");

  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
