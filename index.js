#!/usr/bin/env node
const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const { existsSync }  = require('fs');
const path = require('path');
const semver = require('semver');
const spawn = require('cross-spawn');

const enginePackages = {
  puppeteer: ['puppeteer@5'],
  playwright: ['playwright@1'],
  testcafe: ['testcafe@1'],
  webdriverio: ['webdriverio@6'],
};

const codeceptPackages = [
  'codeceptjs@3',
  '@codeceptjs/ui',
  '@codeceptjs/examples',
  '@codeceptjs/configure'
];

const CFonts = require('cfonts');

CFonts.say('Create|CodeceptJS', {
	font: 'chrome',              // define the font face
	align: 'left',              // define text alignment
	colors: ['system'],         // define all colors
	background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
	space: true,                // define if the output text should have empty lines on top and on the bottom
	maxLength: '0',             // define how many character can be on one line
	gradient: ['yellow',"#805ad5"],            // define your two gradient colors
	independentGradient: true, // define if you want to recalculate the gradient for each new line
	transitionGradient: false,  // define if this is a transition between colors directly
	env: 'node'                 // define the environment CFonts is being executed in
});
console.log(' 🔌 Supercharged End 2 End Testing 🌟');

let projectName;
let useYarn;
let packageJson;

const program = new commander.Command('Create CodeceptJS')
  .version(fs.readJSONSync(path.join(__dirname, 'package.json')).version)
  .arguments('[project]')
  .usage(`${chalk.green('[project]')} [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--use-yarn')
  .option('--verbose', 'print additional logs')
  .option('--info', 'print environment debug info')

  .option('--dev', 'Install all packages as into devDependencies')
  .option('--template <template>', 'Install template')

  // engines select
  .option('--puppeteer', 'Install puppeteer packages')
  .option('--webdriverio', 'Install webdriverio packages')
  .option('--testcafe', 'Install testcafe packages')

  .allowUnknownOption()
  .on('--help', () => {
    console.log();
  })
  .parse(process.argv);

if (typeof projectName === 'undefined' && !existsSync('package.json')) {
  console.error('There is no package.json in current directory');
  console.log('To create codeceptjs in a new project pass in a directory name:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('codeceptjs-tests')}`);
  console.log();
  console.log('To update current project to include CodeceptJS packages, run this script in a directory with package.json');
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1);
}

createCodecept(program.opts());

async function createCodecept(opts) {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=12');
  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 12 or higher for a better, fully supported experience.\n`
      )
    );
  }

  useYarn = opts.useYarn;

  const root = path.join(process.cwd(), projectName || '');
  fs.ensureDirSync(root);

  const currentDir = process.cwd();
  process.chdir(root);


  console.log();
  console.log(`Creating CodeceptJS project in ${chalk.bold(root)}`);
  console.log();


  let deps = codeceptPackages;
  let demoConfigFile = 'node_modules/@codeceptjs/examples';

  if (opts.puppeteer) {
    console.log(`Powered by ${chalk.yellow('Puppeteer')} engine`);
    deps.push(enginePackages.puppeteer);
    demoConfigFile += '/codecept.puppeteer.conf.js';
  } else if (opts.webdriverio) {
    console.log(`Powered by ${chalk.yellow('WebDriver')} engine`);
    deps.push(enginePackages.webdriverio);
    demoConfigFile += '/codecept.webdriver.conf.js';
  } else if (opts.testcafe) {
    console.log(`Powered by ${chalk.yellow('TestCafe')} engine`);
    deps.push(enginePackages.testcafe);
    demoConfigFile += '/codecept.testcafe.conf.js';
  } else {
    console.log(`Powered by ${chalk.yellow('Playwright')} engine`);
    deps.push(enginePackages.playwright);
  }  

  if (!existsSync('package.json')) {
    console.log('package.json file does not exist in current dir, creating it...');

    packageJson = {
      name: 'codeceptjs-tests',
      version: '0.1.0',
      private: true,
    };
  } else {
    console.log('package.json found, adding codeceptjs dependencies & scripts into it');
    packageJson = fs.readJsonSync('package.json');
  }

  if (!packageJson.scripts) packageJson.scripts = {};

  packageJson.scripts['codeceptjs'] = 'codeceptjs run --steps';
  packageJson.scripts['codeceptjs:headless'] = 'HEADLESS=true codeceptjs run --steps';
  packageJson.scripts['codeceptjs:ui'] = 'codecept-ui --app';
 
  packageJson.scripts['codeceptjs:demo'] = `codeceptjs run --steps -c ${demoConfigFile}`;
  packageJson.scripts['codeceptjs:demo:headless'] = `HEADLESS=true codeceptjs run --steps -c ${demoConfigFile}`;
  packageJson.scripts['codeceptjs:demo:ui'] = `codecept-ui --app  -c ${demoConfigFile}`;
 
  fs.writeJsonSync('package.json', packageJson, { spaces: 4 });


  await install(deps.flat());

  console.log('Finished installing packages.');

  console.log();
  console.log(chalk.bold('What\'s next?'));
  console.log()
  console.log('Try CodeceptJS now with a demo project:');
  console.log('➕', chalk.bold.cyan('npm run codeceptjs:demo'), '- executes codeceptjs tests for a demo project');
  console.log('➕', chalk.cyan('npm run codeceptjs:demo:headless'), '- executes codeceptjs tests headlessly (no window shown)');
  console.log('➕', chalk.bold.cyan('npm run codeceptjs:demo:ui'), '- starts codeceptjs UI application for a demo project');
  console.log();
  console.log('Initialize CodeceptJS for your project:');
  console.log('🔨', chalk.yellow('npx codeceptjs init'), '- initialize codeceptjs for current project', chalk.bold('(required)'));
  console.log('➕', chalk.cyan('npm run codeceptjs'), '- runs codeceptjs tests for current project');
  console.log('➕', chalk.cyan('npm run codeceptjs:headless'), '- executes codeceptjs tests headlessly (no window shown)');
  console.log('➕', chalk.cyan('npm run codeceptjs:ui'), '- starts codeceptjs UI application for current project');

  console.log();
  if (root != currentDir) {
    console.log('⚠', 'Change directory to', chalk.yellow(root), 'to run these commands');
  }
}

async function install(dependencies, verbose) {
    return new Promise((resolve, reject) => {
      let command;
      let args;

      console.log('Installing packages: ', chalk.green(dependencies.join(', ')));

      if (useYarn) {
        command = 'yarnpkg';
        args = ['add','-D', '--exact'];
        [].push.apply(args, dependencies);
  
        // Explicitly set cwd() to work around issues like
        // https://github.com/facebook/create-react-app/issues/3326.
        // Unfortunately we can only do this for Yarn because npm support for
        // equivalent --prefix flag doesn't help with this issue.
        // This is why for npm, we run checkThatNpmCanReadCwd() early instead.
        args.push('--cwd');
        args.push(root);
      
      } else {
        command = 'npm';
        args = [
            'install',
            '--save-dev',
            '--loglevel',
            'error',
        ].concat(dependencies);

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
