const {expect} = require('@playwright/test');
class MyCartPage{

    constructor(page){
        this.page = page;
        this.productNames = page.locator(".cartSection h3");

        this.checkoutButton = page.getByRole("button", {name: "Checkout"});

    }

    async PlaceOrder(productname){

        await expect(this.productNames.first()).toBeVisible();

        let bool = false;
        const count = await this.productNames.count();
        
        for(let i =0; i<count; i++){
            const productTitle = await this.productNames.nth(i).textContent();
            if(productTitle === productname){
              bool = true;
              break;
            }
        }

        await expect(bool).toBeTruthy();

        await this.checkoutButton.click();
        await this.page.waitForLoadState("networkidle");







    }
}

module.exports = {MyCartPage};