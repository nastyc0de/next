import React from 'react';
import firebase from '../firebase';
import { useState } from 'react';
import { useEffect } from 'react';

function useAuth() {
    const [userAuth, setUserAuth] = useState(null);
    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario =>{
            if (usuario) {
                setUserAuth(usuario);
            } else {
                setUserAuth(null);
            }
        });
        return () => unsuscribe();
    }, [])
    return userAuth;
}
export default useAuth;
