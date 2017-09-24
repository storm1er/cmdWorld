(function(){
  var verbose = true;
  var cmdWorld = new GameManager(verbose);
  cmdWorld.element('Debug::ConsoleFPS').then(function(consoleFPS){
    consoleFPS.setVerbose(false);
  });
  // cmdWorld.element('Core::jQuery');
  //cmdWorld.element('Core::HomePage').then(success, fail);
})();
