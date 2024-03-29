# Monocart code coverage demo

- [Description](#description)
- [How to run the app](#how-to-run-the-app)
- [How to run tests with istanbul code coverage](#how-to-run-tests-with-istanbul-code-coverage)
- [How to run tests with V8 code coverage and monocart-reporter](#how-to-run-tests-with-v8-code-coverage-and-monocart-reporter)
- [Potential bug](#potential-bug)
- [Notes](#notes)

## Description

> [!IMPORTANT]
> 
> If you're interested in learning how to get code coverage for Playwright tests then checkout this repo instead [edumserrano/playwright-adventures](https://github.com/edumserrano/playwright-adventures).
> 

> [!WARNING]
> The bug reported by this demo has been fixed. The fix was simple and is described in cenfun/monocart-reporter#29 and implemented in the `fix` branch. Use this [compare view](https://github.com/edumserrano/monocart-code-coverage-demo/compare/main...fix) to see the changed files.
>
> This repo might still be useful to show two ways to get code coverage working on playwright, one with `instanbul` and one using `V8+monocart-reporter`.
> 

This is a demo repo to check a potential bug in [monocart-reporter](https://github.com/cenfun/monocart-reporter) related with code coverage tracked in cenfun/monocart-reporter#29.

The repo consists of an Angular app running playwright tests. The aim is to get accurate code coverage from the playwright tests that run the Angular app via playwright's `webServer`.

See [here](#potential-bug) for a description of the bug.

## How to run the app

From the root of the repo run `npm i` to install the required packages and then run `npm run start` to start the app. Running the app is not necessary to reproduce the bug but might be useful to know in case you want to check out app.

## How to run tests with istanbul code coverage

> [!IMPORTANT]  
>
> Make sure you have the required dependencies installed before running the tests. From the root of the repo run `npm i` to install all the required packaged and then and then `npx playwright install` to install the browsers required by playwright.
>

Run `npm run test-istanbul` from the root of the repo. This command will:
1) cleans test results and code coverage directories to make sure we are always on a fresh state.
2) updates the `angular.json` file that is at the root of the repo so that the Angular app will be instrumented using istanbul.
3) runs the playwright tests at `/tests/babel-istanbul`. This uses a [playwright.config.ts](/tests/babel-istanbul/playwright.config.ts) and [base fixture](/tests/babel-istanbul/base-fixture.ts) configured to collect code coverage from istanbul.
4) executes the [nyc](https://github.com/istanbuljs/nyc) command to generate an html report and lcov file at `/coverage`.

After running `npm run test-istanbul` you can open the code coverage report by running `npm run open-istanbul-coverage`.

## How to run tests with V8 code coverage and monocart-reporter

> [!IMPORTANT]  
>
> Make sure you have the required dependencies installed before running the tests. From the root of the repo run `npm i` to install all the required packaged and then and then `npx playwright install` to install the browsers required by playwright.
>

Run `npm run test-monocart` from the root of the repo. This command will:
1) cleans test results and code coverage directories to make sure we are always on a fresh state.
2) updates the `angular.json` file that is at the root of the repo.
3) runs the playwright tests at `/tests/monocart`. This uses a [playwright.config.ts](/tests/monocart/playwright.config.ts) and [example.spec.ts test](/tests/monocart/example.spec.ts) configured to collect code coverage using playwright's coverage api (V8) and then produce a report using `monocart-reporter`.

After running `npm run test-monocart` you can open the code coverage report by running `npm run open-monocart-coverage`.

## Potential bug

> [!IMPORTANT]  
>
> Make sure you have the required dependencies installed before running the tests. From the root of the repo run `npm i` to install all the required packaged and then and then `npx playwright install` to install the browsers required by playwright.
>

When instrumenting the playwright tests using [istanbul](https://github.com/gotwarlost/istanbul) via the [babel-plugin-istanbul plugin](https://github.com/istanbuljs/babel-plugin-istanbul) the code coverage shows accurately whilst when using `V8` and [monocart-reporter](https://github.com/cenfun/monocart-reporter) some lines that should be covered show as uncovered even though there's an indication those lines have been executed X number of times.

> please be patient, the npm commands to execute the tests take about 20s to complete on my machine.

1) clone the repo.
2) go to the root of the repo.
3) run `npm run test-istanbul`.
4) run `npm run test-monocart`.
5) run `npm run open-istanbul-coverage` and on the coverage report which opened in the browser go to the code coverage for the `find-institution.view-model.ts` file which is at `/app/find-institution/find-institution.view-model.ts.html`.
6) run `npm run open-monocart-coverage` and on the coverage report which opened in the browser go to the code coverage for the `find-institution.view-model.ts` file which is at `webpack:src/app/find-institution/find-institution.view-model.ts.html`.
7) compare the code coverages for the `find-institution.view-model.ts` in the two reports. The istanbul code coverage shows accurate coverage whilst the monocart code coverage does not. What is curious is that even in uncovered lines, the monocart report still shows they were executed X number of times.

The images below show a part of the code coverage for the `find-institution.view-model.ts` file which show the problem

- Istanbul code coverage report for `find-institution.view-model.ts`:

![istanbul code coverage report](/docs/images/istanbul.png)

- Monocart code coverage report with V8 for `find-institution.view-model.ts`:

![monocart code coverage report](/docs/images/monocart.png)

## Notes

- The step to update the `angular.json` file in the `npm run test-istanbul` and `npm run test-monocart` commands was a way I found to to swap parts of the `angular.json` configuration which is different when running the Angular app with istanbul instrumentation or without. 
  - **Without** istanbul instrumentation, there's nothing that needs to be done to the default `angular.json` file you get when creating an Angular app. 
  - **With** istanbul istrumentation, you have to be able to extend angular's webpack configuration so that it runs the [babel-plugin-istanbul plugin](https://github.com/istanbuljs/babel-plugin-istanbul) which will instrument your code. I followed the idea described in [Use Istanbul coverage collection with Playwright Test](https://github.com/mxschmitt/playwright-test-coverage) and applied it to an angular project. To extend angular's webpack configuration I used [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus).
- The code of the app has been stripped down to a minimum to reproduce the issue with code coverage so it might not make much sense. The code itself is irrelevant, what matters is understanding why the code coverage shows differently.
- Fore more information about getting code coverage to work with Playwright please read [this](https://github.com/microsoft/playwright/issues/7030#issuecomment-1575606073) and [this](https://github.com/microsoft/playwright/issues/7030#issuecomment-1672963317).
