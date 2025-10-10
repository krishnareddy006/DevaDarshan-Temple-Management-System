import { Menu, X, BookTemplate as Temple } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Poojas', href: '/templepoojas' },
  { name: 'Donations', href: '/donations' },
  { name: 'Book Darshan', href: '/bookdarshan' },
  { name: 'Accommodation', href: '/accommodation' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-orange-50 via-white to-orange-100 shadow-md sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3" aria-label="Main Navigation">
        
        {/* Logo */}
        <div className="flex items-center lg:flex-1">
           <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
           <img
                src="logo2.png" 
                alt="Temple Logo"
                className="h-16 w-auto"
           />
           </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-700"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-gray-800 hover:text-orange-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
          <Link to="/login">
            <button className="text-sm font-medium text-gray-800 hover:text-orange-600 px-4 py-2 rounded-md border border-gray-300 transition-all">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-md transition-all">
              Sign up
            </button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:mx-auto shadow-xl animate-slideIn">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Temple className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">Temple Management</span>
            </Link>
            <button
              type="button"
              className="p-2 text-gray-700"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-gray-800 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full text-base font-medium text-gray-800 hover:text-orange-600 px-4 py-2 border border-gray-300 rounded-md transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full text-base font-medium text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-md transition-all">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
