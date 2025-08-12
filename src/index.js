const {
  app,
  BrowserWindow,
  session,
  ipcMain,
  nativeTheme,
} = require("electron");
const path = require("path");
const { autoUpdater, AppUpdater } = require("electron-updater")

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    icon: path.join(__dirname, "assets", "aroopaapps_icon.icns"),
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      //   webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win.webContents.openDevTools();

  win.loadURL("https://app.molwayecosystem.com/");
}

app.whenReady().then(() => {
  createWindow();

  // It's safe to access session
  // const mySession = session.fromPartition("persist:aroopaapp");

  // mySession.cookies
  //   .get({})
  //   .then((cookies) => {
  //     console.log("Session cookies:", cookies);
  //   })
  //   .catch((error) => {
  //     console.error("Error getting cookies:", error);
  //   });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
  autoUpdater.checkForUpdates()
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  console.log("UPDATE AVAILABLE");
  let pth = autoUpdater.downloadUpdate();
  console.log("UPDATE DOWNLOADED downloadUpdate FN");
});

autoUpdater.on("update-not-available", (info) => {
  console.log("UPDATE NOT AVAILABLE");
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  console.log("UPDATE DOWNLOADED");
});

autoUpdater.on("error", (info) => {
  console.log("ERROR", info)
});