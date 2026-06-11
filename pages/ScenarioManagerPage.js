const { expect } = require("@playwright/test");

class ScenarioManagerPage {
  constructor(page) {
    this.page = page;

    // CREATE SCENARIO

    this.createScenarioButton = page.getByRole("button", {
      name: /create scenario/i,
    });

    this.createRealTimeOption = page.getByText(/create real time/i);

    // FORM FIELDS

    this.scenarioNameInput = page.getByPlaceholder(/scenario name/i);

    this.descriptionInput = page.getByPlaceholder(/description/i);

    // DROPDOWNS
    this.riskDropdown = page.locator('input[name="risk"]');

    this.priorityDropdown = page.locator('input[name="priority"]');

    this.categoryDropdown = page.locator('input[name="scenario_type"]');

    this.teamDropdown = page.locator('input[name="team"]');

    this.schemaDropdown = page.getByRole("combobox", { name: "Select Schema" });

    

    // LOOKBACK

    this.simpleRadio = page.getByLabel(/simple/i);

    this.advancedRadio = page.getByLabel(/advanced/i);

    this.lookbackInput = page.locator('input[type="number"]');

    this.unitDropdown = page.getByRole("combobox", { name: "Select Interval" });

    // CONTINUE

    this.continueButton = page.getByRole("button", {
      name: /continue/i,
    });

    // STEP 2 FIELDS

this.parametersDropdown =
page.getByRole('combobox').nth(0);

this.operatorDropdown =
page.getByRole('combobox', { name: '=' });

this.valueInput =
page.getByRole('textbox')
.last();

// SEND FOR APPROVAL

this.sendForApprovalButton =
page.getByRole('button', {
    name: /send for approval/i
});




this.chooseButton =
page.getByRole('button', {
    name: /choose/i
});

this.searchInput = page.locator(
    'input[placeholder="Search for Scenario Name and Scenario ID"]'
);
this.scenarioTable = this.page.locator(
  '.MuiTableContainer-root table'
).last();
  }

  async navigate() {
    await this.page.goto(
      "https://frontend-uat.emot.solyticspartners.com/scenario-manager",
    );
  }

  async openCreateRealTimeScenario() {
    await this.createScenarioButton.click();

    await this.createRealTimeOption.click();

    await expect(this.page).toHaveURL(
      "https://frontend-uat.emot.solyticspartners.com/scenario-manager/create-scenario/real_time",
    );
  }
 async generateScenarioName() {
  
  return `SCN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

  async fillScenarioDetails(data) {
    // TEXTFIELDS

    await this.scenarioNameInput.fill(data.scenarioName);

    await this.descriptionInput.fill(data.description);

    // RISK

    await this.selectDropdownOption(this.riskDropdown, data.risk);
    //Priority

    await this.selectDropdownOption(this.priorityDropdown, data.priority);

    // CATEGORY

    await this.selectDropdownOption(this.categoryDropdown, data.category);

    // TEAM
    // enabled after category selection

    await this.selectDropdownOption(this.teamDropdown, data.team);

    // SCHEMA

    await this.selectDropdownOption(this.schemaDropdown, data.schema);

    
    // LOOKBACK RADIO

    if (data.lookbackType === "Simple") {
      await this.simpleRadio.click();
    } else {
      await this.advancedRadio.click();
    }

    // LOOKBACK VALUE

    await this.lookbackInput.fill(data.lookbackValue.toString());

    // UNIT

    await this.selectDropdownOption(this.unitDropdown, data.unit);

    
  }

  async selectDropdownOption(dropdown, option) {
    await dropdown.click();

    await this.page
      .getByRole("option", {
        name: option,
        exact: true,
      })
      .click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async createRealTimeScenario(data) {
    await this.openCreateRealTimeScenario();

    await this.fillScenarioDetails(data);

    await this.clickContinue();
  }

  async fillScenarioConditionForm() {

    // PARAMETERS

    await this.selectDropdownOption(
        this.parametersDropdown,
        'Amount'
    );

    // OPERATOR
await this.operatorDropdown.click();

await this.page.keyboard.press(
   'ArrowDown'
);

await this.page.keyboard.press(
   'Enter'
);

    // VALUE

    await this.valueInput.fill(
        '20000'
    );
}

async selectCheckerUser(userName) {

    const userRow =
    this.page
    .getByRole('row')
    .filter({
        hasText: userName
    });

    await userRow.waitFor({
        state: 'visible',
        timeout: 30000
    });

    const checkbox =
    userRow.getByRole('checkbox');

    await checkbox.check();
}

async sendForApproval(userName) {

    await this.sendForApprovalButton
    .click();

    await this.selectCheckerUser(
        userName
    );

   await expect(this.chooseButton)
  .toBeVisible();

await expect(this.chooseButton)
  .toBeEnabled();

console.log(
  'Choose visible:',
  await this.chooseButton.isVisible()
);

console.log(
  'Choose enabled:',
  await this.chooseButton.isEnabled()
);

const responsePromise = this.page.waitForResponse(
  response =>
    response.url().includes('scenario') &&
    response.request().method() === 'POST'
);

await this.chooseButton.click();

const response = await responsePromise;

const responseBody = await response.json();

console.log('Status:', response.status());
console.log('Scenario ID:', responseBody.scenario_id);

return responseBody.scenario_id;


}
async editScenarioByName(scenarioName) {

    await this.page.goto(
      'https://frontend-uat.emot.solyticspartners.com/scenario-manager'
    );
    await this.page.waitForLoadState('networkidle');

await this.page.reload();

await this.page.waitForLoadState('networkidle');

    await this.searchInput.fill(scenarioName);

    await this.page.keyboard.press('Enter');

    await this.page.waitForTimeout(5000);

    const scenarioTable = this.page.locator(
      '.MuiTableContainer-root table'
    ).last();

    const row = scenarioTable.locator('tbody tr').filter({
      hasText: scenarioName
    });

    await expect(row).toBeVisible({
      timeout: 15000
    });

    await row.locator('button[title="Edit"]').click();

    const scenarioId = this.page.url().split('/').pop();

console.log('Scenario ID:', scenarioId);
}

async completeScenarioCreation(checkerUser) {

    await this.fillScenarioConditionForm();

     const scenarioId = await this.sendForApproval(checkerUser);

  return scenarioId;



    //await this.verifyScenarioCompletion();
}



}

module.exports = ScenarioManagerPage;
