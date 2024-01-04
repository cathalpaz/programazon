const {test, expect} = require('@playwright/test');


test("Landing", async({ page }) => {
    await page.goto('https://programazon.onrender.com/');

    const pageTitle = await page.title();
    const pageUrl = await page.url();

    await expect(page).toHaveTitle('Programazon');
    await expect(page).toHaveURL('https://programazon.onrender.com/');


    await page.close();
});
