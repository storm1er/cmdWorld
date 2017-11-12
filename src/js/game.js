(function(){
  var main = document.querySelector('main');
  main.innerHTML += '<span>Loading /js/game.js ...</span>';

  /**
   * This simply add a <script src="{url}" onload="{cb}"> to page
   * @method loadScript
   * @param  {string}   url url to js file
   * @param  {Function} cb  callback for onload propertie
   */
  function loadScript(url, cb) {
      main.innerHTML += 'Loading '+url+' ...';
      var s = document.createElement('script');
      s.setAttribute('src', url);
      s.onload = function(){
        main.innerHTML += ' <span class="text-success">done</span><br/>';
        if (typeof cb === 'function') {
          setTimeout(function(){
            cb();
          }, 150);
        }
      };
      document.body.appendChild(s);
  }

  var timeToWait = 0;

  /**
   * Display progressively string on screen, using timeToWait global variable.
   * @method loadScript
   * @param  {string|function}   str string to display or function to call
   */
  function d(str=""){
    timeToWait += 100;
    setTimeout(function(){
      if (typeof str === 'function') {
        str();
      } else {
        main.innerHTML += str+'<br/>';
      }
    }, timeToWait);
  };

  d(' <span class="text-success">done</span>');
  d();
  d('<pre> ___________________________________________/\\\\\\___/\\\\\\______________/\\\\\\_____________________________/\\\\\\\\\\\\____________/\\\\\\__</pre>');
  d('<pre>  __________________________________________\\/\\\\\\__\\/\\\\\\_____________\\/\\\\\\____________________________\\////\\\\\\___________\\/\\\\\\__</pre>');
  d('<pre>   __________________________________________\\/\\\\\\__\\/\\\\\\_____________\\/\\\\\\_______________________________\\/\\\\\\___________\\/\\\\\\__</pre>');
  d('<pre>    _____/\\\\\\\\\\\\\\\\____/\\\\\\\\\\__/\\\\\\\\\\__________\\/\\\\\\__\\//\\\\\\____/\\\\\\____/\\\\\\_____/\\\\\\\\\\_____/\\\\/\\\\\\\\\\\\\\_____\\/\\\\\\___________\\/\\\\\\__</pre>');
  d('<pre>     ___/\\\\\\//////___/\\\\\\///\\\\\\\\\\///\\\\\\___/\\\\\\\\\\\\\\\\\\___\\//\\\\\\__/\\\\\\\\\\__/\\\\\\____/\\\\\\///\\\\\\__\\/\\\\\\/////\\\\\\____\\/\\\\\\______/\\\\\\\\\\\\\\\\\\__</pre>');
  d('<pre>      __/\\\\\\_________\\/\\\\\\_\\//\\\\\\__\\/\\\\\\__/\\\\\\////\\\\\\____\\//\\\\\\/\\\\\\/\\\\\\/\\\\\\____/\\\\\\__\\//\\\\\\_\\/\\\\\\___\\///_____\\/\\\\\\_____/\\\\\\////\\\\\\__</pre>');
  d('<pre>       _\\//\\\\\\________\\/\\\\\\__\\/\\\\\\__\\/\\\\\\_\\/\\\\\\__\\/\\\\\\_____\\//\\\\\\\\\\\\//\\\\\\\\\\____\\//\\\\\\__/\\\\\\__\\/\\\\\\____________\\/\\\\\\____\\/\\\\\\__\\/\\\\\\__</pre>');
  d('<pre>        __\\///\\\\\\\\\\\\\\\\_\\/\\\\\\__\\/\\\\\\__\\/\\\\\\_\\//\\\\\\\\\\\\\\/\\\\_____\\//\\\\\\__\\//\\\\\\______\\///\\\\\\\\\\/___\\/\\\\\\__________/\\\\\\\\\\\\\\\\\\_\\//\\\\\\\\\\\\\\/\\\\_</pre>');
  d('<pre>         ____\\////////__\\///___\\///___\\///___\\///////\\//_______\\///____\\///__________\\/////_____\\///_________\\/////////___\\///////\\//__</pre>');
  d();
  d('A Multiplayer\'s HackNet inspired game');
  d();
  d('Inititializing ...');
  d();
  d(function(){
    loadScript('/js/core/emitter.js', function(){
      loadScript('/js/core/gameElement.js', function(){
        loadScript('/js/core/gameManager.js', function(){
          loadScript('/js/core/gameLaunch.js');
        });
      });
    });
  });
})();
