const {test, expect} =require("@playwright/test");

test("Handling calender", async ({page}) =>{

    const year = "2027";

    const month = "12";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label").click();

     await page.locator(".react-calendar__navigation__label").click();

     await page.getByText(year).click();


     await page.locator('//*[@class="react-calendar__tile react-calendar__year-view__months__month"]').nth(Number(month) - 1).click();

          await page.locator('//abbr[text()="15"]').click();

         await page.pause();








    })