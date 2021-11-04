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
import "./dynamicmainpage.css";
import {LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, XYPlot, VerticalBarSeries } from "react-vis";
import '../node_modules/react-vis/dist/style.css';

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
        <div className="dynamicpageFlex">
            <NewEntryButton />
            <div className="visualizationFlex">
                <SleepDurationContainer />
                <SleepStatisticsContainer />
            </div>
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
    const dateService = useDateService();

    const fetchForLastMonth = () => {
        fetchServerData(30);
    }

    const fetchForLastWeek = () => {
        fetchServerData(7);
    }

    const fetchForThisMonth = React.useCallback(() => {
        if (!dateService){
            return;
        }    
        fetchServerData(dateService.getOffsetDaysForCurrentMonth());
    }, [dateService, fetchServerData]);


    return (
        <div>
            <button onClick={fetchForLastWeek}>Last 7 days</button>
            <button onClick={fetchForLastMonth}>Last 30 Days</button>
            <button onClick={fetchForThisMonth}>This month</button>
            <SleephourTable />
        </div>
    )
}

function SleepStatisticsContainer(){
    const { sleephours } = useDataContext();
    const dateService = useDateService();

    const data = React.useMemo(() => {
        if (!dateService){
            return [];
        }
        if (typeof sleephours === "object" && Object.keys(sleephours).length === 0){
            return [];
        }
        if (!sleephours || sleephours?.length === 0){
            return [];
        }      

        return sleephours.reverse().map((sleephour: any) => ({ x:  new Date(sleephour.date), y: sleephour.duration/3600000}));
    }, [dateService, sleephours]);



    if (!data || data?.length === 0){
        return null;
    }

    return(
          <XYPlot height={500} width= {500} xType="time">
            <VerticalGridLines/>
            <HorizontalGridLines />
            <XAxis title="Dates" tickTotal={data.length} tickSize={5} tickFormat={item => dateService?.getPresentationDateFromServerDate(item) || item}/>
            <YAxis title="Sleep duration in hrs"/>
            <LineSeries data={data} style={{strokeLinejoin: "round"}} />
          </XYPlot> 
    )
}
