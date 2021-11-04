import * as React from 'react';
import { EntryProvider, useEntryContext } from './context/entryContext';
import { useCurrentUser } from './context/useCurrentUser';
import { DatePicker } from './datepicker';
import { Modal } from "./modal";
import { TimePicker } from "./timepicker";
import { EntryActionButtons } from "./entryActionButtons";
import { useDataContext } from './context/dataContext';
import { useDateService } from './context/dateContext';
import { SleephourTable } from "./sleephourTable";
import "./table.css";

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
                <TimeDurationShower />
                <EntryActionButtons onClose={onClose}/>
            </EntryProvider>
        </>
    )
}

function TimeDurationShower(){
    const { entry } = useEntryContext();
    const dateService = useDateService();

    const duration = React.useMemo(() => {
        return dateService?.getHHMMfromMs(entry.wakeTime - entry.sleepTime);
    }, [entry.sleepTime, entry.wakeTime]);

    if (!duration){
        return null;
    }
    
    return(
        <span>You slept for {duration} :p</span>
    )
}

function SleepDurationContainer(){
    const { fetchServerData } = useDataContext();
    const fetchForLastMonth = () => {
        fetchServerData(30);
    }

    return (
        <div>
            <button onClick={fetchForLastMonth}>Last 30 Days</button>
            <SleephourTable />
        </div>
    )
}

function SleepStatisticsContainer(){
    return(
        <span>Coming soon!!</span>
    )
}
