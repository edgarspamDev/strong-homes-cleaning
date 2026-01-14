import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import { SeoHead } from './SeoHead';

const Home = lazy(() => import('./pages/Home'));
const Book = lazy(() => import('./pages/Book'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const ServiceStandard = lazy(() => import('./pages/ServiceStandard'));
const ServiceDeep = lazy(() => import('./pages/ServiceDeep'));
const ServiceMove = lazy(() => import('./pages/ServiceMove'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <SeoHead />
        <Navbar />
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex items-center justify-center text-slate-700" role="status" aria-live="polite">
              Loading...
            </div>
          }
        >
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
        </Suspense>
        <MobileStickyBar />
        <Footer />
      </HashRouter>
    </ErrorBoundary>
  );
}
