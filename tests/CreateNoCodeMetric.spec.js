const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const CreateMetricPage = require('../pages/CreateMetricPage');

const loginData = require('../testData/loginData');
const  CodeBasedMetricPage = require('../pages/CodeBasedMetricPage');

test.describe('Create Metric', () => {

    test('Open Create Metric Page', async ({ page }) => {

        const loginPage = new LoginPage(page);

      
        const createMetricPage =
            new CreateMetricPage(page);

        // Login
        await loginPage.loginToApplication(
            loginData.makerUser.org,
            loginData.makerUser.username,
            loginData.makerUser.password
        );

        // Open Scenario Manager
        await page.goto(
            'https://frontend-uat.emot.solyticspartners.com/scenario-manager'
        );

        // Open Create Metric page
       await createMetricPage.openCreateMetricPage();

        // Verify page loaded
        await createMetricPage.verifyCreateMetricPageLoaded();

        await createMetricPage.selectSchema('Transaction');

         await createMetricPage.dragSumAggregation();
          await createMetricPage.addFilterCondition();
          await createMetricPage.addGroupByCustomerId();
           await createMetricPage.clickValidateAndSave();

           const now = new Date();

const metricName =
    `Metric_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

           await createMetricPage.validateAndSaveMetric(
    metricName,
    metricName
);
console.log(`Created Metric: ${metricName}`);


    });

     test.only('Create Code Based Metric', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const createMetricPage = new CreateMetricPage(page);
        const codeMetricPage = new CodeBasedMetricPage(page);

         await loginPage.loginToApplication(
            loginData.makerUser.org,
            loginData.makerUser.username,
            loginData.makerUser.password
        );

 await page.goto(
            'https://frontend-uat.emot.solyticspartners.com/scenario-manager'
        );
        await createMetricPage.openCreateMetricPage();

        await codeMetricPage.enableCodeBasedMetric();

        await codeMetricPage.enterSqlQuery(`
SELECT
    "customer"."customer_id" AS "entity_id",
    "customer"."policyholder_annual_income" AS "metric_value",
    CAST(ARRAY[] AS TEXT[]) AS "txn_ids"
FROM "customer" AS "customer";
        `);

        await codeMetricPage.clickValidateAndCommit();
const now = new Date();
        const metricName =
    `Metric_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

           await createMetricPage.validateAndCommitMetric(
    metricName,
    metricName
);
console.log(`Created Metric: ${metricName}`);

    });

});