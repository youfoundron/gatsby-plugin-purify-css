import klaw from 'klaw'
import { extname } from 'path'
import filter from 'through2-filter'

const filterByExt = ext => filter.obj(item => (
  extname(item.path) === `.${ext}`
))

export default (ext, dir = __dirname) => (
  new Promise((resolve, reject) => {
    const results = []
    klaw(dir)
      .pipe(filterByExt(ext))
      .on('data', item => results.push(item.path))
      .on('end', () => resolve(results))
  })
)
