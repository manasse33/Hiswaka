import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import DataCatalog from './pages/DataCatalog'; // (À créer basé sur votre DataPage)
import DataDetail from './pages/DataDetail';
import Projects from './pages/Projects'; // (À créer basé sur votre ProjectsPage)
import Resources from './pages/Resources'; // (À créer basé sur votre ResourcesPage)
import AdminETL from './pages/AdminETL';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DataAccessRequest from './pages/DataAccessRequest';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donnees" element={<DataCatalog />} />
          <Route path="/donnees/:id" element={<DataDetail />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/ressources" element={<Resources />} />
          {/* <Route path="/admin" element={<AdminETL />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/demande" element={<DataAccessRequest />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;