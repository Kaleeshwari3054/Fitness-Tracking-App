import { ActivityData, WeeklyActivityData } from '@/types/activityTypes';
import { UserProfile } from '@/types/userTypes';

const API_BASE_URL = 'https://api.mocki.io/v1/your-endpoint';

// API response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Error handling
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    // if (!response.ok) {
    //   throw new ApiError(response.status, `API Error: ${response.statusText}`);
    // }

    if (!response.ok) {
  const errorText = await response.text();  // Read error message from response
  console.error('API response error:', errorText);  // Log it in console
  throw new ApiError(response.status, `API Error: ${response.statusText}`);
}

    const data: ApiResponse<T> = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
}

// Activity endpoints
export const ActivityApi = {
  getDailyActivity: async (): Promise<ActivityData> => {
    try {
      const data = await fetchApi<ActivityData>('/daily-activity');
      return data;
    } catch (error) {
      console.error('Error fetching daily activity:', error);
      // Return mock data as fallback
      return {
        date: new Date().toISOString(),
        steps: 7432,
        stepGoal: 10000,
        calories: 385,
        calorieGoal: 500,
        distance: 5.2,
        distanceGoal: 7,
        activeMinutes: 58,
        activeMinutesGoal: 60,
      };
    }
  },

  getWeeklyActivity: async (): Promise<WeeklyActivityData> => {
    try {
      const data = await fetchApi<WeeklyActivityData>('/weekly-activity');
      return data;
    } catch (error) {
      console.error('Error fetching weekly activity:', error);
      // Return mock data as fallback
      const today = new Date();
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - 6 + i);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      });
      
      return {
        dates,
        steps: [5235, 7629, 9123, 4531, 8752, 6421, 7432],
        calories: [328, 421, 485, 275, 461, 352, 385],
        distance: [3.6, 5.4, 6.5, 3.2, 6.1, 4.5, 5.2],
        activeMinutes: [42, 65, 78, 35, 72, 51, 58],
      };
    }
  },

  updateDailyGoal: async (type: 'steps' | 'calories' | 'distance' | 'activeMinutes', value: number): Promise<void> => {
    try {
      await fetchApi('/update-goal', {
        method: 'POST',
        body: JSON.stringify({ type, value }),
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },
};

// User endpoints
export const UserApi = {
  getProfile: async (): Promise<UserProfile> => {
    try {
      const data = await fetchApi<UserProfile>('/user-profile');
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Return mock data as fallback
      return {
        id: '1',
        name: 'Alex Johnson',
        age: 32,
        height: 175,
        weight: 68,
        goals: {
          steps: 10000,
          calories: 500,
          distance: 7,
          activeMinutes: 60,
        },
        preferences: {
          notifications: true,
        },
      };
    }
  },

  updateProfile: async (profile: UserProfile): Promise<UserProfile> => {
    try {
      const data = await fetchApi<UserProfile>('/user-profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};