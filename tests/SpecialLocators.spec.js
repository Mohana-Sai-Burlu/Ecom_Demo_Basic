const {expect,test} = require('@playwright/test');

test("Special Locators",async({page}) =>{

    const website = "https://rahulshettyacademy.com/angularpractice/";

    await page.goto(website);


    //Get by label is used to get the element by its label text.
    const CBox = await page.getByLabel("Check me out if you Love IceCreams!");
    await CBox.click();

    const bool = await CBox.isChecked();
    expect(bool).toBeTruthy();

    console.log(bool);

    const radio = await page.getByLabel("Student");
    await radio.click();


    const SdropDown = await page.getByLabel("Gender");
    await SdropDown.selectOption("Female");

    
    //Get by placeholder is used to get the element by its placeholder text.
    const password = await page.getByPlaceholder("Password");
    await password.fill("password123asdfasdfasdfasdfasdfa" );

    
    //Get by role is used to get the element by its role.
    const subButton = await page.getByRole("button", {name : 'Submit'});
    await subButton.click();

    
     //get by text is used to get the element by it text content.
     const Smessage = await page.getByText("Success! The Form has been submitted successfully!.");
     const sbool = await Smessage.isVisible();

     console.log(sbool);

     //get by role by link is used to get the element by its role and name.
     const shop = await page.getByRole("link", {name : "Shop"});
     await shop.click();

     await page.waitForLoadState('networkidle');

    //get by locator with filter is used to get the element by its locator and fileter.
    const Item = await page.locator("app-card").filter({hasText : "Blackberry"}).getByRole("Button");
    await Item.click();

}) 