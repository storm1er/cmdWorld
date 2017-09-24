'use strict';

class ConsoleFPS extends GameElement {
  onStart(){
    console.log('ConsoleFPS init')
    this.lastFrame = window.performance.now();
    this.verbose = false;
  }
  onUpdate(){
    var now = window.performance.now();
    this.diffBetweenUpdate = (now-this.lastFrame);
    this.fps = (1000/this.diffBetweenUpdate).toFixed(0);
    this.lastFrame = now;
    if (this.verbose) {
      console.log("[ConsoleFPS] :", this.fps);
    }
  }
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      setVerbose:function(bool){
        _this.verbose = !!bool;
      },
      getFps:function(){
        return _this.fps;
      }
    };
  }
}
