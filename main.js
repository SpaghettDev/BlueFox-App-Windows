// Dependencies
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const webhook = require("webhook-discord");

let client = require('discord-rich-presence')("750914713977749556");
let url = "https://panel.bluefoxhost.com/";

let date = new Date();
let win;

// Loads modules
require('./modules/functions.js')(client);

app.on('ready', async () => {

    win = new BrowserWindow({
        title: 'Starting...',
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
        state: "BlueFox App",
        details: "Starting...",
        startTimestamp: date,
        largeImageKey: "bluefox",
        largeImageText: "BlueFoxHost.com",
        instance: true
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
            state: win.webContents.getTitle().split(" - ")[1],
            details: win.webContents.getTitle().split(" - ")[0],
            startTimestamp: date,
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com"
        });
    })

    win.on('focus', async () => {
        await client.updatePresence({
            state: win.webContents.getTitle().split(" - ")[1],
            details: win.webContents.getTitle().split(" - ")[0],
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