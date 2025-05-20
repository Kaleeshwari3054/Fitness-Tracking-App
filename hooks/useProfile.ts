import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/userTypes';
import { fetchUserProfile, updateUserProfile } from '@/services/userService';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedProfile: UserProfile) => {
    try {
      setLoading(true);
      setError(null);
      const data = await updateUserProfile(updatedProfile);
      setProfile(data);
      return data;
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return { profile, loading, error, refresh: loadProfile, updateProfile };
}