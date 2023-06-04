import { expect, test } from "./base-fixture";

// import { expect, test } from "@playwright/test";
// import * as crypto from 'crypto';
// import * as fs from 'fs';
// import { addCoverageReport, attachCoverageReport } from "monocart-reporter";

// import * as path from 'path';
// import v8toIstanbul from "v8-to-istanbul";

// import {expect, test} from '@bgotink/playwright-coverage';

// test("get started link", async ({ page }) => {
//     await page.goto("https://playwright.dev/");

//     // Click the get started link.
//     await page.getByRole("link", { name: "Get started" }).click();

//     // Expects the URL to contain intro.
//     await expect(page).toHaveURL(/.*intro/u); !!!!!!!! USE THIS ASSERT!
// });

// export function generateUUID(): string {
//     return crypto.randomBytes(16).toString('hex');
//   }

// test("basic test", async ({ page }) => {
// eslint-disable-next-line max-lines-per-function
test("basic test", async ({ page }) => {
    // coverage API is chromium only
    // if (test.info().project.name === "chromium") {
    //     // await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
    //     await page.coverage.startJSCoverage();
    // }

    await page.goto("/");
    const filterInput = page.locator("#filter-box");
    await filterInput.type("l");
    await filterInput.type("o");
    await filterInput.type("n");
    await filterInput.type("d");
    await filterInput.type("o");
    await filterInput.type("n");
    await expect(page).toHaveScreenshot();

    // if (test.info().project.name === "chromium") {
    //     const jsCoverage = await page.coverage.stopJSCoverage();

    //     // const report = await attachCoverageReport(jsCoverage, test.info(), {
    //     //     toIstanbul: true,
    //     // });
    //     // const report = await attachCoverageReport(jsCoverage, test.info());
    //     // console.log(report.summary);

    //     // await addCoverageReport(jsCoverage, test.info());
    // }

    // if (test.info().project.name === "chromium") {
    //     // const [jsCoverage, cssCoverage] = await Promise.all([
    //     //     page.coverage.stopJSCoverage(),
    //     //     page.coverage.stopCSSCoverage(),
    //     // ]);
    //     const jsCoverage = await page.coverage.stopJSCoverage();
    //     // const coverageList = [...jsCoverage, ...cssCoverage];
    //     const coverageList = jsCoverage;
    //     await addCoverageReport(coverageList, test.info());

    //     // const istanbulCLIOutput =
    //     //     "C:/dev/repos/azdo-tfs-glo-lexisadvance/ProjectX.Client/AcademicSignIn/tests/playwright-out";
    //     for (const entry of coverageList) {
    //         if (entry.source) {
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //             const converter = v8toIstanbul("", 0, {
    //                 source: entry.source,
    //             });
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //             // const converter = v8toIstanbul("", 0, { source: entry.source });
    //             // eslint-disable-next-line no-await-in-loop
    //             await converter.load();
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //             converter.applyCoverage(entry.functions);
    //             // eslint-disable-next-line no-console
    //             const coverageJSON = JSON.stringify(converter.toIstanbul());
    //             // console.log(coverageJSON);
    //             // fs.writeFileSync(path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`), coverageJSON);
    //         }
    //     }
    // }
});
