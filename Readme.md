# Create CodeceptJS 🚀

One command to create a fresh CodeceptJS project or add CodeceptJS to an existing project.

```
 ____  ____  _____ ____  _____  _____   ____  ____  ____  _____ ____  _____ ____  _____   _  ____ 
/   _\/  __\/  __//  _ \/__ __\/  __/  /   _\/  _ \/  _ \/  __//   _\/  __//  __\/__ __\ / |/ ___\
|  /  |  \/||  \  | / \ | / \  |  \    |  /  | / \|| | \||  \  |  /  |  \  |  \/|  / \   | ||    \
|  \__|    /|  /_ | |-| | | |  |  /_   |  \__| \_/|| |_/||  /_ |  \_ |  /_ |  __/  | |/\_| |\___ |
\____/\_/\_\\____\\_/ \ | \_/  \____\  \____/\____/\____/\____\\____/\____\\_/     \_/\____/\____/
                                                                                                  
```

It is not required to use `create-codeceptjs` on any project, you can install them on your own, but it is very easy to start from scratch.

![](https://user-images.githubusercontent.com/220264/93864416-88182380-fccd-11ea-97fe-3d948e6697c6.gif)

This script will also add several commands to the `scripts` section of your `package.json`, so you can just execute tests without the need to learn custom CodeceptJS commands.

## Usage

To install CodeceptJS + Playwright into your current project run

```
npx create-codeceptjs .
```

To install CodeceptJS + Playwright into the "tests" directory run

```
npx create-codeceptjs tests
```

To install CodeceptJS + WebdriverIO run

```
npx create-codeceptjs --webdriverio
```

To install CodeceptJS + WebdriverIO into "tests" directory

```
npx create-codeceptjs tests --webdriverio
```

Supported options:

* `--puppeteer` - installs Puppeteer as default helper
* `--webdriverio` - installs WebdriverIO as default helper
* `--testcafe` - installs TestCafe as default helper
* `--use-yarn` - yes, we support yarn too!

## NPM Scripts

This command appends following scripts to package.json file:

 * `codeceptjs` - runs tests
 * `codeceptjs:headless` - runs tests in headless mode 
 * `codeceptjs:ui` - runs tests via CodeceptUI
 
 * `codeceptjs:demo` - runs tests from demo application
 * `codeceptjs:demo:headless` - runs tests in headless mode from demo 
 * `codeceptjs:demo:ui` - opens CodeceptUI for demo application

