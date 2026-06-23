const {test,expect} = require("@playwright/test");


test('PlayWright first Assignment', async ({page})=>{

    const WebPageLink = "https://rahulshettyacademy.com/client/#/auth/login";
    const RegisterLink = page.locator("body > app-root > app-login > div.banner > section:nth-child(2) > div > div.login-wrapper.my-auto.p-5 > p > a");

    const logID = "blackmamba@gmail.com";
    const pasID = "123mamb@Bl@ck123";

    const FirstName = page.locator("input#firstName");
    const LastName = page.locator("input#lastName");
    const Email = page.locator("input#userEmail");
    const Phone = page.locator("input#userMobile");
    const occupation = page.locator(".custom-select.ng-untouched.ng-pristine.ng-valid");
    const gender = page.locator("input[value='Male']");
    const password = page.locator("#userPassword");
    const conformPassword = page.locator("#confirmPassword");
    const checkBox = page.locator("input[type='checkbox']");
    const Registerbut = page.locator('input[value="Register"]');
    const loginbut = page.locator('.text-reset');
    


    const loginemail= page.locator('#userEmail');
    const loginpassword = page.locator('#userPassword');
    const loginbutton = page.locator('#login');
    const titles = page.locator('.card-body b');

    await page.goto(WebPageLink);
    await RegisterLink.click();

    await FirstName.fill("black");
    await LastName.fill("mamba");
    await Email.fill(logID);
    await Phone.fill("9848234576");

    await occupation.selectOption({ index: 1 });
    await gender.click();

    await password.fill(pasID);
    await conformPassword.fill(pasID);
    await checkBox.click();

    await Registerbut.click();
    await loginbut.click();


    await loginemail.fill(logID);
    await loginpassword.fill(pasID);

    await loginbutton.click();

    console.log(await titles.nth(0).textContent());

    //wait for one element to load
    await page.locator(".card-body b").first().waitFor();
    
    //wait for till all network calls are made.
    await page.waitForLoadState('networkidle');
    console.log(await titles.allTextContents());


})


test('Ui controls - dropdowns and radio buttons', async ({page})=>{

const WebPageLink = "https://rahulshettyacademy.com/loginpagePractise/";
await page.goto(WebPageLink);


const BTest = page.locator('a:has-text("Free Access to InterviewQues/ResumeAssistance/Material")');

//Check whether it has attribute name in Dom
await expect(BTest).toHaveAttribute("class", "blinkingText");



//handling radio Buttons
const radioButt = page.locator(".checkmark");
await radioButt.nth(1).click();


//checking in console
console.log(await radioButt.nth(1).isChecked());



//Checking with essertion
await expect(radioButt.nth(1)).toBeChecked();




await page.locator("button#okayBtn").click();

//handling Static dropdowns

const dropdown = page.locator("select.form-control");
await dropdown.selectOption("teach");

const checkBox = page.locator("input[type='checkbox']");
await checkBox.click();

expect(await checkBox.isChecked());

await checkBox.uncheck();

expect(await checkBox.isChecked()).toBeFalsy();

})






test("Child page", async ({browser})=>{

const context =await browser.newContext();
const page =  await context.newPage();


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const username = page.locator('#username');


const document = page.locator(".blinkingText[href='https://rahulshettyacademy.com/documents-request']");

const [newpage] = await Promise.all([
context.waitForEvent('page'),    //lesten for any new page for any new page pending, rejected, fulfilled
document.click(),]  );   // new page is created


//text Content function will get the text of the line
const redline =  await newpage.locator(':text-is("mentor@rahulshettyacademy.com")').textContent();

console.log(redline);
// Spliting the string
const arr = redline.split('@');
const name = arr[1];
// printing the message in terminal
//console.log(name);
await username.fill(name);

console.log(await username.inputValue());


//await page.pause();
    
})
