const {test,expect} =require('@playwright/test');

test('ShoppingTest_Registering', async ({browser})=>{



    const context = await browser.newContext();
    const page = await context.newPage();




   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

   const registerLink = await page.locator('.text-reset');
   await registerLink.click();

   const firstName = await page.locator("//input[@id='firstName']");
   await firstName.fill("peter");

   const lastName = await page.locator("//input[@id='lastName']");
   await lastName.fill("parker");

   const Email = await page.locator("//input[@id='userEmail']");
   await Email.fill("SpiderMan@stark.com");

   const phoneNo = await page.locator("//input[@id='userMobile']");
   await phoneNo.fill("1972457662");

   const occupation = await page.locator(".custom-select");
   await occupation.selectOption("Scientist");

   const GenderMale = await page.locator("input[value='Male']")
   await GenderMale.click();

   const password = await page.locator("//input[@id='userPassword']");
   await password.fill("M@rryJa1n");

   const conPassword = await page.locator("//input[@id='confirmPassword']");
   await conPassword.fill("M@rryJa1n");


   const checkBox = await page.locator('//input[@type="checkbox"]');
   await checkBox.click();


   const RegisterButt = await page.locator('//input[@id="login"]');
   await RegisterButt.click();


   const RDLogin = await page.locator("//input[@value ='Login']");
   await RDLogin.click();




   await page.pause();



})

test.only('login', async ({browser})=>{


    const Email = 'SpiderMan@stark.com';

    const context = await browser.newContext();
    const page = await context.newPage();

     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

     const logEmail = await page.locator('//input[@id="userEmail"]');
     await logEmail.fill(Email)

     const logPss = await page.locator('//input[@id="userPassword"]');
     await logPss.fill("M@rryJa1n");

    const RDLogin = await page.locator("//input[@value ='Login']");
    await RDLogin.click();

    await page.waitForLoadState('networkidle');


    const Items = await page.locator(".card-body b");
   const INo = await Items.count();


   const products = await page.locator('.card-body');

    for(let i =0; i< INo; i++){
        
        const Item =await Items.nth(i).textContent();

        if(Item === "ZARA COAT 3"){
           await  products.nth(i).getByText(" Add To Cart").click();
            break;
        }


    }


    const cart = await page.locator('[routerlink*="cart"]');
    await cart.click();


    await page.locator("div li").first().waitFor();

    const bol = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    await expect(bol).toBeTruthy();
    

    await page.locator('button:has-text("Checkout")').click();


     const CD_No = await page.locator(".input.txt.text-validated").nth(0);
     await CD_No.fill("4542 9931 9292 2233");
    

    const month = await page.locator('div.field.small').locator('select').nth(0);
    await month.selectOption("11");
    

    const  date= await page.locator('div.field.small').locator('select').nth(1);
    await date.selectOption("22");

    

    const cvv= await page.locator("//div[@class='payment__cc']//div[2]//input[1]");
    await cvv.fill("123");

    const NOCard =await page.locator("//div[text()='Name on Card ']//following::input[1]");
    await NOCard.fill("spider");

    const ACoupon = await page.locator("//div[text()='Apply Coupon ']//following::input[1]");
    await ACoupon.fill("rahulshettyacademy");

    
    const ApCoupon = await page.locator('.btn-primary');
    await ApCoupon.click();
    
    const TEmail = await page.locator("(//div[@class='payment__shipping']//following::input)[1]");;
    console.log(await TEmail.textContent());

    const Country = await page.locator("(//div[@class='payment__shipping']//following::input)[2]");
    await Country.pressSequentially('Ind');

    const cty = await page.locator('.ta-results');
    await cty.waitFor();

    const buttons = await page.locator('.ta-results').locator('button');
    for(let i=0; i<await buttons.count(); i++){
        const ctyName = await buttons.nth(i).textContent();
        if(ctyName === " India"){
            await buttons.nth(i).click();
            break;
        }
    }


    await page.locator('.action__submit').click();


    const orderId = await page.locator('//label[@class="ng-star-inserted"]').textContent();
    console.log(orderId);

    const ordersButton = await page.locator("(//button[@class='btn btn-custom'])[2]");
    await ordersButton.click();
    
    const orders = await page.locator('//tbody/tr/th')

    const noOrders = await orders.count();

    for(let i=0; i<noOrders; i++){
     
       const orName = await orders.nth(i).textContent();
       //console.log(orName);
        if(orderId.includes(orName)){
            await page.locator('(//tbody/tr)//button[@class="btn btn-primary"]').nth(i).click();
            break;
        }

    }
   const OrIDCheck = await page.locator(".col-text").textContent();
    await expect(orderId.includes(OrIDCheck)).toBeTruthy();

})