import * as React from 'react';
import { useDataContext } from './context/dataContext';
import { useEntryContext } from "./context/entryContext";

export function EntryActionButtons({ onClose }: any){
    const { confirmEntry, resetEntry } = useEntryContext();
    const { fetchServerData } = useDataContext();

    const confirmCb = React.useCallback(() => {
        confirmEntry().then(() => { fetchServerData(); });
        onClose();
    }, []);
    return(
        <div>
            <button onClick={confirmCb}>Confirm</button>
            <button onClick={resetEntry}>Reset</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}