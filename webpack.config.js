const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: ['child_process', 'node-fetch-polyfill', 'crypto'],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  stats: 'errors-only',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new UglifyJSWebpackPlugin(),
    new TypedocWebpackPlugin({
      ignoreCompilerErrors: true,
      out: './../docs/btt',
      module: 'commonjs',
      target: 'ES2017',
      exclude: ['./../**/node_modules/**/*.*,', './../docs', './../test/**/*'],
      experimentalDecorators: true,
      excludeExternals: true,
      excludePrivate: true,
      includeDeclarations: true,
      excludeProtected: true,
      hideGenerator: true,
      name: 'btt',
      mode: 'file',
    }, './src'),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
  ]
};
