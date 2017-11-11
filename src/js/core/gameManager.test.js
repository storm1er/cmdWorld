var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var fs = require('fs');
var virtualConsole = new jsdom.VirtualConsole();
var helper = require("../helper.mocha.js");

describe('Basic stuff (webpack.js, Emitter, GameManager, GameElement)', function(){


  it("should load without error", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){
      done();
    }, done);
  });


  it("should trigger event Core::update", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::update', onEvent);
        done();
      };

      dom.window.gm.on('Core::update', onEvent);

    }, done);
  });


  it("should trigger event Core::destroy", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::destroy', onEvent);
        done();
      };

      dom.window.gm.on('Core::destroy', onEvent);
      dom.window.gm.destroy();

    }, done);
  });


  it("should be able to load element & dependency without error", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::loadGameElement[Lib::JQuery]', onEvent);
        done();
      };

      dom.window.gm.on('Core::loadGameElement[Lib::JQuery]', onEvent);
      dom.window.gm.element('Debug::ConsoleFPS');

    }, done);
  });


  it("should be able to load element & dependency multiple time without error", function(done){
    helper.testHtml("core/gameManager.test.html", function(dom){

      var onEvent = function(){
        dom.window.gm.off('Core::getGameElement[Debug::ConsoleFPS]', onEvent);
        done();
      };

      dom.window.gm.on('Core::getGameElement[Debug::ConsoleFPS]', onEvent);
      dom.window.gm.element('Debug::ConsoleFPS').then(function(){
        setTimeout(function(){
          dom.window.gm.element('Debug::ConsoleFPS');
        }, 10);
      });

    }, done);
  });


});
