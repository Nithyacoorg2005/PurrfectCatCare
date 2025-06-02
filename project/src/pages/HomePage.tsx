import React from 'react';
import { Calendar, Utensils, Syringe, Heart, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCats } from '../contexts/CatContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { cats, activeCat } = useCats();
  const navigate = useNavigate();

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Get upcoming events (would normally come from schedule data)
  const upcomingEvents = [
    { id: '1', title: 'Morning Feeding', time: '8:00 AM', type: 'feeding' },
    { id: '2', title: 'Playtime', time: '10:30 AM', type: 'playtime' },
    { id: '3', title: 'Evening Feeding', time: '6:00 PM', type: 'feeding' },
  ];

  // Get cat's info if available
  const catAge = activeCat?.dateOfBirth
    ? new Date().getFullYear() - new Date(activeCat.dateOfBirth).getFullYear()
    : null;

  if (!activeCat) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to PurrfectCare</h1>
          <p className="text-gray-600 mb-8">Your all-in-one solution for cat care and management</p>
          
          {cats.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Let's get started!</h2>
              <p className="text-gray-600 mb-6">Add your first cat to begin tracking their health, diet, and schedule.</p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/profile')}
              >
                Add Your First Cat
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a Cat</h2>
              <p className="text-gray-600 mb-6">Choose one of your cats from the selector in the header to view their dashboard.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cats.map(cat => (
                  <div
                    key={cat.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer transition-colors"
                    onClick={() => navigate('/profile')}
                  >
                    <h3 className="font-medium text-gray-800">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.breed}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{activeCat.name}'s Dashboard</h1>
          <p className="text-gray-500">{formattedDate}</p>
        </div>
        <p className="text-gray-600">
          {catAge !== null 
            ? `${activeCat.breed}, ${catAge} year${catAge === 1 ? '' : 's'} old`
            : activeCat.breed
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card
          title="Today's Schedule"
          icon={<Clock className="h-5 w-5" />}
          className="col-span-1"
        >
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center">
                  <div className="w-12 text-sm text-gray-500">{event.time}</div>
                  <div className="flex-1 ml-4">
                    <h4 className="text-gray-800 font-medium">{event.title}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No events scheduled for today</p>
            )}
          </div>
          <div className="mt-4 text-right">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/schedule')}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View Full Schedule
            </Button>
          </div>
        </Card>

        <Card
          title="Health Status"
          icon={<Heart className="h-5 w-5" />}
          className="col-span-1"
        >
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">
                {activeCat.weight ? `${activeCat.weight} kg` : 'Not recorded'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last check-up:</span>
              <span className="font-medium">Not recorded</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vaccinations:</span>
              <span className="font-medium">
                {activeCat.vaccinations?.length || 0} recorded
              </span>
            </div>
          </div>
          <div className="mt-4 text-right">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/vaccination')}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View Health Records
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/food')}
        >
          <Utensils className="h-8 w-8 text-orange-500 mb-3" />
          <h3 className="font-semibold text-gray-800">Food & Nutrition</h3>
          <p className="text-sm text-gray-500 mt-1">Manage diet & recommendations</p>
        </div>
        
        <div 
          className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/schedule')}
        >
          <Calendar className="h-8 w-8 text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-800">Daily Schedule</h3>
          <p className="text-sm text-gray-500 mt-1">Feeding, play & sleep times</p>
        </div>
        
        <div 
          className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/vaccination')}
        >
          <Syringe className="h-8 w-8 text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-800">Vaccinations</h3>
          <p className="text-sm text-gray-500 mt-1">Track health & vaccine records</p>
        </div>
        
        <div 
          className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/vet-care')}
        >
          <Heart className="h-8 w-8 text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-800">Vet Care</h3>
          <p className="text-sm text-gray-500 mt-1">Find free resources & advice</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;