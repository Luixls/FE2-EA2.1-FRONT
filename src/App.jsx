// src/App.jsx
import React from "react";
import Inicio from "./paginas/Inicio";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Inicio />
      </div>
    </AuthProvider>
  );
}

export default App;
