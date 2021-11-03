
import * as React from 'react';
import { AppService, IAppService} from "../services/appService";

export const appContext = React.createContext<any>(null);

export function AppContextProvider({ children }: any){
    const appService = AppService.getInstance();
    return (
        <appContext.Provider value={{appService}}>
            { children }
        </appContext.Provider>
    )
}

export function useAppContext(){
    return React.useContext(appContext);
}