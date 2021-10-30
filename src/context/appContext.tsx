
import * as React from 'react';
import { AppService, IAppService} from "../services/appService";

export const appContext = React.createContext<{ appService: IAppService | null }>({ appService: null});

export function AppServiceProvider({ children }: any){
    const appService = AppService.getInstance();
    return (
        <appContext.Provider value={{appService}}>
            { children }
        </appContext.Provider>
    )
}

export function useAppService(){
    const { appService } = React.useContext(appContext);
    return appService;
}