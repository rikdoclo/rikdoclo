const CommunicationTemplate = require (`./template-v1-apicommunications`)
const { AMQPv1 } = require("./utils-v1-amqp");
const { IdentifiersUUIDv1 } = require(`./identifiers-v1-uuid`);

(async () => {
    // console.time()
    const _AMQPv1 = new AMQPv1();
    const _AMQPv1ResultInit = await _AMQPv1.initialize(new CommunicationTemplate());
    // console.info('_AMQPv1ResultInit:', _AMQPv1ResultInit)
    
    const _UUIDv1 = new IdentifiersUUIDv1();
    const _UUIDv1ResultInit = await _UUIDv1.initialize(new CommunicationTemplate());
    // console.info('_UUIDv1ResultInit:', _UUIDv1ResultInit)
    // console.timeEnd()    

    // for (let index = 0; index < 10000; index++) {
    //     console.info(await _UUIDv1.generateUUIDv4())    
    // }

    // const _templateForCreateQueue = await _AMQPv1.getRequestObject();
    // _templateForCreateQueue.APIOptions.queueName = `Utils.v1.testQueue`;
    // _templateForCreateQueue.APIOptions.queueOptions = { durable: true, };
    // const _resultcreate = await _AMQPv1.createQueue(_templateForCreateQueue);
    // console.log('CreateQueue:', _resultcreate);

    // console.time()
    // const _templateForSend = await _AMQPv1.getRequestObject();
    // _templateForSend.APIRequest.APIDestinationRoute = `testQueue`;
    // _templateForSend.APIOptions.message = await _AMQPv1.getRequestObject()
    // _templateForSend.APIOptions.queueOptions = { durable: true };

    // for (let index = 0; index < 1000; index++) {
    //     _templateForSend.APIRequest.APIRequestID = (await _UUIDv1.generateUUIDv4()).APIResponse.APIResponseData.generateUUIDv4Result;
    //     const _resultSend = await _AMQPv1.sendMessage(_templateForSend);
    //     // console.log('sendMessage:', _resultSend);
    //     await new Promise((resolve) => setTimeout(resolve, 0));
    // }
    // console.timeEnd()

    const _templateForConsume = await _AMQPv1.getRequestObject();
    _templateForConsume.APIOptions.queueName = `Utils.v1.testQueue`;
    _templateForConsume.APIOptions.consumeOptions = { noAck: false, };

    const _templateforAcknowledge = await _AMQPv1.getRequestObject();

    console.time()
    _loop = true
    while (_loop) {
        const _resultConsumeQueue = await _AMQPv1.consumeQueue(_templateForConsume);
        if (_resultConsumeQueue.APIResponse.APIResponseStatusCode !== 200) {
            _loop = false
        } else {
            // console.log('consumeMessage:', _resultConsumeQueue);
            _templateforAcknowledge.APIOptions.message = _resultConsumeQueue.APIResponse.APIResponseData.originalMessage
            const resultAck = await _AMQPv1.acknowledgeMessage(_templateforAcknowledge);
            // console.log('acknowledgeMessage:', resultAck);
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
    console.timeEnd()
    process.exit(0);

})();

// await new Promise((resolve) => setTimeout(resolve, 10000));
