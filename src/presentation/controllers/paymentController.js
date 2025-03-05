const IpaymentController = require("../../application/interfaces/IPaymentController")
const{NotFoundError,ValidationError,OrderCreationError}= require("../errors/customError")

class paymentController extends IpaymentController{
    constructor(creatOrderCase,paymentVerificationCase,premiumVerifyCase){
        super()
        this.creatOrderCase= creatOrderCase;
        this.paymentVerificationCase= paymentVerificationCase;
        this.premiumVerifyCase=premiumVerifyCase

    }


    async createOrder(req,res,next){
         const {membershipType} = req.body
         const {userId} = req.user
         try{
            const createdOrder = await this.creatOrderCase.execute(membershipType,userId)
            if(!createdOrder){
              throw new OrderCreationError(" failed to create order")
            }
            res.json({order:createdOrder,
                key_id:process.env.RAZOR_PAY_KEY_ID})
         }catch(err){
            next(err)
         }
        
 


    }
    async paymentVerification(req,rez,next){
        const webhookSignature =req.get(" X-Razorpay-Signature")
        const paymentDetails = req.body.payload.payment.entity; 
        const event = req.body.event
      
        try{
            const paymentVerify = await this.paymentVerificationCase.execute(webhookSignature,paymentDetails,event)
            res.status(200).json({
                success: true,
                message: "Payment verification successful",
                updatedUser: paymentVerify
            });

        }catch(err){
            next(err)
        }
  

    }
    async premiumVerify(req,res,next){

        try{
            const {userId}= req.user
            const user = await this.premiumVerifyCase.execute(userId)
            if(!user){
              throw new NotFoundError("user not found")
            }

            res.json({isPremium:!!user.isPremium})
        }catch(err){
          next(err)
        }

    }
}

module.exports = paymentController