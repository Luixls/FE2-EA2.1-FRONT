// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [rolUsuario, setRolUsuario] = useState(null); // Guardamos el rol del usuario

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      obtenerDatosUsuario(token); // Obtener los datos del usuario si hay un token
    }
  }, []);

  const obtenerDatosUsuario = async (token) => {
    try {
      const respuesta = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarioAutenticado(respuesta.data);
      setRolUsuario(respuesta.data.rol);
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
      logout(); // Desloguear si el token es inválido
    }
  };

  const login = async (email, contraseña) => {
    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, contraseña }
      );
      localStorage.setItem("token", respuesta.data.token); // Almacenar el token
      obtenerDatosUsuario(respuesta.data.token); // Obtener datos del usuario tras login
      return null; // No hay error
    } catch (error) {
      console.error(
        "Error al iniciar sesión",
        error.response ? error.response.data : error.message
      );
      return error.response && error.response.data
        ? error.response.data.mensaje
        : "Error en la solicitud de inicio de sesión";
    }
  };

  const registrar = async (datos) => {
    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/auth/registro",
        datos
      );
      localStorage.setItem("token", respuesta.data.token);
      obtenerDatosUsuario(respuesta.data.token); // Obtener datos del usuario tras registro
      return null; // No hay error
    } catch (error) {
      console.error(
        "Error al registrar",
        error.response ? error.response.data : error.message
      );
      return error.response && error.response.data
        ? error.response.data.mensaje
        : "Error en la solicitud de registro";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsuarioAutenticado(null);
    setRolUsuario(null); // Limpiar el rol
  };

  return (
    <AuthContext.Provider
      value={{ usuarioAutenticado, rolUsuario, login, registrar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
