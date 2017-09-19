import purify from 'purify-css'
import { resolve } from 'path'
import { promisify, all } from 'bluebird'

import { readFile } from './fsAsync'
import sanitizeCSS from './sanitizeCSS'
import getPathsWithExt from './getPathsWithExt'
import selectAndReplaceInFileFactory from './selectAndReplaceInFileFactory'

const purifyAsync = promisify(purify)

exports.onPostBuild = async (_, {purifyOptions = {minify: true}}, cb) => {
  const rootPath = resolve('public')

  // get file paths
  const htmlFiles = await getPathsWithExt('html', rootPath)
  const [cssFile] = await getPathsWithExt('css', rootPath)

  // evalute CSS
  let originalCSS = await readFile(cssFile, { encoding: 'utf-8' })
  let purifiedCSS = await purifyAsync(htmlFiles, originalCSS, purifyOptions)

  // remove comments, sourcemaps, and newlines
  purifiedCSS = sanitizeCSS(purifiedCSS)

  // replace CSS in html files
  const selector = '#gatsby-inlined-css'
  const replaceCSS = selectAndReplaceInFileFactory(selector, purifiedCSS)
  const htmlFileUpdates = htmlFiles.map(replaceCSS)
  await all(htmlFileUpdates)

  // continue plugin execution
  return cb()
}
