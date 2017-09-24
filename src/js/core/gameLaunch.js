(function(){
  var verbose = true;
  var cmdWorld = new GameManager(verbose);
  cmdWorld.element('Debug::ConsoleFPS').then(function(consoleFPS){
    consoleFPS.onDisplay(verbose);
  });
})();
