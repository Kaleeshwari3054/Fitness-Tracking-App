import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/constants/Colors';
import Header from '@/components/common/Header';
import ChartSelector from '@/components/history/ChartSelector';
import WeeklySummary from '@/components/history/WeeklySummary';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useWeeklyActivity } from '@/hooks/useActivity';

export default function HistoryScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 600;  // breakpoint for mobile screens

  const { data: weeklyData, loading, error, refresh } = useWeeklyActivity();
  const [activeChart, setActiveChart] = React.useState('steps');

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !weeklyData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Activity History" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Failed to load data'}</Text>
          <Text style={styles.retryText} onPress={refresh}>
            Tap to retry
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Responsive chart width: max 500px or smaller if mobile
  const chartWidth = Math.min(windowWidth - 32, 500);

  const chartData = {
    labels: weeklyData.dates.map(date => date.split(', ')[0]),
    datasets: [
      {
        data: (() => {
          switch (activeChart) {
            case 'steps':
              return weeklyData.steps;
            case 'calories':
              return weeklyData.calories;
            case 'distance':
              return weeklyData.distance;
            case 'activeMinutes':
              return weeklyData.activeMinutes;
          }
        })(),
        color: () => Colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const getChartUnit = () => {
    switch (activeChart) {
      case 'steps':
        return '';
      case 'calories':
        return 'kcal';
      case 'distance':
        return 'km';
      case 'activeMinutes':
        return 'min';
    }
  };

  const getYAxisSuffix = () => {
    const unit = getChartUnit();
    return unit ? ` ${unit}` : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Activity History" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ChartSelector 
          activeChart={activeChart} 
          onSelect={setActiveChart} 
        />

        <View
          style={[
            styles.chartContainer,
            {
              marginHorizontal: isMobile ? 12 : 24,
              padding: isMobile ? 12 : 16,
            },
          ]}
        >
          <Text
            style={[
              styles.chartTitle,
              {
                fontSize: isMobile ? 16 : 18,
                marginBottom: isMobile ? 12 : 16,
              },
            ]}
          >
            Weekly {activeChart.charAt(0).toUpperCase() + activeChart.slice(1)}
          </Text>
          <View style={styles.chartWrapper}>
            <LineChart
              data={chartData}
              width={chartWidth}
              height={220}
              chartConfig={{
                backgroundColor: Colors.white,
                backgroundGradientFrom: Colors.white,
                backgroundGradientTo: Colors.white,
                decimalPlaces: activeChart === 'distance' ? 1 : 0,
                color: (opacity = 1) => `rgba(10, 132, 255, ${opacity})`,
                labelColor: () => Colors.gray[700],
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: Colors.primary,
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: Colors.gray[200],
                },
                formatYLabel: (value) => {
                  if (activeChart === 'steps' && value > 1000) {
                    return `${(value / 1000).toFixed(1)}k`;
                  }
                  return value.toString();
                },
                yAxisSuffix: getYAxisSuffix(),
              }}
              bezier
              style={styles.chart}
              withVerticalLines={false}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={true}
              segments={5}
            />
          </View>
        </View>

        <WeeklySummary 
          weeklyData={weeklyData} 
          activeType={activeChart}
        />
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
  chartContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginVertical: 8,
    // marginHorizontal and padding will be overridden conditionally
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    // fontSize and marginBottom overridden conditionally
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
