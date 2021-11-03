import * as React from 'react';
import { useAppService } from './context/appServiceContext';
import { useDateService } from './context/dateContext';
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
    return (
        <div>
            <NewEntryButton />
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
    const appService = useAppService();

    const readEntries = React.useCallback(() => {
        if (!appService){
            return;
        }
        const g = appService.readEntries();
        g.then((entries) => {
            console.log(entries);
        });
    }, []);

    return (
        <div>
            <button onClick={readEntries}>Click me to see entries</button>
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
        updateEntry({ sleepTime: event.target.value})
    }, []);

    const setWakeTime = React.useCallback((event) => {
        updateEntry({ wakeTime: event.target.value})
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
        <input type="time" value={sleepTimeToShow} onChange={setSleepTime}></input></label>
        <label>Wake Time<br />
        <input disabled value={wakeUpDay}></input>
        <input type="time" value={wakeTimeToShow} onChange={setWakeTime}></input></label>
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