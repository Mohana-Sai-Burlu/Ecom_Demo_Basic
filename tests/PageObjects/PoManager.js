
const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require("../PageObjects/DashBoardPage");
const {MyCartPage} = require('../PageObjects/MyCartPage');

class PoManager{
    constructor(page){
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashBoardPage(this.page);
        this.mycartpage = new MyCartPage(this.page);
    }


     getloginpage(){

      return this.loginpage;
    }

    getdashboardpage(){
        return this.dashboardpage;

    }
    getmycartpage(){
        return this.mycartpage;
    }
}

module.exports = {PoManager};