const { expect } =
require('@playwright/test');

class LoginPage {

    constructor(page) {

        this.page = page;

        this.orgInput =
            page.locator('input');

        this.continueButton =
            page.locator('button');
            this.usernameInput =
            page.locator('#username');

        this.passwordInput =
            page.locator('#password');

        this.loginButton =
           page.locator('input[value="Sign In"]')
    }

    async navigate() {

        await this.page.goto(
          'https://frontend-uat.emot.solyticspartners.com/org'
        );
    }

    async enterOrg(org) {

        await this.orgInput.fill(org);

        await this.continueButton.click();
    }

    async login(username, password) {

        await this.usernameInput
        .waitFor({ state: 'visible' });

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await expect(this.loginButton)
        .toBeEnabled();

        await this.loginButton.click();
    }

    async loginToApplication(
        org,
        username,
        password
    ) {

        await this.navigate();

        await this.enterOrg(org);

        await this.login(
            username,
            password
        );
    }

    async logout() {

   await this.page
    .locator(
        'button[aria-label="account of current user"]'
    )
    .first()
    .click();

    await this.page
        .getByText(/logout/i)
        .click();
}
    
}

module.exports = LoginPage;