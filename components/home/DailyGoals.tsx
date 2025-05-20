import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ActivityData } from '@/types/activityTypes';
import { Award } from 'lucide-react-native';

type DailyGoalsProps = {
  activityData: ActivityData;
};

export default function DailyGoals({ activityData }: DailyGoalsProps) {
  const goalsAchieved = [
    activityData.steps >= activityData.stepGoal,
    activityData.calories >= activityData.calorieGoal,
    activityData.distance >= activityData.distanceGoal,
    activityData.activeMinutes >= activityData.activeMinutesGoal,
  ].filter(Boolean).length;

  const totalGoals = 4;
  const progress = goalsAchieved / totalGoals;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Daily Goals</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{goalsAchieved}/{totalGoals}</Text>
        </View>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { width: `${progress * 100}%` }]} 
        />
      </View>

      <View style={styles.goalsContainer}>
        <GoalItem 
          name="Steps" 
          current={activityData.steps} 
          goal={activityData.stepGoal} 
        />
        <GoalItem 
          name="Calories" 
          current={activityData.calories} 
          goal={activityData.calorieGoal} 
        />
        <GoalItem 
          name="Distance" 
          current={activityData.distance} 
          goal={activityData.distanceGoal} 
          unit="km"
        />
        <GoalItem 
          name="Active Minutes" 
          current={activityData.activeMinutes} 
          goal={activityData.activeMinutesGoal} 
          unit="min"
        />
      </View>
    </View>
  );
}

type GoalItemProps = {
  name: string;
  current: number;
  goal: number;
  unit?: string;
};

function GoalItem({ name, current, goal, unit = '' }: GoalItemProps) {
  const isCompleted = current >= goal;
  const progress = Math.min(current / goal, 1);

  return (
    <View style={styles.goalItem}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalName}>{name}</Text>
        {isCompleted && (
          <Award size={18} color={Colors.accent} />
        )}
      </View>
      
      <View style={styles.goalProgress}>
        <View 
          style={[
            styles.goalProgressFill, 
            { 
              width: `${progress * 100}%`,
              backgroundColor: isCompleted ? Colors.accent : Colors.primary 
            }
          ]} 
        />
      </View>
      
      <Text style={styles.goalValues}>
        {current.toLocaleString()}{unit} / {goal.toLocaleString()}{unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
  },
  scoreContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  scoreText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.white,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  goalsContainer: {
    gap: 16,
  },
  goalItem: {
    gap: 8,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text,
  },
  goalProgress: {
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: 3,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalValues: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
});