import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useTheme from "../hooks/useTheme";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => { 
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
      };
      const updateUserProfile=(name)=>{
        return updateProfile(auth.currentUser, {
             displayName: name
           })
         
     }


      const passwordReset = (email)=>{
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
      }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // Get and Set Token
            if (currentUser) {
                axios.post('http://localhost:3000/jwt',{email:currentUser?.email})
                .then(data=>{
                    // console.log(data.data.token);
                    localStorage.setItem('access-token', data.data.token)
            setLoading(false)

                })
            } else {
                localStorage.removeItem('access-token')
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    
    const authInfo = {
        user,
        loading,
        createUser, 
        signIn,
        googleSignIn,
        updateUserProfile,
        passwordReset, 
        logOut,
       
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;