import fs from 'fs'
import archiver from 'archiver'

const srcPath = './dist'
const buildPath = './dist.tgz'

const output = fs.createWriteStream(buildPath)
const archive = archiver('tar', { gzip: true })

output.on('close', () => {
  console.log(`Compression success ${archive.pointer() / 1024 / 1024} M`)
  console.log('archiver has been finalized and the output file descriptor has closed.')
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)
archive.directory(srcPath)
archive.finalize()
