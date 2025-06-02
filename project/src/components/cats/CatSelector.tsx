import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useCats } from '../../contexts/CatContext';
import { useNavigate } from 'react-router-dom';

const CatSelector: React.FC = () => {
  const { cats, activeCat, setActiveCat } = useCats();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (cats.length === 0) return null;

  const handleAddCat = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeCat ? (
          <>
            <span>{activeCat.name}</span>
            <ChevronDown className="h-4 w-4" />
          </>
        ) : (
          <span>Select a cat</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="py-1">
            {cats.map((cat) => (
              <button
                key={cat.id}
                className={`block w-full text-left px-4 py-2 ${
                  activeCat?.id === cat.id ? 'bg-purple-100 text-purple-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveCat(cat.id);
                  setIsOpen(false);
                }}
              >
                {cat.name}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-1 pt-1">
              <button
                className="block w-full text-left px-4 py-2 text-purple-600 hover:bg-gray-100 flex items-center"
                onClick={handleAddCat}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add a new cat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatSelector;