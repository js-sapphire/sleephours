import * as React from 'react';
import { useDateService } from './context/dateContext';
import { useEntryContext } from './context/entryContext';
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
    const [dateArray, setDateArray] = React.useState<any>([]);
    const datePickerMap = React.useRef<any>();
    const monthArray = React.useRef<any>();
    const monthNameMap = React.useRef<any>();
    const { entry, updateEntry } = useEntryContext();

    const dateInInput = React.useMemo(() => {
        if (!entry.date) {
            return;
        }
        return dateService?.getPresentationDate(entry.date)
    }, [entry.date])

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
        updateEntry({ date: newDate });
        setVisible(false);
    }, [dateService]);

    React.useEffect(() => {
        if (!dateService){
            return;
        }
        let operatingDate = entry.date;
        if (!operatingDate){
            operatingDate = dateService.getEpochForToday();
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
        if (!month || !year || !dateService || !visible){
            return;
        }
        const numberOfDays = dateService?.getDays(month, year) || 31;
        const dpMap = new Map();
        const dArray = [];
        for (let i=1;i<=numberOfDays;i++){
            const result = dateService.getDateInEpoch(i, month, year);
            dpMap.set(i, result);
            dArray.push(i);
        }
        datePickerMap.current = dpMap;
        setDateArray(dArray);
    }, [month, year, visible]);

    return(
        <>
        <input value={dateInInput} onClick={() => setVisible(!visible)} placeholder="Choose a date"></input>
        {visible && 
            <div className="monthHeader">
                <span className="monthName" onClick={() => setCurrentView(DatePickerView.Month)}>{monthName}</span>
                <span className="yearNumber">{year}</span>
            </div>
        }

        {visible && currentView === DatePickerView.Date &&
            <div className="dateNumberPicker">
                { dateArray.map((item: any) => {
                    const className = item === date ? "dateNumber dateNumberPicked" : "dateNumber";
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
        {
            /**
             * Handle last year corner case
             */
        }
        </>
    )
}



