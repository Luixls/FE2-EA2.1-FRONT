import React from "react";
import { Modal, Table, Button, Alert } from "react-bootstrap";
import axios from "axios";

const ModalFavoritos = ({ mostrar, cerrarModal, favoritos, setFavoritos }) => {
  const eliminarDeFavoritos = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/favoritos/${productoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Filtrar la lista de favoritos para eliminar el producto
      setFavoritos(favoritos.filter((producto) => producto._id !== productoId));
      alert("Producto eliminado de favoritos");
    } catch (error) {
      console.error("Error al eliminar de favoritos", error);
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Mis Productos Favoritos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {favoritos.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: "#007BFF", color: "white" }}>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((producto) => (
                  <tr key={producto._id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio}</td>
                    <td>
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{
                          width: "75px",
                          height: "75px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => eliminarDeFavoritos(producto._id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Alert variant="warning">
            No se han encontrado productos en tu lista de favoritos.
          </Alert>
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

export default ModalFavoritos;
