import * as React from 'react';
import { useDateService } from './context/dateContext';
import "./datepicker.css";

enum DatePickerView {
    Date = "Date",
    Month = "Month",
    Year = "Year"
};

export function DatePicker(){
    const dateService = useDateService();
    const [currentView, setCurrentView] = React.useState<DatePickerView>(DatePickerView.Date);  
    const [year, setYear] = React.useState(2021);
    const [month, setMonth] = React.useState(1);
    const [date, setDate] = React.useState(1);
    const [visible, setVisible] = React.useState(false);
    const [datePicked, setDatePicked] = React.useState<string>("");
    const [dateArray, setDateArray] = React.useState<any>([]);
    const datePickerMap = React.useRef<any>();
    const monthArray = React.useRef<any>();
    const monthNameMap = React.useRef<any>();

    React.useMemo(() => {
        const mnMap = new Map();
        const mnArray = [];
        for(let i=1;i<=12;i++){
            mnMap.set(i, dateService?.getMonthName(i));
            mnArray.push(i);
        }
        monthArray.current = mnArray;
        monthNameMap.current = mnMap;
    }, []);

    const pickDate = React.useCallback((date) => {
        if(!dateService){
            return;
        }
        const newDate = datePickerMap.current.get(date);
        setDatePicked(newDate)
        setVisible(false);
    }, [dateService]);

    React.useEffect(() => {
        if (!dateService){
            return;
        }
        let operatingDate = datePicked;
        if (!operatingDate){
            operatingDate = dateService.getShortDateForToday();
        }

        const dateObject = dateService.getAppDateObject(operatingDate);
        setMonth(dateObject.month);
        setYear(dateObject.year);
        setDate(dateObject.date);
    }, [visible]);

    const monthName = React.useMemo(() => {
        return dateService?.getMonthName(month);
    }, [month]);

    React.useEffect(() => {
        if (!month || !year || !dateService){
            return;
        }
        const numberOfDays = dateService?.getDays(month, year) || 31;
        const dpMap = new Map();
        const dArray = [];
        for (let i=1;i<=numberOfDays;i++){
            dpMap.set(i, dateService.getShortDate(i, month, year));
            dArray.push(i);
        }
        datePickerMap.current = dpMap;
        setDateArray(dArray);
    }, [month, year]);

    return(
        <>
        <input value={datePicked} onClick={() => setVisible(!visible)} placeholder="Choose a date"></input>
        {visible && 
            <div className="monthHeader">
                <span className="monthName" onClick={() => setCurrentView(DatePickerView.Month)}>{monthName}</span>
                <span className="yearNumber">{year}</span>
            </div>
        }

        {visible && currentView === DatePickerView.Date &&
            <div className="dateNumberPicker">
                { dateArray.map((item: any) => {
                    const className = datePicked && item === date ? "dateNumber dateNumberPicked" : "dateNumber";
                    return (<span className={className} onClick={() => pickDate(item)}>{item}</span>);
                })}
            </div>
        }
        {visible && currentView === DatePickerView.Month && 
            <div className="monthPicker">
                { monthArray.current.map((item: any) => {
                    const monthName = monthNameMap.current.get(item);
                    return (<span 
                        className="monthPill" 
                        onClick={() => {
                            setMonth(item);
                            setCurrentView(DatePickerView.Date);
                        }}>{monthName}</span>)
                })}
            </div>
        }
        </>
    )
}



