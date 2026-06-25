const {expect,test} = require("@playwright/test");

test("webst client application", async({page}) =>{

    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

    const email = await page.getByPlaceholder("email@example.com");
    await email.fill("SpiderMan@stark.com");

    const pass = await page.getByPlaceholder("enter your passsword");
    await pass.fill("M@rryJa1n");

    await page.getByRole("button",{Name:'Login'}).click();

    //await page.waitForEvent("networkidle");

    await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button",{name:"Add to Cart"}).click();


    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    await page.getByText("Checkout").click();

    await page.waitForLoadState("networkidle");

    await page.locator('//div[text()="Credit Card Number "]//following::input[1]').fill("1234 5678 9012");

    await page.locator('//div[text()="Expiry Date "]//following::select[1]').selectOption("08");

    await page.locator('//div[text()="Expiry Date "]//following::select[2]').selectOption("22");

    await page.locator('//*[text()="CVV Code "]//following::input[1]').fill("123");

    await page.locator('//*[text()="Name on Card "]//following::input[1]').fill("Spider man");

    await page.locator('//*[text()="Apply Coupon "]//following::input[1]').fill("rahulshettyacademy");

    await page.getByRole("button",{name:"Apply Coupon"}).click();

    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder("Select Country").pressSequentially("Ind");

    await page.locator('.ta-results').waitFor();

    await page.locator('//*[@class="ta-results list-group ng-star-inserted"]').filter({hasText: " India"}).click();

    await page.getByText("PLACE ORDER").click();

    await page.waitForLoadState("networkidle");

    const orID = await page.locator('//label[@class="ng-star-inserted"]').textContent();
    const OrID = await orID.split(" ");

    console.log(OrID[2]);


    await page.getByRole("button").getByText(/ORDERS/).click();


            await page.locator("tbody").waitFor();


     //const orderids = await page.locator("//tbody//tr/th").count();

     await page.locator("//tr").filter({hasText:OrID[2]}).locator('//*[@class="btn btn-primary"]').click();
    
     await page.pause();

     /*
     for(let i =0; i<orderids; i++){
        const orderid = await page.locator("//tbody//tr/th").nth(i).textContent();
        console.log(orderid);
        if(orderid === OrID[2]){
            await page.locator("//tbody//tr/td[5]").nth(i).click();
        }
     }

     await page.pause();

*/

    
})