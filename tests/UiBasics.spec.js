const {test, expect} = require('@playwright/test');


/*
test('playwright first test', async ({browser})=>{

    const context = await browser.newContext();
    const page = await browser.newPage();
   await page.goto('http://google.com')
})
   */

test('playwright second test',async ({page})=>{


    //opening URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //printing messages on console
    console.log('mohan');

    //get title on console
   console.log(await page.title());

   //Assertion
   await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

   // Finding a element using css selector
   await page.locator('input#username').fill("MohanaSaiBurlu");

   await page.locator('input#password').fill("capgimini");
 
   //click action
   await page.locator('#signInBtn').click();


   //printing the login error code in console
  console.log(await page.locator('[style="display: block;"]').textContent());


  



})