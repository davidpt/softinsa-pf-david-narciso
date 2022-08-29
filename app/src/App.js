import './App.css';
import Imoveis from './Imoveis';
import Anuncio from "./Anuncio";
import Editar from './Editar';
import NotFound from "./NotFound";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/imoveis" element={<Imoveis />} />
        <Route path="/anuncio/:id" element={<Anuncio />} />
        <Route path="/anuncio/editar/:id" element={<Editar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
