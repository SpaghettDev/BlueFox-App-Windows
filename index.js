// Dependencies
const electron = require('electron');
const fetch = require('node-fetch')
const { app, BrowserWindow } = require('electron');
const webhook = require("webhook-discord");
const fs = require("fs");

let client = require('discord-rich-presence')("750914713977749556");

let date = new Date();

// Loads modules
require('./modules/functions.js')(client);

app.on('ready', async () => {

    let win = new BrowserWindow({
        title: 'Starting...',
        icon: "./Icon/bluefox.ico",
        center: true,
        resizable: true,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            show: false
        },
        titleBarStyle: "hidden"
    });

    await client.updatePresence({
        state: "BlueFox App",
        details: "Starting...",
        startTimestamp: date,
        largeImageKey: "bluefox",
        largeImageText: "BlueFoxHost.com",
        instance: true
    });

    win.removeMenu();

    win.webContents.on("devtools-opened", () => {
        win.webContents.closeDevTools();
    });

    await win.loadURL("https://panel.bluefoxhost.com/");

    win.once('ready-to-show',async () => {
        win.show();
    });

    win.on('closed',() => {
        win = null;
    });

    win.on('page-title-updated', async (e) => {
        console.log(win.webContents.getTitle())
        await client.updatePresence({
            state: win.webContents.getTitle().split(" - ")[1],
            details: win.webContents.getTitle().split(" - ")[0],
            startTimestamp: date,
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com",
            instance: true
        });
    })

    win.on('focus', async (e) => {
        await client.updatePresence({
            state: win.webContents.getTitle().split(" - ")[1],
            details: win.webContents.getTitle().split(" - ")[0],
            startTimestamp: date,
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com",
            instance: true
        });
    });

    app.on('browser-window-blur', async () => {
        await client.updatePresence({
            details: "Idle",
            startTimestamp: new Date(),
            largeImageKey: "bluefox",
            largeImageText: "BlueFoxHost.com",
            instance: true
        });
        date = new Date();
    })

    client.win = win;
});