var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var fs = require('fs');
var virtualConsole = new jsdom.VirtualConsole();
var helper = require("../helper.mocha.js");

describe('HomePage & ScreenManager', function(){

  it("should be able to load element & dependency without error", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::loadGameElement[Core::ScreenManager]', onEvent);
        done();
      };

      dom.window.gm.on('Core::loadGameElement[Core::ScreenManager]', onEvent);
      dom.window.gm.element('Core::HomePage');

    }, done);
  });

  it("should be able to display HomePage", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::loadGameElement[Core::ScreenManager]', onEvent);
        if (!dom.window.gm.gameElements['Core::HomePage']) {
          done(new Error('gameElement "Core::HomePage" doesn\'t exist ?'));
        }
        dom.window.gm.gameElements['Core::HomePage'].activeMenu();
        setTimeout(function(){
          var doc = dom.window.document;

          // The test work only with this console.log ?!
          console.log(doc.querySelector('body').innerHTML);

          var main = doc.querySelector("main");
          if (main == null) {
            return done(new Error('<main> is missing'));
          }
          var div = main.querySelector('div');
          if (div == null) {
            return done(new Error('<main><div> is missing'));
          }
          if (div.querySelector('h1') == null) {
            return done(new Error('<main><div><h1> is missing'));
          }
          done();
        }, 100);
      };

      dom.window.gm.on('Core::loadGameElement[Core::ScreenManager]', onEvent);
      dom.window.gm.element('Core::HomePage');

    }, done);
  });


});
