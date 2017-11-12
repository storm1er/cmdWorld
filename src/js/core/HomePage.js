'use strict';

class HomePage extends GameElement {
  onStart(){
    this.menuIsActive = false;
    this.menuUuid = false;
    var _this = this;
    this.master.element('Lib::JQuery').then(function(dep){
      _this.JQuery = dep.JQuery();
    });
    this.master.element('Core::ScreenManager').then(function(_ScreenManager){
      _this.ScreenManager = _ScreenManager;
    });
  }
  onUpdate(){
    if (this.JQuery && this.ScreenManager) {
      this.updateMenu(this.menuIsActive);
    }
  }
  onDestroy(){}
  sharedRessources(){
    var _this = this;
    return {
      start:function(){return _this.activeMenu();},
      stop:function(){return _this.destroyMenu();},
      isActive:function(){return _this.menuIsActive;},
    };
  }

  /**
   * Activate menu.
   *
   * @method activeMenu
   * @return {Boolean} true
   */
  activeMenu(){
    this.menuIsActive = true;
    return this.menuIsActive;
  }

  /**
   * De-activate menu.
   *
   * @method destroyMenu
   * @return {Boolean} false
   */
  destroyMenu(){
    this.menuIsActive = false;
    return this.menuIsActive;
  }

  /**
   * Update menu on screen.
   *
   * @method updateMenu
   * @param  {Boolean}  isMenuActive True if menu is active.
   */
  updateMenu(isMenuActive){
    var $ = this.JQuery;
    var sm = this.ScreenManager;
    var page = 'homepage';

    // Display menu
    if (!this.isMenuLoaded() && isMenuActive) {
      this.menuUuid = sm.display(page);
    }
    // Remove menu
    else if (this.isMenuLoaded() && !isMenuActive) {
      this.menuUuid = false;
      this.sm.remove(page);
    }
  }

  /**
   * Tell if menu is loaded based on saved uuid.
   *
   * @method isMenuLoaded
   * @return {Boolean}
   */
  isMenuLoaded(){
    if (this.menuUuid) {
      return true;
    }
    return false;
  }
}
