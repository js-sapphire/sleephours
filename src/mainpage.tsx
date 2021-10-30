import * as React from 'react';
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
    return (
        <>
        <button onClick={() => setShowModal(true)}>New Entry</button>
        { showModal && <Modal onClose={() => setShowModal(false)}><NewEntryDialog /></Modal>}
        </>
    )
}


function NewEntryDialog(){
    return(
        <>
            <DatePicker />
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