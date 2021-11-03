
export interface IDateService {
    getShortDateForToday: () => string;
    getShortDate: (date: any, month: any, year: any) => string;
    getMonthName: (month: number) => string;
    getDays: (month: number, year: number) => number | undefined;
    getAppDateObject: (shortDate: string) => any
}

export class DateService implements IDateService {
    static instance: DateService;
    shortDayOptions: any;
    monthNameOptions: any;
    monthMap: Record<number, number>

    private constructor(){
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
        this.monthNameOptions = { month: 'short'};
        if (this.isLeapYear()){
            this.monthMap[2]++;
        }
    }

    public static getInstance(){
        if(!DateService.instance){
            DateService.instance = new DateService();
        }
        return DateService.instance;
    }

    public getShortDate(date: number, month: number, year: number){
        const newDate = new Date();
        newDate.setDate(date);
        newDate.setFullYear(year);
        newDate.setMonth(month - 1);
        return new Intl.DateTimeFormat("en-us", this.shortDayOptions).format(newDate);
    }

    public getShortDateForToday(){
        const newDate = new Date();
        return new Intl.DateTimeFormat("en-us", this.shortDayOptions).format(newDate);
    }

    public getMonthName(month: number){
        const date = new Date("1/1/2021");
        date.setMonth(month - 1);
        console.log("Input: ", month, " Output ", date);
        return new Intl.DateTimeFormat("en-us", this.monthNameOptions).format(date);
    }

    public getDays(month: number, year: number){
        console.log("Input: ", month);
        if (this.isLeapYear(year)){
            if (month === 2){
                return this.monthMap[2] + 1;
            }
        }
        return this.monthMap[month];
    }

    public getAppDateObject(shortDate: string){
        const parts = shortDate.split("/");
        return {
            date: parseInt(parts[1]),
            month: parseInt(parts[0]),
            year: parseInt(parts[2])
        }
    }

    private isLeapYear(year = new Date().getFullYear()){
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
    }
}