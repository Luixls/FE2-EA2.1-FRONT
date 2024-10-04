import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FormularioProducto from '../componentes/FormularioProducto';
import './Inicio.css';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para almacenar el producto a editar

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

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      obtenerProductos(); // Refresca la lista de productos
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  // Función para seleccionar el producto a editar
  const seleccionarProductoParaEditar = (producto) => {
    setProductoSeleccionado(producto); // Almacena el producto a editar
  };

  // Función para limpiar la selección después de actualizar o cancelar
  const limpiarSeleccion = () => {
    setProductoSeleccionado(null); // Limpia el estado de edición
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Inventario de Productos</h1>

      {/* Formulario para agregar o editar productos */}
      <FormularioProducto 
        obtenerProductos={obtenerProductos} 
        productoSeleccionado={productoSeleccionado} 
        limpiarSeleccion={limpiarSeleccion} 
      />

      {/* Listado de productos */}
      <Row className="mt-4">
        {productos.map(producto => (
          <Col md={4} key={producto._id} className="mb-4">
            <Card>
              <div className="img-container">
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="img-fixed" />
              </div>
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                  <strong>Categoría:</strong> {producto.categoria}<br />
                  <strong>Descripción:</strong> {producto.descripcion}<br />
                  <strong>Precio:</strong> {producto.precio} USD<br />
                  <strong>Cantidad:</strong> {producto.cantidad}
                </Card.Text>
                <Button variant="primary" onClick={() => seleccionarProductoParaEditar(producto)}>Editar</Button>
                <Button variant="danger" className="ml-2" onClick={() => eliminarProducto(producto._id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Inicio;
