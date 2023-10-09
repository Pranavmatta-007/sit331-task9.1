import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children}){

    const[user,setUser] = useState("");

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
            setUser(currentuser);
        });
        return()=>{
            unsubscribe();
        }
    },[]);
    return(
        <UserAuthContextProvider value = {{user,signup}}>
            {children}
        </UserAuthContextProvider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}