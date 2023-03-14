class CommunicationTemplate {
    constructor() {
        this.APIRequest = {
            APIRequestID: "APIRequestID.undefined",
            APIDomain: "APIDomain.undefined",
            APIVersion: "APIVersion.undefined",
            APIRoute: "APIRoute.undefined",
            APIAction: "APIAction.undefined",
            APIDestinationRoute: "ToCallingProcess"
        };
        this.APIOptions = {};
        this.APIResponse = {
            APIResponseID: "APIResponseID.undefined",
            APIResponseStatusCode: 400,
            APIResponseMnemoCode: "APIResponseMnemoCode.undefined",
            APIResponseData: {}
        };
    }
}
module.exports = CommunicationTemplate;
