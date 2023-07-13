#! /usr/bin/env node

import {lilconfigSync} from 'lilconfig';
import chalk from 'chalk';

import checkVersions from '../build/esm/index.js';

const packageName = "envCheck";
const defaultKey = "engines";

let versions = lilconfigSync(packageName).search();

// Info: fallback to engine key in package.json if app config is not set
if (!versions) {
  versions = lilconfigSync(defaultKey).search();
}

if (versions && versions.config && versions.config.node && versions.config.npm) {
  checkVersions(versions.config.node, versions.config.npm);
} else {
  console.error(chalk.bgRedBright("Please provide node & npm version with engine key"));
}
