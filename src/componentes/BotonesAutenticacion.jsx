// src/componentes/BotonesAutenticacion.jsx
import React from "react";
import { Button } from "react-bootstrap";

const BotonesAutenticacion = ({
  usuarioAutenticado,
  rolUsuario, // Añadimos el rol del usuario
  abrirModalLogin,
  abrirModalRegistro,
  logout,
  abrirModalParaCrearProducto,
  abrirModalParaVerUsuarios, // Nueva función para ver usuarios (solo admin)
}) => {
  return (
    <div className="text-center mb-4">
      {usuarioAutenticado ? (
        <>
          {rolUsuario === "admin" && (
            <>
              <Button variant="success" onClick={abrirModalParaCrearProducto}>
                Agregar Producto
              </Button>
              <Button
                variant="info"
                onClick={abrirModalParaVerUsuarios} // Botón para ver los usuarios (solo para admin)
                className="ml-2"
              >
                Ver Usuarios
              </Button>
            </>
          )}
          <Button variant="danger" onClick={logout} className="ml-2">
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <>
          <Button variant="primary" onClick={abrirModalLogin}>
            Iniciar Sesión
          </Button>
          <Button
            variant="secondary"
            onClick={abrirModalRegistro}
            className="ml-2"
          >
            Registrarse
          </Button>
        </>
      )}
    </div>
  );
};

export default BotonesAutenticacion;
