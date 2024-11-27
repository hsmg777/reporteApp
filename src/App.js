import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bienvenida from './components/Bienvenida';
import Reporte from './components/Reporte';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Bienvenida/>} />
          <Route path="/reporte/:id_reporte" element={<Reporte/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
