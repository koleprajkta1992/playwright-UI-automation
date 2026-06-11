const { expect } = require('@playwright/test');

class ScenarioApprovalPage {

    constructor(page) {

        this.page = page;

        this.notificationBell =
            page.getByRole('button', {
                name: /notification/i
            });

        this.commentInput =
            page.getByPlaceholder(
                'Enter comment'
            );

        this.addButton =
            page.getByRole('button', {
                name: /^Add$/i
            });

        this.continueButton =
            page.getByRole('button', {
                name: /continue/i
            });
    }
//  async openApprovalNotification(
//     scenarioId
// ) {

//     await this.notificationBell.click();

//     await this.page
//         .getByText(
//             scenarioId.toString()
//         )
//         .click();
// }

async openApprovalNotification(
    scenarioId
) {

    this.notificationBell =
  this.page.locator(
    'svg[data-testid="NotificationsNoneOutlinedIcon"]'
  );
    await this.notificationBell.click({
  force: true
});
const notificationPanel = this.page.getByText('Notifications');

console.log(
  'Visible:',
  await notificationPanel.isVisible()
);
     const notification = this.page
        .locator('div')
        .filter({
            hasText: `Scenario '${scenarioId}' waiting for your approval`
        })
        .first();

    await expect(notification).toBeVisible();

    await notification.click();
      console.log(
        "Approval URL:",
        this.page.url()
    );
}

// async verifyFieldsAreReadOnly() {

   
// const fields = [

//     this.page.getByLabel(
//         'Scenario Name'
//     ),

//     this.page.getByLabel(
//         'Description'
//     ),

//     this.page.locator(
//         'input[name="risk"]'
//     ),

//     this.page.locator(
//         'input[name="priority"]'
//     )

// ];

// for (const field of fields) {

//     await expect(field)
//         .toBeDisabled();
// }
// }

async addComment(
    comment,scenarioId
) {
  await this.page.goto(
  `https://frontend-uat.emot.solyticspartners.com/scenario-manager/edit-scenario/real_time/${scenarioId}`
);

    await this.commentInput.fill(
        comment
    );

    await this.addButton.click();

   
}

async clickContinue() {

    await this.continueButton.click();

    


     await this.page
  .getByRole('button', {
      name: 'Approve'
  })
  .click();
}

  }

  module.exports = ScenarioApprovalPage;