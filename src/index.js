import { resolve } from 'path'
import { all } from 'bluebird'
import purify from 'purify-css'

import { readFile } from './fsAsync'
import getPathsWithExt from './getPathsWithExt'
import selectAndReplaceInFileFactory from './selectAndReplaceInFileFactory'

const defaultOptions = { info: true, minify: true }

exports.onPostBuild = async (_, {purifyOptions = defaultOptions}, cb) => {
  const rootPath = resolve('public')
  const selector = '#gatsby-inlined-css'
  const removeCSS = selectAndReplaceInFileFactory(selector, '')

  // get file paths
  const htmlFiles = await getPathsWithExt('html', rootPath)
  const [cssMap, cssFile] = await getPathsWithExt('css', rootPath) // eslint-disable-line

  // sanitize purify inputs
  const htmlFileSanitizations = htmlFiles.map(removeCSS)
  await all(htmlFileSanitizations)
  const rawCSS = await readFile(cssFile, {encoding: 'utf-8'})

  // purify CSS
  const purifiedCSS = await (new Promise((resolve, reject) => (
    purify(htmlFiles, rawCSS, purifyOptions, resolve)
  )))

  // replace CSS in html files
  const replaceCSS = selectAndReplaceInFileFactory(selector, purifiedCSS)
  const htmlFileUpdates = htmlFiles.map(replaceCSS)
  await all(htmlFileUpdates)

  // continue plugin execution
  return cb()
}
