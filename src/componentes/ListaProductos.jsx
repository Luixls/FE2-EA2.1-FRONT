// src/componentes/ListaProductos.jsx
import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const ListaProductos = ({
  productos,
  abrirModalParaEditarProducto,
  eliminarProducto,
  rolUsuario,
  usuarioAutenticado,
}) => {
  const agregarAFavoritos = async (productoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/favoritos/${productoId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Producto agregado a favoritos");
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
    }
  };

  return (
    <Row className="mt-4">
      {productos.map((producto) => (
        <Col md={4} key={producto._id} className="mb-4">
          <Card style={{ boxShadow: "var(--shadow)", borderRadius: "12px" }}>
            <div className="img-container">
              <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fixed"
              />
            </div>
            <Card.Body>
              <Card.Title
                style={{ fontWeight: "bold", color: "var(--primary-color)" }}
              >
                {producto.nombre}
              </Card.Title>
              <Card.Text>
                <strong>Categoría:</strong> {producto.categoria}
                <br />
                <strong>Descripción:</strong> {producto.descripcion}
                <br />
                <strong>Precio:</strong> {producto.precio} USD
                <br />
                <strong>Cantidad:</strong> {producto.cantidad}
              </Card.Text>
              {usuarioAutenticado && (
                <Button
                  style={{ backgroundColor: "var(--accent-color)" }}
                  onClick={() => agregarAFavoritos(producto._id)}
                >
                  Agregar a Favoritos
                </Button>
              )}
              {rolUsuario === "admin" && (
                <>
                  <Button
                    variant="primary"
                    onClick={() => abrirModalParaEditarProducto(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => eliminarProducto(producto._id)}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListaProductos;
