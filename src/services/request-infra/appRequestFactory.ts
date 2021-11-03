import { ApiIdentifier, IAppRequestFactory, IAppRequestHandler } from "./appService.interface";
import { RequestHandlerV1 } from "./requestHandlerV1";

export class AppRequestFactory implements IAppRequestFactory {
    private requestHandler: IAppRequestHandler;

    constructor(){
        this.requestHandler = new RequestHandlerV1();
    }

    getRequestHandler(apiIdentifier?: ApiIdentifier) {
        return this.requestHandler;
    }
}