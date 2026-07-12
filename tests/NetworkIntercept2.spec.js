const { test, expect } = require('@playwright/test');



test('@QW Security test request intercept', async ({ page }) => {

    const website = "https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

    const email = await page.getByPlaceholder("email@example.com");
    await email.fill("SpiderMan@stark.com");

    const pass = await page.getByPlaceholder("enter your passsword");
    await pass.fill("M@rryJa1n");

    await page.getByRole("button", { Name: 'Login' }).click();

    await page.waitForLoadState('networkidle');

    await page.getByRole("button").getByText(/ORDERS/).click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url : 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}));

    await page.locator(".btn-primary").first().click();

    await expect( page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

    await page.pause();



})