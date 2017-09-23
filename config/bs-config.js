
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
const fs = require('fs');
const sass = require('node-sass');
const execSync = require("child_process").execSync;
const path = require('path');

var SEPARATOR = process.platform === "win32" ? ";" : ":";
var env = Object.assign({}, process.env);
env.PATH = path.resolve("./node_modules/.bin") + SEPARATOR + env.PATH;

var myExecSync = function myExecSync(cmd) {
    var output = execSync(cmd, {
        cwd: process.cwd(),
        env: env
    });

    console.log(output.toString('utf-8'));
}
var copyHtml = function(action, fileName) {
  myExecSync("npm run build:html");
}
var compileScss = function (action, fileName) {
  myExecSync("npm run build:css");
}
var compileJs = function(action, fileName){
  myExecSync("npm run build:js");
}

module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 8080
        }
    },
    "files": [
      "dist/**/*.html",
      "dist/css/**/*.css",
      "dist/js/**/*.js",
      {
        match:"src/**/*.html",
        fn: copyHtml
      },
      {
        match:"src/css/**/*.scss",
        fn: compileScss
      },
      {
        match:"src/js/**/*.js",
        fn: compileJs
      },
    ],
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "server": "dist",
    "https": false,
    "proxy": false,
    "port": 3000,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "location": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "logLevel": "info",
    "logPrefix": "Browsersync",
    "logConnections": false,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": [],
    "open": "local",
    "browser": "default",
    "cors": false,
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": true,
    "notify": true,
    "scrollProportionally": true,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": [],
    "scrollElementMapping": [],
    "reloadDelay": 0,
    "reloadDebounce": 0,
    "reloadThrottle": 0,
    "plugins": [],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": false,
    "codeSync": true,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};
