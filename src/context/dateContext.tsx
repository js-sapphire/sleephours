
import * as React from 'react';
import { DateService, IDateService } from "../services/dateService";

export const DateServiceContext = React.createContext<{ dateService: IDateService | null }>({ dateService: null});

export function DateServiceProvider({ children }: any){
    const dateService = DateService.getInstance();
    return (
        <DateServiceContext.Provider value={{dateService}}>
            { children }
        </DateServiceContext.Provider>
    )
}

export function useDateService(){
    const { dateService } = React.useContext(DateServiceContext);
    return dateService;
}