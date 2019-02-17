#!/usr/bin/env node
const childProcess = require('child_process')
const fs = require('fs')
const program = require('commander')
const env = require('node-env-file')
const path = require('path')

const fileDir = path.join(__dirname, '/../env_file')
if (fs.existsSync(fileDir)) {
  env(fileDir)
}

program
  .version('0.1.0')

  .option('symlink', 'symlink')
  .option('-d, --dir [type]', 'Module dir')
  .option('-n, --name [type]', 'Module name')

  .option('unsymlink', 'unsymlink')
  .option('-n, --name [type]', 'Module name')
  .option('-v, --version [type]', 'Module version')

  .option('testcafe', 'testcafe')
  .option('-b, --browser [type]', 'Define browser', 'chrome:headless')
  .option('-d, --debug', 'Debug', false)
  .option('-f, --file [type]', 'Define file', '')

  .parse(process.argv)

const { symlink, testcafe, unsymlink } = program

if (symlink) {
  const { dir, name } = program
  const modulePath = path.join(dir, name)
  const command = `cd node_modules && rm -rf ${name} && ln -sf ${modulePath} ${name} && cd ${modulePath} && yarn run watch`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}

if (testcafe) {
  const { browser, debug, file } = program
  const debugOption = debug ? '-d' : ''
  const command = `NODE_ENV=development ./node_modules/.bin/testcafe ${browser} ${debugOption} testcafe/${file}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}

if (unsymlink) {
  const { name, version } = program
  const command = `cd node_modules && rm -rf ${name} && cd ../ && rm yarn.lock && yarn install ${name}@${version}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}
