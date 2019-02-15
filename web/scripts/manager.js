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

  .option('testcafe', 'testcafe')

  .option('-b, --browser [type]', 'Define browser', 'chrome:headless')
  .option('-d, --debug', 'Debug', false)
  .option('-f, --file [type]', 'Define file', '')

  .parse(process.argv)

const { testcafe } = program
if (testcafe) {
  const { debug, file } = program
  let { browser } = program
  if (debug) {
    browser = 'chrome'
  }
  const command = `NODE_ENV=development ./node_modules/testcafe/bin/testcafe.js ${browser} ${debug ? '-d' : ''} testcafe/${file}`
  childProcess.execSync(command, { stdio: [0, 1, 2] })
}
