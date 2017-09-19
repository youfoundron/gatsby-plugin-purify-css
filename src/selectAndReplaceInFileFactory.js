import cheerio from 'cheerio'
import { readFile, writeFile } from './fsAsync'

export default (selector, textString) => async filePath => {
  const src = await readFile(filePath, { encoding: 'utf-8' })

  // parse html file
  const $ = cheerio.load(src)

  // replace text inline
  $(selector).text(textString)
  const srcOverwrite = $.html()

  // overwrite html file
  await writeFile(filePath, srcOverwrite)
  return true
}
