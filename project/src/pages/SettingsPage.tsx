import React from 'react';
import { Bell, Shield, Moon, Sun, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your PurrfectCare experience</p>
      </div>

      <div className="space-y-6">
        <Card
          title="Notifications"
          icon={<Bell className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Feeding Reminders</h4>
                <p className="text-sm text-gray-500">Get notifications when it's time to feed your cat</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="feedingReminders"
                  name="feedingReminders"
                  className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="feedingReminders"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Vaccination Reminders</h4>
                <p className="text-sm text-gray-500">Get notified when vaccinations are due</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="vaccinationReminders"
                  name="vaccinationReminders"
                  className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  defaultChecked
                />
                <label
                  htmlFor="vaccinationReminders"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Medication Reminders</h4>
                <p className="text-sm text-gray-500">Get notified when it's time for medications</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="medicationReminders"
                  name="medicationReminders"
                  className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  defaultChecked
                />
                <label
                  htmlFor="medicationReminders"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Appearance"
          icon={<Sun className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Theme</h4>
              <div className="flex space-x-4">
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white border-2 border-purple-500 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-yellow-500" />
                  </div>
                  <span className="text-sm text-gray-600">Light</span>
                </button>
                
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gray-800 border-2 border-transparent rounded-full flex items-center justify-center">
                    <Moon className="h-6 w-6 text-gray-100" />
                  </div>
                  <span className="text-sm text-gray-600">Dark</span>
                </button>
                
                <button className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-800 border-2 border-transparent rounded-full flex items-center justify-center">
                    <div className="flex">
                      <Sun className="h-6 w-6 text-yellow-500" />
                      <Moon className="h-6 w-6 text-gray-100 -ml-1" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">System</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Privacy & Data"
          icon={<Shield className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              PurrfectCare stores all your cat's data locally on your device. We don't collect or store any personal information in the cloud.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Data Backup</h4>
              <p className="text-sm text-blue-700 mb-3">
                Export your data to keep a backup of all your cats' information.
              </p>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Export Data
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-800 mb-2">Delete All Data</h4>
              <p className="text-sm text-gray-600 mb-3">
                This will permanently remove all cats and their data from the app.
              </p>
              <Button
                variant="danger"
                size="sm"
              >
                Reset App Data
              </Button>
            </div>
          </div>
        </Card>

        <Card
          title="About PurrfectCare"
        >
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-medium text-gray-800">Version 1.0.0</h4>
              <p className="text-sm text-gray-500 mt-1">© 2025 PurrfectCare</p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Made with ❤️ for cats and their humans
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700"
              >
                Contact
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;