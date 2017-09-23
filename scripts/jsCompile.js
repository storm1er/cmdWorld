const ncp = require('ncp').ncp;
const jsRegExp = new RegExp(/^(?!.*\.test\.js$).*\.js$/g);

// TODO avoid webpack files
// TODO js lint
// TODO js minifier

console.log("[jsCompile] start ");

ncp("src/", "dist/", {
  filter: function(name) {
    if (name.indexOf('.') == -1) {
      return true;
    }
    var ret = !! name.match(jsRegExp);
    if (ret) {
      console.log("[jsCompile] copying ", name);
    }
    return ret;
  }
}, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log("[jsCompile] done.");
});
