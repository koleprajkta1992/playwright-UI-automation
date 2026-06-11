class DataManagerPage {

    constructor(page) {

        this.page = page;

        // Add Data button

        this.addDataButton =
            page.getByRole('button', {
                name: /add data/i
            });

        // Mapping dropdown

       this.mappingDropdown =
page.getByPlaceholder(/mapping/i);

 this.fileUploadCheckbox =
page.locator('text=File Upload');
        // File upload input

    this.fileInput =
            page.locator(
              'input[type="file"]'
            );

        // Save/Submit button

        this.submitButton =
            page.getByRole('button', {
                name: /submit|save|proceed/i
            });

                this.ingestionTable =
            page.locator('table');

        this.ingestionRows =
            page.locator('table tbody tr');
    }

    async clickAddData() {

        await this.addDataButton.click();
    }

    async selectMapping(mappingName) {

    await this.mappingDropdown.click();

    await this.page
    .getByText(mappingName)
    .click();
}
  async selectFileUploadCheckbox() {

       await this.fileUploadCheckbox.click();
    }

    async uploadFile(filePath) {

        await this.fileInput
        .setInputFiles(filePath);
    }

    async submitData() {

        await this.submitButton.click();
    }

     async addData(
        mappingName,
        filePath
    ) {

        await this.clickAddData();

        await this.selectMapping(
            mappingName
        );

         await this.selectFileUploadCheckbox();

        await this.uploadFile(
            filePath
        );


        await this.submitData();
    }



    async verifyUploadedFilePresent(
        fileName
    ) {

        // Wait for table

        await this.ingestionTable
        .waitFor({ state: 'visible' });

        // Verify filename visible

       await this.page
.getByText(fileName)
.first()
.waitFor({
    state: 'visible',
    timeout: 30000
});
    }
}

module.exports = DataManagerPage;