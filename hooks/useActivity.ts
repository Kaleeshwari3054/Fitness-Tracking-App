import { useState, useEffect } from 'react';
import { ActivityData, WeeklyActivityData } from '@/types/activityTypes';
import { fetchDailyActivity, fetchWeeklyActivity } from '@/services/activityService';

export function useDailyActivity() {
  const [data, setData] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const activityData = await fetchDailyActivity();
      setData(activityData);
    } catch (err) {
      setError('Failed to load activity data');
      console.error('Error loading daily activity:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refresh: loadData };
}

export function useWeeklyActivity() {
  const [data, setData] = useState<WeeklyActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const weeklyData = await fetchWeeklyActivity();
      setData(weeklyData);
    } catch (err) {
      setError('Failed to load weekly activity data');
      console.error('Error loading weekly activity:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refresh: loadData };
}