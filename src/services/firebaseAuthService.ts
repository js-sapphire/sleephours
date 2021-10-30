
import { initializeApp } from "firebase/app";
import { FirebaseApp } from "@firebase/app-types";
import { Auth as FireBaseAuth } from "@firebase/auth";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export interface IFirebaseAuthService {
    getCurrentUser: () => (cb: any) => void;
    signUpUserUsingCreds: (email: string, password: string) => void;
    signInUsingGoogle: () => void;
    signInUserUsingCreds: (email: string, password: string) => void;
    signOutUser: () => void;
}

type OverloadedFirebaseApp = Omit<FirebaseApp, "delete">

export class FirebaseAuthService implements IFirebaseAuthService {
    static instance: FirebaseAuthService
    private static firebaseApp: OverloadedFirebaseApp
    private static firebaseAuth: FireBaseAuth
    private static googleProvider: GoogleAuthProvider;

    private constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyDTv42VwsZYA5H6FFQGlCDMNS4sLYjGsYs",
            authDomain: "sleephours-93736.firebaseapp.com",
            projectId: "sleephours-93736",
            storageBucket: "sleephours-93736.appspot.com",
            messagingSenderId: "386974560384",
            appId: "1:386974560384:web:b541c782d3a3e3fc44f665"
          }; 
        FirebaseAuthService.firebaseApp = initializeApp(firebaseConfig);
        FirebaseAuthService.firebaseAuth = getAuth();
        FirebaseAuthService.googleProvider = new GoogleAuthProvider();
    }

    public static getInstance() {
        if (!FirebaseAuthService.instance){
            FirebaseAuthService.instance = new FirebaseAuthService();
        }
        return FirebaseAuthService.instance;
    }

    public getCurrentUser() {
        return (cb: any) => onAuthStateChanged(FirebaseAuthService.firebaseAuth, cb);
    }

    public async signUpUserUsingCreds(email: string, password: string) {
        try {
            const userCreds = await createUserWithEmailAndPassword(FirebaseAuthService.firebaseAuth, email, password);
        } catch {
            throw new Error(`Could not sign the user up!`);
        }
    }

    public async signInUsingGoogle(){
        try {
            const userCreds = await signInWithPopup(FirebaseAuthService.firebaseAuth, FirebaseAuthService.googleProvider);
        } catch {
            throw new Error("Could not log in using Google");
        }
    }

    public async signInUserUsingCreds(email: string, password: string){
        try {
            await signInWithEmailAndPassword(FirebaseAuthService.firebaseAuth, email, password);
        } catch {
            throw new Error(`Could not sign the user in!`);
        }
    }

    public async signOutUser() {
        try {
            await signOut(FirebaseAuthService.firebaseAuth);
        } catch {
            throw new Error(`Having trouble signing you out haha`);
        }
    }
}