import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCats } from '../contexts/CatContext';
import CatCard from '../components/cats/CatCard';
import CatForm from '../components/cats/CatForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { cats, addCat, updateCat, deleteCat } = useCats();
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  const handleAddCat = (catData: Omit<any, 'id'>) => {
    addCat(catData);
    setIsAddingCat(false);
  };

  const handleUpdateCat = (id: string, catData: Partial<any>) => {
    updateCat(id, catData);
    setEditingCatId(null);
  };

  const handleDeleteCat = (id: string) => {
    if (window.confirm('Are you sure you want to delete this cat?')) {
      deleteCat(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cat Profiles</h1>
        {!isAddingCat && (
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => setIsAddingCat(true)}
          >
            Add Cat
          </Button>
        )}
      </div>

      {isAddingCat && (
        <Card title="Add New Cat" className="mb-8">
          <CatForm
            onSubmit={handleAddCat}
            onCancel={() => setIsAddingCat(false)}
          />
        </Card>
      )}

      {editingCatId && (
        <Card title="Edit Cat" className="mb-8">
          <CatForm
            initialData={cats.find(cat => cat.id === editingCatId)}
            onSubmit={(catData) => handleUpdateCat(editingCatId, catData)}
            onCancel={() => setEditingCatId(null)}
          />
        </Card>
      )}

      {cats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              onEdit={() => setEditingCatId(cat.id)}
              onDelete={() => handleDeleteCat(cat.id)}
            />
          ))}
        </div>
      ) : (
        !isAddingCat && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No Cats Added Yet</h2>
            <p className="text-gray-600 mb-6">
              Add your first cat to start tracking their health, food preferences, and daily schedule.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              icon={<Plus className="h-5 w-5" />}
              onClick={() => setIsAddingCat(true)}
            >
              Add Your First Cat
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;