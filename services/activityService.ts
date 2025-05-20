import { ActivityData, WeeklyActivityData } from '@/types/activityTypes';
import { ActivityApi } from './api';

export const fetchDailyActivity = async (): Promise<ActivityData> => {
  return ActivityApi.getDailyActivity();
};

export const fetchWeeklyActivity = async (): Promise<WeeklyActivityData> => {
  return ActivityApi.getWeeklyActivity();
};

export const updateDailyGoal = async (type: 'steps' | 'calories' | 'distance' | 'activeMinutes', value: number): Promise<void> => {
  return ActivityApi.updateDailyGoal(type, value);
};