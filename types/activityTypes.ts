export interface ActivityData {
  date: string;
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
  distance: number;
  distanceGoal: number;
  activeMinutes: number;
  activeMinutesGoal: number;
}

export interface WeeklyActivityData {
  dates: string[];
  steps: number[];
  calories: number[];
  distance: number[];
  activeMinutes: number[];
}