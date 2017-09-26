'use strict';

class ConsoleFPS extends GameElement {
  onStart(){
    this.lastFrame = window.performance.now();
    this.inConsole = false;
    this.onDisplay = false;
    var _this = this;
    this.master.element('Lib::JQuery').then(function(dep){
      _this.JQuery = dep.JQuery();
    });
  }
  onUpdate(){
    this.updateFps();
    this.showInConsole();
    this.showOnDisplay();
  }
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      inConsole:function(bool){
        _this.inConsole = !!bool;
      },
      onDisplay:function(bool){
        _this.onDisplay = !!bool;
      },
      getFps:function(){
        return _this.fps;
      }
    };
  }

  updateFps(){
    var now = window.performance.now();
    this.diffBetweenUpdate = (now-this.lastFrame);
    this.fps = (1000/this.diffBetweenUpdate).toFixed(0);
    this.lastFrame = now;
  }
  showInConsole(){
    if (this.inConsole) {
      console.log(this.constructor.name, ":", this.fps);
    }
  }
  showOnDisplay(){
    if (this.onDisplay && this.JQuery) {
      if (this.block) {
        this.block.find('span').html(this.fps);
      }
      else {
        var $ = this.JQuery;
        this.block = $('<div><span>'+this.fps+'</span> fps</div>');
        this.block.css({
          'padding':'.2em',
          'width':'auto',
          'background-color':'rgba(250, 250, 250, .75)',
          'border-radius':'2px',
          'color':'#000000',
          'position':'fixed',
          'left':'0px',
          'top':'0px'
        });
        $('body').append(this.block);
      }
    }
    else if (this.block) {
      this.block.remove();
      this.block = null;
    }
  }
}
