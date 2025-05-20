import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Footprints, Flame, MapPin, Timer } from 'lucide-react-native';

type ActivityCardProps = {
  title: string;
  value: number;
  unit: string;
  icon: 'footprints' | 'flame' | 'map-pin' | 'timer';
  color: string;
  goal: number;
};

export default function ActivityCard({ title, value, unit, icon, color, goal }: ActivityCardProps) {
  const progress = Math.min(value / goal, 1);
  
  const renderIcon = () => {
    switch (icon) {
      case 'footprints':
        return <Footprints size={24} color={color} />;
      case 'flame':
        return <Flame size={24} color={color} />;
      case 'map-pin':
        return <MapPin size={24} color={color} />;
      case 'timer':
        return <Timer size={24} color={color} />;
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {value.toLocaleString()} <Text style={styles.unit}>{unit}</Text>
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: `${color}20` }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: color,
                width: `${progress * 100}%` 
              }
            ]} 
          />
        </View>
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
    borderLeftWidth: 4,
  },
  iconContainer: {
    marginBottom: 12,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.text,
  },
  unit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  progressContainer: {
    height: 6,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});