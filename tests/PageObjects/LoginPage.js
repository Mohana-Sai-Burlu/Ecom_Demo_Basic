class LoginPage {
    

    constructor(page){
        this.page = page;
        this.username = page.locator("//input[@id='userEmail']");
        this.password = page.locator("//input[@id='userPassword']");
        this.loginbutton = page.locator("//input[@id='login']");
    }

 async login(username, password){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginbutton.click();
}


async goto(){

    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
}

}

module.exports = {LoginPage};