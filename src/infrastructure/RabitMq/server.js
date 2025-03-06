const amqp = require('amqplib');

const IMessageBroker = require("../../application/interfaces/IMessageBroker")
class messageBroker extends IMessageBroker{
    constructor(){
        super()
        this.connection = null;
        this.channel = null;
    }

    async connect() {
      this.connection = await amqp.connect('amqp://admin:password@rabbitmq')
      this.channel = await  this.connection.createChannel()
    }
    
    async publish (exchange,message){
        console.log("from user edited data",message)
        console.log(exchange)
        if(!this.channel){
            await this.connect();
        }
        await this.channel.assertExchange(exchange, 'fanout', { durable: true });

        this.channel.publish(exchange, '', Buffer.from(JSON.stringify(message)));

       }
}      
module.exports = messageBroker
 