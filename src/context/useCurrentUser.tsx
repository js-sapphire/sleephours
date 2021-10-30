import * as React from 'react';
import { useAuthService } from './authContext';

export function useCurrentUser(){
    const [currentUser, setCurrentUser] = React.useState(null);        
    const authService = useAuthService();

    React.useEffect(() => {
        if (!authService){
            return;
        }
        authService?.getCurrentUser()((user: any) => setCurrentUser(user));
    }, [authService]);

    return currentUser;
}