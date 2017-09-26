'use strict';

class JQuery extends GameElement {
  onStart(){
    var _this = this;
    this.getDependency('JQuery');
  }
  onUpdate(){}
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      JQuery:function(){
        return _this.JQuery;
      }
    };
  }
}
