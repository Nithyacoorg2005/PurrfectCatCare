import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CatProvider } from './contexts/CatContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FoodPage from './pages/FoodPage';
import SchedulePage from './pages/SchedulePage';
import VaccinationPage from './pages/VaccinationPage';
import VetCarePage from './pages/VetCarePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <CatProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/food" element={<FoodPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/vaccination" element={<VaccinationPage />} />
            <Route path="/vet-care" element={<VetCarePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </CatProvider>
    </Router>
  );
}

export default App;