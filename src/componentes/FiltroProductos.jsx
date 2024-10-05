// src/componentes/FiltroProductos.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

const FiltroProductos = ({ busqueda, manejarCambioBusqueda, categoria, manejarCambioCategoria }) => {
  return (
    <>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, descripción o categoría"
        value={busqueda}
        onChange={manejarCambioBusqueda}
        className="mb-4"
      />
      <Form.Select value={categoria} onChange={manejarCambioCategoria} className="mb-4">
        <option value="">Todas las Categorías</option>
        <option value="camisas">Camisas</option>
        <option value="pantalones">Pantalones</option>
        <option value="zapatos">Zapatos</option>
        <option value="gorras">Gorras</option>
      </Form.Select>
    </>
  );
};

export default FiltroProductos;
