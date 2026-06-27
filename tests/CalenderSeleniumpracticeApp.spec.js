const {test, expect} =require("@playwright/test");

test("Handling calender", async ({page}) =>{

    const year = "2027";

    const month = "12";

    const day = "15";

    const arr = [ month,day, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label").click();

     await page.locator(".react-calendar__navigation__label").click();

     await page.getByText(year).click();


     await page.locator('//*[@class="react-calendar__tile react-calendar__year-view__months__month"]').nth(Number(month) - 1).click();

     await page.locator('//abbr[text()="'+day+'"]').click();


     await page.waitForTimeout(1000);

     const date = await page.locator('//*[@class="react-date-picker__inputGroup"]//following::input');

        for(let i= 0; i< arr.length; i++){
        const value =await date.nth(i).inputValue();
        
       await expect(arr[i]).toEqual(value);
     }









    })