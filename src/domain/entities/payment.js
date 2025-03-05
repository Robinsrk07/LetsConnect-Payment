class Payment {
    constructor({ userId, orderId, status, amount, currency, receipt, notes, createdAt, updatedAt }) {
        this.userId = userId;
        this.orderId = orderId;
        this.status = status;
        this.amount = amount;
        this.currency = currency;
        this.receipt = receipt;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
module.exports = Payment;
