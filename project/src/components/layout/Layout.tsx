import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Cat, 
  Home, 
  Calendar, 
  Syringe, 
  Utensils, 
  Heart, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useCats } from '../../contexts/CatContext';
import CatSelector from '../cats/CatSelector';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cats, activeCat } = useCats();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/profile', icon: Cat, label: 'Profile' },
    { path: '/food', icon: Utensils, label: 'Food' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/vaccination', icon: Syringe, label: 'Vaccinations' },
    { path: '/vet-care', icon: Heart, label: 'Vet Care' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cat className="h-8 w-8" />
            <h1 className="text-2xl font-bold">PurrfectCare</h1>
          </div>
          
          <div className="hidden md:block">
            {cats.length > 0 ? (
              <CatSelector />
            ) : (
              <button 
                onClick={() => navigate('/profile')}
                className="px-4 py-2 bg-white text-purple-600 rounded-full text-sm font-medium hover:bg-purple-50 transition-colors"
              >
                Add a Cat
              </button>
            )}
          </div>
          
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            {cats.length > 0 ? (
              <CatSelector />
            ) : (
              <button 
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium"
              >
                Add a Cat
              </button>
            )}
          </div>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left ${
                  location.pathname === item.path
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="py-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left ${
                  location.pathname === item.path
                    ? 'bg-purple-100 text-purple-600 border-r-4 border-purple-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {cats.length === 0 && location.pathname !== '/profile' ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Cat className="h-16 w-16 text-purple-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No cats yet!</h2>
              <p className="text-gray-500 mb-4">Add your first cat to get started</p>
              <button
                onClick={() => navigate('/profile')}
                className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Add a Cat
              </button>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {/* Bottom navigation (mobile only) */}
      <nav className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 ${
                location.pathname === item.path
                  ? 'text-purple-600'
                  : 'text-gray-500'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Extra padding at bottom for mobile to account for bottom nav */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default Layout;