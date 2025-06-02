import React, { useState } from 'react';
import { Clock, Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import { useCats } from '../contexts/CatContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Sample schedule data
const sampleSchedule = [
  { id: '1', type: 'feeding', name: 'Morning Feeding', time: '07:00', recurring: true, recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
  { id: '2', type: 'feeding', name: 'Midday Feeding', time: '13:00', recurring: true, recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
  { id: '3', type: 'feeding', name: 'Evening Feeding', time: '19:00', recurring: true, recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
  { id: '4', type: 'playtime', name: 'Morning Play', time: '09:00', duration: 15, recurring: true, recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] },
  { id: '5', type: 'playtime', name: 'Evening Play', time: '18:00', duration: 20, recurring: true, recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
  { id: '6', type: 'medication', name: 'Hairball Treatment', time: '08:00', recurring: true, recurringDays: ['monday', 'thursday'] },
];

const daysOfWeek = [
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' },
  { value: 'sunday', label: 'Sun' },
];

type ScheduleItem = typeof sampleSchedule[0];
type ScheduleType = 'feeding' | 'playtime' | 'sleep' | 'medication' | 'other';

const typeColors: Record<ScheduleType, { bg: string; text: string; icon: React.ReactNode }> = {
  feeding: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Utensils className="h-4 w-4" /> },
  playtime: { bg: 'bg-green-100', text: 'text-green-800', icon: <PlayCircle className="h-4 w-4" /> },
  sleep: { bg: 'bg-purple-100', text: 'text-purple-800', icon: <Moon className="h-4 w-4" /> },
  medication: { bg: 'bg-red-100', text: 'text-red-800', icon: <Pill className="h-4 w-4" /> },
  other: { bg: 'bg-gray-100', text: 'text-gray-800', icon: <Calendar className="h-4 w-4" /> },
};

// Import missing icons
import { Utensils, PlayCircle, Moon, Pill } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const { activeCat } = useCats();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ScheduleItem>>({
    type: 'feeding',
    name: '',
    time: '',
    duration: 0,
    recurring: true,
    recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    notes: '',
  });
  
  // Use sample schedule for now, in real app would come from cat data
  const schedule = sampleSchedule;

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

  const handleDayToggle = (day: string) => {
    const currentDays = formData.recurringDays || [];
    if (currentDays.includes(day)) {
      setFormData({
        ...formData,
        recurringDays: currentDays.filter(d => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        recurringDays: [...currentDays, day],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would add to cat's schedule
    setIsAddingItem(false);
    setEditingItemId(null);
    setFormData({
      type: 'feeding',
      name: '',
      time: '',
      duration: 0,
      recurring: true,
      recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      notes: '',
    });
  };

  // Return early if no active cat is selected
  if (!activeCat) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">No Cat Selected</h2>
        <p className="text-gray-600">Please select a cat to view and manage their schedule.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Schedule</h1>
        <p className="text-gray-600">Manage {activeCat.name}'s daily routine</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={() => {
            setIsAddingItem(true);
            setEditingItemId(null);
          }}
        >
          Add Schedule Item
        </Button>
      </div>

      {(isAddingItem || editingItemId) && (
        <Card title={editingItemId ? "Edit Schedule Item" : "Add Schedule Item"} className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="feeding">Feeding</option>
                  <option value="playtime">Playtime</option>
                  <option value="sleep">Sleep</option>
                  <option value="medication">Medication</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., Morning Feeding"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="recurring"
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                  Recurring
                </label>
              </div>

              {formData.recurring && (
                <div className="ml-6 mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repeat on days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => handleDayToggle(day.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                          formData.recurringDays?.includes(day.value)
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
                onClick={() => {
                  setIsAddingItem(false);
                  setEditingItemId(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingItemId ? 'Update' : 'Add'} Schedule Item
              </Button>
            </div>
          </form>
        </Card>
      )}

      {schedule.length > 0 ? (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {schedule
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((item) => {
                  const typeStyle = typeColors[item.type as ScheduleType];
                  
                  return (
                    <div key={item.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div className="w-16 text-center">
                        <span className="text-lg font-semibold text-gray-800">
                          {item.time.substring(0, 5)}
                        </span>
                      </div>
                      
                      <div className={`ml-4 px-2.5 py-1 rounded-full ${typeStyle.bg} ${typeStyle.text} flex items-center`}>
                        {typeStyle.icon}
                        <span className="ml-1 text-xs font-medium capitalize">{item.type}</span>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        {item.duration && (
                          <p className="text-xs text-gray-500">Duration: {item.duration} minutes</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItemId(item.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            // Would handle delete in real app
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Routine Importance</h3>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">Why Cats Need Routines</h4>
                <p className="text-sm text-purple-700">
                  Cats are creatures of habit and thrive on predictable routines. A consistent schedule helps reduce stress and anxiety while promoting overall wellbeing.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Feeding Times</h4>
                  <p className="text-sm text-gray-600">
                    Regular feeding times help regulate your cat's metabolism and prevent overeating. Aim for 2-3 meals per day at the same times.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Play Sessions</h4>
                  <p className="text-sm text-gray-600">
                    Regular play helps prevent boredom and provides mental stimulation. Schedule at least two 10-15 minute sessions daily.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Clock className="h-12 w-12 text-purple-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-4">No Schedule Items Yet</h2>
          <p className="text-gray-600 mb-6">
            Add feeding times, play sessions, and other activities to create a routine for {activeCat.name}.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            icon={<Plus className="h-5 w-5" />}
            onClick={() => setIsAddingItem(true)}
          >
            Add First Schedule Item
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;