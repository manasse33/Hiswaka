import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Importez votre nouveau service

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app, on vérifie si un utilisateur est déjà stocké
  useEffect(() => {
    const storedUser = localStorage.getItem('user_data');
    const token = localStorage.getItem('access_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de Connexion (Connectée au Backend)
  const login = async (email, password) => {
    try {
      // 1. Appel à l'API Django
      const response = await api.post('/auth/login/', { email, password });
      
      // 2. Récupération des données (selon votre structure JWT)
      const { access, refresh, user: userData } = response.data;

      // 3. Stockage local
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_data', JSON.stringify(userData));

      // 4. Mise à jour de l'état
      setUser(userData);
      return { success: true };

    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { success: false, error: error.response?.data?.detail || "Erreur de connexion" };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);