
const {NotFoundError} = require("../errors/customError")
const{membershipAmount}=require("../validators/Constants")
const mongoose = require("mongoose");

class createOrderCase{
    constructor(razorPayGateWay,userRepository,paymentRepository){
       this.razorPayGateWay=razorPayGateWay
       this.userRepository=userRepository
       this.paymentRepository=paymentRepository
    } 
    async execute(membershipType,userId){

        const user = await this.userRepository.find(userId)
        if(!user){
            throw new NotFoundError("user not found")
        }

        const orderData  = {
            amount :membershipAmount[membershipType]*100,
            currency :"INR",
            receipt:"trial",
            notes:{
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                membership: membershipType
            }
        }
        const order = await this.razorPayGateWay.createOrder(orderData)
        if(!order){
            throw new NotFoundError(" somethig wrong on order creation")
        }
        console.log(order)

         
        const PaymentData = {
            userId: new mongoose.Types.ObjectId(userId), 
            orderId: order.id,
            status: order.status,
            amount: order.amount,
            currency: order.currency,
            notes: order.notes, 
            receipt: "robin"
        }

        const savedPayment =await  this.paymentRepository.create(PaymentData)
        return savedPayment
    }
}

module.exports= createOrderCase