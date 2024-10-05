// src/componentes/Registro.jsx
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Registro = () => {
  const { registrar } = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrar({
        nombreUsuario,
        nombreCompleto,
        email,
        contraseña,
        confirmarContraseña,
      });
      alert("Registro exitoso");
    } catch (error) {
      alert("Error al registrar");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Registro</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nombre Completo:</label>
        <input
          type="text"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
