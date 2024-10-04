import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Pagination, Form } from 'react-bootstrap';
import FormularioProducto from '../componentes/FormularioProducto';
import './Inicio.css';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para almacenar el producto a editar
  const [mostrarModal, setMostrarModal] = useState(false); // Para controlar la visibilidad del modal
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas
  const [busqueda, setBusqueda] = useState(''); // Texto de búsqueda
  const [categoria, setCategoria] = useState(''); // Filtro de categoría

  const obtenerProductos = async (pagina = 1, query = '', categoria = '') => {
    try {
      const respuesta = await axios.get(`http://localhost:5000/api/productos?page=${pagina}&limit=6&query=${query}&categoria=${categoria}`);
      setProductos(respuesta.data.productos);
      setPaginaActual(respuesta.data.currentPage);
      setTotalPaginas(respuesta.data.totalPages);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  useEffect(() => {
    obtenerProductos(paginaActual, busqueda, categoria); // Actualizar la lista de productos según la búsqueda y la categoría
  }, [paginaActual, busqueda, categoria]); // Dependencia de página actual, búsqueda y categoría

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
      obtenerProductos(paginaActual, busqueda, categoria); // Refresca la lista de productos manteniendo la búsqueda y la página actual
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  // Función para manejar el cambio de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina); // Cambia la página actual
  };

  // Función para manejar el input de búsqueda
  const manejarCambioBusqueda = (e) => {
    setBusqueda(e.target.value); // Actualiza el estado de búsqueda
    setPaginaActual(1); // Reinicia a la página 1 cuando cambia la búsqueda
  };

  // Función para manejar el filtro de categoría
  const manejarCambioCategoria = (e) => {
    setCategoria(e.target.value); // Actualiza el estado de la categoría seleccionada
    setPaginaActual(1); // Reinicia a la página 1 cuando cambia la categoría
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Inventario de Productos</h1>

      {/* Campo de búsqueda */}
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, descripción o categoría"
        value={busqueda}
        onChange={manejarCambioBusqueda}
        className="mb-4"
      />

      {/* Filtro por categoría */}
      <Form.Select value={categoria} onChange={manejarCambioCategoria} className="mb-4">
        <option value="">Todas las Categorías</option>
        <option value="camisas">Camisas</option>
        <option value="pantalones">Pantalones</option>
        <option value="zapatos">Zapatos</option>
        <option value="gorras">Gorras</option>
      </Form.Select>

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
            obtenerProductos={() => obtenerProductos(paginaActual, busqueda, categoria)} // Mantiene la página y búsqueda actual después de la edición
            productoSeleccionado={productoSeleccionado}
            limpiarSeleccion={cerrarModal}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Inicio;
