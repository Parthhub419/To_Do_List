import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('taskify-session');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
  }, []);

  const login = (email, password) => {
    const db = JSON.parse(localStorage.getItem('taskify-users') || '[]');
    const existingUser = db.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      const sessionUser = { id: existingUser.id, name: existingUser.name, email: existingUser.email, bio: existingUser.bio, profilePic: existingUser.profilePic, createdAt: existingUser.createdAt };
      setUser(sessionUser);
      localStorage.setItem('taskify-session', JSON.stringify(sessionUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    const db = JSON.parse(localStorage.getItem('taskify-users') || '[]');
    if (db.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // In a real app, this would be hashed
      bio: '',
      profilePic: null,
      createdAt: new Date().toISOString()
    };
    
    db.push(newUser);
    localStorage.setItem('taskify-users', JSON.stringify(db));
    
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, bio: newUser.bio, profilePic: newUser.profilePic, createdAt: newUser.createdAt };
    setUser(sessionUser);
    localStorage.setItem('taskify-session', JSON.stringify(sessionUser));
    return { success: true };
  };

  const updateProfile = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('taskify-session', JSON.stringify(updatedUser));
    
    const db = JSON.parse(localStorage.getItem('taskify-users') || '[]');
    const updatedDb = db.map(u => u.id === user.id ? { ...u, ...updates } : u);
    localStorage.setItem('taskify-users', JSON.stringify(updatedDb));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskify-session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
