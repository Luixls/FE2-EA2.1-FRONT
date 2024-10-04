// src/paginas/Inicio.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormularioProducto from '../componentes/FormularioProducto';

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const respuesta = await axios.get('http://localhost:5000/api/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Inventario de Productos</h1>
      <FormularioProducto obtenerProductos={obtenerProductos} />
      <ul>
        {productos.map(producto => (
          <li key={producto._id}>
            <h3>{producto.nombre}</h3>
            <p>{producto.categoria}</p>
            <p>{producto.descripcion}</p>
            <p>{producto.precio} USD</p>
            <p>Cantidad: {producto.cantidad}</p>
            <img src={producto.imagen} alt={producto.nombre} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inicio;
