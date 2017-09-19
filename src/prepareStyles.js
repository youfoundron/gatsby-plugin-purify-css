import postcss from 'postcss'
import dedupe from 'postcss-discard-duplicates'

import { readFile } from './fsAsync'

const concatFiles = async filePaths => {
  const fileTexts = []
  for (let filePath in filePaths) {
    const text = await readFile(filePath, {encoding: 'utf-8'})
    fileTexts.push(text)
  }
  return fileTexts.join('')
}

export default async cssFiles => {
  const css = await concatFiles(cssFiles)
  const dedupedCSS = await postcss([dedupe]).process(css)
  return dedupedCSS
}
