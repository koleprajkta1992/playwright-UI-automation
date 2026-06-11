

const { test,expect } =
require('@playwright/test');

const LoginPage =
require('../pages/LoginPage');

const DataManagerPage =
require('../pages/DataManagerPage');
const ScenarioManagerPage =
require('../pages/ScenarioManagerPage');
const  ScenarioApprovalPage  = 
require('../pages/ScenarioApprovalPage');
const loginData = 
require('../testdata/loginData');


const path = require('path');

test(
'UI Login Automation',

async ({ page }) => {

    const loginPage =
        new LoginPage(page);

       


    await loginPage.loginToApplication(

       loginData.makerUser.org,loginData.makerUser.username,loginData.makerUser.password
    );
 await expect(page)
    .toHaveURL(
      'https://frontend-uat.emot.solyticspartners.com/data-manager'
    );

     const dataManager =
        new DataManagerPage(page);


    const filePath =
    'testData/Book1.xlsx';

    // FILE NAME

    const fileName =
    path.basename(filePath);


    await dataManager.addData(

        'Customer_0806',

        filePath
    );
    await page.goto(
      'https://frontend-uat.emot.solyticspartners.com/data-manager?dashboard=ingestion'
    );
await dataManager
.verifyUploadedFilePresent(
    fileName
);
const scenarioManager =
new ScenarioManagerPage(page);
const scenarioName =await scenarioManager.generateScenarioName();


 console.log(`Created Scenario: ${scenarioName}`);

const scenarioData = {

    scenarioName,

    description:
        'Automation Testing Scenario',

    risk:
        'High',

    priority:
        '1',

    category:
        'Fraud',

    team:
        'UAT_Test',

    schema:
        'Transaction',

    lookbackType:
        'Simple',

    lookbackValue:
        5,

    unit:
        'Days'
};



await scenarioManager.navigate();


await scenarioManager
.createRealTimeScenario(
    scenarioData
);
const scenarioId =await scenarioManager
.completeScenarioCreation(
    loginData.checkerUser.username
);




// await scenarioManager.editScenarioByName(
//     scenarioName
// );
 await loginPage.logout();

 await loginPage.loginToApplication(
   loginData.checkerUser.org,loginData.checkerUser.username,loginData.checkerUser.password
);
await page.waitForLoadState('networkidle');

await page.waitForTimeout(5000);

const scenarioApprovalPage=new ScenarioApprovalPage(page);

// Open approval notification
//await scenarioApprovalPage.openApprovalNotification(scenarioId);

// Verify page is read-only
//await scenarioApprovalPage.verifyFieldsAreReadOnly();
console.log(
  "Current URL:",
  page.url()
);
// Add comment
await scenarioApprovalPage.addComment(
    'Scenario reviewed and approved',scenarioId
);

// Continue
await scenarioApprovalPage.clickContinue();
});