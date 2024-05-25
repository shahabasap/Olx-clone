import React, { createContext, useState } from 'react';
import { auth, db,storage} from '../firebase/config'; // Correctly import db (Firestore)


export const FirebaseContext = createContext(null);
export const AuthContext=createContext(null)


 export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={{ auth, db,storage }}>
    {children}
  </FirebaseContext.Provider>
);

export function Context({children}) {
  const[user,setUser]=useState("")
  return(
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}



