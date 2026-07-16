const {test, expect} = require('@playwright/test');
const {LoginPage} = require('./PageObjects/LoginPage');
const {DashBoardPage} = require("./PageObjects/DashBoardPage");
const {MyCartPage} = require('./PageObjects/MyCartPage');


test.only('login functionality', async({page})=>{

    const username ="SpiderMan@stark.com";
    const password ="M@rryJa1n";
    const ProductName ="ADIDAS ORIGINAL";

   const loginpage = new LoginPage(page);
   await loginpage.goto();
   
   await loginpage.login(username, password);


   const dashboardPage = new DashBoardPage(page);
   await dashboardPage.addProductToCart(ProductName);
   await dashboardPage.NavigatetoCartPage();

   const mycartpage = new MyCartPage(page);
   await mycartpage.PlaceOrder(ProductName);
    //await page.pause();
})