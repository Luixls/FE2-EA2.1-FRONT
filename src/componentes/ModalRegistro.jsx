// src/componentes/ModalRegistro.jsx
import React from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const ModalRegistro = ({ mostrar, cerrarModal, manejarSubmitRegistro, errorRegistro }) => {
  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarSubmitRegistro}>
          {errorRegistro && <Alert variant="danger">{errorRegistro}</Alert>} {/* Mostrar error si existe */}

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
  );
};

export default ModalRegistro;
