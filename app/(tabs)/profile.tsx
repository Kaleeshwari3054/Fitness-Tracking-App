import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { fetchUserProfile, updateUserProfile } from '@/services/userService';
import { UserProfile } from '@/types/userTypes';
import Header from '@/components/common/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import FitnessGoalCard from '@/components/profile/FitnessGoalCard';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Edit, Save } from 'lucide-react-native';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Editable state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [stepGoal, setStepGoal] = useState('');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchUserProfile();
        setProfile(data);
        setName(data.name);
        setAge(String(data.age));
        setHeight(String(data.height));
        setWeight(String(data.weight));
        setStepGoal(String(data.goals.steps));
        setCalorieGoal(String(data.goals.calories));
        setNotificationsEnabled(data.preferences.notifications);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!profile) return;

    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    const updatedProfile: UserProfile = {
      ...profile,
      name,
      age: parseInt(age) || profile.age,
      height: parseFloat(height) || profile.height,
      weight: parseFloat(weight) || profile.weight,
      goals: {
        ...profile.goals,
        steps: parseInt(stepGoal) || profile.goals.steps,
        calories: parseInt(calorieGoal) || profile.goals.calories,
      },
      preferences: {
        ...profile.preferences,
        notifications: notificationsEnabled,
      },
    };

    try {
      await updateUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setEditMode(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  if (loading || !profile) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Profile" 
        rightAction={
          <TouchableOpacity 
            onPress={editMode ? handleSaveProfile : () => setEditMode(true)}
            style={styles.headerButton}
          >
            {editMode ? (
              <Save size={24} color={Colors.primary} />
            ) : (
              <Edit size={24} color={Colors.primary} />
            )}
          </TouchableOpacity>
        }
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader 
          name={editMode ? name : profile.name} 
          setName={setName}
          editMode={editMode}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>
              {editMode ? (
                <TextInput
                  style={styles.editInput}
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  placeholder="Age"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.age} years</Text>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height</Text>
              {editMode ? (
                <TextInput
                  style={styles.editInput}
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="decimal-pad"
                  placeholder="Height in cm"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.height} cm</Text>
              )}
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight</Text>
              {editMode ? (
                <TextInput
                  style={styles.editInput}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="decimal-pad"
                  placeholder="Weight in kg"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.weight} kg</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          
          <View style={styles.goalsContainer}>
            <FitnessGoalCard
              title="Daily Steps"
              current={parseInt(stepGoal)}
              unit="steps"
              color={Colors.primary}
              editMode={editMode}
              onChange={setStepGoal}
            />
            <FitnessGoalCard
              title="Calories"
              current={parseInt(calorieGoal)}
              unit="kcal"
              color={Colors.warning}
              editMode={editMode}
              onChange={setCalorieGoal}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.gray[300], true: Colors.primary }}
                thumbColor={Colors.white}
                disabled={!editMode}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[700],
  },
  infoValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
  },
  editInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 120,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[200],
    marginVertical: 8,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});