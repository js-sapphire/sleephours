import * as React from 'react';
import { useDateService } from './context/dateContext';
import { useEntryContext } from './context/entryContext';

export function TimePicker(){
    const { entry, updateEntry } = useEntryContext();
    const dateService = useDateService();

    const sleepDay = React.useMemo(() => {
        if (!entry.date) {
            return;
        }
        return dateService?.getPresentationDate(entry.date);
    }, [entry.date]);

    const wakeUpDay = React.useMemo(() => {
        if (!entry.date) {
            return;
        }
        return dateService?.getPresentationDate(dateService?.getNextDayInEpoch(entry.date));
    }, [entry.date])

    const setSleepTime = React.useCallback((event) => {
        updateEntry({ sleepHhMm: event.target.value})
    }, []);

    const setWakeTime = React.useCallback((event) => {
        updateEntry({ wakeHhMm: event.target.value})
    }, []);
    
    const sleepTimeToShow = React.useMemo(() => {
        return dateService?.getTimeBuffer(entry.sleepTime);
    }, [entry.sleepTime]);

    const wakeTimeToShow = React.useMemo(() => {
        return dateService?.getTimeBuffer(entry.wakeTime);
    }, [entry.wakeTime]);

    return(
        <>
        <label>Sleep time<br />
        <input disabled value={sleepDay}></input>
        <input type="time" value={entry.sleepHhMm || sleepTimeToShow} onChange={setSleepTime}></input></label>
        <label>Wake Time<br />
        <input disabled value={wakeUpDay}></input>
        <input type="time" value={entry.wakeHhMm || wakeTimeToShow} onChange={setWakeTime}></input></label>
        </>
    )
}