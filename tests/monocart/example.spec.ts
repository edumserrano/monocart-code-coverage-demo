import { expect, test } from "@playwright/test";
import { addCoverageReport, attachCoverageReport } from "monocart-reporter";

test("basic test", async ({ page }) => {
    // coverage API is chromium only
    if (test.info().project.name === "chromium") {
        await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);        
    }

    await page.goto("/");
    const filterInput = page.locator("#filter-box");
    await filterInput.type("l");
    await filterInput.type("o");
    await filterInput.type("n");
    await filterInput.type("d");
    await filterInput.type("o");
    await filterInput.type("n");
    await expect(page).toHaveScreenshot();

    if (test.info().project.name === "chromium") {
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);
        const coverageList = [...jsCoverage, ...cssCoverage];
        await addCoverageReport(coverageList, test.info());
    }
});
