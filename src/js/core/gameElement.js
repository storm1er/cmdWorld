'use strict';

class GameElement {
  /**
   * Defining imutable method setGameManager()
   */
  constructor() {
    console.log('GameElement constructor');
    Object.defineProperty(this, 'setGameManager', {
      configurable:false,
      writable:false,
      value:function(littleManager) {
        if (this.master) {
            throw Error("GameElement.master must be inititialized once.");
        }
        if (typeof littleManager !== "object") {
            throw Error("GameElement.master must be an object, \""+typeof littleManager+"\" provided");
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
            throw Error('GameElement.master must have a '+methods[i]+' method');
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
        });
        this.master.on('Core::update', function(){
          _this.onUpdate();
        });
        this.master.on('Core::destroy', function(){
          _this.onDestroy();
        });
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
