const microserviceName = `Identifiers.UUID.v1`;

const { v4 } = require('uuid');

const CommunicationTemplateObject = require (`./template-v1-apicommunications`);

class IdentifiersUUIDv1 {
    static instanceOfIdentifiersUUIDv1 = null;

    constructor() {

        if (IdentifiersUUIDv1.instanceOfIdentifiersUUIDv1) {
            return IdentifiersUUIDv1.instanceOfIdentifiersUUIDv1;
        }
    }

    initialize = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = __requestObject;

        _returnObject.APIRequest.APIRequestID = v4().toString()
        _returnObject.APIRequest.APIDomain = `Identifiers`;
        _returnObject.APIRequest.APIVersion = `v1`;
        _returnObject.APIRequest.APIRoute = `UUID`;
        _returnObject.APIRequest.APIAction = `initialize`;

        _returnObject.APIResponse.APIResponseID = v4().toString();
        _returnObject.APIResponse.APIResponseStatusCode = 200;
        _returnObject.APIResponse.APIResponseMnemoCode = `OK.initialize`;
        // _returnObject.APIResponse.APIResponseData = {};
        _returnObject.APIResponse.APIResponseData = this;

        IdentifiersUUIDv1.instanceOfAMQPv1 = this;
        return _returnObject;
    }

    getRequestObject = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        let _returnObject = __requestObject;

        try {
            _returnObject.APIRequest.APIRequestID = v4().toString();
            _returnObject.APIRequest.APIDomain = `Identifiers`;
            _returnObject.APIRequest.APIVersion = `v1`;
            _returnObject.APIRequest.APIRoute = `UUID`;
            _returnObject.APIRequest.APIAction = `${microserviceName}.getRequestObject`;

            _returnObject.APIResponse.APIResponseID = v4().toString();
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

    generateUUIDv4 = async (__requestObject = {... new CommunicationTemplateObject()}) => {
        const _returnObject = await this.getRequestObject(); //* start with a clean _returnObject

        try {
            _returnObject.APIRequest.APIAction = `${microserviceName}.generateUUIDv4`;
            _returnObject.APIResponse.APIResponseID = v4().toString();
            _returnObject.APIResponse.APIResponseStatusCode = 200;
            _returnObject.APIResponse.APIResponseMnemoCode = `OK.generateUUIDv4`;
            _returnObject.APIResponse.APIResponseData.generateUUIDv4Result = v4().toString();
        } 
        
        catch (errorGenerateUUIDv4) {
            _returnObject.APIResponse.APIResponseStatusCode = 400;
            _returnObject.APIResponse.APIResponseData.generateUUIDv4AdditionalInfo = `${microserviceName}.generateUUIDv4() - catch(errorAcknowledgeMessage: ${errorGenerateUUIDv4.stack}`;
            throw errorAcknowledgeMessage;
        }

        finally {
            return _returnObject;
        }
    }
}

module.exports = { IdentifiersUUIDv1 };