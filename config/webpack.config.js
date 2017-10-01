const path = require('path');

module.exports = {
  entry: './src/js/webpack.js',
  output: {
    filename: 'webpack.js',
    path: path.resolve(__dirname, '../dist/js')
  }
};
