import { IAppRequestHandler, IClientSleephour } from "./appService.interface";
import { RequestHelper } from "./requestHelper";

export class RequestHandlerV1 implements IAppRequestHandler {
    private serverUrl: string;
    private requestHelper: any;

    constructor(){
        this.serverUrl = `https://localhost:3001/`;
        this.requestHelper = new RequestHelper();
    }

    public async getSleephours(){
        try {
            const fullUrl = this.serverUrl + this.requestHelper.sleephoursUrl();
            const response = await fetch(fullUrl, {
                method: "GET"
            });
            const responseBody = await response;
            return responseBody;
        } catch (err) {
            throw new Error(`Client errored out`);
        }
    }

    public async createSleephour(sleephour: IClientSleephour){
        try {
            const fullUrl = this.serverUrl + this.requestHelper.sleephoursUrl();
            const response = await fetch(fullUrl, {
                method: "POST",
                body: JSON.stringify(sleephour)
            });
            const repsonseBody = await response;
            return repsonseBody;
        } catch (err) {
            throw new Error(`Client errored out`);
        }
    }

    public async getSleephour(sleephourId: string) {
        try{
            const fullUrl = this.serverUrl + this.requestHelper.sleephourUrl(sleephourId);
            const response = await fetch(fullUrl);
            const responseBody = await response;
            return responseBody;
        } catch (err){
            throw new Error(`Client errored out`);
        }
    }

    public async updateSleephour(sleephourId: string, sleephourFrag: Partial<IClientSleephour>) {
        return Promise.resolve(true);
    }

    public async deleteSleephour(sleephourId: string) {
        return Promise.resolve(true);
    }
}