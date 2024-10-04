// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    // Comprobar si ya existe un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUsuarioAutenticado(token); // Asumimos que si existe, está autenticado
    }
  }, []);

  const login = async (email, contraseña) => {
    try {
      const respuesta = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        contraseña
      });
      localStorage.setItem('token', respuesta.data.token);
      setUsuarioAutenticado(respuesta.data.token);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  };

  const registrar = async (datos) => {
    try {
      const respuesta = await axios.post('http://localhost:5000/api/auth/registro', datos);
      localStorage.setItem('token', respuesta.data.token);
      setUsuarioAutenticado(respuesta.data.token);
    } catch (error) {
      console.error('Error al registrar', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuarioAutenticado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioAutenticado, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
