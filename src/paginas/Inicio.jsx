import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Modal, Pagination, Form } from 'react-bootstrap';
import FormularioProducto from '../componentes/FormularioProducto';
import AuthContext from '../context/AuthContext'; // Importamos el contexto de autenticación
import './Inicio.css';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para almacenar el producto a editar
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false); // Para controlar la visibilidad del modal de producto
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false); // Para el modal de Login
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false); // Para el modal de Registro
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [totalPaginas, setTotalPaginas] = useState(1); // Total de páginas
  const [busqueda, setBusqueda] = useState(''); // Texto de búsqueda
  const [categoria, setCategoria] = useState(''); // Filtro de categoría
  const { usuarioAutenticado, login, registrar, logout } = useContext(AuthContext); // Autenticación

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

  // Función para abrir el modal en modo de creación de producto
  const abrirModalParaCrearProducto = () => {
    setProductoSeleccionado(null); // Limpia el producto seleccionado (para creación)
    setMostrarModalProducto(true);
  };

  // Función para abrir el modal en modo de edición
  const abrirModalParaEditarProducto = (producto) => {
    setProductoSeleccionado(producto); // Almacena el producto a editar
    setMostrarModalProducto(true);
  };

  // Función para cerrar los modales
  const cerrarModal = () => {
    setMostrarModalProducto(false);
    setMostrarModalLogin(false);
    setMostrarModalRegistro(false);
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

  // Función para manejar el inicio de sesión
  const manejarSubmitLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const contraseña = e.target.contraseña.value;
    login(email, contraseña);
    cerrarModal();
  };

  // Función para manejar el registro de usuario
  const manejarSubmitRegistro = (e) => {
    e.preventDefault();
    const nombreUsuario = e.target.nombreUsuario.value;
    const nombreCompleto = e.target.nombreCompleto.value;
    const email = e.target.email.value;
    const contraseña = e.target.contraseña.value;
    const confirmarContraseña = e.target.confirmarContraseña.value;
    registrar({ nombreUsuario, nombreCompleto, email, contraseña, confirmarContraseña });
    cerrarModal();
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Inventario de Productos</h1>

      {/* Botones de autenticación */}
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
            <Button variant="primary" onClick={() => setMostrarModalLogin(true)}>
              Iniciar Sesión
            </Button>
            <Button variant="secondary" onClick={() => setMostrarModalRegistro(true)} className="ml-2">
              Registrarse
            </Button>
          </>
        )}
      </div>

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
                <Button variant="primary" onClick={() => abrirModalParaEditarProducto(producto)}>Editar</Button>
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
      <Modal show={mostrarModalProducto} onHide={cerrarModal}>
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

      {/* Modal de Login */}
      <Modal show={mostrarModalLogin} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={manejarSubmitLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu email" required />
            </Form.Group>
            <Form.Group controlId="contraseña" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Registro */}
      <Modal show={mostrarModalRegistro} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={manejarSubmitRegistro}>
            <Form.Group controlId="nombreUsuario">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" required />
            </Form.Group>
            <Form.Group controlId="nombreCompleto" className="mt-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre completo" required />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu email" required />
            </Form.Group>
            <Form.Group controlId="contraseña" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" required />
            </Form.Group>
            <Form.Group controlId="confirmarContraseña" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Confirma tu contraseña" required />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Inicio;
