const { test, expect, request } = require('@playwright/test');

const excelUtilLib = require('exceljs');

async function writeExcelTest(filePath, sheetDetails, searchValue, replaceValue, changePos) {

    const workbook = new excelUtilLib.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(sheetDetails);

    const output = await readExcel(worksheet, searchValue);

    const cellMod = worksheet.getCell(output.rowVal, output.columnVal+changePos.columnCnt);

    cellMod.value = replaceValue;

    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchValue) {

    let output = { rowVal: -1, columnVal: -1 };
    worksheet.eachRow((row, rowNum) => {

        row.eachCell((cell, cellNum) => {

            console.log(cell.value);

            if(cell.value === searchValue) {

                output.rowVal = rowNum
                output.columnVal = cellNum
                console.log("The cell value of Apple is present in the row: ", output.rowVal);
                console.log("The cell value of Apple is present in the column: ", output.columnVal);
            }
        })
    })

    return output;
}


test('@E2Eupload and download using playwright', async function({page}) {

    let searchItem = 'Mango';
    let replaceItem = '350';
    let filePath = 'C:/Users/rajiv/Documents/excelJsTestFile.xlsx';
    let sheetName = 'Sheet1';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    let [ download ] = await Promise.all([

        page.waitForEvent('download'),
        page.locator('#downloadButton').click(),
    ]);

    await download.saveAs(filePath);

    await writeExcelTest(filePath, sheetName, searchItem, replaceItem, { rowCnt: 0, columnCnt: 2 });

    await page.locator('#fileinput').setInputFiles(filePath); // Here the element should have type attribute value as file. Only then
    // setInputFiles function in playwright will work in that element for uploading files

    const searchElement = page.getByText('Mango');

    await page.pause();

    expect(await page.getByRole('row').filter({has: searchElement}).locator('#cell-4-undefined').textContent()).toContain(replaceItem);
});