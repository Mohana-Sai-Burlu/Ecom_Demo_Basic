class DashBoardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator(".card-body");
        this.cartbuttons = page.getByRole("button", { name: " Add To Cart" });
        this.cartbutton = page.locator('//*[@routerlink="/dashboard/cart"]');
    }

    async addProductToCart(productName) {

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            const productTitle = await this.products.nth(i).locator("b").textContent();
            if (productTitle === productName) {
                await this.cartbuttons.nth(i).click();
                break;
            }
        }
       await this.page.waitForLoadState("networkidle");
    }



    async NavigatetoCartPage() {

        await this.cartbutton.click();
        await this.page.waitForLoadState("networkidle");
    }
}

module.exports = { DashBoardPage };