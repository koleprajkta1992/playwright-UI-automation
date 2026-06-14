const { test } = require('@playwright/test');

test('authenticate', async ({ page }) => {

    await page.goto(process.env.BASE_URL);

    await page.fill('#org', process.env.ORG);
    await page.fill('#username', process.env.USERNAME);
    await page.fill('#password', process.env.PASSWORD);

    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});