// src/componentes/ModalLogin.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const ModalLogin = ({
  mostrar,
  cerrarModal,
  manejarSubmitLogin,
  errorLogin,
}) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    // Llamar la función manejarSubmitLogin y pasar los valores de email y contraseña
    await manejarSubmitLogin(email, contraseña);
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorLogin && <Alert variant="danger">{errorLogin}</Alert>}
        <Form onSubmit={manejarSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              required
            />
          </Form.Group>
          <Form.Group controlId="contraseña" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
