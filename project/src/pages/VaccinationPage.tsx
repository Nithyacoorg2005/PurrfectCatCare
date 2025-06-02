import React, { useState } from 'react';
import { Plus, Calendar, Shield, Syringe, AlertTriangle } from 'lucide-react';
import { useCats } from '../contexts/CatContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Sample vaccination data
const sampleVaccinations = [
  {
    id: '1',
    name: 'Rabies',
    dateAdministered: '2023-06-15',
    nextDueDate: '2024-06-15',
    veterinarian: 'Dr. Smith',
    notes: 'One-year vaccine administered',
  },
  {
    id: '2',
    name: 'FVRCP',
    dateAdministered: '2023-04-10',
    nextDueDate: '2024-04-10',
    veterinarian: 'Dr. Johnson',
    notes: 'Annual booster',
  },
];

// Core and non-core vaccines for cats
const vaccineTypes = {
  core: [
    { name: 'Rabies', description: 'Protects against the rabies virus, which is fatal. Required by law in most areas.' },
    { name: 'FVRCP', description: 'Protects against Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia (also called feline distemper).' },
  ],
  nonCore: [
    { name: 'FeLV', description: 'Feline Leukemia Virus vaccine. Recommended for outdoor cats or cats in multi-cat environments.' },
    { name: 'Bordetella', description: 'Protects against upper respiratory infections. Often required for boarding.' },
    { name: 'FIV', description: 'Feline Immunodeficiency Virus vaccine. May be recommended for cats at high risk.' },
  ],
};

const VaccinationPage: React.FC = () => {
  const { activeCat } = useCats();
  const [isAddingVaccine, setIsAddingVaccine] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'records' | 'info'>('records');
  
  // Sample vaccine form state
  const [formData, setFormData] = useState({
    name: '',
    dateAdministered: '',
    nextDueDate: '',
    veterinarian: '',
    notes: '',
  });

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would add to cat's vaccinations
    setIsAddingVaccine(false);
    setFormData({
      name: '',
      dateAdministered: '',
      nextDueDate: '',
      veterinarian: '',
      notes: '',
    });
  };

  // Return early if no active cat is selected
  if (!activeCat) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Cat Selected</h2>
        <p className="text-gray-600">Please select a cat to view and manage their vaccinations.</p>
      </div>
    );
  }

  // Get upcoming and overdue vaccinations
  const today = new Date();
  const vaccinations = sampleVaccinations;
  const upcomingVaccinations = vaccinations.filter(v => {
    const dueDate = new Date(v.nextDueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 && daysDiff <= 30;
  });
  
  const overdueVaccinations = vaccinations.filter(v => {
    const dueDate = new Date(v.nextDueDate);
    return dueDate < today;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Vaccinations</h1>
        <p className="text-gray-600">Manage {activeCat.name}'s vaccination records</p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'records'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('records')}
            >
              Vaccination Records
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'info'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('info')}
            >
              Vaccine Information
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'records' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Vaccination Records</h3>
                <Button
                  variant="primary"
                  icon={<Plus className="h-4 w-4" />}
                  onClick={() => setIsAddingVaccine(true)}
                >
                  Add Vaccine
                </Button>
              </div>

              {isAddingVaccine && (
                <div className="mb-8 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-4">Add Vaccination Record</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Vaccine Name
                        </label>
                        <select
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="">Select Vaccine</option>
                          <optgroup label="Core Vaccines">
                            {vaccineTypes.core.map(vaccine => (
                              <option key={vaccine.name} value={vaccine.name}>
                                {vaccine.name}
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Non-Core Vaccines">
                            {vaccineTypes.nonCore.map(vaccine => (
                              <option key={vaccine.name} value={vaccine.name}>
                                {vaccine.name}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="dateAdministered" className="block text-sm font-medium text-gray-700 mb-1">
                          Date Administered
                        </label>
                        <input
                          type="date"
                          id="dateAdministered"
                          name="dateAdministered"
                          value={formData.dateAdministered}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nextDueDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Next Due Date
                        </label>
                        <input
                          type="date"
                          id="nextDueDate"
                          name="nextDueDate"
                          value={formData.nextDueDate}
                          onChange={handleChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="veterinarian" className="block text-sm font-medium text-gray-700 mb-1">
                          Veterinarian
                        </label>
                        <input
                          type="text"
                          id="veterinarian"
                          name="veterinarian"
                          value={formData.veterinarian}
                          onChange={handleChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Optional notes"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingVaccine(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        Add Vaccination
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {overdueVaccinations.length > 0 && (
                <div className="mb-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {overdueVaccinations.length} vaccination{overdueVaccinations.length > 1 ? 's are' : ' is'} overdue
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {upcomingVaccinations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Upcoming Vaccinations</h4>
                  <div className="space-y-2">
                    {upcomingVaccinations.map(vaccine => {
                      const dueDate = new Date(vaccine.nextDueDate);
                      const today = new Date();
                      const timeDiff = dueDate.getTime() - today.getTime();
                      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                      
                      return (
                        <div key={vaccine.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                          <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">{vaccine.name} due in {daysDiff} days</p>
                            <p className="text-sm text-gray-600">
                              Due on {new Date(vaccine.nextDueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {vaccinations.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">All Vaccinations</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vaccine
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Given
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Next Due
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Veterinarian
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {vaccinations.map(vaccine => (
                          <tr key={vaccine.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {vaccine.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(vaccine.dateAdministered).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(vaccine.nextDueDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {vaccine.veterinarian || 'Not specified'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Syringe className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">No Vaccinations Recorded</h2>
                  <p className="text-gray-600 mb-6">
                    Add vaccination records to track {activeCat.name}'s immunization history.
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'info' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">About Cat Vaccines</h3>
                <p className="text-gray-600 mb-4">
                  Vaccines help protect your cat from various infectious diseases. They work by stimulating the immune system to recognize and fight specific pathogens.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Always consult with your veterinarian to determine the appropriate vaccination schedule for your cat based on their age, health status, and lifestyle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-medium text-gray-800 mb-3">Core Vaccines</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Core vaccines are recommended for all cats, regardless of their lifestyle.
                </p>
                <div className="space-y-4">
                  {vaccineTypes.core.map(vaccine => (
                    <div key={vaccine.name} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800">{vaccine.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{vaccine.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Non-Core Vaccines</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Non-core vaccines are given based on the cat's risk of exposure to specific diseases.
                </p>
                <div className="space-y-4">
                  {vaccineTypes.nonCore.map(vaccine => (
                    <div key={vaccine.name} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800">{vaccine.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{vaccine.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccinationPage;