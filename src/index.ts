import semver from 'semver';
import chalk from 'chalk';
import { execa } from 'execa';

// import child_process from 'child_process';
// import config from './package.json' assert { type: "json" };

// const exec = child_process.exec;

// const nodeVersion = config.engines.node;
// const npmVersion = config.engines.npm;


const checkNodeVersion = function(nodeVersion: string) {
  console.log('checkNodeVersion');
  console.log(`${process.version} - ${nodeVersion}`);

  if (!semver.satisfies(process.version, nodeVersion)) {
    console.error(chalk.bgRedBright("Required node version is " + nodeVersion + " not satisfied with current version " + process.version + "."));
    process.exit(1);
  }
}

const checkNpmVersion = async function(npmVersion: string) {
  try {
    const {stdout} = await execa('npm', ['-v']);
    const systemNpmVersion = stdout;

    console.log('checkNpmVersion');
    console.log(`${systemNpmVersion} - ${npmVersion}`);

    if (!semver.satisfies((semver.clean(systemNpmVersion) || ''), npmVersion)) {
      console.error(chalk.bgRedBright("Required npm version is " + npmVersion + " not satisfied with current version " + systemNpmVersion + "."));
      process.exit(1);
    }
    console.log(chalk.green("Reqiured node and npm version is available process will continue."));

    let processes = process.argv;

    for (let iprocess in processes) {
      if (iprocess.indexOf('check-environment') != -1) {
        process.exit(0);
      }
    }

  } catch (err: any) {
    console.error(chalk.bgRedBright("error occured" + err.shortMessage));
    process.exit(1);
  }
}

export default function (nodeV: string, npmV: string) {
  checkNodeVersion(nodeV);
  checkNpmVersion(npmV);
}
