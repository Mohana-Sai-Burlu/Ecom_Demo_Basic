class ApiUtiles{
    
    constructor(ApiContext,payLoad){


        this.ApiContext = ApiContext;
        this.payLoad = payLoad;

    }
    
    async getToken(){

      //Login
    const LoginResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: this.payLoad
    });
   

    const jsonResponse = await LoginResponse.json();

    const token = jsonResponse.token;
    return token;

    }


    async createOrderID(orderPayLoad){

        let response ={};
        response.token =await this.getToken();
          //OrderApi
           const orderResponse= await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
                 data:orderPayLoad,
        
                 headers:{
                    authorization: response.token,
                    "content-type":'application/json'
                 },
        
            });
        
            const orderJsonResponse = await orderResponse.json();
            const orderID = orderJsonResponse.orders[0];
             
            response.orderID = orderID;
            return response;
        
    }
}

module.exports = {ApiUtiles};