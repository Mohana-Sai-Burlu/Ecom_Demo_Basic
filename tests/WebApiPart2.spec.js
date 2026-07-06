//login Ui -> saves into .json
//test browser -> .jon , cart orders, cart details, orderhistory



// Import Playwright test and assertion library
const {test,expect} = require('@playwright/test');

// Global variable to store authenticated browser context
let webcontext;



// Runs once before all test cases
test.beforeAll(async({browser}) =>
    {

    // Create a new browser context (fresh browser session)
    const context = await browser.newContext();

     // Open a new page
    const page = await context.newPage();

    // Navigate to the application
    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

    const email = await page.getByPlaceholder("email@example.com");
    await email.fill("SpiderMan@stark.com");

    const pass = await page.getByPlaceholder("enter your passsword");
    await pass.fill("M@rryJa1n");

    await page.getByRole("button",{name:'Login'}).click();


    // Wait until all network requests are completed
    await page.waitForLoadState('networkidle');

     // Save the logged-in session into a JSON file
    await context.storageState({path: 'sample.json'});

     // Create a new browser context using the saved login session
    webcontext = await browser.newContext({storageState : 'sample.json'});


})



// Test Case 1 - Place an order and verify it in Order History
test('Client app login' ,async()=>{

    const page = await webcontext.newPage();

    // Open a new page using the authenticated browser context
    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

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
    

})


// Test Case 2 - Verify page title using saved login session
test("get page title", async()=>{

    // Open new page using authenticated context
    const page = await webcontext.newPage();

    const website ="https://rahulshettyacademy.com/client/#/auth/login";
    await page.goto(website);

    await page.waitForLoadState("networkidle");
   
    // Get page title
    const title = await page.title();
    expect(title).toEqual("Let's Shop");



})