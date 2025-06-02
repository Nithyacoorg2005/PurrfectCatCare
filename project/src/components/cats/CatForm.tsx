import React, { useState } from 'react';
import { Cat as CatType, CatBreed } from '../../types/cat';

interface CatFormProps {
  initialData?: Partial<CatType>;
  onSubmit: (cat: Omit<CatType, 'id'>) => void;
  onCancel?: () => void;
}

const breeds: CatBreed[] = [
  'Persian', 'Maine Coon', 'Siamese', 'Bengal', 'Ragdoll', 
  'Sphynx', 'British Shorthair', 'Scottish Fold', 'Abyssinian', 
  'American Shorthair', 'Mixed', 'Other'
];

const CatForm: React.FC<CatFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    breed: initialData?.breed || 'Mixed',
    weight: initialData?.weight || undefined,
    color: initialData?.color || '',
    gender: initialData?.gender || 'female',
    isNeutered: initialData?.isNeutered || false,
    photoUrl: initialData?.photoUrl || '',
    microchipId: initialData?.microchipId || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<CatType, 'id'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
              Breed *
            </label>
            <select
              id="breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isNeutered"
              name="isNeutered"
              checked={formData.isNeutered}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="isNeutered" className="ml-2 block text-sm text-gray-700">
              Is neutered/spayed
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="microchipId" className="block text-sm font-medium text-gray-700">
          Microchip ID
        </label>
        <input
          type="text"
          id="microchipId"
          name="microchipId"
          value={formData.microchipId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CatForm;