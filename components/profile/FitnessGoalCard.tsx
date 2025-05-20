import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';

type FitnessGoalCardProps = {
  title: string;
  current: number;
  unit: string;
  color: string;
  editMode: boolean;
  onChange: (value: string) => void;
};

export default function FitnessGoalCard({ 
  title, 
  current, 
  unit, 
  color, 
  editMode,
  onChange 
}: FitnessGoalCardProps) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.valueContainer}>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={String(current)}
            onChangeText={onChange}
            keyboardType="number-pad"
            placeholderTextColor={Colors.gray[400]}
          />
        ) : (
          <Text style={[styles.value, { color }]}>
            {current.toLocaleString()}
          </Text>
        )}
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 2,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  input: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.text,
    padding: 0,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginLeft: 4,
    marginBottom: 3,
  },
});