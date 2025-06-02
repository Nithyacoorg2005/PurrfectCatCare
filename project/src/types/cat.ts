export type CatBreed = 
  | 'Persian'
  | 'Maine Coon'
  | 'Siamese'
  | 'Bengal'
  | 'Ragdoll'
  | 'Sphynx'
  | 'British Shorthair'
  | 'Scottish Fold'
  | 'Abyssinian'
  | 'American Shorthair'
  | 'Mixed'
  | 'Other';

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  type: 'dry' | 'wet' | 'treats' | 'prescription';
  recommendedFor?: {
    age?: 'kitten' | 'adult' | 'senior';
    healthConditions?: string[];
    weight?: 'underweight' | 'normal' | 'overweight';
  };
  ingredients?: string[];
  nutritionalInfo?: {
    protein: number;
    fat: number;
    fiber: number;
  };
}

export interface Vaccination {
  id: string;
  name: string;
  dateAdministered: string;
  nextDueDate: string;
  veterinarian?: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'checkup' | 'illness' | 'injury' | 'surgery' | 'other';
  description: string;
  veterinarian?: string;
  medications?: string[];
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  type: 'feeding' | 'playtime' | 'sleep' | 'medication' | 'other';
  name: string;
  time: string;
  duration?: number; // in minutes
  recurring: boolean;
  recurringDays?: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
  notes?: string;
}

export interface Cat {
  id: string;
  name: string;
  dateOfBirth?: string;
  breed: CatBreed;
  weight?: number; // in kg
  color?: string;
  gender: 'male' | 'female';
  isNeutered: boolean;
  photoUrl?: string;
  microchipId?: string;
  foodPreferences?: string[];
  dietaryRestrictions?: string[];
  healthConditions?: string[];
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }[];
  vaccinations?: Vaccination[];
  medicalRecords?: MedicalRecord[];
  schedule?: ScheduleItem[];
  notes?: string;
}