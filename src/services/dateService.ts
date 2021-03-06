
export interface IDateService {
    getEpochForToday: () => number;
    getDateInEpoch: (date: any, month: any, year: any) => number;
    getMonthName: (month: number) => string;
    getDays: (month: number, year: number) => number | undefined;
    getAppDateObject: (epoch: number) => any;
    getPresentationDate: (epoch: number) => string;
    getNextDayInEpoch: (epoch: number) => number;
    addMsAndGetEpoch: (buffer: string, epoch: number) => number;
    getTimeBuffer: (epoch: number) => string;
    getNDaysBeforeToday: (n: number) => number;
    getHHMMfromMs: (timeInMs: number) => string;
    getPresentationDateFromServerDate: (dateTime: string) => string;
    getEpochFromServerDate: (dateTime: string) => number;
    getOffsetDaysForCurrentMonth: () => number;
}

export class DateService implements IDateService {
    static instance: DateService;
    shortDayOptions: any;
    monthNameOptions: any;
    presentationalDayOptions: any
    graphDateOptions: any
    monthMap: Record<number, number>

    private constructor() {
        this.monthMap = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        }
        // new Intl.DateTimeFormat("en-us", options)
        this.shortDayOptions = { day: "numeric", month: "numeric", year: "numeric" };
        this.presentationalDayOptions = { day: "2-digit", month: "short", year: "2-digit" };
        this.monthNameOptions = { month: 'short' };
        this.graphDateOptions = { day: "2-digit", month: "2-digit"};
        if (this.isLeapYear()) {
            this.monthMap[2]++;
        }
    }

    public static getInstance() {
        if (!DateService.instance) {
            DateService.instance = new DateService();
        }
        return DateService.instance;
    }

    public getDateInEpoch(date: number, month: number, year: number) {
        const newDate = new Date();
        newDate.setHours(0,0,0,0);
        newDate.setMonth(month - 1);
        newDate.setFullYear(year);
        newDate.setDate(date);
        return newDate.getTime();
    }

    public getEpochForToday() {
        return new Date().setHours(0,0,0,0);
    }

    public getMonthName(month: number) {
        const date = new Date("1/1/2021");
        date.setMonth(month - 1);
        return new Intl.DateTimeFormat("en-us", this.monthNameOptions).format(date);
    }

    public getDays(month: number, year: number) {
        if (this.isLeapYear(year)) {
            if (month === 2) {
                return this.monthMap[2] + 1;
            }
        }
        return this.monthMap[month];
    }

    public getPresentationDate(epoch: number){
        const date = new Date(epoch);
        return new Intl.DateTimeFormat("en-us", this.shortDayOptions).format(date);
    }

    public getPresentationDateFromServerDate(datetime: string){
        const date = new Date(datetime);
        return new Intl.DateTimeFormat("en-us", this.graphDateOptions).format(date);
    }

    public getEpochFromServerDate(datetime: string){
        const date = new Date(datetime);
        return date.getTime();
    }

    public getAppDateObject(epoch: number) {
        const currentDate = new Date(epoch);
        return {
            date: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear()
        }
    }

    public getNextDayInEpoch(epoch: number) {
        const date = new Date(epoch);
        date.setDate(date.getDate() + 1);
        return date.getTime();
    }

    public addMsAndGetEpoch(buffer: string, epoch: number) {
        const ms =  this.getMilliseconds(buffer);
        return epoch + ms;
    }

    public getTimeBuffer(epoch: number) {
        const dateEpoch = new Date(epoch).setHours(0,0,0,0);
        const bufferInMilliseconds = epoch - dateEpoch;
        return this.getHHMMfromMs(bufferInMilliseconds);
    }

    public getNDaysBeforeToday(n: number) {
        const date = new Date();
        date.setHours(0,0,0,0);
        date.setDate(date.getDate() - n);
        return date.getTime();
    }

    public getHHMMfromMs(time: number) {
        const hours = Math.floor(time/3600000);
        let minutes = Math.floor((time - ( hours*3600000))/60000);
        let hoursStr = `${hours}`, minsStr = `${minutes}`;
        if(hours < 10) {
            hoursStr = `0${hours}`;
        } 
        if(minutes < 10) {
            minsStr = `0${minutes}`;
        }
        return `${hoursStr}:${minsStr}`;
    }

    public getOffsetDaysForCurrentMonth() {
        const date = new Date();
        return date.getDate() - 1;
    }

    private isLeapYear(year = new Date().getFullYear()) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
    }

    private getMilliseconds(time: string){
        if (!time){
            return 0;
        }
        const timeParts = time.split(":");
        return parseInt(timeParts[0])*3600000 + parseInt(timeParts[1])*60000;
    }
}