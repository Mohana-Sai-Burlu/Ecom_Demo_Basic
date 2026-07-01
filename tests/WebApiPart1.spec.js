const {test, expect, request} = require('@playwright/test');
const payLoad = {userEmail: "SpiderMan@stark.com", userPassword: "M@rryJa1n"};
let token;
let orderID;

const orderPayLoad = {orders: [{country: "cuba", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};


test.beforeAll( async()=>{
    const ApiContext = await request.newContext();

    //Login
    const LoginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:payLoad
    });
    await expect( LoginResponse.ok()).toBeTruthy();

    const jsonResponse = await LoginResponse.json();

    token = jsonResponse.token;
    console.log(token);

     //OrderApi
   const orderResponse= await ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
         data:orderPayLoad,

         headers:{
            "authorization":token,
            "content-type":'application/json'
         },

    });

    const orderJsonResponse = await orderResponse.json();
    orderID = orderJsonResponse.orders[0];


});

test("login", async ({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },token);

    
    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

    await page.getByRole("button",{name:'ORDERS'}).click();
    const count = await page.locator("//tbody/tr").filter({hasText:orderID}).getByRole("button",{name:"view"}).click();
    const eleorderID = await page.locator('//*[@class="col-text -main"]').textContent();
    await expect(orderID).toEqual(eleorderID);
    


    //await page.pause();






    
});
