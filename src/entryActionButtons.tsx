import * as React from 'react';
import { useEntryContext } from "./context/entryContext";

export function EntryActionButtons({ onClose }: any){
    const { confirmEntry, resetEntry } = useEntryContext();
    const confirmCb = React.useCallback(() => {
        confirmEntry();
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