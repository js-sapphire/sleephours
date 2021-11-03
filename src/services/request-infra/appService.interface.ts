export enum ApiIdentifier{
    GetSleephours = "GetSleephours",
    GetSleephour = "GetSleephour",
    CreateSleephour = "CreateSleephour",
    UpdateSleephour = "UpdateSleephour",
    DeleteSleephour = "DeleteSleephour"
}

export interface IAppRequestFactory {
    getRequestHandler: (apiIdentifier?: ApiIdentifier) => IAppRequestHandler;
}

export interface IAppRequestHandler {
    getSleephours: () => Promise<any>;
    getSleephour: (sleephourId: string) => Promise<any>; 
    createSleephour: (sleephour: IClientSleephour) => Promise<any>;
    updateSleephour: (sleephourId: string, sleephourFrag: Partial<IClientSleephour>) => Promise<any>;
    deleteSleephour: (sleephoutId: string) => void
}

export interface IClientSleephour {
    date: Date;
    sleepTime: Date;
    wakeTime: Date;
    userId: string
}

export interface IServerSleephour extends IClientSleephour {
    id: string;
    duration: number;
}
