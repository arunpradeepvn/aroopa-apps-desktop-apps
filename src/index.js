const {
  app,
  BrowserWindow,
} = require("electron");
const path = require("path");
const { dialog } = require("electron");
const log = require("electron-log");
const { autoUpdater } = require("electron-updater")

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App is starting...");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    icon: path.join(__dirname, "assets", "aroopaapps_icon.icns"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    }
  });

  // win.webContents.openDevTools();

  win.loadURL("https://app.molwayecosystem.com");
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
autoUpdater.on("update-available", async () => {
  console.log("UPDATE AVAILABLE");
  await dialog.showMessageBox({
    type: "info",
    title: "Update available",
    message: "A new version is available. Downloading now...",
  });

  try {
    await autoUpdater.downloadUpdate();
    console.log("UPDATE DOWNLOADED successfully");
  } catch (err) {
    console.error("Error downloading update:", err);
  }
});


autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox({
    type: "info",
    title: "No update available",
    message: "You are using the latest version.",
  });
  console.log("UPDATE NOT AVAILABLE");
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox({
    type: "info",
    title: "Update Ready",
    message: "Install now?",
    buttons: ["Yes", "Later"]
  }).then(result => {
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("error", (info) => {
  console.log("ERROR", info)

  dialog.showMessageBox({
    type: "info",
    title: "Error updating app",
    message: info,
  });
});