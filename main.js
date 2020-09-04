// Do not change
let version = "v1.0.1";

// Dependencies
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const webhook = require("webhook-discord");
const client = require('discord-rich-presence')("750914713977749556");

let url = "https://panel.bluefoxhost.com/";
let date = new Date();
let win;

// Loads modules
require('./modules/functions.js')(client);

app.on('ready', async () => {

    win = new BrowserWindow({
        title: `BlueFox Starting... ${version}`,
        icon: "./Icon/bluefox.ico",
        center: true,
        resizable: true,
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: false,
            show: false
        },
        titleBarStyle: "hidden"
    });

    win.removeMenu();
    await win.loadURL(url);

    await client.updatePresence({
        state: "BlueFox Panel",
        details: "Just Started",
        startTimestamp: date,
        largeImageKey: "bluefox",
        largeImageText: "BlueFoxHost.com",
    });

    win.webContents.on("devtools-opened", () => {
        win.webContents.closeDevTools();
    });

    win.once('ready-to-show',async () => {
        win.show();
    });

    win.on('closed',() => {
        win = null;
    });

    win.on('page-title-updated', async () => {
        console.log(win.webContents.get)
        await client.updatePresence({
            state: "Page: " + win.webContents.getTitle().split(" - ")[1].replace("Viewing Server", ""),
            details: "Site: " + win.webContents.getTitle().split(" - ")[0],
            startTimestamp: date,
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com"
        });
    })

    win.on('focus', async () => {
        await client.updatePresence({
            state: "Page: " + win.webContents.getTitle().split(" - ")[1].replace("Viewing Server", ""),
            details: "Site: " + win.webContents.getTitle().split(" - ")[0],
            startTimestamp: date,
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com"
        });
    });

    app.on('browser-window-blur', async () => {
        await client.updatePresence({
            details: "Idle",
            startTimestamp: new Date(),
            largeImageKey: "idle",
            largeImageText: "BlueFoxHost.com"
        });
        date = new Date();
    })

});