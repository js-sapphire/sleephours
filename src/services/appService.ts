import { AppRequestFactory } from "./request-infra/appRequestFactory";
import { IAppRequestFactory } from "./request-infra/appService.interface";

export interface IAppService{
    addEntry: (entry: any) => Promise<any>;
    readEntries: (userId: string, frequency: number) => Promise<any>;
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

    public readEntries(userId: string, frequency: number){
        return this.requestFactory.getRequestHandler().getSleephours(userId, frequency);
    }

    public updateEntry(sleephourId: string, sleephourFrag: any){
        return this.requestFactory.getRequestHandler().updateSleephour(sleephourId, sleephourFrag);
    }
}

