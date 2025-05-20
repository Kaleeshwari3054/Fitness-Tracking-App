import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { WeeklyActivityData } from '@/types/activityTypes';

type WeeklySummaryProps = {
  weeklyData: WeeklyActivityData;
  activeType: 'steps' | 'calories' | 'distance' | 'activeMinutes';
};

export default function WeeklySummary({ weeklyData, activeType }: WeeklySummaryProps) {
  const getData = () => {
    switch (activeType) {
      case 'steps':
        return weeklyData.steps;
      case 'calories':
        return weeklyData.calories;
      case 'distance':
        return weeklyData.distance;
      case 'activeMinutes':
        return weeklyData.activeMinutes;
    }
  };

  const data = getData();
  const total = data.reduce((sum, value) => sum + value, 0);
  const average = total / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);

  const getUnit = () => {
    switch (activeType) {
      case 'steps':
        return '';
      case 'calories':
        return ' kcal';
      case 'distance':
        return ' km';
      case 'activeMinutes':
        return ' min';
    }
  };

  const getMaxDay = () => {
    const maxIndex = data.indexOf(max);
    return weeklyData.dates[maxIndex].split(', ')[0];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Summary</Text>
      
      <View style={styles.summaryGrid}>
        <SummaryItem 
          label="Total" 
          value={total} 
          unit={getUnit()} 
        />
        <SummaryItem 
          label="Average" 
          value={average} 
          unit={getUnit()} 
          isDecimal={activeType === 'distance'}
        />
        <SummaryItem 
          label="Best Day" 
          value={max} 
          unit={getUnit()} 
          subtitle={getMaxDay()}
        />
        <SummaryItem 
          label="Min" 
          value={min} 
          unit={getUnit()} 
        />
      </View>
    </View>
  );
}

type SummaryItemProps = {
  label: string;
  value: number;
  unit: string;
  subtitle?: string;
  isDecimal?: boolean;
};

function SummaryItem({ label, value, unit, subtitle, isDecimal = false }: SummaryItemProps) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>
        {isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString()}
        {unit}
      </Text>
      {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  itemValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  itemSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[600],
    marginTop: 4,
  },
});