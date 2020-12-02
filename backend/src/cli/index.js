#!/usr/bin/env node

const program = require('commander')
const { version } = require('../../package.json')
const { index } = require('./view/start')

program.version(version)

program
  .command('start')
  .description('Inicializa a CLI interativa')
  .action(() => {
    index()
  })

program.parse(process.argv)
