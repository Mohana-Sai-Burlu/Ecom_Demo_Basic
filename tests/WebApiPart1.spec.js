const {test, expect, request} = require('@playwright/test');
const {ApiUtiles} = require('./Utiles/ApiUtiles');
const payLoad = {userEmail: "SpiderMan@stark.com", userPassword: "M@rryJa1n"};


let response;

const orderPayLoad = {orders: [{country: "cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};

test.beforeAll(async () => {
    const ApiContext = await request.newContext();

    const apiutiles = new ApiUtiles(ApiContext, payLoad);

    response = await apiutiles.createOrderID(orderPayLoad);
})

test("login", async ({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);

    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);
    await page.waitForLoadState('networkidle');

    

    await page.getByRole("button",{name:'ORDERS'}).click();
    await page.waitForLoadState("networkidle");

    const count = await page.locator("//tbody/tr").filter({hasText:response.orderID}).getByRole("button",{name:"view"}).click();
    const eleorderID = await page.locator('//*[@class="col-text -main"]').textContent();
    await expect(response.orderID).toEqual(eleorderID);
    


    //await page.pause();






    
});
