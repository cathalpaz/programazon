const {test, expect} = require('@playwright/test');


test('Form Display', async({ page }) => {

    await page.goto('https://programazon.onrender.com/');

    // sign in
    await page.getByText('Hello, sign in').click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByText('Log in as Demo?').click();

    await expect(page.getByText('Hello, Demo')).toBeVisible();


    // go to form
    await page.getByText('Click to start').click();
    await expect(page.getByText('Start Selling')).toBeVisible();

    await page.locator('input[type="text"]').fill('Test');
    await page.getByRole('combobox').selectOption('Licenses');
    await page.getByPlaceholder('At least 1-3 sentences').fill('Random. Description.');
    await page.getByRole('button', { name: 'List Product' }).click();

    await expect(page.getByText('! Image required')).toBeVisible();



    await page.close();
})
