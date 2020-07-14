# Create CodeceptJS 🚀

Create CodeceptJS project easily, having all dependencies installed with one command.

```
 ____  ____  _____ ____  _____  _____   ____  ____  ____  _____ ____  _____ ____  _____   _  ____ 
/   _\/  __\/  __//  _ \/__ __\/  __/  /   _\/  _ \/  _ \/  __//   _\/  __//  __\/__ __\ / |/ ___\
|  /  |  \/||  \  | / \ | / \  |  \    |  /  | / \|| | \||  \  |  /  |  \  |  \/|  / \   | ||    \
|  \__|    /|  /_ | |-| | | |  |  /_   |  \__| \_/|| |_/||  /_ |  \_ |  /_ |  __/  | |/\_| |\___ |
\____/\_/\_\\____\\_/ \ | \_/  \____\  \____/\____/\____/\____\\____/\____\\_/     \_/\____/\____/
                                                                                                  
```


This script will install all required depdnedncies for CodeceptJS project. 
It is not required to use `create-codeceptjs` on any project, you can install them on your own, but it is very easy to start from scratch.

![](https://user-images.githubusercontent.com/220264/87477444-c986b580-c630-11ea-9af4-f383e02dfa2d.gif)

This script will also update `scripts` section of `package.json` so you could execute tests faster without learning Codeceptjs commands.

## Installation

No installation needed 🤗

## Usage


Install CodeceptJS + Playwright into current project

```
npx create-codeceptjs 
```

Install CodeceptJS into "tests" directory

```
npx create-codeceptjs tests
```

Install CodeceptJS + webdriverio:

```
npx create-codeceptjs --webdriverio
```

Install CodeceptJS + webdriverio into "tests" directory

```
npx create-codeceptjs tests --webdriverio
```

Supported options:

* `--puppeteer` - install puppeteer as default helper
* `--testcafe` - install testcafe as default helper
* `--yarn` - yes, we support yarn too!


