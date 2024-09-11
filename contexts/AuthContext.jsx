import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAr32o4mR3Zg-jitaU148sKY1wE_iKB-G0",
  authDomain: "project-management-2024.firebaseapp.com",
  databaseURL: "https://project-management-2024-default-rtdb.firebaseio.com",
  projectId: "project-management-2024",
  storageBucket: "project-management-2024.appspot.com",
  messagingSenderId: "284436445146",
  appId: "1:284436445146:web:7273a8ecd20b916836f2e3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const teste = "aaaaa";
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    return await signOut(auth)
      .then(() => {
        console.log("Logout concluded");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = { email, password };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        alert("Não foi possível criar o novo usuário!");
      });
  };

  const value = {
    currentUser,
    login,
    logout,
    createNewUser,
    users,
    teste,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
