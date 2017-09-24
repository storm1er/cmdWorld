'use strict';

class JQuery extends GameElement {
  onStart(){
    var _this = this;
    this.getDependency('jQuery');
  }
  onUpdate(){}
  onDestroy(){}
  sharedRessources(){
    return this.jQuery;
  }
}
