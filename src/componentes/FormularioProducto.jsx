// src/componentes/FormularioProducto.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

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
    <Form onSubmit={manejarEnvio}>
      {/* Campo Nombre */}
      <Form.Group controlId="nombre">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={manejarCambio}
          required
        />
      </Form.Group>

      {/* Campo Categoría */}
      <Form.Group controlId="categoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          as="select"
          name="categoria"
          value={producto.categoria}
          onChange={manejarCambio}
        >
          <option value="camisas">Camisas</option>
          <option value="pantalones">Pantalones</option>
          <option value="zapatos">Zapatos</option>
          <option value="gorras">Gorras</option>
        </Form.Control>
      </Form.Group>

      {/* Campo Descripción */}
      <Form.Group controlId="descripcion">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          name="descripcion"
          value={producto.descripcion}
          onChange={manejarCambio}
        />
      </Form.Group>

      {/* Campo Precio */}
      <Form.Group controlId="precio">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
          required
        />
      </Form.Group>

      {/* Campo Cantidad */}
      <Form.Group controlId="cantidad">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control
          type="number"
          name="cantidad"
          value={producto.cantidad}
          onChange={manejarCambio}
          required
        />
      </Form.Group>

      {/* Campo Imagen */}
      <Form.Group controlId="imagen">
        <Form.Label>URL de la Imagen</Form.Label>
        <Form.Control
          type="text"
          name="imagen"
          value={producto.imagen}
          onChange={manejarCambio}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        {productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}
      </Button>
    </Form>
  );
};

export default FormularioProducto;
