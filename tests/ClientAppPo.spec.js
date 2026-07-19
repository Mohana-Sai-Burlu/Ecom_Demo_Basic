const {test, expect} = require('@playwright/test');
const {PoManager} = require('./PageObjects/PoManager');


test.only('login functionality', async({page})=>{

    const pomanager = new PoManager(page);
    const username ="SpiderMan@stark.com";
    const password ="M@rryJa1n";
    const ProductName ="ADIDAS ORIGINAL";

   const loginpage = pomanager.getloginpage();
   await loginpage.goto();
   
   await loginpage.login(username, password);


   const dashboardPage = pomanager.getdashboardpage();
   await dashboardPage.addProductToCart(ProductName);
   await dashboardPage.NavigatetoCartPage();

   const mycartpage = pomanager.getmycartpage();
   await mycartpage.PlaceOrder(ProductName);
  

    await mycartpage.EnterCardDetails('2222 2222 2222 2222', '02', '03','234','mohan','rahulshettyacademy',username, 'India');


  

    

})