// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsuarioAutenticado(token);
    }
  }, []);

  const login = async (email, contraseña) => {
    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, contraseña }
      );
      localStorage.setItem("token", respuesta.data.token);
      setUsuarioAutenticado(respuesta.data.token);
      return null; // No hay error
    } catch (error) {
      console.error(
        "Error al iniciar sesión",
        error.response ? error.response.data : error.message
      );
      // Retorna un mensaje de error en vez de propagar el objeto completo
      return error.response && error.response.data
        ? error.response.data.mensaje
        : "Error en la solicitud de inicio de sesión";
    }
  };

  // src/context/AuthContext.jsx
  const registrar = async (datos) => {
    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/registro",
        datos
      );
      localStorage.setItem("token", respuesta.data.token);
      setUsuarioAutenticado(respuesta.data.token);
      return null; // No hay error
    } catch (error) {
      console.error(
        "Error al registrar",
        error.response ? error.response.data : error.message
      );
      // Retorna un mensaje de error relevante si existe, o un mensaje por defecto
      return error.response && error.response.data
        ? error.response.data.mensaje
        : "Error en la solicitud de registro";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuarioAutenticado(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuarioAutenticado, login, registrar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
