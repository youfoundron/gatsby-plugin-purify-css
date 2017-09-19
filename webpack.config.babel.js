import { resolve } from 'path'
import makeRule from 'webpack-make-rule'
import nodeExternals from 'webpack-node-externals'

export default {
  target: 'node',
  externals: [nodeExternals()],
  entry: resolve(__dirname, './src/index.js'),
  output: {
    path: resolve(__dirname),
    filename: 'gatsby-node.js',
    library: 'onPostBuild',
    libraryTarget: 'commonjs',
    libraryExport: 'onPostBuild'
  },
  module: {
    rules: [ makeRule(/\.jsx?$/, 'babel-loader') ]
  }
}
