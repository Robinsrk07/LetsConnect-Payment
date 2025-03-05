const RazorPayinstance = require("../razorpay/Razorpay")

class RazorpayGateWay{
    async createOrder(orderData){
        return await RazorPayinstance.orders.create(orderData)
    }
}

module.exports = RazorpayGateWay