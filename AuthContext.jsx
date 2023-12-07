import React, { createContext, useState, useEffect } from 'react';

import { auth } from './firebaseConfig';
export const AuthContext = createContext();
import { onAuthStateChanged } from 'firebase/auth';
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe; // Unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
