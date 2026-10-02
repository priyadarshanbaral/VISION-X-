import ErrorBoundary from './components/ErrorBoundary';
import AuthProvider from './components/AuthProvider';
import { RouterProvider, useRouter, Link } from './components/Router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlanPage from './pages/PlanPage';
import HeritagePage from './pages/HeritagePage';
import DestinationsPage from './pages/DestinationsPage';
import MarketplacePage from './pages/MarketplacePage';
import LuxuryPage from './pages/LuxuryPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VisionXLogo from './components/VisionXLogo';
import { Compass, Heart } from 'lucide-react';

function PageRouter() {
  const { currentPath } = useRouter();

  let CurrentComponent = HomePage;
  if (currentPath.startsWith('/destinations')) {
    CurrentComponent = DestinationsPage;
  } else if (currentPath.startsWith('/plan')) {
    CurrentComponent = PlanPage;
  } else if (currentPath.startsWith('/heritage')) {
    CurrentComponent = HeritagePage;
  } else if (currentPath.startsWith('/marketplace')) {
    CurrentComponent = MarketplacePage;
  } else if (currentPath.startsWith('/luxury')) {
    CurrentComponent = LuxuryPage;
  } else if (currentPath.startsWith('/dashboard')) {
    CurrentComponent = DashboardPage;
  } else if (currentPath.startsWith('/login')) {
    CurrentComponent = LoginPage;
  } else if (currentPath.startsWith('/signup')) {
    CurrentComponent = SignupPage;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-500 selection:text-white">
      <Navbar />
      <div className="flex-grow">
        <CurrentComponent />
      </div>
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center">
            <VisionXLogo size="md" variant="light" />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link href="/destinations" className="hover:text-amber-400 transition-colors">Places to Visit</Link>
            <Link href="/plan" className="hover:text-amber-400 transition-colors">AI Planner</Link>
            <Link href="/heritage" className="hover:text-amber-400 transition-colors">Heritage Guide</Link>
            <Link href="/marketplace" className="hover:text-amber-400 transition-colors">GI Handicrafts</Link>
            <Link href="/luxury" className="hover:text-amber-400 transition-colors">Luxury & Transit</Link>
            <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Traveler Hub</Link>
          </div>
          <div className="text-xs text-stone-400 flex items-center gap-1">
            Dedicated to the timeless culture of Odisha with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Vision X
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider>
          <PageRouter />
        </RouterProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
