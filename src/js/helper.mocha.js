
// TODO add link for console personnalized behavior
// TODO add link for dom personnalized behavior

module.exports = {
  testHtml: function(pathToHtml, _resolve, _reject, timeToWait = 100){
    var jsdom = require("jsdom");
    var { JSDOM } = jsdom;
    var fs = require('fs');
    var virtualConsole = new jsdom.VirtualConsole();

    virtualConsole.sendTo(console);
    virtualConsole.on("jsdomError", function(){
      _reject(new Error(arguments[0]));
    });
    JSDOM.fromFile(__dirname + '/' + pathToHtml, {
      resources: "usable",
      runScripts: "dangerously",
      virtualConsole
    }).then(function(dom){
      // mocking requestAnimationFrame
      dom.window.requestAnimationFrame = function(fn){
        return setTimeout(fn, 100);
      };
      // mocking requestAnimationFrame
      dom.window.cancelAnimationFrame = function(int){
        clearTimeout(int);
      };
      // mocking window.performance.now()
      dom.window.performance = {
        now: function(fn){
          return (new Date()).getTime();
        }
      };
      setTimeout(function(){
        _resolve(dom);
      }, timeToWait);
    }, _reject);
  }
};
