// src/paginas/Inicio.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Pagination } from 'react-bootstrap';
import BotonesAutenticacion from '../componentes/BotonesAutenticacion';
import FiltroProductos from '../componentes/FiltroProductos';
import ListaProductos from '../componentes/ListaProductos';
import ModalLogin from '../componentes/ModalLogin';
import ModalRegistro from '../componentes/ModalRegistro';
import FormularioProducto from '../componentes/FormularioProducto';
import AuthContext from '../context/AuthContext';
import './Inicio.css';

const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const { usuarioAutenticado, login, registrar, logout } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState(null);
  const [errorRegistro, setErrorRegistro] = useState(null);  // Estado para manejar errores de registro

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
    obtenerProductos(paginaActual, busqueda, categoria);
  }, [paginaActual, busqueda, categoria]);

  const abrirModalParaCrearProducto = () => {
    setProductoSeleccionado(null);
    setMostrarModalProducto(true);
  };

  const abrirModalParaEditarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalProducto(true);
  };

  const cerrarModal = () => {
    setMostrarModalProducto(false);
    setMostrarModalLogin(false);
    setMostrarModalRegistro(false);
    setErrorLogin(null); 
    setErrorRegistro(null);  // Limpiar el error de registro al cerrar el modal
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/productos/${id}`);
      obtenerProductos(paginaActual, busqueda, categoria);
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  const manejarSubmitLogin = async (email, contraseña) => {
    const mensajeError = await login(email, contraseña);
    if (mensajeError) {
      setErrorLogin(mensajeError);
    } else {
      cerrarModal();
    }
  };

  const manejarSubmitRegistro = async (e) => {
    e.preventDefault();
    const nombreUsuario = e.target.nombreUsuario.value;
    const nombreCompleto = e.target.nombreCompleto.value;
    const email = e.target.email.value;
    const contraseña = e.target.contraseña.value;
    const confirmarContraseña = e.target.confirmarContraseña.value;
  
    const mensajeError = await registrar({ nombreUsuario, nombreCompleto, email, contraseña, confirmarContraseña });
    
    if (mensajeError) {
      setErrorRegistro(mensajeError);  // Mostrar mensaje de error de registro en la UI
    } else {
      cerrarModal();
    }
  };

  const manejarCambioBusqueda = (e) => setBusqueda(e.target.value);
  const manejarCambioCategoria = (e) => setCategoria(e.target.value);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Inventario de Productos</h1>

      <BotonesAutenticacion
        usuarioAutenticado={usuarioAutenticado}
        abrirModalLogin={() => setMostrarModalLogin(true)}
        abrirModalRegistro={() => setMostrarModalRegistro(true)}
        logout={logout}
        abrirModalParaCrearProducto={abrirModalParaCrearProducto}
      />

      <FiltroProductos
        busqueda={busqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
        categoria={categoria}
        manejarCambioCategoria={manejarCambioCategoria}
      />

      <ListaProductos
        productos={productos}
        abrirModalParaEditarProducto={abrirModalParaEditarProducto}
        eliminarProducto={eliminarProducto}
      />

      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1} />
        {[...Array(totalPaginas).keys()].map((numero) => (
          <Pagination.Item key={numero + 1} active={numero + 1 === paginaActual} onClick={() => setPaginaActual(numero + 1)}>
            {numero + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
      </Pagination>

      <FormularioProducto
        mostrar={mostrarModalProducto}
        cerrarModal={cerrarModal}
        productoSeleccionado={productoSeleccionado}
        obtenerProductos={() => obtenerProductos(paginaActual, busqueda, categoria)}
      />

      <ModalLogin
        mostrar={mostrarModalLogin}
        cerrarModal={cerrarModal}
        manejarSubmitLogin={manejarSubmitLogin}
        errorLogin={errorLogin}
      />

      <ModalRegistro
        mostrar={mostrarModalRegistro}
        cerrarModal={cerrarModal}
        manejarSubmitRegistro={manejarSubmitRegistro}
        errorRegistro={errorRegistro} // Pasar errorRegistro a ModalRegistro
      />
    </Container>
  );
};

export default Inicio;
