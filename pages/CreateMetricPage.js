const { expect } = require('@playwright/test');

class CreateMetricPage {

    constructor(page) {
        this.page = page;

        this.createMetricButton = page.getByRole('button', {
            name: 'Create Metric'
        });

        this.metricNameInput = page.getByPlaceholder(
            'Enter Metric Name'
        );
    }

    async openCreateMetricPage() {

        await this.createMetricButton.click();

        await expect(this.page).toHaveURL(
            /create-metric/
        );

        console.log(
            'Current URL:',
            this.page.url()
        );
    }

    async verifyCreateMetricPageLoaded() {

        await expect(this.page).toHaveURL(
            /create-metric/
        );
    }
    async selectSchema(schemaName) {
    await this.page
        .getByPlaceholder('Select Schema')
        .click();

    await this.page
        .getByRole('option', {
            name: schemaName,
            exact: true
        })
        .click();
}
async wait(ms = 2) {
    await this.page.waitForTimeout(ms * 1000);
}

async clearSearchBox() {
    const searchBox = this.page.getByPlaceholder('search').first();

    await searchBox.click();
    await searchBox.press('Control+A');
    await searchBox.press('Backspace');

  
}
async dragSumAggregation() {

    const sumAggregation = this.page.getByText('Sum');

    const formulaBuilder = this.page.locator(
        'text=Aggregation (table.column) or Derived Metric'
    );

    await sumAggregation.dragTo(formulaBuilder);
  
       // Search Amount
    await this.page
        .getByPlaceholder('search')
        .first()
        .fill('Amount');

await this.wait(2);
    // Expand Transaction
    await this.page
        .getByText('Transaction', { exact: true })
        .click();

    // Amount row
    
const amountColumn = this.page
  .getByRole('listitem')
  .filter({ hasText: /^Amount$/ });
  await this.wait(2);

const sumArea = this.page.getByText('SUM ()');

await amountColumn.dragTo(sumArea);

}

async addFilterCondition() {
await this.clearSearchBox();
    const filterSection = this.page.locator(
        'text=Filter By'
    ).locator('..');
await this.wait(2);
    await this.page
        .locator('span[aria-label="Transaction"]')
        .click();

  const transactionType =
    this.page.getByText('Transaction Type');

const columnBox =
    this.page.getByRole('textbox').nth(1);

await transactionType.dragTo(columnBox);

  
await this.page
  .locator('svg[data-testid="ArrowDropDownIcon"]')
  .nth(1)
  .click({ force: true });

await this.page.keyboard.press('ArrowDown');
await this.page.keyboard.press('Enter');

  await this.page.getByRole('textbox').nth(2)
    .fill('Debit');
}
async clickValidateAndSave() {

    const validateAndSaveBtn = this.page
        .getByRole('button', {
            name: /Validate.*Save/i
        });

    await validateAndSaveBtn.waitFor({
        state: 'visible'
    });

    await validateAndSaveBtn.click();
}
async validateAndSaveMetric(
    metricName,
    description
) {

    const metricNameInput =
        this.page.locator('input[name="metricName"]');

    const descriptionInput =
        this.page.getByPlaceholder('Enter description');

    await metricNameInput.fill(metricName);

    await descriptionInput.fill(description);

    await this.page
        .getByRole('button', { name: 'Validate' })
        .click();

  await this.page.getByText('Metric validated successfully')
    .waitFor({ state: 'visible' });

// Small buffer
await this.page.waitForTimeout(1000);


this.page.on('response', response => {
    if (response.request().method() === 'POST') {
        console.log(
            'POST:',
            response.status(),
            response.url()
        );
    }
});

    // Optional: wait for Save button to become enabled
    const saveButton =
       await this.page
    .getByRole('button', { name: 'Save' })
    .click({ force: true });

 await expect(
    this.page.getByText(/saved successfully/i)
).toBeVisible({ timeout: 10000 });
}
async validateAndCommitMetric(
    metricName,
    description
) {

    const metricNameInput =
        this.page.locator('input[name="metricName"]');

    const descriptionInput =
        this.page.getByPlaceholder('Enter description');

    await metricNameInput.fill(metricName);

    await descriptionInput.fill(description);

    await this.page
        .getByRole('button', { name: 'Validate' })
        .click();

  await this.page.getByText('Metric validated successfully')
    .waitFor({ state: 'visible' });

// Small buffer
await this.page.waitForTimeout(1000);


this.page.on('response', response => {
    if (response.request().method() === 'POST') {
        console.log(
            'POST:',
            response.status(),
            response.url()
        );
    }
});

    // Optional: wait for Save button to become enabled
    const saveButton =
       await this.page
    .getByRole('button', { name: 'Commit' })
    .click({ force: true });

 await expect(
    this.page.getByText(/saved successfully/i)
).toBeVisible({ timeout: 10000 });
}
async addGroupByCustomerId() {

    // Expand Customer table if not already expanded
    await this.page.getByText('Customer', { exact: true }).click();

    // Source column
    const customerId = this.page
        .getByText('Customer Id', { exact: true });

    // Group By drop area
    const groupByDropArea = this.page
        .getByText('Group By (table.column)', { exact: true });

    await customerId.dragTo(groupByDropArea);
}
}

module.exports = CreateMetricPage;