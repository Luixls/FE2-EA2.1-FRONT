// src/componentes/ModalEditarUsuario.jsx

import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ModalEditarUsuario = ({
  mostrar,
  cerrarModal,
  usuarioId,
  actualizarUsuarios,
}) => {
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    email: "",
    nombreCompleto: "",
    direccion: "",
    telefono: "",
    nuevaContraseña: "",
    confirmarContraseña: "",
  });
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (usuarioId) {
      // Obtener los datos del usuario actual desde la API
      const obtenerDatosUsuario = async () => {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const respuesta = await axios.get(
            `http://localhost:5000/api/usuarios/${usuarioId}`,
            config
          );
          setUsuario({
            nombreUsuario: respuesta.data.nombreUsuario,
            email: respuesta.data.email,
            nombreCompleto: respuesta.data.nombreCompleto,
            direccion: respuesta.data.direccion || "",
            telefono: respuesta.data.telefono || "",
          });
        } catch (error) {
          console.error("Error al obtener los datos del usuario", error);
        }
      };
      obtenerDatosUsuario();
    }
  }, [usuarioId]);

  const manejarCambio = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (usuario.nuevaContraseña !== usuario.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Enviar datos al backend
      await axios.put(
        `http://localhost:5000/api/usuarios/${usuarioId}`,
        usuario,
        config
      );

      setMensaje("Perfil actualizado correctamente");
      setError(null);
      actualizarUsuarios();
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      setError("Error al actualizar el perfil");
    }
  };

  const cerrarModalYResetear = () => {
    cerrarModal();
    setMensaje(null); // Restablecer el mensaje cuando se cierre el modal
    setError(null); // Restablecer el error cuando se cierre el modal
  };

  return (
    <Modal show={mostrar} onHide={cerrarModalYResetear}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mensaje && <Alert variant="success">{mensaje}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarSubmit}>
          <Form.Group controlId="nombreUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombreUsuario"
              value={usuario.nombreUsuario}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={usuario.email}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group controlId="nombreCompleto" className="mt-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={usuario.nombreCompleto}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="direccion" className="mt-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={usuario.direccion}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="telefono" className="mt-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={usuario.telefono}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="nuevaContraseña" className="mt-3">
            <Form.Label>Nueva Contraseña (opcional)</Form.Label>
            <Form.Control
              type="password"
              name="nuevaContraseña"
              placeholder="Ingresa una nueva contraseña"
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="confirmarContraseña" className="mt-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmarContraseña"
              placeholder="Confirma la nueva contraseña"
              onChange={manejarCambio}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarUsuario;
