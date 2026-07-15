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


test("Screenshots & visual comparisons", async ({page})=>{


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

      // await page.pause();

   await expect(page.locator('//input[@id="displayed-text"]')).toBeVisible();

   await page.locator('//input[@id="hide-textbox"]').click();


   //taking screenshot of the whole page
   await page.screenshot({path: "screenshot.png"});

   await expect(page.locator('//input[@id="displayed-text"]')).toBeHidden();


   //take the screenshot of the element 
      await page.locator('//input[@id="hide-textbox"]').screenshot({path: "element.png"});

})

test("visual comparison", async({page})=>{

    await page.setViewportSize({ width: 1280, height: 720 });

    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('playwright-homepage.png');
})
