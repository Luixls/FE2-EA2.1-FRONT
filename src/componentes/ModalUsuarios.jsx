// src/componentes/ModalUsuarios.jsx
import React from "react";
import { Modal, Table, Button } from "react-bootstrap";

const ModalUsuarios = ({
  mostrar,
  cerrarModal,
  usuarios,
  abrirModalParaEditarUsuario,
}) => {
  return (
    <Modal show={mostrar} onHide={cerrarModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Lista de Usuarios Registrados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {usuarios.length > 0 ? (
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Email</th>
                <th>Nombre Completo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>{usuario.nombreUsuario}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => abrirModalParaEditarUsuario(usuario)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUsuarios;
