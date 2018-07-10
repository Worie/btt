const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

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
  externals: ['child_process', 'node-fetch-polyfill'],
  resolve: {
    modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src'),
    ],
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  plugins: [
    new TypedocWebpackPlugin({
      ignoreCompilerErrors: true,
      out: './../docs',
      module: 'commonjs',
      target: 'es5',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true,
      excludeExternals: true,
      excludePrivate: true,
      includeDeclarations: true,
      excludeProtected: true,
      hideGenerator: true,
      name: 'btt',
      mode: 'file',
    }, './src')
  ]
};
