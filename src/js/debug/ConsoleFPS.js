'use strict';

class ConsoleFPS extends GameElement {
  onStart(){
    console.log('ConsoleFPS init')
    this.lastFrame = window.performance.now();
  }
  onUpdate(){
    this.diffBetweenUpdate = (window.performance.now()-this.lastFrame);
    this.fps = (1000/this.diffBetweenUpdate).toFixed(1);
    console.log("[ConsoleFPS] :", this.fps);
    this.lastFrame = window.performance.now();
  }
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      getFps:function(){
        return _this.fps;
      }
    };
  }
}
