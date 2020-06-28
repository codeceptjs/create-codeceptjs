const chalk = require('chalk');
const commander = require('commander');
const dns = require('dns');
const { existsSync }  = require('fs');
const envinfo = require('envinfo');
const execSync = require('child_process').execSync;
const fsExtra = require('fs-extra');
const hyperquest = require('hyperquest');
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const semver = require('semver');
const spawn = require('cross-spawn');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;
const url = require('url');
const validateProjectName = require('validate-npm-package-name');

const enginePackages = {
  puppeteer: ['puppeteer@4'],
  playwright: ['playwright@1'],
  testcafe: ['testcafe@1'],
  webdriverio: ['webdriverio@6'],
};

const codeceptPackages = [
  '@codeceptjs/ui',
  '@codeceptjs/examples',
  '@codeceptjs/configure'
];

let projectName;

const program = new commander.Command('Create CodeceptJS')
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--verbose', 'print additional logs')
  .option('--info', 'print environment debug info')

  .option('--dev', 'Install all packages as into devDependencies')
  .option('--template <template>', 'Install template')

  // engines select
  .option('--playwright', 'Install playwright packages')
  .option('--puppeteer', 'Install puppeteer packages')
  .option('--webdriverio', 'Install webdriverio packages')
  .option('--testcafe', 'Install testcafe packages')

  .allowUnknownOption()
  .on('--help', () => {
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
    console.log();
  })
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('codeceptjs-tests')}`);
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}

// npx create-codeceptjs --template typescript --playwright codecept-tests

function createCodecept(opts) {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=12');
  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 12 or higher for a better, fully supported experience.\n`
      )
    );
  }

  const root = path.resolve(name);
  const appName = path.basename(root);
  fs.ensureDirSync(name);

  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1);
  }
  console.log();

  console.log(`Creating a new CodeceptJS project`);
  console.log();

  if (!existsSync('package.json')) {
    console.log('package.json file does not exist in current dir, creating it...');

    const packageJson = {
      name: 'codeceptjs-tests',
      version: '0.1.0',
      private: true,
    };
    fs.writeJsonSync('package.json', packageJson);
  }

  let packageJson = fs.readJsonSync('package.json');

  if (!packageJson.scripts) packageJson.scripts = {};

  packageJson.scripts['e2e'] = 'codeceptjs run --steps';
  packageJson.scripts['e2e:app'] = 'codecept-ui --app';
  packageJson.scripts['e2e:server'] = 'codecept-ui';

  packageJson.scripts['e2e:example'] = 'codeceptjs run --steps -c node_modules/@codeceptjs/examples';
  packageJson.scripts['e2e:example:app'] = 'codecept-ui --app  -c node_modules/@codeceptjs/examples';
  packageJson.scripts['e2e:example:server'] = 'codecept-ui -c node_modules/@codeceptjs/examples';

  fs.writeJsonSync('package.json', packageJson);

  let initDeps = false;

  if (opts)
  // npx create-codeceptjs <> --playwright 
  // npx create-codeceptjs <> --puppeteer
  // npx create-codeceptjs <> --testcafe
  // npx create-codeceptjs <> 
}

// npx create-codeceptjs codecept-tests --playwright && cd codecept-tests && npx codeceptjs init


function install(dependencies, verbose) {
    return new Promise((resolve, reject) => {
      let command;
      let args;
      command = 'npm';
      args = [
          'install',
          '--save-dev',
          '--loglevel',
          'error',
      ].concat(dependencies);

      if (verbose) {
          args.push('--verbose');
      }

      const child = spawn(command, args, { stdio: 'inherit' });
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`,
          });
          return;
        }
        resolve();
      });
    });
  }