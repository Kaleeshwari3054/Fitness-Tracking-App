export interface UserProfile {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  goals: {
    steps: number;
    calories: number;
    distance: number;
    activeMinutes: number;
  };
  preferences: {
    notifications: boolean;
  };
}