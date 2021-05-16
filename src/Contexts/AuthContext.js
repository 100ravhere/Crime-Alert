import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true);
  const [fname,setfName] = useState("");
  const [lname,setlName] = useState("");
  const [Loc,setLoc] = useState("");
  const [cityCrime,selectCityCrime] = useState(null);
  const [dateDesc,setDateDesc] = useState("");
  const [notiLength,setNotiLength] = useState(0);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    
    return auth.signInWithEmailAndPassword(email, password);
    
    }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    fname,
    setfName,
    lname,
    setlName,
    Loc,
    setLoc,
    dateDesc,
    setDateDesc,
    cityCrime,
    selectCityCrime
    ,notiLength,
    setNotiLength
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}