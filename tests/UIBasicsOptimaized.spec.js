const {test,expact} = require('@playwright/test')


test('first playwrite test',async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const userName = page.locator('input#username');
    const password = page.locator('input#password');
    const logBut = page.locator('#signInBtn');
    const Title = page.locator('.card-body a');



    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await  logBut.click();


    console.log(await page.title());

    console.log(await Title.first().textContent());

    console.log(await Title.allTextContents());






})