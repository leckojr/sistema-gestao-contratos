import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout'; // se você tiver layout
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Fornecedores from './pages/Fornecedores';
import TiposAtivo from './pages/TiposAtivo';
import Ativos from './pages/Ativos';
import ContratosVenda from './pages/ContratosVenda';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="fornecedores" element={<Fornecedores />} />
        <Route path="tipos-ativo" element={<TiposAtivo />} />
        <Route path="ativos" element={<Ativos />} />
        <Route path="contratos-venda" element={<ContratosVenda />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
