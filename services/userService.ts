import { UserProfile } from '@/types/userTypes';
import { UserApi } from './api';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  return UserApi.getProfile();
};

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  return UserApi.updateProfile(profile);
};