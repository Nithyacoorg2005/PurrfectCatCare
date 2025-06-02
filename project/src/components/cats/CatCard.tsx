import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Cat } from '../../types/cat';
import { calculateAge } from '../../utils/dateUtils';

interface CatCardProps {
  cat: Cat;
  onEdit: () => void;
  onDelete: () => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, onEdit, onDelete }) => {
  const catAge = cat.dateOfBirth ? calculateAge(cat.dateOfBirth) : 'Unknown age';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {cat.photoUrl ? (
          <img
            src={cat.photoUrl}
            alt={cat.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{cat.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-0 right-0 p-2 flex space-x-2">
          <button 
            onClick={onEdit}
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={onDelete}
            className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Breed:</span>
            <span className="font-medium">{cat.breed}</span>
          </div>
          <div className="flex justify-between">
            <span>Age:</span>
            <span className="font-medium">{catAge}</span>
          </div>
          {cat.weight && (
            <div className="flex justify-between">
              <span>Weight:</span>
              <span className="font-medium">{cat.weight} kg</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Gender:</span>
            <span className="font-medium capitalize">{cat.gender}</span>
          </div>
          <div className="flex justify-between">
            <span>Neutered/Spayed:</span>
            <span className="font-medium">{cat.isNeutered ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;