import { DateService } from "../dateService";

export class RequestHelper {
    private dateService;

    constructor(){
        this.dateService = DateService.getInstance();
    }

    public sleephoursUrl(){
        return `sleephours`;
    }

    public timeFilters(frequency = 7){
        const startTime = this.dateService.getNDaysBeforeToday(frequency);
        const endTime = this.dateService.getEpochForToday();
        return `?startTime=${startTime}&endTime=${endTime}`
    }

    public addUserId(userId: string) {
        return `&userId=${userId}`;
    }

    public sleephourUrl(sleephourId: string){
        return `sleephours/${sleephourId}`
    }
}