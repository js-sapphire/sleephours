import * as React from 'react';
import { useAppService } from './appServiceContext';
import { useDateService } from './dateContext';
import { useCurrentUser } from './useCurrentUser';
import { omit } from "lodash";

const EntryContext = React.createContext<any>(null);
const defaultNewEntry = {
    date: "",
    sleepTime: "",
    wakeTime: "",
    sleepHhMm: "00:00",
    wakeHhMm: "00:00"  
}

export function EntryProvider({ children } : any){
    const [entry, setEntry] = React.useState<any>(defaultNewEntry);
    const stateRef = React.useRef<any>();
    const currentUserRef = React.useRef<any>();
    const dateService = useDateService();
    const appService = useAppService();
    const currentUser  = useCurrentUser();
    stateRef.current = entry;
    currentUserRef.current = currentUser;

    const setInitialStateCb = React.useCallback(() => {
        if (!dateService){
            return;
        }
        const epochForToday = dateService?.getEpochForToday();
        const epochForNextDay = dateService?.getNextDayInEpoch(epochForToday);
        setEntry({
            date: epochForToday,
            sleepTime: epochForToday,
            wakeTime: epochForNextDay
        })
    }, [dateService])

    const updateEntry = React.useCallback((entryFragment) => {
        setEntry((entry: any) => {
            // Indicating date has changed
            let newDate, newSleepTime, newWakeTime;
            const newSleepHhMm = entryFragment.sleepHhMm || entry.sleepHhMm || "00:00"
            const newWakeHhMm = entryFragment.wakeHhMm || entry.wakeHhMm || "00:00"

            if (entryFragment.date){
                newDate = entryFragment.date;
                newSleepTime = dateService?.addMsAndGetEpoch(newSleepHhMm, newDate);
                newWakeTime = dateService?.addMsAndGetEpoch(newWakeHhMm, dateService?.getNextDayInEpoch(newDate));
            } else {
                newDate = entry.date;
                newSleepTime = dateService?.addMsAndGetEpoch(newSleepHhMm, entry.date);
                newWakeTime = dateService?.addMsAndGetEpoch(newWakeHhMm, dateService.getNextDayInEpoch(entry.date))
            }

            return {
                date: newDate,
                sleepTime: newSleepTime,
                wakeTime: newWakeTime,
                sleepHhMm: newSleepHhMm,
                wakeHhMm: newWakeHhMm
            }
        });
    }, [entry]);

    React.useEffect(() => {
        setInitialStateCb();
    }, [dateService])

    const resetEntry = React.useCallback(() => {
        setInitialStateCb();
    }, []);

    const confirmEntry = React.useCallback(() => {
        if (!stateRef.current){
            throw new Error(`React state issue`);
        }
        if (!appService) {
            throw new Error(`React context issue`);
        }
        const clientSleephour = {
            ...omit(stateRef.current, ["sleepHhMm", "wakeHhMm"]),
            userId: currentUserRef.current.uid 
        };
        appService?.addEntry(clientSleephour);
    }, [stateRef.current]);


    if (!currentUser){
        return null;
    }

    return(
        <EntryContext.Provider value={{ confirmEntry, entry, updateEntry, resetEntry }}>
            { children }
        </EntryContext.Provider>
    )
}

export function useEntryContext(){
    const entryContext = React.useContext(EntryContext);
    return entryContext;
}
