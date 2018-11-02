import 'babel-polyfill'
import { resolve } from 'path'
import { all } from 'bluebird'
import purify from 'purify-css'

import prepareStyles from './prepareStyles'
import getPathsWithExt from './getPathsWithExt'
import selectAndReplaceInFileFactory from './selectAndReplaceInFileFactory'

const defaultId = 'gatsby-inlined-css'
const defaultOptions = { info: true, minify: true }

exports.onPostBuild = async (_, {
  styleId = defaultId,
  purifyOptions = defaultOptions
}, cb) => {
  const rootPath = resolve('public')
  const selector = `#${styleId}`
  const removeCSS = selectAndReplaceInFileFactory(selector, '')

  // get file paths
  const jsFiles = await getPathsWithExt('js', rootPath)
  const cssFiles = await getPathsWithExt('css', rootPath)
  const htmlFiles = await getPathsWithExt('html', rootPath)

  // sanitize purify inputs
  const htmlFileSanitizations = htmlFiles.map(removeCSS)
  await all(htmlFileSanitizations)

  const content = [...jsFiles, ...htmlFiles]
  const rawCSS = await prepareStyles(cssFiles)

  // purify CSS
  const purifiedCSS = await (new Promise((resolve, reject) => (
    purify(content, rawCSS, purifyOptions, resolve)
  )))

  // replace CSS in html files
  const replaceCSS = selectAndReplaceInFileFactory(selector, purifiedCSS)
  const htmlFileUpdates = htmlFiles.map(replaceCSS)
  await all(htmlFileUpdates)

  // continue plugin execution
  return cb()
}
