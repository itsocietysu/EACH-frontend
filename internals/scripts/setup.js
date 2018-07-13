#!/usr/bin/env node

'use strict';

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');
const readline = require('readline');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;

cleanRepo(() => {
  process.stdout.write(
    '\nInstalling dependencies... (This might take a while)',
  );
  setTimeout(function() {
    readline.cursorTo(process.stdout, 0);
    interval = animateProgress('Installing dependencies');
  }, 500);

  installDeps();
});

/**
 * Don't delete the .git folder in dir
 */
function cleanRepo(callback) {
  fs.readFile('.git/config', 'utf8', (err) => {
    if (!err) {
      dontClearRepo(callback);
    } else {
      callback();
    }
  });
}

/**
 * Function which indicates that we are not cleaning git repo
 */
function dontClearRepo(callback) {
  addCheckMark(callback);
}

/**
 * Installs dependencies
 */
function installDeps() {
  exec('node --version', function(err, stdout, stderr) {
    const nodeVersion = stdout && parseFloat(stdout.substring(1));
    if (nodeVersion < 5 || err) {
      installDepsCallback(
        err ||
          'Unsupported node.js version, make sure you have the latest version installed.',
      );
    } else {
      exec('yarn --version', function(err, stdout, stderr) {
        if (
          parseFloat(stdout) < 0.15 ||
          err ||
          process.env.USE_YARN === 'false'
        ) {
          exec('npm install', addCheckMark.bind(null, installDepsCallback));
        } else {
          exec('yarn install', addCheckMark.bind(null, installDepsCallback));
        }
      });
    }
  });
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
  clearInterval(interval);
  process.stdout.write('\n\n');
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(1);
  }

  endProcess();
}
/**
 * Function which ends setup process
 */
function endProcess() {
  process.stdout.write('\nDone!');
  process.exit(0);
}
