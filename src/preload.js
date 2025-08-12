const { contextBridge } = require("electron");
const os = require("os");

contextBridge.exposeInIsolatedWorld("electron", {
  homeDir: () => os.homedir(),
});

window.addEventListener("DOMContentLoaded", () => {
  // You can expose APIs here or manipulate webview if needed
});
