import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

type ChartSelectorProps = {
  activeChart: 'steps' | 'calories' | 'distance' | 'activeMinutes';
  onSelect: (chart: 'steps' | 'calories' | 'distance' | 'activeMinutes') => void;
};

export default function ChartSelector({ activeChart, onSelect }: ChartSelectorProps) {
  const options: { id: typeof activeChart; label: string }[] = [
    { id: 'steps', label: 'Steps' },
    { id: 'calories', label: 'Calories' },
    { id: 'distance', label: 'Distance' },
    { id: 'activeMinutes', label: 'Active' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            activeChart === option.id && styles.activeOption,
          ]}
          onPress={() => onSelect(option.id)}
        >
          <Text
            style={[
              styles.optionText,
              activeChart === option.id && styles.activeOptionText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 4,
  },
  option: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeOption: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
  },
  activeOptionText: {
    color: Colors.primary,
  },
});