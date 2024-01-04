const {test, expect} = require('@playwright/test');


test('Review Form', async({ page }) => {
    await page.goto('https://programazon.onrender.com/');

    // sign in
    await page.getByText('Hello, sign in').click();
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByText('Log in as Demo?').click();

    await expect(page.getByText('Hello, Demo')).toBeVisible();


    // go to product review form
    await page.locator('span').filter({ hasText: /^All$/ }).click();
    await page.getByText('Programmable Mechanical').click();
    await page.getByRole('button', { name: 'Write a customer review' }).click();

    await expect(page.getByText('Create Review')).toBeVisible();


    // write bad review
    await page.locator('div').filter({ hasText: /^Overall Rating$/ }).locator('i').nth(3).click();
    await page.getByPlaceholder('What did you like or dislike').fill('Test 123');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('! This field is required.')).toBeVisible();


    // write valid review
    await page.locator('div').filter({ hasText: /^Overall Rating$/ }).locator('i').nth(4).click();
    await page.getByPlaceholder('What\'s most import to know?').fill('Test123');
    await page.getByPlaceholder('What did you like or dislike').fill('Test123321');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Top reviews from customers')).toBeVisible();


    await page.close();
});
