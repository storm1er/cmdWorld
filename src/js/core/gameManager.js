'use strict';

/**
 * Main class, will handle event and manage game elements
 */

class GameManager extends Emitter {
  constructor(verbose = false) {
    super();
    this.gameElements = {};
    if (verbose) {
      this.verbose();
    }

    if (typeof jQuery !== "function") {
      throw Error("jQuery must exist");
    }
    this.$ = jQuery;
    this.main();
    return this;
  }

  /**
   * override Emitter to console.log every event (except Core::update)
   * @method verbose
   */
  verbose() {
    console.log('GameManager : verbose');
    var _this = this;
    var on = this.on;
    function newOn() {
      console.log('GameManager : add listener ', arguments[0]);
      on.apply(_this, arguments);
    }
    this.on = newOn;

    var emit = this.emit;
    function newEmit() {
      if (arguments[0] !== "Core::update") {
        console.log('GameManager : emit event ', arguments[0]);
      }
      emit.apply(_this, arguments);
    }
    this.emit = newEmit;
  }

  /**
   * Main loop, emit "Core::update" every frame
   *
   * @method main
   */
  main() {
    // let browser handle frames
    var _this = this;
    var lastTFrame = window.performance.now();
    var loop = function(tFrame){
      _this.animationFrameId = window.requestAnimationFrame( loop );
      // var diffBetweenUpdate = (tFrame-lastTFrame).toFixed(1);
      // var fps = (1000/diffBetweenUpdate).toFixed(1);
      _this.emit("Core::update");
    }
    loop();
  }

  /**
   * Will provide GameElement's shared ressources through a Promise
   * usage :
   *   GameManager.element('Core::HomePage')
   *     .then(function(homePage){
   *       // homePage is the return of HomePage.sharedRessources()
   *     }, function(err){
   *       // if gameElement can't be loaded
   *     });
   *
   * @method element
   * @param  {string} gameElementName gameElement's name (e.g. "Core::HomePage")
   * @return {object}                 Promise, resolve(obj.sharedRessources())
   */
  element(gameElementName){
    if (this.isGameElementExist(gameElementName)) {
      return this.getGameElement(gameElementName);
    }
    return this.loadGameElement(gameElementName);
  }

  /**
   * Check if a GameElement is exist (e.g. is loaded)
   * @method isGameElementExist
   * @param  {string}           gameElementName gameElement's name
   * @return {Boolean}                          true if exist
   */
  isGameElementExist(gameElementName) {
    return !!this.gameElements[gameElementName];
  }

  /**
   * Provide loaded's game element's shared ressources
   *
   * @method getGameElement
   * @param  {string}       gameElementName game element's name
   * @return {object}                       Promise
   */
  getGameElement(gameElementName) {
    this.emit("Core::getGameElement");
    var _this = this;
    return new Promise(function(resolve, reject) {
      resolve(_this.gameElements[gameElementName].sharedRessources());
    });
  }

  /**
   * Download a game element and provide his shared ressources
   *
   * @method getGameElement
   * @param  {string}       gameElementName game element's name
   * @return {object}                       Promise
   */
  loadGameElement(gameElementName) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var gameElementDef = _this.getGameElementDefinition(gameElementName);
      if (gameElementDef) {
        _this.downloadGameElement(gameElementDef, resolve, reject);
      }
      else {
        reject(
          Error("GameManager : invalid gameElementName \""+gameElementName+"\"")
        );
      }
    });
  }

  /**
   * Download a game element and initialize it
   * @method downloadGameElement
   * @param  {object}            gameElementDef provided by GameManager.getGameElementDefinition
   * @param  {function}          resolve        Promise's resolve function
   * @param  {function}          reject         Promise's reject function
   */
  downloadGameElement(gameElementDef, resolve, reject) {
    var _this = this;
    this.$.getScript(gameElementDef.url).done(function(){
      _this.gameElements[gameElementDef.name] = (Function('return new '+gameElementDef.className))();
      _this.gameElements[gameElementDef.name].setGameManager(
        _this.getLittleManager(gameElementDef.name)
      );
      resolve(_this.gameElements[gameElementDef.name].sharedRessources());
      _this.emit("Core::loadGameElement", gameElementDef.name);
      _this.emit("Core::loadGameElement["+gameElementDef.name+"]");
    }).fail(function(err){
      reject(err);
    });
  }

  /**
   * Check & Return gameElement's definition based on his name
   * @method getGameElementDefinition
   * @param  {string}                 gameElementName game element's name
   * @return {object|false}                           false if invalid gameElementName
   *         {
   *          name,
   *          className,
   *          folderName,
   *          url
   *         }
   */
  getGameElementDefinition(gameElementName) {
    var gameElementNameRegExp = /^(?:[A-Z]{1}[a-zA-Z]+::[A-Z]{1}[a-zA-Z]+)$/g;
    if (gameElementNameRegExp.test(gameElementName)) {
      var className = gameElementName
        .substr(
          gameElementName.indexOf('::')+2
        );
      var folderName = gameElementName
        .substr(
          0, gameElementName.indexOf('::')
        ).toLowerCase();
      return {
        name : gameElementName,
        className : className,
        folderName : folderName,
        url:'/js/'+folderName+'/'+className+'.js'
      };
    }
    return false;
  }

  /**
   * return an object with basic method for every game element
   * @method getLittleManager
   * @param  {strign}         gameElementName game element's name
   * @return {object}
   *         {
   *          element,
   *          fatalError,
   *          isGameElementExist,
   *          on,
   *          emit
   *         }
   */
  getLittleManager(gameElementName) {
    const validGameElementEventName = /^[a-zA-Z]+$/g;
    var _this = this;
    return {
      name:gameElementName,
      element:this.element,
      fatalError:this.fatalError,
      isGameElementExist:this.isGameElementExist,
      // avoid giving GameManager to cb
      on:function(event, cb){
        _this.on(event, function(){
          cb.apply(document);
        });
      },
      off:function(eventName, cb){
        if (!validGameElementEventName.test(eventName)) {
          Error(gameElementName+' : invalidNameEvent "'+eventName+'"');
          return false;
        }
        if (typeof cb !== 'function') {
          Error(gameElementName+' : callback must be a function');
          return false;
        }
        return _this.off(eventName, cb);
      },
      // limit emit to GameElement Class
      emit:function(eventName){
        if (!validGameElementEventName.test(eventName)) {
          Error(gameElementName+' : invalidNameEvent "'+eventName+'"');
          return false;
        }
        return _this.emit(gameElementName+'['+eventName+']');
      }
    };
  }

  /**
   * Kill the game the display an error,
   * Use only when nothing can be done
   * @method fatalError
   * @param  {string}   [str=null] error to display
   */
  fatalError(str=null) {
    this.destroy();
    var $ = this.$;
    var main = $('main');
    main.html('<span class="red-text">Fatal error</span><br>');
    if (typeof str === "string") {
      main.append('<span class="red-text">'+str+'</span>');
    }
  }

  /**
   * kill main loop then emit "Core::destroy" event
   * @method destroy
   * @return {[type]} [description]
   */
  destroy() {
    window.cancelAnimationFrame( this.animationFrameId );
    this.emit("Core::destroy");
  }
}