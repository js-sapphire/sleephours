import * as React from 'react';
import { FirebaseAuthService, IFirebaseAuthService } from "../services/firebaseAuthService";

export const AuthContext = React.createContext<{ authService: IFirebaseAuthService | null }>({ authService: null});

export function AuthProvider({ children }: any){
    const authService = FirebaseAuthService.getInstance();
    return (
        <AuthContext.Provider value={{authService}}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuthService(){
    const { authService } = React.useContext(AuthContext);
    return authService;
}