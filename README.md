# cmdWorld
Source of a hackNet inspired game

[![Build Status](https://travis-ci.org/storm1er/cmdWorld.svg?branch=master)](https://travis-ci.org/storm1er/cmdWorld)
[![dependencies Status](https://david-dm.org/storm1er/cmdWorld/status.svg)](https://david-dm.org/storm1er/cmdWorld)
[![devDependencies Status](https://david-dm.org/storm1er/cmdWorld/dev-status.svg)](https://david-dm.org/storm1er/cmdWorld?type=dev)

## installing (contributing purpose)
Clone repo then `npm install` then you should be good to go ;)

## npm run-scripts
- `npm run clean` : remove dist/* files
- `npm run build:js`: compile src/js files to dist/js
- `npm run build:css`: compile src/css files to dist/css
- `npm run build:html`: compile src/html files to dist/html
- `npm run build`: `npm run clean ; npm run build:js ; npm run build:css ; npm run build:html`
- `npm run test`: launch js test with `mocha`
- `npm run start`: `npm run build && NODE_ENV=dev browser-sync start --config config/bs-config.js`
