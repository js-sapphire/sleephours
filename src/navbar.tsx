import { useAuthService } from "./context/authContext";
import { useCurrentUser } from "./context/useCurrentUser";
import * as React from 'react';
import "./navbar.css";
import { Modal } from "./modal";

export function Navbar(){
    const currentUser = useCurrentUser();
    const [signUp, setSignUp] = React.useState(false);
    const [signIn, setSignIn] = React.useState(false);

    const onCloseCbForSI = React.useCallback(() => {
        setSignIn(false);
    }, []);

    const onCloseCbForSU = React.useCallback(() => {
        setSignUp(false);
    }, [])

    if (currentUser){
        return <SignOutButton />
    }

    return (
        <>
        <div className="navbarActionButtons">
            <SignUpButton showSignUp={setSignUp}/>
            <SignInButton showSignIn={setSignIn}/>
            <GoggleSignInButton />
        </div>    
        {signUp && <Modal onClose={onCloseCbForSU}><SignUpDg/></Modal>}
        {signIn && <Modal onClose={onCloseCbForSI}><SignInDg/></Modal>}
        </>
    )
}


export function GoggleSignInButton() {
    const authService = useAuthService();

    const handleClick = React.useCallback(() => {
        if (!authService){
            return;
        }
        authService.signInUsingGoogle();
    }, [authService])


    return(
        <button onClick={handleClick}>Google Sign in</button>
    )
}


export function SignInButton({ showSignIn }: any) {
    return(
        <button onClick={() => showSignIn(true)}>Sign In</button>
    )
}

export function SignUpButton({ showSignUp }: any) {
    return(
        <button onClick={() => showSignUp(true)}>Sign Up</button>
    )
}

export function SignUpDg({ onClose }: any){
    const authService = useAuthService();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    const signUpUser = React.useCallback(() => {
        authService?.signUpUserUsingCreds(email, password);
    }, [authService, email, password]);

    return (
        <>
            <input autoComplete="new-password" type="text" value={email} placeholder="Enter email" 
            onChange={(event) => { setEmail(event.target.value) }}></input>
            <input autoComplete="new-password" type="password" value={password} placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}></input>
            <button className="modalSignUpButton" onClick={signUpUser}>Sign Up</button>
        </>
    );
}

export function SignInDg({ onClose }: any){
    const authService = useAuthService();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const signInUser = React.useCallback(() => {
        authService?.signInUserUsingCreds(email, password);
    }, [authService, email, password]);

    return (
        <>
            <input autoComplete="new-password" type="text" value={email} placeholder="Enter email" 
            onChange={(event) => { setEmail(event.target.value) }}></input>
            <input autoComplete="new-password" type="password" value={password} placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}></input>
            <button className="modalSignUpButton" onClick={signInUser}>Sign In</button>
        </>
    );
}

export function SignOutButton() {
    const authService = useAuthService();

    const handleClick = React.useCallback(() => {
        if (!authService){
            return;
        }
        authService.signOutUser();
    }, [authService]);

    return(
        <button onClick={handleClick}>Sign Out</button>
    )
}
