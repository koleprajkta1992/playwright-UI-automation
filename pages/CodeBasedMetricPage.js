const { expect } = require('@playwright/test');

class CodeBasedMetricPage {

    constructor(page) {
        this.page = page;

        this.codeBasedToggle =
            page.locator('input[name="code_based"]');

        this.codeEditorTitle =
            page.getByText('Code Editor');

        this.sqlDropdown =
            page.getByRole('combobox').first();

        this.validateCommitButton =
            page.getByRole('button', {
                name: 'Validate & Commit'
            });
    }

    async enableCodeBasedMetric() {

        if (!(await this.codeBasedToggle.isChecked())) {
            await this.codeBasedToggle.check();
        }

        await expect(this.codeEditorTitle)
            .toBeVisible();

        console.log(
            'Code Based Metric mode enabled'
        );
    }

    async selectSqlMode() {

        await this.sqlDropdown.click();

        await this.page
            .getByRole('option', { name: 'SQL' })
            .click();
    }

    async enterSqlQuery(query) {
 const editor = this.page.locator('.monaco-editor');

    await editor.click();

    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');

    await this.page.keyboard.type(query, {
        delay: 100
    });
    }

    async clickValidateAndCommit() {

        await this.validateCommitButton.click();
    }

    async verifyCodeEditorVisible() {

        await expect(this.codeEditorTitle)
            .toBeVisible();
    }
}

module.exports = CodeBasedMetricPage ;