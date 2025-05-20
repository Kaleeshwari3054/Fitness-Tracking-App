import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/common/Header';
import ActivityCard from '@/components/home/ActivityCard';
import ActivityProgress from '@/components/home/ActivityProgress';
import DailyGoals from '@/components/home/DailyGoals';
import LoadingScreen from '@/components/common/LoadingScreen';

import { useDailyActivity } from '@/hooks/useActivity';

export default function HomeScreen() {
  const { data: activityData, loading, error, refresh } = useDailyActivity();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !activityData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header title="Today's Activity" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Failed to load data'}</Text>
          <Text style={styles.retryText} onPress={refresh}>
            Tap to retry
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header title="Today's Activity" />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.progressContainer}>
          <ActivityProgress 
            steps={activityData.steps} 
            goal={activityData.stepGoal}
          />
        </View>

        <View style={styles.cardsContainer}>
          <ActivityCard
            title="Steps"
            value={activityData.steps}
            unit="steps"
            icon="footprints"
            color="#0A84FF"
            goal={activityData.stepGoal}
          />
          <ActivityCard
            title="Calories"
            value={activityData.calories}
            unit="kcal"
            icon="flame"
            color="#FF9F0A"
            goal={activityData.calorieGoal}
          />
          <ActivityCard
            title="Distance"
            value={activityData.distance}
            unit="km"
            icon="map-pin"
            color="#30D158"
            goal={activityData.distanceGoal}
          />
          <ActivityCard
            title="Active Time"
            value={activityData.activeMinutes}
            unit="min"
            icon="timer"
            color="#5E5CE6"
            goal={activityData.activeMinutesGoal}
          />
        </View>

        <DailyGoals activityData={activityData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  progressContainer: {
    padding: 16,
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 8,
  },
  retryText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});