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
    submenu: [
      {
        role: "Enhancing Calculator",
        label: "Enhance Calculator",
        accelerator: `${ctrl}+E`,
        click: () => { mainWindow.loadURL("https://garmoth.com/enhancing-calculator") }
      },
      {
        role: "Caphras Calculator",
        label: "Caphras Calculator",
        click: () => { mainWindow.loadURL("https://garmoth.com/caphras-calculator") }
      },
      {
        role: "Cron Stone Cost",
        label: "Cron Stone Cost",
        click: () => { mainWindow.loadURL("https://garmoth.com/cron-stone-cost") }
      },
    ]
  }));
  menu.append(new MenuItem({
    label: "Tools",
    submenu: [
      {
        role: "PvE hitrate Calculaotr",
        label: "PvE hitrate Calculator",
        click: () => { mainWindow.loadURL("https://garmoth.com/pve-hitrate-calculator") }
      },
      {
        role: "PvP hitrate Calculaotr",
        label: "PvP hitrate Calculator",
        click: () => { mainWindow.loadURL("https://garmoth.com/pvp-hitrate-calculator") }
      },
      {
        role: "AP & DP Brackets",
        label: "AP & DP Brackets",
        click: () => { mainWindow.loadURL("https://garmoth.com/ap-dp-brackets") }
      },
  ]
  }));
  menu.append(new MenuItem({
    label: "Grind Tracker",
    
    submenu: [
      {
        role: "Grind Tracker",
        label: "Grind Tracker",
        click: () => { mainWindow.loadURL("https://garmoth.com/grind-tracker/summary") }
      },
      {
        role: "Grind Timers",
        label: "Grind Timers",
        click: () => { mainWindow.loadURL("https://garmoth.com/grind-tracker/timers") }
      }
    ]
  }));
  menu.append(new MenuItem({
    label: "Gear Builder",
    submenu: [
      {
        role: "Gear Builder",
        label: "Gear Builder",
        click: () => { mainWindow.loadURL("https://garmoth.com/gear-builder") }
      },
      {
        role: "BDO Planner",
        label: "BDO Planner",
        click: () => { mainWindow.loadURL("https://bdoplanner.com/") }

      }
    ]
  }));


  mainWindow.setMenu(menu);

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
