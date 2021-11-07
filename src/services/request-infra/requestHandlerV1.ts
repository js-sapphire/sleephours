import { IAppRequestHandler, IClientSleephour } from "./appService.interface";
import { RequestHelper } from "./requestHelper";

export class RequestHandlerV1 implements IAppRequestHandler {
    private serverUrl: string;
    private requestHelper: any;

    constructor(){
        this.serverUrl = `https://sleephourbackend.azurewebsites.net/`;
        this.requestHelper = new RequestHelper();
    }

    public async getSleephours(userId: string, frequency: number){
        try {
            const fullUrl = this.serverUrl + this.requestHelper.sleephoursUrl() + 
                this.requestHelper.timeFilters(frequency) + 
                this.requestHelper.addUserId(userId);
            const response = await fetch(fullUrl, {
                method: "GET"
            });
            const responseBody = await response.json();
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
                body: JSON.stringify(sleephour),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseBody = await response.json();
            return responseBody;
        } catch (err) {
            throw new Error(`Client errored out`);
        }
    }

    public async getSleephour(sleephourId: string) {
        try{
            const fullUrl = this.serverUrl + this.requestHelper.sleephourUrl(sleephourId);
            const response = await fetch(fullUrl);
            const responseBody = await response.json();
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