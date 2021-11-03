
import * as React from 'react';
import { AppService, IAppService} from "../services/appService";

export const AppServiceContext = React.createContext<{ appService: IAppService | null }>({ appService: null });

export function AppServiceProvider({ children }: any){
    const appService = AppService.getInstance();
    return (
        <AppServiceContext.Provider value={{appService}}>
            { children }
        </AppServiceContext.Provider>
    )
}

export function useAppService(){
    const { appService } = React.useContext(AppServiceContext);
    return appService;
}