const ncp = require('ncp').ncp;
const jsRegExp = new RegExp(/^(?!.*\.(test||mocha)\.js$)^(?!webpack\.js$).*\.js$/g);

// TODO avoid webpack files
// TODO js lint
// TODO js minifier
// TODO avoid re-compiling for nothing

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
  },
  // Follow symlink
  dereference: true
}, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log("[jsCompile] done.");
});
