const { expect } = require('@playwright/test');
class MyCartPage {

    constructor(page) {
        this.page = page;
        this.productNames = page.locator(".cartSection h3");
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.CriditCardNumber = page.locator("//div[text()='Credit Card Number ']//following::input[1]");
        this.ExpiryMonth = page.locator("//div[text()='Expiry Date ']//following::select[1]");
        this.ExpiryDate = page.locator("//div[text()='Expiry Date ']//following::select[2]");
        this.CvvCode = page.locator("//div[text()='CVV Code ']//following::input[1]");
        this.NameOnCard = page.locator("//div[text()='Name on Card ']//following::input[1]");
        this.applyCoupan = page.locator("//div[text()='Apply Coupon ']//following::input[1]");
        this.ACouponButton = page.getByRole("button", { name: "Apply Coupon" });
        this.VEmail = page.locator('(//div[@class="payment__shipping"]//following::input)[1]');
        this.Country = page.getByPlaceholder('Select Country');
        this.CList = page.locator('//button[@class="ta-item list-group-item ng-star-inserted"]');
        this.cty =  page.locator('.ta-results');
        this.PlaceOrderbutt = page.getByText("PLACE ORDER");

    }

    async PlaceOrder(productname) {

        await expect(this.productNames.first()).toBeVisible();

        let bool = false;
        const count = await this.productNames.count();

        for (let i = 0; i < count; i++) {
            const productTitle = await this.productNames.nth(i).textContent();
            if (productTitle === productname) {
                bool = true;
                break;
            }
        }

        await expect(bool).toBeTruthy();

        await this.checkoutButton.click();
        await this.page.waitForLoadState("networkidle");

    }

    async EnterCardDetails(cardnumber, month, date, cvv, cardownername, aCoupan, email,country) {
        await this.CriditCardNumber.fill(cardnumber);
        await this.ExpiryMonth.selectOption(month);
        await this.ExpiryDate.selectOption(date);
        await this.CvvCode.fill(cvv);
        await this.NameOnCard.fill(cardownername);
        await this.applyCoupan.fill(aCoupan);
        await this.ACouponButton.click();


        await expect(this.VEmail).toHaveValue(email);
        await this.Country.pressSequentially(country);

        await this.cty.waitFor();

        const count = await this.CList.count();
                    


        for(let i=0; i<count; i++){
            let cname = await this.CList.nth(i).textContent();

            
            if(cname === " "+country){
                await this.CList.nth(i).click();
                
                break;
            }
        }

        await this.PlaceOrderbutt.click();





    }
}

module.exports = { MyCartPage };