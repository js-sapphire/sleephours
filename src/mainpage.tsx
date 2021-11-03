import * as React from 'react';
import { useAppContext } from './context/appContext';
import { EntryProvider, useEntryContext } from './context/entryContext';
import { useCurrentUser } from './context/useCurrentUser';
import { DatePicker } from './datepicker';
import { Modal } from "./modal";

export function MainPage(){
    const currentUser = useCurrentUser();
    if (!currentUser){
        return <StaticLandingPage />
    }
    return <DynamicMainPage />
}

function StaticLandingPage() {
    return (
        <h1>Welcome to Sleephours</h1>
    )
}

function DynamicMainPage(){
    const { entries } = useAppContext();
    console.log(entries);
    return (
        <div>
            <NewEntryButton />
            { entries && entries.map((item: any) => <div>{item.date} : {item.sleepTime} : {item.wakeTime} </div>)  }
            <SleepDurationContainer />
            <SleepStatisticsContainer />
        </div>
    )
}

function NewEntryButton(){
    const [showModal, setShowModal] = React.useState(false); 
    const hideModal = React.useCallback(() => { setShowModal(false); }, [])
    return (
        <>
        <button onClick={() => setShowModal(true)}>New Entry</button>
        { showModal && <Modal onClose={() => setShowModal(false)}><NewEntryDialog onClose={hideModal} /></Modal>}
        </>
    )
}


function NewEntryDialog({ onClose }: any){
    return(
        <>
            <EntryProvider>    
                <DatePicker />
                <TimePicker />
                <EntryActionButtons onClose={onClose}/>
            </EntryProvider>
        </>
    )
}

function SleepDurationContainer(){
    return (
        <div>
            Coming soon!
        </div>
    )
}


function SleepStatisticsContainer(){
    return (
        <div>
            Coming soon!
        </div>
    )
}

function TimePicker(){
    const { entry, updateEntry } = useEntryContext();
    console.log(entry);
    const setSleepTime = React.useCallback((event) => {
        updateEntry({ sleepTime: event.target.value})
    }, []);

    const setWakeTime = React.useCallback((event) => {
        updateEntry({ wakeTime: event.target.value})
    }, []);
    
    return(
        <>
        <label>Sleep time
        <input type="time" value={entry.sleepTime} onChange={setSleepTime}></input></label>
        <label>Wake Time
        <input type="time" value={entry.wakeTime} onChange={setWakeTime}></input></label>
        </>
    )
}


function EntryActionButtons({ onClose }: any){
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