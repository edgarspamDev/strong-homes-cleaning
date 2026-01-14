import { HashRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import Home from './pages/Home';
import Book from './pages/Book';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import ServiceStandard from './pages/ServiceStandard';
import ServiceDeep from './pages/ServiceDeep';
import ServiceMove from './pages/ServiceMove';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { SeoHead } from './SeoHead';

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <SeoHead />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/standard" element={<ServiceStandard />} />
          <Route path="/services/deep" element={<ServiceDeep />} />
          <Route path="/services/move-in-out" element={<ServiceMove />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileStickyBar />
        <Footer />
      </HashRouter>
    </ErrorBoundary>
  );
}
