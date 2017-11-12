'use strict';

class GameElement {
  /**
   * Defining imutable method setGameManager()
   */
  constructor(verbose = false, testEnv = false) {
    this.log = !!verbose;
    this.testEnv = !!testEnv;
    Object.defineProperty(this, 'setGameManager', {
      configurable:false,
      writable:false,
      value:function(littleManager) {
        if (this.master) {
            throw Error(_this.constructor.name+".master must be inititialized once.");
        }
        if (typeof littleManager !== "object") {
            throw Error(_this.constructor.name+".master must be an object, \""+typeof littleManager+"\" provided");
        }
        const methods = [
          "element",
          "fatalError",
          "isGameElementExist",
          "on",
          "emit",
        ];
        for (var i = 0; i < methods.length; i++) {
          if (typeof littleManager[methods[i]] !== 'function') {
            throw Error(_this.constructor.name+'.master must have a '+methods[i]+' method');
          }
        }
        Object.defineProperty(this, "master", {
          configurable:false,
          writable:false,
          value:littleManager
        });
        var _this = this;
        this.master.on("Core::loadGameElement["+_this.master.name+"]", function(){
          _this.onStart();
          _this.master.on('Core::update', function(){
            _this.onUpdate();
          });
          _this.master.on('Core::destroy', function(){
            _this.onDestroy();
          });
        });
      }
    });
    Object.defineProperty(this, 'getDependency', {
      configurable:false,
      writable:false,
      value:function(webPackVariableName) {
        var _this = this;
        const validWebPackVariableName = /^[A-Z]{1}[a-zA-Z]+$/g;
        if (validWebPackVariableName.test(webPackVariableName)) {
          window['set'+webPackVariableName] = function(dep){
            _this[webPackVariableName] = dep;
            window['set'+webPackVariableName] = null;
            if (_this.log) {
              console.log(_this.constructor.name+' : Dependency "'+webPackVariableName+'" loaded successfully');
            }
          }
          document.dispatchEvent(new Event("dep::"+webPackVariableName));
        }
        else {
          Error(_this.constructor.name+' : invalid webPackVariableName "'+webPackVariableName+'"');
          return false;
        }
      }
    });
  }

  onStart(){}
  onUpdate(){}
  onDestroy(){}
  sharedRessources(){
    return this;
  }
}
