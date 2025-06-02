import React, { useState } from 'react';
import { Info, AlertTriangle } from 'lucide-react';
import { useCats } from '../contexts/CatContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Sample food recommendations based on cat age
const foodRecommendations = {
  kitten: [
    { 
      name: 'Kitten Growth Formula',
      description: 'High-protein food designed for growing kittens under 1 year.',
      brands: ['Royal Canin Kitten', 'Hill\'s Science Diet Kitten', 'Purina Pro Plan Kitten']
    },
    { 
      name: 'Wet Kitten Food',
      description: 'Provides essential moisture and is easier for kittens to eat.',
      brands: ['Wellness Kitten', 'Blue Buffalo Kitten', 'Iams Perfect Portions Kitten']
    }
  ],
  adult: [
    { 
      name: 'Adult Maintenance',
      description: 'Balanced nutrition for healthy adult cats (1-7 years).',
      brands: ['Purina ONE Adult', 'Iams ProActive Health', 'Blue Buffalo Indoor Adult']
    },
    { 
      name: 'Weight Control',
      description: 'Lower calorie options for less active indoor cats.',
      brands: ['Hill\'s Science Diet Perfect Weight', 'Royal Canin Weight Care', 'Wellness Complete Health Healthy Weight']
    }
  ],
  senior: [
    { 
      name: 'Senior Formula',
      description: 'Easier to digest with nutrients for aging cats (7+ years).',
      brands: ['Purina Pro Plan Senior', 'Royal Canin Aging 12+', 'Hill\'s Science Diet Age Defying']
    },
    { 
      name: 'Joint Support',
      description: 'Contains glucosamine and chondroitin for joint health.',
      brands: ['Blue Buffalo Healthy Aging', 'Iams ProActive Health Mature Adult', 'Nutro Wholesome Essentials Senior']
    }
  ]
};

// Calculate cat age category
const getCatAgeCategory = (dateOfBirth: string | undefined) => {
  if (!dateOfBirth) return 'adult';
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageInYears = today.getFullYear() - birthDate.getFullYear();
  
  if (ageInYears < 1) return 'kitten';
  if (ageInYears >= 7) return 'senior';
  return 'adult';
};

const FoodPage: React.FC = () => {
  const { activeCat } = useCats();
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'schedule' | 'restrictions'>('recommendations');

  // Return early if no active cat is selected
  if (!activeCat) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Cat Selected</h2>
        <p className="text-gray-600">Please select a cat to view food recommendations and schedule.</p>
      </div>
    );
  }

  const ageCategory = getCatAgeCategory(activeCat.dateOfBirth);
  const recommendations = foodRecommendations[ageCategory];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Food & Nutrition</h1>
        <p className="text-gray-600">Manage {activeCat.name}'s diet and nutrition</p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'recommendations'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('recommendations')}
            >
              Recommendations
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'schedule'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('schedule')}
            >
              Feeding Schedule
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'restrictions'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('restrictions')}
            >
              Dietary Restrictions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'recommendations' && (
            <div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Recommendations based on {activeCat.name}'s profile ({ageCategory} cat).
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Food Types</h3>
              
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">{rec.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{rec.description}</p>
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700">Recommended Brands:</h5>
                      <ul className="mt-1 space-y-1">
                        {rec.brands.map((brand, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {brand}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Feeding Guidelines</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">Portion Size</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    For a cat weighing {activeCat.weight ? `${activeCat.weight} kg` : 'unknown weight'}, the recommended portion is:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-600">• Dry food: {activeCat.weight ? `${(activeCat.weight * 20).toFixed(0)}-${(activeCat.weight * 30).toFixed(0)} grams` : 'Check food packaging'} per day, divided into 2-3 meals</li>
                    <li className="text-sm text-gray-600">• Wet food: {activeCat.weight ? `${(activeCat.weight * 25).toFixed(0)}-${(activeCat.weight * 35).toFixed(0)} grams` : 'Check food packaging'} per day</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Feeding Schedule</h3>
                <Button variant="outline" size="sm">Add Feeding Time</Button>
              </div>
              
              {/* Default schedule suggestion */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Recommended Schedule</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-20 text-center">
                      <span className="text-lg font-semibold text-gray-800">7:00</span>
                      <span className="block text-xs text-gray-500">AM</span>
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium text-gray-800">Morning Feeding</h5>
                      <p className="text-sm text-gray-600">Dry food + Fresh water</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-20 text-center">
                      <span className="text-lg font-semibold text-gray-800">1:00</span>
                      <span className="block text-xs text-gray-500">PM</span>
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium text-gray-800">Midday Feeding</h5>
                      <p className="text-sm text-gray-600">Wet food + Fresh water</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-20 text-center">
                      <span className="text-lg font-semibold text-gray-800">7:00</span>
                      <span className="block text-xs text-gray-500">PM</span>
                    </div>
                    <div className="ml-4">
                      <h5 className="font-medium text-gray-800">Evening Feeding</h5>
                      <p className="text-sm text-gray-600">Dry food + Fresh water</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Regular feeding times help maintain your cat's digestive health. Avoid sudden changes to your cat's diet or schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'restrictions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Dietary Restrictions</h3>
                <Button variant="outline" size="sm">Add Restriction</Button>
              </div>
              
              {activeCat.dietaryRestrictions && activeCat.dietaryRestrictions.length > 0 ? (
                <div className="space-y-3">
                  {activeCat.dietaryRestrictions.map((restriction, index) => (
                    <div key={index} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                      <p className="font-medium text-red-700">{restriction}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No dietary restrictions recorded</p>
                  <p className="text-sm text-gray-400 mt-2">Add any allergies or restrictions your cat may have</p>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Foods to Avoid</h3>
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <h4 className="font-medium text-red-700">Common Toxic Foods for Cats</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-red-600">• Chocolate and caffeine</li>
                    <li className="text-sm text-red-600">• Onions, garlic, and chives</li>
                    <li className="text-sm text-red-600">• Grapes and raisins</li>
                    <li className="text-sm text-red-600">• Alcohol</li>
                    <li className="text-sm text-red-600">• Raw eggs and meat</li>
                    <li className="text-sm text-red-600">• Xylitol (artificial sweetener)</li>
                    <li className="text-sm text-red-600">• Dairy products (most cats are lactose intolerant)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPage;