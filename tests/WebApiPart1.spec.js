const {test, expect, request} = require('@playwright/test');
const payLoad = {userEmail: "SpiderMan@stark.com", userPassword: "M@rryJa1n"};
let token;

test.beforeAll( async()=>{
    const ApiContext = await request.newContext();
    const LoginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:payLoad
    });
    await expect( LoginResponse.ok()).toBeTruthy();

    const jsonResponse = await LoginResponse.json();

    token = jsonResponse.token;
    console.log(token);

});

test("login", async ({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },token);

    
    const website ="https://rahulshettyacademy.com/client/#/auth/login";
     //await page.goto(website);

    
});
