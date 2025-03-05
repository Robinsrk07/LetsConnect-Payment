class IMessageBroker {
    async connect() {
        throw new Error('Method not implemented');
    }
    async publish(queue, message) {
        throw new Error('Method not implemented');
    }
    async close() {
        throw new Error('Method not implemented');
    }
}
module.exports = IMessageBroker