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


   //handling frames
   const frames = await page.frameLocator('//iframe[@id="courses-iframe"]');

   //hitting the visible element
   await frames.locator("li a[href='lifetime-access']:visible").click();

   const heading = await frames.locator(".text h2").textContent();

   console.log(await heading.split(" ")[1]);
   









})