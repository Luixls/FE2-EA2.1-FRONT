import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Pagination } from 'react-bootstrap';
import FormularioProducto from '../componentes/FormularioProducto';
import './Inicio.css';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para almacenar el producto a editar
  const [mostrarModal, setMostrarModal] = useState(false); // Para controlar la visibilidad del modal
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas

  const obtenerProductos = async (pagina = 1) => {
    try {
      const respuesta = await axios.get(`http://localhost:5000/api/productos?page=${pagina}&limit=6`);
      setProductos(respuesta.data.productos);
      setPaginaActual(respuesta.data.currentPage);
      setTotalPaginas(respuesta.data.totalPages);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  useEffect(() => {
    obtenerProductos(paginaActual); // Cargar productos de la página actual
  }, [paginaActual]); // Dependencia de página actual

  // Función para abrir el modal en modo de creación
  const abrirModalParaCrear = () => {
    setProductoSeleccionado(null); // Limpia el producto seleccionado (para creación)
    setMostrarModal(true);
  };

  // Función para abrir el modal en modo de edición
  const abrirModalParaEditar = (producto) => {
    setProductoSeleccionado(producto); // Almacena el producto a editar
    setMostrarModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setMostrarModal(false); // Cierra el modal
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      obtenerProductos(paginaActual); // Refresca la lista de productos manteniendo la página actual
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  // Función para manejar el cambio de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina); // Cambia la página actual
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Inventario de Productos</h1>

      {/* Botón para abrir el modal y crear un nuevo producto */}
      <div className="text-center mb-4">
        <Button variant="success" onClick={abrirModalParaCrear}>Agregar Producto</Button>
      </div>

      {/* Listado de productos */}
      <Row className="mt-4">
        {productos.map((producto) => (
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
                <Button variant="primary" onClick={() => abrirModalParaEditar(producto)}>Editar</Button>
                <Button variant="danger" className="ml-2" onClick={() => eliminarProducto(producto._id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Paginación */}
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        />
        {[...Array(totalPaginas).keys()].map((numero) => (
          <Pagination.Item
            key={numero + 1}
            active={numero + 1 === paginaActual}
            onClick={() => cambiarPagina(numero + 1)}
          >
            {numero + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        />
      </Pagination>

      {/* Modal para agregar o editar productos */}
      <Modal show={mostrarModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{productoSeleccionado ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioProducto
            obtenerProductos={() => obtenerProductos(paginaActual)} // Mantiene la página actual después de la edición
            productoSeleccionado={productoSeleccionado}
            limpiarSeleccion={cerrarModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Inicio;
