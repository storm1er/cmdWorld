'use strict';

class ScreenManager extends GameElement {
  onStart(){
    var _this = this;
    this.master.element('Lib::JQuery').then(function(dep){
      _this.JQuery = dep.JQuery();
      _this.JQuery('main').empty();
    });
  }
  onUpdate(){}
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      display:function(url){return _this.display(url);},
      isExist:function(search){return _this.isExist(search);},
      remove:function(search){return _this.remove(search);},
    };
  }

  /**
   * Append html to <main>
   *
   * You can display the same file multiple time
   * @method display
   * @param  {string} url url to html file
   * @return {string}     uuid v4 to identify your element in dom (#uuid)
   */
  display(url){
    var $ = _this.JQuery;
    
  }

  /**
   * Check if your html is present.
   *
   * You can use the url used in display()
   * or the id that you get with it.
   *
   * @method isExist
   * @param  {string}  search url or uuid from display()
   * @return {Boolean}
   */
  isExist(search){}

  /**
   * Remove element from display.
   *
   * You can use the url used in display()
   * or the id that you get with it.
   *
   * @method remove
   * @param  {string}  search url or uuid from display()
   * @return {Boolean}  deletion success
   */
  remove(search){}

}
