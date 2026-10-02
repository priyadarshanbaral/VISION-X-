import { useState } from 'react';
import { MapPin, Map, Compass, ShoppingBag, Menu, X, User, Plane, LogOut, LogIn } from 'lucide-react';
import { useAuth } from './FirebaseProvider';
import { Link, useRouter } from './Router';
import VisionXLogo from './VisionXLogo';

export default function Navbar() {
  const { user, login, logout } = useAuth();
  const { currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/destinations', label: 'Places to Visit', icon: MapPin },
    { href: '/plan', label: 'AI Planner', icon: Map },
    { href: '/heritage', label: 'Heritage Guide', icon: Compass },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/luxury', label: 'Luxury', icon: Plane },
    { href: '/dashboard', label: 'Dashboard', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-300/50 bg-stone-50/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <VisionXLogo size="md" variant="dark" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-medium transition-all hover:-translate-y-0.5 flex items-center gap-2 drop-shadow-sm ${
                  isActive ? 'text-amber-700 font-bold border-b-2 border-amber-600 pb-0.5' : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          
          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <span className="text-xs font-semibold text-stone-600 bg-stone-200/60 px-2.5 py-1 rounded-full">
                {user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Traveler'}
              </span>
              <button 
                onClick={logout} 
                className="text-sm font-bold text-stone-600 hover:text-rose-600 transition-all hover:-translate-y-0.5 flex items-center gap-1.5 drop-shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={login} 
              className="text-sm font-bold bg-amber-500 text-white px-4 py-2 rounded-xl hover:bg-amber-600 transition-all shadow-[0_4px_10px_rgba(245,158,11,0.3)] flex items-center gap-2 ml-4 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <button 
              onClick={logout} 
              title="Logout"
              className="p-2 text-stone-600 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-stone-200 active:translate-y-0.5"
            >
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <button 
              onClick={login} 
              title="Login"
              className="p-2 text-amber-600 bg-amber-50 rounded-lg shadow-[0_2px_8px_rgba(245,158,11,0.2)] border border-amber-200 active:translate-y-0.5"
            >
              <LogIn className="h-5 w-5" />
            </button>
          )}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-stone-200 active:translate-y-0.5"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className="h-5 w-5 text-amber-600" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
