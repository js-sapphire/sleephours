import * as React from 'react';
import { useAppService } from './appServiceContext';
import { useDateService } from './dateContext';
import { useCurrentUser } from './useCurrentUser';

const DataContext = React.createContext<any>(null);

export function DataProvider({ children }: any){
    const currentUser = useCurrentUser();
    const [sleephours, setSleephours] = React.useState<any>({});
    const [lastDateFetched, setLastDateFetched] = React.useState<any>();
    const [freqFetched, setFreqFetched] = React.useState<any>(0);
    const appService = useAppService();
    const dateService = useDateService();
    const currentUserRef = React.useRef<any>();
    currentUserRef.current = currentUser;
    const [loading, setLoading] = React.useState(false);

    const fetchServerData = React.useCallback((frequency) => {
        if (loading){
            return;
        }

        if (sleephours && frequency <= freqFetched && lastDateFetched === dateService?.getEpochForToday()){
            return;
        }

        setLoading(true);
        try {
            appService?.readEntries(currentUserRef.current?.uid, frequency).then((results) => {
                setSleephours(results);
                if (!freqFetched || (freqFetched && frequency > freqFetched)) {
                    setFreqFetched(frequency);
                }
                setLastDateFetched(dateService?.getEpochForToday());
                setLoading(false);
            });
        } catch {
            throw new Error(`Client error in reading entries`);
        }
    }, [appService, sleephours, freqFetched, lastDateFetched, currentUserRef.current, loading]);

    React.useEffect(() => {
        if (!appService || !currentUserRef.current){
            return;
        }
        fetchServerData(7);
    }, [appService, currentUserRef.current])

    if (!currentUser){
        return null;
    }

    return(
        <DataContext.Provider value={{ sleephours, fetchServerData }}>
            { children }
        </DataContext.Provider>
    )
}

export function useDataContext(){
    const dataContext = React.useContext(DataContext);
    return dataContext;
}