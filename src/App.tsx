// Base Imports
import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import './css/App.css';
// Components
import Layout from './components/Layout';
import Home from './pages/Home';
import Job from './pages/Job';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='job' element={<Job />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;
