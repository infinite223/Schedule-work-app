import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { User, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import * as WebBrowser from 'expo-web-browser';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getStorage } from 'firebase/storage';


WebBrowser.maybeCompleteAuthSession();

const firebaseConfig = {
    apiKey: "AIzaSyCOutH6e-eDwuw5zSZtFb8nsCDHgz1mXsg",
    authDomain: "schedulework-22249.firebaseapp.com",
    projectId: "schedulework-22249",
    storageBucket: "schedulework-22249.appspot.com",
    messagingSenderId: "1011732226514",
    appId: "1:1011732226514:web:efbaa627791ccdde8c680b"
}; 

export let app = initializeApp(firebaseConfig);
export const storage = getStorage()
export const auth = getAuth(app)
const AuthContext = createContext({})
const PurchasesContext = createContext([[], () => {}]);

export const AuthProvider = ({children}: any) => {
  const db =  getFirestore()
  const [user, setUser] = useState<User | null>(null)
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => 
    onAuthStateChanged(auth, async (user) => {

      if(user){
        setUser(user)
      }
      else {
        setUser(null)
      }
      setLoadingInitial(false)
    }
  ), [])

  const signInAsTester = () => {
   signInWithEmailAndPassword(auth, 'test@gmail.com', 'test123')
   .catch((e) => console.log(e))
  }


    const memoedValue = useMemo(() => ({
      user,
      setUser,
      loading,
      error,
      signInAsTester,
    }), [user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider> 
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}   

export const db = getFirestore(app)