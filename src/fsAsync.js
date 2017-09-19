import { promisify } from 'bluebird'
import { readFile as _readFile, writeFile as _writeFile } from 'fs'

export const readFile = promisify(_readFile)
export const writeFile = promisify(_writeFile)
