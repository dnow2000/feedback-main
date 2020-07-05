#!/usr/bin/env node
const childProcess = require('child_process')
const fs = require('fs')
const program = require('commander')
const env = require('node-env-file')
const path = require('path')


const envDir = path.join(__dirname, '/../../.env')
let envConfig = ''
if (fs.existsSync(envDir)) {
  env(envDir)
  envConfig = String(fs.readFileSync(envDir))
}


program
  .version('0.1.0')

  .option('end2end', 'end2end')
  .option('-t, --task [type]', 'open or run', 'open')

  .parse(process.argv)

const { end2end, symlink, unsymlink } = program

if (end2end) {
  const { task } = program
  const envOption = envConfig.split('\n').slice(0, -1).join(',')
  const command = `NODE_ENV=development ./node_modules/.bin/cypress ${task} --env=${envOption}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}
