import * as React from 'react';
import { useAppService } from './appServiceContext';
import { useDateService } from './dateContext';
import { useCurrentUser } from './useCurrentUser';

const EntryContext = React.createContext<any>(null);
const defaultNewEntry = {
    date: "",
    sleepTime: "00:00",
    wakeTime: "00:00"  
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
        console.log(entryFragment);
        setEntry((entry: any) => {
            const sleepDay = entryFragment.date ?? entry.date;
            const sleepTime = entryFragment.sleepTime ? dateService?.addMsAndGetEpoch(entryFragment.sleepTime, sleepDay) : entry.sleepTime;
            const wakeTime = entryFragment.wakeTime ? dateService?.addMsAndGetEpoch(entryFragment.wakeTime, dateService?.getNextDayInEpoch(sleepDay)) : entry.wakeTime;
            const updatedEntry = {
                date: sleepDay,
                sleepTime,
                wakeTime
            }
            return updatedEntry;
        });
    }, [entry]);

    React.useEffect(() => {
        console.log(`Setting initial date`);
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
            ...stateRef.current,
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
