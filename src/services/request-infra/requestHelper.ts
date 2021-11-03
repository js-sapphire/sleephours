
export class RequestHelper {
    constructor(){}

    public sleephoursUrl(){
        return `sleephours`;
    }

    public sleephourUrl(sleephourId: string){
        return `sleephours/${sleephourId}`
    }
}