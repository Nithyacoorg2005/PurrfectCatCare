import React, { useState } from 'react';
import { Heart, Phone, ExternalLink, Search, MapPin } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useCats } from '../contexts/CatContext';

// Sample free vet resources
const freeVetResources = [
  {
    id: '1',
    name: 'PetHelp Community Clinic',
    description: 'Free basic check-ups and vaccinations for low-income households.',
    address: '123 Main Street, Anytown, USA',
    phone: '(555) 123-4567',
    website: 'https://example.com/pethelp',
    services: ['Check-ups', 'Vaccinations', 'Spay/Neuter'],
  },
  {
    id: '2',
    name: 'Whiskers Wellness Program',
    description: 'Monthly free clinic for preventative care and advice.',
    address: '456 Oak Avenue, Anytown, USA',
    phone: '(555) 987-6543',
    website: 'https://example.com/whiskers',
    services: ['Preventative Care', 'Dental Checks', 'Nutrition Advice'],
  },
  {
    id: '3',
    name: 'Feline Friends Foundation',
    description: 'Non-profit offering subsidized vet care for cat owners in need.',
    address: '789 Pine Street, Anytown, USA',
    phone: '(555) 456-7890',
    website: 'https://example.com/feline',
    services: ['Emergency Care', 'Chronic Disease Management', 'Medications'],
  },
];

// Sample common health issues
const commonHealthIssues = [
  {
    name: 'Dental Disease',
    symptoms: ['Bad breath', 'Difficulty eating', 'Drooling', 'Red/swollen gums'],
    urgency: 'moderate',
    description: 'Periodontal disease and tooth decay are common in cats, especially older ones. Regular dental check-ups and teeth cleaning can help prevent these issues.',
  },
  {
    name: 'Urinary Tract Issues',
    symptoms: ['Frequent urination', 'Blood in urine', 'Urinating outside litter box', 'Straining to urinate'],
    urgency: 'high',
    description: 'Urinary tract infections and blockages are serious conditions that require prompt veterinary attention, especially in male cats.',
  },
  {
    name: 'Vomiting/Hairballs',
    symptoms: ['Frequent vomiting', 'Retching', 'Reduced appetite', 'Weight loss'],
    urgency: 'variable',
    description: 'Occasional hairballs are normal, but frequent vomiting may indicate digestive issues, allergies, or other health problems.',
  },
  {
    name: 'Upper Respiratory Infections',
    symptoms: ['Sneezing', 'Nasal discharge', 'Watery eyes', 'Lethargy'],
    urgency: 'moderate',
    description: 'Similar to human colds, these viral infections are common, especially in multi-cat households and shelters.',
  },
];

// Urgency level colors
const urgencyColors = {
  low: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
  variable: 'bg-blue-100 text-blue-800',
};

const VetCarePage: React.FC = () => {
  const { activeCat } = useCats();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'resources' | 'health' | 'emergency'>('resources');
  
  // Filter resources based on search query
  const filteredResources = freeVetResources.filter(resource => 
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Veterinary Care</h1>
        <p className="text-gray-600">
          {activeCat 
            ? `Find free vet resources and health information for ${activeCat.name}`
            : 'Find free vet resources and health information for your cats'
          }
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'resources'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('resources')}
            >
              Free Resources
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'health'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('health')}
            >
              Health Info
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                selectedTab === 'emergency'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedTab('emergency')}
            >
              Emergency Care
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'resources' && (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for resources or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              {filteredResources.length > 0 ? (
                <div className="space-y-6">
                  {filteredResources.map(resource => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 text-lg">{resource.name}</h3>
                      <p className="text-gray-600 mt-1">{resource.description}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {resource.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
                          <span>{resource.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{resource.phone}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500"
                        >
                          Visit Website
                          <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No resources found matching your search</p>
                  <p className="text-sm text-gray-400 mt-2">Try a different search term or browse all resources</p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://www.aspca.org/pet-care/cat-care/general-cat-care"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <h4 className="font-medium text-gray-800">ASPCA Cat Care</h4>
                    <p className="text-sm text-gray-600 mt-1">General cat care guidelines from the American Society for the Prevention of Cruelty to Animals.</p>
                    <div className="mt-2 flex items-center text-sm text-purple-600">
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </a>
                  
                  <a
                    href="https://icatcare.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <h4 className="font-medium text-gray-800">International Cat Care</h4>
                    <p className="text-sm text-gray-600 mt-1">Evidence-based information about cats from international experts.</p>
                    <div className="mt-2 flex items-center text-sm text-purple-600">
                      Learn more
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'health' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Health Issues</h3>
                <p className="text-gray-600 mb-4">
                  Recognizing the signs and symptoms of common health problems can help you seek timely veterinary care for your cat.
                </p>
              </div>

              <div className="space-y-6">
                {commonHealthIssues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <h4 className="font-medium text-gray-800">{issue.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[issue.urgency as keyof typeof urgencyColors]}`}>
                        {issue.urgency.charAt(0).toUpperCase() + issue.urgency.slice(1)} Urgency
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="mb-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Common Symptoms:</h5>
                        <ul className="space-y-1">
                          {issue.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm text-gray-600">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preventative Care</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">Regular Check-ups</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Adult cats should see a veterinarian once a year for a check-up. Seniors and cats with chronic conditions may need more frequent visits.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">Dental Care</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Brush your cat's teeth regularly and provide dental treats or toys designed to reduce plaque buildup.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">Parasite Prevention</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Keep your cat on regular flea, tick, and worm prevention as recommended by your veterinarian.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">Nutrition</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Feed a balanced, age-appropriate diet and maintain a healthy weight to prevent obesity-related issues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'emergency' && (
            <div>
              <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800">Emergency Care Information</h3>
                    <p className="mt-2 text-red-700">
                      If your cat is experiencing a life-threatening emergency, contact your local emergency vet clinic immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Signs of Emergency</h3>
                <p className="text-gray-600 mb-4">
                  The following signs indicate your cat needs immediate veterinary attention:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <ul className="space-y-2">
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Difficulty breathing or rapid breathing
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Inability to urinate or defecate
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Seizures or collapse
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Severe vomiting or diarrhea
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <ul className="space-y-2">
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Significant bleeding or trauma
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Ingestion of toxic substances
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Sudden inability to use limbs
                      </li>
                      <li className="text-sm text-red-700 flex items-start">
                        <span className="h-1.5 w-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></span>
                        Extreme lethargy or unresponsiveness
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Preparedness</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Create an Emergency Kit</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Keep these items accessible in case of an emergency:
                  </p>
                  <ul className="space-y-1">
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Your vet's phone number and address
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Address and phone number of the nearest 24-hour emergency clinic
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Pet carrier and blanket
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Recent photo of your cat
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Copy of medical records, including vaccinations
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="h-1.5 w-1.5 bg-gray-500 rounded-full mr-2"></span>
                      Any medications your cat is currently taking
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Resources</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">ASPCA Animal Poison Control</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Call (888) 426-4435 if you suspect your cat has ingested something toxic.
                      <br />
                      <span className="text-gray-500">(Note: A consultation fee may apply)</span>
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">Pet Poison Helpline</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Call (855) 764-7661 for 24/7 assistance with potential poisoning.
                      <br />
                      <span className="text-gray-500">(Note: A consultation fee may apply)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetCarePage;