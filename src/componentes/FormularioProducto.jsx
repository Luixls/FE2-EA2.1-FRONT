// src/componentes/FormularioProducto.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import AuthContext from "../context/AuthContext"; // Importar el contexto de autenticación

const FormularioProducto = ({
  mostrar,
  cerrarModal,
  obtenerProductos,
  productoSeleccionado,
}) => {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "camisas",
    descripcion: "",
    precio: 0,
    cantidad: 0,
    imagen: "",
  });

  const { usuarioAutenticado } = useContext(AuthContext); // Obtener el token del contexto de autenticación

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
      const token = localStorage.getItem("token"); // Obtener el token directamente de localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en las solicitudes protegidas
        },
      };

      if (productoSeleccionado) {
        // Actualizar producto existente
        await axios.put(
          `http://localhost:5000/api/productos/${producto._id}`,
          producto,
          config
        );
      } else {
        // Crear nuevo producto
        await axios.post(
          "http://localhost:5000/api/productos",
          producto,
          config
        );
      }
      obtenerProductos();
      limpiarFormulario();
      cerrarModal(); // Se cierra el modal después de agregar o editar el producto
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  // Función para limpiar el formulario después de agregar o editar un producto
  const limpiarFormulario = () => {
    setProducto({
      nombre: "",
      categoria: "camisas",
      descripcion: "",
      precio: 0,
      cantidad: 0,
      imagen: "",
    });
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {productoSeleccionado ? "Editar Producto" : "Agregar Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
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

          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={producto.descripcion}
              onChange={manejarCambio}
            />
          </Form.Group>

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
            {productoSeleccionado ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioProducto;
