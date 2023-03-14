const microserviceName = `Utils.AMQP.v1`;

const AMQP = require(`amqplib`);
const { connectionParams } = require(`./utils-v1-amqp-config.json`);

const CommunicationTemplateObject = require (`./template-v1-apicommunications`);

class AMQPv1 {

    static instanceOfAMQPv1 = null; //* Singleton pattern

    constructor() {
      
        if (AMQPv1.instanceOfAMQPv1) {
          return AMQPv1.instanceOfAMQPv1;
        }
    }

    async initialize(__requestObject = {... new CommunicationTemplateObject()}) {

        const { IdentifiersUUIDv1 } = require(`./identifiers-v1-uuid`);
        if (!this.UUIDv1) {
            this.UUIDv1 = new IdentifiersUUIDv1();
            await this.UUIDv1.initialize();
        }

        const _returnObject = __requestObject;
        _returnObject.APIRequest.APIRequestID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
        _returnObject.APIRequest.APIDomain = `Utils`;
        _returnObject.APIRequest.APIVersion = `v1`;
        _returnObject.APIRequest.APIRoute = `AMQP`;
        _returnObject.APIRequest.APIAction = `${microserviceName}.initialize`;

        _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
        _returnObject.APIResponse.APIResponseMnemoCode = `NOK.initialize`;
        _returnObject.APIResponse.APIResponseData = {};

        try {
            if (!this.AMQPv1Connection) {
                this.AMQPv1Connection = await AMQP.connect(connectionParams, {
                    clientProperties: { connection_name: `${microserviceName}` }
                });

                _returnObject.APIResponse.APIResponseStatusCode = 200;
                _returnObject.APIResponse.APIResponseMnemoCode = `OK.initialize.connection`;
                _returnObject.APIResponse.APIResponseData.connection = this.AMQPv1Connection;
    
                this.AMQPv1Connection.on(`error`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Connection.on"error"`);
                });
                this.AMQPv1Connection.on(`close`, () => {
                    // console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Connection.on"close"`);
                });
                this.AMQPv1Connection.on(`blocked`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Connection.on"blocked"`);
                });
                this.AMQPv1Connection.on(`unblocked`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Connection.on"unblocked"`);
                });
            }
    
            if (!this.AMQPv1Channel) {
                this.AMQPv1Channel = await this.AMQPv1Connection.createChannel();

                _returnObject.APIResponse.APIResponseStatusCode = 200;
                _returnObject.APIResponse.APIResponseMnemoCode += ` and OK.initialize.channel`;
                _returnObject.APIResponse.APIResponseData.channel = this.AMQPv1Channel;

                await this.AMQPv1Channel.prefetch(1);
    
                this.AMQPv1Channel.on(`error`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Channel.on"error"`);
                });
                this.AMQPv1Channel.on(`close`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Channel.on"close"`);
                });
                this.AMQPv1Channel.on(`blocked`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Channel.on"blocked"`);
                });
                this.AMQPv1Channel.on(`unblocked`, () => {
                    console.info(`${microserviceName}.constructor(${process.pid}) this.AMQPv1Channel.on"unblocked"`);
                });

                AMQPv1.instanceOfAMQPv1 = this;
            }
        } 
        
        catch (errorConstructor) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseData.initializeAdditionalInfo = `${microserviceName}.initialize().catch(errorConstructor): ${errorConstructor.stack}`;
            throw errorConstructor;
        }

        finally {
            // console.info(`${microserviceName}.initialize() finally`, _returnObject);
            return _returnObject;
        }
    }

    getRequestObject = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        let _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIRequestID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIRequest.APIDomain = `Utils`;
            _returnObject.APIRequest.APIVersion = `v1`;
            _returnObject.APIRequest.APIRoute = `AMQP`;
            _returnObject.APIRequest.APIAction = `${microserviceName}.getRequestObject`;

            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result,
            _returnObject.APIResponse.APIResponseStatusCode = 200,
            _returnObject.APIResponse.APIResponseMnemoCode =`OK.getRequestObject`
            _returnObject.APIResponse.APIResponseData = {};
        } 
        
        catch (errorGetRequestObject) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.getRequestObject`;
            _returnObject.APIResponse.APIResponseData.getRequestObjectAdditionalInfo = `${microserviceName}.getRequestObject() - catch(errorGetRequestObject): ${errorGetRequestObject.stack}`;
            throw errorGetRequestObject;
        }

        finally {
            return _returnObject;
        }
    }

    closeConnection = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.closeConnection`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.closeConnection`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.closeConnectionResult = await this.AMQPv1Connection.close();
        } 
        
        catch (errorCloseConnection) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.closeConnection`;
            _returnObject.APIResponse.APIResponseData.closeConnectionAdditionalInfo = `${microserviceName}.closeConnection() - catch(errorCloseConnection): ${errorCloseConnection.stack}`;
            throw errorCloseConnection;
        }
        finally {
            return _returnObject;
        }
    }

    closeChannel = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.closeChannel`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.closeChannel`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.closeChannelResult = await this.AMQPv1Channel.close();
        } 
        
        catch (errorCloseChannel) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.closeConnection`;
            _returnObject.APIResponse.APIResponseData.closeChannelAdditionalInfo = `${microserviceName}.closeChannel() - catch(errorCloseChannel): ${errorCloseChannel.stack}`;
            throw errorCloseChannel;
        }

        finally {
            return _returnObject;
        }
    }


    assertMessageStructure = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _messageParts = [`APIRequest`, `APIOptions`];
        const _apiRequestKeys = [`APIRequestID`, `APIDomain`, `APIVersion`, `APIRoute`, `APIAction`, `APIDestinationRoute`];    
        const _returnObject = __requestObject;
        
        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.assertMessageStructure`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseData = {};

            const hasExpectedKeys = _messageParts.every((key) => Object.keys(_returnObject).includes(key));
            if (hasExpectedKeys) {
                _returnObject.APIResponse.APIResponseStatusCode = 200;
                _returnObject.APIResponse.APIResponseMnemoCode = `OK.assertMessageStructure (messageParts)`;
                _returnObject.APIResponse.APIResponseData.messageParts = `OK`;
            } else {
                _returnObject.APIResponse.APIResponseStatusCode = 412;
                _returnObject.APIResponse.APIResponseMnemoCode = `NOK.assertMessageStructure (messageParts)`;
                _returnObject.APIResponse.APIResponseData.messageParts = `NOK`;
            }

            const hasAPIRequestKeys = _apiRequestKeys.every((key) => Object.keys(_returnObject.APIRequest).includes(key));
            if (hasAPIRequestKeys) {
                _returnObject.APIResponse.APIResponseStatusCode = 200;
                _returnObject.APIResponse.APIResponseMnemoCode += ` and OK.assertMessageStructure (expectedKeys)`;
                _returnObject.APIResponse.APIResponseData.expectedKeys = `OK`;
            } else {
                _returnObject.APIResponse.APIResponseStatusCode = 412;
                _returnObject.APIResponse.APIResponseMnemoCode += ` and NOK.assertMessageStructure (expectedKeys)`;
                _returnObject.APIResponse.APIResponseData.expectedKeys = `NOK`;
            }
        } 
        
        catch (errorAssertMessageStructure) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.assertMessageStructure`;
            _returnObject.APIResponse.APIResponseData.assertMessageStructureAdditionalInfo = `${microserviceName}.assertMessageStructure - catch(errorSendToQueue): ${errorAssertMessageStructure.stack}`;
            throw errorAssertMessageStructure;
        } 
        finally {
            // console.info(`${microserviceName}.assertMessageStructure (final)`, _returnObject);
            return _returnObject;    
        }
    }

    sendMessage = async (__requestObject = {... new CommunicationTemplateObject()}) => { 
        const _returnObject = __requestObject;
 
        try {
            const _assertMessageStructure = await this.assertMessageStructure(_returnObject.APIOptions.message);

            if (
                _assertMessageStructure.APIResponse.APIResponseData.messageParts === "OK" &&
                _assertMessageStructure.APIResponse.APIResponseData.expectedKeys === "OK"
                ){

                _returnObject.APIRequest.APIAction = `${microserviceName}.sendMessage`;
                _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
                _returnObject.APIResponse.APIResponseStatusCode = 200;
                _returnObject.APIResponse.APIResponseMnemoCode = `OK.sendMessage`;
                _returnObject.APIResponse.APIResponseData = {};
                
                const _sendQueueName = `${_returnObject.APIRequest.APIDomain}.${_returnObject.APIRequest.APIVersion}.${_returnObject.APIRequest.APIDestinationRoute}`; //! message is sent to [APIDestinationRoute] queue
                
                _returnObject.APIResponse.APIResponseData.sendResult = this.AMQPv1Channel.publish(
                    '', //* Default exchange
                    _sendQueueName, //* routingKey
                    Buffer.from(JSON.stringify(_returnObject.APIOptions.message)), //* content <- needs to be string or buffer so convert __message object to String
                    _returnObject.APIOptions.queueOptions //* example { durable: true } */ 
                );
                _returnObject.APIResponse.APIResponseData.sendQueueName = _sendQueueName;
                _returnObject.APIResponse.APIResponseData.sendQueueOptions = _returnObject.APIOptions.queueOptions;
                _returnObject.APIResponse.APIResponseData.messageSent = _returnObject.APIOptions.message;

            } else {
                _returnObject.APIResponse.APIResponseStatusCode = 412;
                _returnObject.APIResponse.APIResponseMnemoCode += `.AssertMessageStructure`; 
                _returnObject.APIResponse.APIResponseData.sendMessageAdditionalInfo = _assertMessageStructure;
            }

        } 
        
        catch (errorSendMessage) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.sendMessage`;
            _returnObject.APIResponse.APIResponseData.sendMessageAdditionalInfo = `${microserviceName}.sendMessage() - catch(errorSendMessage): ${errorSendMessage.stack}`;
            throw errorSendMessage;
        } 
        
        finally {
            // console.info(`${microserviceName}.sendMessage (final)`, _returnObject);
            return _returnObject;
        }
    }

    acknowledgeMessage = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.ackowlwedgeMessage`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.AcknowledgeMessage`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.acknowledgeMessageResult = this.AMQPv1Channel.ack(_returnObject.APIOptions.message);
        } 

        catch (errorAcknowledgeMessage) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.AcknowledgeMessage`;
            _returnObject.APIResponse.APIResponseData.acknowledgeMessageAdditionalInfo = `${microserviceName}.acknowledgeMessage() - catch(errorAcknowledgeMessage): ${errorAcknowledgeMessage.stack}`;
            throw errorAcknowledgeMessage;
        }

        finally {
            return _returnObject;
        } 
    }
    
    cancelMessage = async(__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.cancelMessage`;
            _returnObject.APIResponse.APIResponseID = _identifiersUUIDv1.generateUUIDv4();
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.CancelMessage`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.cancelMessageResult = this.AMQPv1Channel.cancel(__message.originalMessage.fields.consumertag);
        } 
        
        catch (errorCancelMessage) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.cancelMessage`;
            _returnObject.APIResponse.APIResponseData.cancelMessageAdditionalInfo = `${microserviceName}.cancelMessage() - catch(errorCancelMessage): ${errorCancelMessage.stack}`;
            throw errorCancelMessage;
        }

        finally {
            return _returnObject;
        }
    }
      
    createQueue = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.createQueue`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.CreateQueue`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.createQueueResult = await this.AMQPv1Channel.assertQueue(_returnObject.APIOptions.queueName, _returnObject.APIOptions.queueOptions); //* example { durable: true, }
        } 
        
        catch (errorCreateQueue) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.createQueue`;
            _returnObject.APIResponse.APIResponseData.createQueueAdditionalInfo = `${microserviceName}.createQueue() - catch(errorCreateQueue): ${errorCreateQueue.stack}`;
            throw errorCreateQueue;
        } 
        
        finally {
            // console.info(`${microserviceName}.createQueue (final)`, _returnObject);
            return _returnObject;
        }
    }

    consumeQueue =  async (__requestObject = {... new CommunicationTemplateObject()}) => { 
        const _returnObject = __requestObject;

        let _resultConsume = undefined;
            
        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.consumeQueue`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.consumeQueue`;
            _returnObject.APIResponse.APIResponseData = {};

            _resultConsume = await this.AMQPv1Channel.consume(_returnObject.APIOptions.queueName, (consumerMessage) => {
                    _returnObject.APIResponse.APIResponseData.fields = consumerMessage.fields;
                    // TODO: Decide wether to use Buffer.from() or not
                    _returnObject.APIResponse.APIResponseData.consumeQueueResult = consumerMessage.content;
                    // _returnObject.APIResponse.APIResponseData.consumeQueueResult = Buffer.from(consumerMessage.content).toString();
                    _returnObject.APIResponse.APIResponseData.originalMessage = consumerMessage;
            }, _returnObject.APIOptions.consumeOptions)            
        }

        catch (errorConsumeQueue) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.consumeQueue`;
            _returnObject.APIResponse.APIResponseData.consumeQueueAdditionalInfo = `${microserviceName}.consumeQueue() - catch(errorConsumeQueue): ${errorConsumeQueue.stack}`;
            throw error;        
        }

        finally {
            const _messageParts = [`fields`, `consumeQueueResult`, `originalMessage`];
            const hasExpectedKeys = _messageParts.every((key) => Object.keys(_returnObject.APIResponse.APIResponseData).includes(key));
            if (hasExpectedKeys) {
                _returnObject.APIResponse.APIResponseStatusCode = 200;
            } else {
                _returnObject.APIResponse.APIResponseStatusCode = 444; //* 444 No Response (nginx)
            }

            _returnObject.APIResponse.APIResponseData.consumerTag = _resultConsume.consumerTag;
            await this.AMQPv1Channel.cancel(_resultConsume.consumerTag);
            return _returnObject;
        }
    }    

    deleteQueue = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.deleteQueue`;
            _returnObject.APIResponse.APIResponseID = (await this.UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.DeleteQueue`;
            _returnObject.APIResponse.APIResponseData = {};
            _returnObject.APIResponse.APIResponseData.deleteQueueResult  = await this.AMQPv1Channel.deleteQueue(_returnObject.APIOptions.queueName);
            } 
        
        catch (errorDeleteQueue) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseMnemoCode = `NOK.deleteQueue`;
            _returnObject.APIResponse.APIResponseData.deleteQueueAdditionalInfo = `${microserviceName}.deleteQueue() - catch(errorDeleteQueue): ${errorDeleteQueue}`;
            throw errorDeleteQueue;
        } 
        
        finally {
            return _returnObject;
        }
    }
}

module.exports = { AMQPv1 };