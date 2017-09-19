import uncss from 'uncss'
import { resolve } from 'path'
import { promisify, all } from 'bluebird'

import { readFile } from './fsAsync'
import getPathsWithExt from './getPathsWithExt'
import replaceInFileFactory from './replaceInFileFactory'

const uncssAsync = promisify(uncss)

exports.onPostBuild = async (_, { uncssOptions }, cb) => {
  const rootPath = resolve('public')

  // get file paths
  const htmlFiles = await getPathsWithExt('html', rootPath)
  const [cssFile] = await getPathsWithExt('css', rootPath)

  // evalute CSS
  const originalCSS = await readFile(cssFile, { encoding: 'utf-8' })
  const _purifiedCSS = await uncssAsync(htmlFiles, {
    ...uncssOptions,
    raw: originalCSS,
    htmlroot: rootPath
  })
  // remove pesky comment
  const purifiedCSS = _purifiedCSS.replace(/\/\*.*\n/, '')

  // replace CSS in files
  const replaceCSS = replaceInFileFactory(originalCSS, purifiedCSS)
  const htmlFileUpdates = htmlFiles.map(replaceCSS)
  await all(htmlFileUpdates)

  // continue plugin execution
  return cb()
}
