// src/componentes/ModalPerfilUsuario.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ModalPerfilUsuario = ({ mostrar, cerrarModal, usuarioId }) => {
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const respuesta = await axios.get(
          `http://localhost:5000/api/usuarios/${usuarioId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsuario(respuesta.data);
      } catch (error) {
        setError("Error al cargar los datos del usuario");
      }
    };

    if (usuarioId) obtenerUsuario();
  }, [usuarioId]);

  const manejarCambio = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/usuarios/${usuarioId}`,
        usuario,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      cerrarModal();
    } catch (error) {
      setError("Error al actualizar el usuario");
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarEnvio}>
          <Form.Group controlId="nombreCompleto">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={usuario.nombreCompleto || ""}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={usuario.email || ""}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={usuario.direccion || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={usuario.telefono || ""}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPerfilUsuario;
