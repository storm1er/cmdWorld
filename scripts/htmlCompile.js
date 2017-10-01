const ncp = require('ncp').ncp;
const htmlRegExp = new RegExp(/.*\.html$/g);

// TODO minifier html
// TODO avoid re-compiling for nothing

console.log("[htmlCompile] start ");

ncp("src/", "dist/", {
  filter: function(name) {
    if (name.indexOf('.') == -1) {
      return true;
    }
    if (name.indexOf('js') != -1) {
      return false;
    }
    var ret = !! name.match(htmlRegExp);
    if (ret) {
      console.log("[htmlCompile] copying ", name);
    }
    return ret;
  }
}, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log("[htmlCompile] done.");
});
