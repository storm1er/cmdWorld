'use strict';

class HomePage extends GameElement {
  onStart(){
    var _this = this;
    this.master.element('Lib::JQuery').then(function(dep){
      _this.JQuery = dep.JQuery();
    });
    this.master.element('Core::ScreenManager').then(function(_ScreenManager){
      _this.ScreenManager = _ScreenManager;
    });
  }
  onUpdate(){}
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      start:function(){return _this.activeMenu();},
      stop:function(){return _this.destroyMenu();},
    };
  }

  activeMenu(){
    return true;
  }
  destroyMenu(){
    return true;
  }
}
