import { omit } from 'lodash';
import * as React from 'react';
import { useDataContext } from './context/dataContext';
import { useDateService } from './context/dateContext';

export function SleephourTable(){
    const { sleephours } = useDataContext();
    const dateService = useDateService();
    const contentToShow = React.useMemo(() => { 
        if (typeof sleephours === "object" && Object.keys(sleephours).length === 0){
            return;
        }
        if (!dateService || !sleephours || sleephours?.length === 0){
            return [];
        }    
        return ( 
            sleephours?.
                map((item: any) => omit(item, ["userId", "_id", "__v"])).
                map((sleephour: any) => {
                    return {
                        ...sleephour,
                        date: dateService?.getPresentationDateFromServerDate(sleephour.date),
                        sleepTime: dateService?.getPresentationDateFromServerDate(sleephour.sleepTime),
                        wakeTime: dateService?.getPresentationDateFromServerDate(sleephour.wakeTime),
                        duration: dateService?.getHHMMfromMs(sleephour.duration)
                    }
                })
        );
    }, [sleephours]);

    const columnHeads = contentToShow?.[0] ? Object.keys(contentToShow[0]) : [];

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        { columnHeads?.map((columnHead: any) => <th>{columnHead}</th>)}
                    </tr>
                </thead>
                <tbody>
                    { contentToShow?.map((sleephour: any) => 
                        <tr>{columnHeads?.map((columnHead: any) => (<td>{sleephour[columnHead]}</td>))}</tr>
                    )}
                </tbody>

            </table>
        </div>
    )
}