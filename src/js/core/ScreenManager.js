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
   * Append page to <main>
   *
   * It will load /home/YOURPAGE.html,
   * you can display the same file multiple time
   *
   * @method display
   * @param  {string} page dist/src/{page}.html
   * @return {string}      uuid v4 to identify your element in dom (#uuid)
   */
  display(page){
    var _this = this;
    var $ = this.JQuery;
    var url = '/html/'+page+'.html';
    var uuid = this.master.guid();
    $.get(url).done(function(data){
      var el = $('<div id="'+uuid+'" page="'+page+'">'+data+'</div>');
      $('main').append(el);
    }).fail(function(err){
      _this.master.fatalError("Bad page name provided");
    });
    return uuid;
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
  isExist(search){
    var byUuid = !!this.JQuery('#'+search).length;
    var byPageName = !!this.JQuery('[page="'+search+'"]').length;
    return (byUuid || byPageName);
  }

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
  remove(search){
    var byUuid = !!this.JQuery('#'+search).remove();
    var byPageName = !!this.JQuery('[page="'+search+'"]').remove();
    return (byUuid || byPageName);
  }

}
