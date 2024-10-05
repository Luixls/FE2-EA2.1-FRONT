// src/componentes/BotonesAutenticacion.jsx
import React from "react";
import { Button } from "react-bootstrap";

const BotonesAutenticacion = ({
  usuarioAutenticado,
  abrirModalLogin,
  abrirModalRegistro,
  logout,
  abrirModalParaCrearProducto,
}) => {
  return (
    <div className="text-center mb-4">
      {usuarioAutenticado ? (
        <>
          <Button variant="success" onClick={abrirModalParaCrearProducto}>
            Agregar Producto
          </Button>
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
