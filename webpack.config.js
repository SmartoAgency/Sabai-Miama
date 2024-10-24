const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    'immediate-loading': './src/assets/scripts/immediate-loading.js',
    'home': './src/assets/scripts/home.js',
    'process': './src/assets/scripts/gulp-modules/process.js',
    'projects': './src/assets/scripts/gulp-modules/projects.js',
    'press': './src/assets/scripts/gulp-modules/press.js',
    'about-us': './src/assets/scripts/gulp-modules/about-us.js',
    'single-project': './src/assets/scripts/gulp-modules/single-project.js',
    index: './src/assets/scripts/index-app.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production')
        }
      }
    }),
  ],
};

module.exports = config;
