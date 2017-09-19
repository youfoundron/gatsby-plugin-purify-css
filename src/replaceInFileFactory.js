import { readFile, writeFile } from './fsAsync'

export default (originalText, replacementText) => async filePath => {
  const src = await readFile(filePath, { encoding: 'utf-8' })
  const srcOverwrite = src.replace(originalText, replacementText)
  await writeFile(filePath, srcOverwrite)
  return true
}
