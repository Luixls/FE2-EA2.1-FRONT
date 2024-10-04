import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioProducto = ({ obtenerProductos, productoSeleccionado, limpiarSeleccion }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: 'camisas',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    imagen: ''
  });

  // Rellena el formulario con los datos del producto a editar
  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    }
  }, [productoSeleccionado]);

  const manejarCambio = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      if (productoSeleccionado) {
        // Actualizar producto existente
        await axios.put(`http://localhost:5000/api/productos/${producto._id}`, producto);
      } else {
        // Crear nuevo producto
        await axios.post('http://localhost:5000/api/productos', producto);
      }
      obtenerProductos();
      limpiarFormulario();
      limpiarSeleccion(); // Restablece el modo de edición
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  // Función para limpiar el formulario después de agregar o editar un producto
  const limpiarFormulario = () => {
    setProducto({
      nombre: '',
      categoria: 'camisas',
      descripcion: '',
      precio: 0,
      cantidad: 0,
      imagen: ''
    });
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={manejarCambio}
        required
      />
      <select
        name="categoria"
        value={producto.categoria}
        onChange={manejarCambio}
      >
        <option value="camisas">Camisas</option>
        <option value="pantalones">Pantalones</option>
        <option value="zapatos">Zapatos</option>
        <option value="gorras">Gorras</option>
      </select>
      <input
        type="text"
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={manejarCambio}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={manejarCambio}
        required
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={producto.cantidad}
        onChange={manejarCambio}
        required
      />
      <input
        type="text"
        name="imagen"
        placeholder="URL de la imagen"
        value={producto.imagen}
        onChange={manejarCambio}
      />
      <button type="submit">
        {productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}
      </button>
    </form>
  );
};

export default FormularioProducto;
