import * as React from 'react';
import { DateService } from "../services/dateService";
import { useAppContext } from './appContext';
import { useDateService } from './dateContext';

const EntryContext = React.createContext<any>(null);
const defaultNewEntry = {
    date: "01/01/2021",
    sleepTime: "00:00",
    wakeTime: "00:00"  
}

export function EntryProvider({ children } : any){
    const [entry, setEntry] = React.useState<any>(defaultNewEntry);
    const dateService = useDateService();

    const setInitialStateCb = React.useCallback(() => {
        if (dateService){
            setEntry({...entry, ...defaultNewEntry, date: dateService.getShortDateForToday()});
        }
    }, [dateService])

    const updateEntry = React.useCallback((entryFragment) => {
        console.log(`Updating entryF: `, entryFragment);
        setEntry((entry: any) => ({ ...entry, ...entryFragment}));
    }, [entry]);

    React.useEffect(() => {
        console.log(`Setting initial date`);
        setInitialStateCb();
    }, [dateService])

    const resetEntry = React.useCallback(() => {
        setInitialStateCb();
    }, []);

    const confirmEntry = React.useCallback(() => {
        console.log('Latest entry is : ', entry);
    }, [entry]);

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