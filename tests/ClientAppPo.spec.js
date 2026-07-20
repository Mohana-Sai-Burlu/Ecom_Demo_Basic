const {test, expect} = require('@playwright/test');
const {PoManager} = require('./PageObjects/PoManager');
//Json -> String -> JsonObject
const testdata = JSON.parse(JSON.stringify(require("./Utiles/ClientAppPodata.json")));

test.only('login functionality', async({page})=>{

    const pomanager = new PoManager(page);
    

   const loginpage = pomanager.getloginpage();
   await loginpage.goto();
   
   await loginpage.login(testdata.username, testdata.password);


   const dashboardPage = pomanager.getdashboardpage();
   await dashboardPage.addProductToCart(testdata.ProductName);
   await dashboardPage.NavigatetoCartPage();

   const mycartpage = pomanager.getmycartpage();
   await mycartpage.PlaceOrder(testdata.ProductName);
  

    await mycartpage.EnterCardDetails('2222 2222 2222 2222', '02', '03','234','mohan','rahulshettyacademy',testdata.username, 'India');


  

    

})