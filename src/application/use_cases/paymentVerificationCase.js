const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const {NotFoundError} = require("../errors/customError")


class PaymentVerificationCase{
    constructor(userRepository,paymentRepository,messageBroker){
        this.userRepository=userRepository
        this.paymentRepository=paymentRepository 
        this.messageBroker=messageBroker 
       this.exchange="IsPremiumUpdate"

    }

    async execute(webhookSignature,paymentDetails,event){
        const isWebhookValid = validateWebhookSignature(JSON.stringify(paymentDetails),
        webhookSignature  , 
        process.env.RAZORPAY_WEBHOOK)
        if(!isWebhookValid){
           throw new ValidationError("unValid web hook")
        }
          const orderId = paymentDetails.order_id
          const status =paymentDetails.status
         const payment = await this.paymentRepository.updateStatus(orderId,status)
         if(!payment){
            throw new NotFoundError("payment not found")

         }

         const userId = payment.userId;
         const memberShipType = payment.notes.membership
         const updateUser = await this.userRepository.userUpdatePayment(userId,event,memberShipType)
        
         await this.messageBroker.publish(this.exchange, {
            eventType:"userPremiumUpdate",
            data: {
                updateUser
                  }
        }); 

    }
}

module.exports =PaymentVerificationCase