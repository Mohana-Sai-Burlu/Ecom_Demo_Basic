const {test, expect, request} = require('@playwright/test');
const payLoad = {userEmail: "SpiderMan@stark.com", userPassword: "M@rryJa1n"};

test.beforeAll( async()=>{
    const ApiContext = await request.newContext();
    const LoginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:payLoad
    });
    await expect( LoginResponse.ok()).toBeTruthy();

    const jsonResponse = await LoginResponse.json();

    const token = jsonResponse.token;
    console.log(token);

});

test("login", async ({page})=>{

});
