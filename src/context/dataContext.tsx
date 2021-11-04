import * as React from 'react';
import { useAppService } from './appServiceContext';
import { useDateService } from './dateContext';
import { useCurrentUser } from './useCurrentUser';

const DataContext = React.createContext<any>(null);

export function DataProvider({ children }: any){
    const currentUser = useCurrentUser();
    const [sleephours, setSleephours] = React.useState<any>({});
    const appService = useAppService();
    const currentUserRef = React.useRef<any>();
    currentUserRef.current = currentUser;
    const [loading, setLoading] = React.useState(false);

    const fetchServerData = React.useCallback((frequency) => {
        if (loading){
            return;
        }
        setLoading(true);
        try {
            appService?.readEntries(currentUserRef.current?.uid, frequency).then((results) => {
                setSleephours(results);
                setLoading(false);
            });
        } catch {
            setLoading(false);
            throw new Error(`Client error in reading entries`);
        }
    }, [appService, sleephours, currentUserRef.current, loading]);

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