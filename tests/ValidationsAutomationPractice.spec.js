const {test, expect} = require('@playwright/test');

test("Validations", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");

    //navigations
    await page.goBack();
    await page.goForward();
    await page.goBack();

    

    await page.getByRole("button", {name:"Confirm"}).click();


    //Handling dialogue box
    page.on("dialog", dialog => dialog.accept());

    const TestBox = await page.locator("#displayed-text");

    await expect(TestBox).toBeVisible();

    await page.getByRole("button", {name: "Hide"}).click();

    await expect(TestBox).toBeHidden();


    //mouse hower 
    await page.locator("//*[@id='mousehover']").hover();

    const bool = await page.locator('(//*[@id="mousehover"]//following::a)[1]').isVisible();
    await expect(bool).toBeTruthy();

   // await page.pause();









})