const { app, BrowserWindow, webFrame } = require("electron");
const url = require("url");
const path = require("path");

function onReady() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      spellcheck: false,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/electronjs-start/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  win.webContents.setZoomFactor(1.0);
  win.webContents.on("zoom-changed", (event, zoomDirection) => {
    console.log(zoomDirection);
    var currentZoom = win.webContents.getZoomFactor();
    console.log("Current Zoom Factor - ", currentZoom);
    // console.log('Current Zoom Level at - '
    // , win.webContents.getZoomLevel());
    console.log("Current Zoom Level at - ", win.webContents.zoomLevel);

    if (zoomDirection === "in") {
      // win.webContents.setZoomFactor(currentZoom + 0.20);
      win.webContents.zoomFactor = currentZoom + 0.2;

      console.log(
        "Zoom Factor Increased to - ",
        win.webContents.zoomFactor * 100,
        "%"
      );
    }
    if (zoomDirection === "out") {
      // win.webContents.setZoomFactor(currentZoom - 0.20);
      win.webContents.zoomFactor = currentZoom - 0.2;

      console.log(
        "Zoom Factor Decreased to - ",
        win.webContents.zoomFactor * 100,
        "%"
      );
    }
  });
}
app.on("ready", onReady);
