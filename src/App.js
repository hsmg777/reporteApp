import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bienvenida from './components/Bienvenida';
import Reporte from './components/Reporte';
import Resultados from './components/Resultados';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Bienvenida/>} />
          <Route path="/reporte/:id_reporte" element={<Reporte/>} />
          <Route path="/resultados/:id_reporte" element={<Resultados/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
