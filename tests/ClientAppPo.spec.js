const {test, expect} = require('@playwright/test');
const {LoginPage} = require('./PageObjects/LoginPage');


test('login functionality', async({page})=>{

    const username ="SpiderMan@stark.com";
    const password ="M@rryJa1n";

   const loginpage = new LoginPage(page);
   await loginpage.goto();
   
   await loginpage.login(username, password);


   await page.pause();

})