import { AppRequestFactory } from "./request-infra/appRequestFactory";
import { IAppRequestFactory } from "./request-infra/appService.interface";

export interface IAppService{
    addEntry: (entry: any) => void;
    readEntries: (startDate: any, endDate: any) => void;
    updateEntry: (sleephourId: string, sleephourFrag: any) => void;

}

export class AppService implements IAppService{
    static instance: AppService;
    private requestFactory: IAppRequestFactory

    private constructor(){
        this.requestFactory = new AppRequestFactory();
    }

    public static getInstance(){
        if (!AppService.instance){
            AppService.instance = new AppService();
        }
        return AppService.instance;
    }

    public addEntry(entry: any){
        return this.requestFactory.getRequestHandler().createSleephour(entry);
    }   

    public readEntries(){
        return this.requestFactory.getRequestHandler().getSleephours();
    }

    public updateEntry(sleephourId: string, sleephourFrag: any){
        return this.requestFactory.getRequestHandler().updateSleephour(sleephourId, sleephourFrag);
    }
}

