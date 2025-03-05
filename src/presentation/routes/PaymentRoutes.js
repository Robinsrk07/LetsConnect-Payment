const express = require("express");



class PaymentRoute {
    constructor(paymentController) {
        this.router = express.Router();
        this.paymentController = paymentController;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post("/payment/createOrder",(req,res,next)=> this.paymentController.createOrder(req,res,next));
        this.router.post("/payment_verify",(req,res,next)=> this.paymentController.paymentVerification(req,res,next));
        this.router.post("/payment/premium/verify",(req,res,next)=> this.paymentController.premiumVerify(req,res,next));
    }

    getRouter() {
        return this.router;
    }   
}

module.exports = PaymentRoute;
