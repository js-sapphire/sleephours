
import * as React from 'react';
import { DateService, IDateService } from "../services/dateService";

export const appContext = React.createContext<{ dateService: IDateService | null }>({ dateService: null});

export function DateServiceProvider({ children }: any){
    const dateService = DateService.getInstance();
    return (
        <appContext.Provider value={{dateService}}>
            { children }
        </appContext.Provider>
    )
}

export function useDateService(){
    const { dateService } = React.useContext(appContext);
    return dateService;
}