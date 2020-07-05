#!/usr/bin/env node
const childProcess = require('child_process')
const fs = require('fs')
const program = require('commander')
const env = require('node-env-file')
const path = require('path')

const config = {...process.env}
const envDir = path.join(__dirname, '/../../.env')
if (fs.existsSync(envDir)) {
  env(envDir)
  Object.assign(config, String(fs.readFileSync(envDir))
                .split('\n')
                .slice(0, -1)
                .reduce((agg, item) => {
                  const chunks = item.split('=')
                  const key = chunks[0]
                  const value = chunks.slice(1).join('=')
                  agg[key] = value
                  return agg
                }, {}))
}


program
  .version('0.1.0')

  .option('end2end', 'end2end')
  .option('-t, --task [type]', 'open or run', 'open')

  .parse(process.argv)

const { end2end, symlink, unsymlink } = program

if (end2end) {
  const { task } = program
  const { APP_NAME, COMMAND_NAME, TLD } = config
  const envOption = `APP_NAME=${APP_NAME},COMMAND_NAME=${COMMAND_NAME},TLD=${TLD}`
  const command = `NODE_ENV=development ./node_modules/.bin/cypress ${task} --env=${envOption}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}
