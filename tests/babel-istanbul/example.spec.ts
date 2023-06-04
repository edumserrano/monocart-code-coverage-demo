// this test uses a base fixture for test and expect instead of using the line below
// import { expect, test } from "@playwright/test";
import { expect, test } from "./base-fixture";

test("basic test", async ({ page }) => {
    await page.goto("/");
    const filterInput = page.locator("#filter-box");
    await filterInput.type("l");
    await filterInput.type("o");
    await filterInput.type("n");
    await filterInput.type("d");
    await filterInput.type("o");
    await filterInput.type("n");
    await expect(page).toHaveScreenshot();
});
