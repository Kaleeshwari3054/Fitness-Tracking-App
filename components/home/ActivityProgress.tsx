import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type ActivityProgressProps = {
  steps: number;
  goal: number;
};

export default function ActivityProgress({ steps, goal }: ActivityProgressProps) {
  const progress = Math.min(steps / goal, 1);
  const percentage = Math.round(progress * 100);
  const remainingSteps = goal - steps > 0 ? goal - steps : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Step Progress</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <View style={styles.progressBar}>
        <View 
          style={[styles.progressFill, { width: `${progress * 100}%` }]} 
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoValue}>{steps.toLocaleString()}</Text>
          <Text style={styles.infoLabel}>Steps</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoValue}>{goal.toLocaleString()}</Text>
          <Text style={styles.infoLabel}>Goal</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoValue}>{remainingSteps.toLocaleString()}</Text>
          <Text style={styles.infoLabel}>Remaining</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
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
  percentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.primary,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.gray[200],
    borderRadius: 6,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.gray[300],
  },
});