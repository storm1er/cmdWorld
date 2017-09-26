(function(){
  dispatchDependency("JQuery", require('jquery'));

  function dispatchDependency(name, value) {
    const validName = /^[a-zA-Z]+$/g;
    if (validName.test(name)) {
      document.addEventListener("dep::"+name, function(){
        window['set'+name](value);
        document.removeEventListener("dep::"+name, {});
      });
    }
    else {
      Error('WebPack : invalid name "'+name+'"');
      return false;
    }
  }

  /**
  var RethinkdbWebsocketClient = require('rethinkdb-websocket-client');
  var r = RethinkdbWebsocketClient.rethinkdb;

  // In case you want bluebird, which is bundled with the rethinkdb driver
  // var Promise = RethinkdbWebsocketClient.Promise;

  var options = {};
  // TODO init dev|prod
  options = {
    host: '137.74.197.230',  // hostname of the websocket server
    port: 28250,             // port number of the websocket server
    path: '/',               // HTTP path to websocket route
    wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
    secure: false,           // set true to use secure TLS websockets
    db: 'rethinkdb',         // default database, passed to rethinkdb.connect
  };

  RethinkdbWebsocketClient.connect(options).then(function(conn) {
    var query = r.table('users');
    query.run(conn, function(err, cursor) {
      cursor.toArray(function(err, results) {
        console.log(results);
      });
    });
  }).error(function(err){
    throw err;
  });

   */
})();
