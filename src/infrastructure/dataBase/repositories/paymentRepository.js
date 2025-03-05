const Payment = require("../model/payment");
const IPaymentRepository = require("../../../application/interfaces/IPaymentRepository")

class PaymentRepository extends IPaymentRepository{
    constructor(){
        super()
    }
    async create(paymentData) {
        const payment = new Payment(paymentData);
        return await payment.save();
    }

    async findByOrderId(orderId) {
        return await Payment.findOne({ orderId });
    }

    async updateStatus(orderId, status) {
        return await Payment.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );
    }
}

module.exports = PaymentRepository;
