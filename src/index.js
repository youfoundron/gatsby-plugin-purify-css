import purify from 'purify-css'
import { resolve } from 'path'
import { promisify, all } from 'bluebird'

import sanitizeCSS from './sanitizeCSS'
import getPathsWithExt from './getPathsWithExt'
import selectAndReplaceInFileFactory from './selectAndReplaceInFileFactory'

const purifyAsync = promisify(purify)

exports.onPostBuild = async (_, {purifyOptions = {minify: true}}, cb) => {
  const rootPath = resolve('public')

  // get file paths
  const htmlFiles = await getPathsWithExt('html', rootPath)
  const cssFiles = await getPathsWithExt('css', rootPath)

  // purify CSS, remove comments, sourcemaps, and newlines
  let purifiedCSS = await purifyAsync(htmlFiles, cssFiles, purifyOptions)
  purifiedCSS = sanitizeCSS(purifiedCSS)

  // replace CSS in html files
  const selector = '#gatsby-inlined-css'
  const replaceCSS = selectAndReplaceInFileFactory(selector, purifiedCSS)
  const htmlFileUpdates = htmlFiles.map(replaceCSS)
  await all(htmlFileUpdates)

  // continue plugin execution
  return cb()
}
