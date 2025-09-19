import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LawDetail from './pages/LawDetail';
import FAQ from './pages/FAQ';
import Calendar from './pages/Calendar';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Loader from './components/loader';

function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simula un pequeño retardo para mostrar el loader (ajusta según tus necesidades)
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
      <Router>
        <LoaderWrapper>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ley/:lawId" element={<LawDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendario" element={<Calendar />} />
                <Route path="/recursos" element={<Resources />} />
                {/* Catch all other routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LoaderWrapper>
      </Router>
  );
}

export default App;