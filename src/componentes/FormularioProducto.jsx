// src/componentes/FormularioProducto.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormularioProducto = ({ obtenerProductos }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: 'camisas',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen: ''
  });

  const manejarCambio = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/productos', producto);
      obtenerProductos();
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={manejarCambio} required />
      <select name="categoria" value={producto.categoria} onChange={manejarCambio}>
        <option value="camisas">Camisas</option>
        <option value="pantalones">Pantalones</option>
        <option value="zapatos">Zapatos</option>
        <option value="gorras">Gorras</option>
      </select>
      <input type="text" name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={manejarCambio} />
      <input type="number" name="precio" placeholder="Precio" value={producto.precio} onChange={manejarCambio} required />
      <input type="number" name="cantidad" placeholder="Cantidad" value={producto.cantidad} onChange={manejarCambio} required />
      <input type="text" name="imagen" placeholder="URL de la imagen" value={producto.imagen} onChange={manejarCambio} />
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default FormularioProducto;
