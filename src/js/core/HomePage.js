'use strict';

class HomePage extends GameElement {
  onStart(){
    var _this = this;
    this.master.element('Lib::JQuery').then(function(dep){
      _this.JQuery = dep.JQuery();
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
