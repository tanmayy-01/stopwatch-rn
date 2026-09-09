import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from '../theme';
import { StyleSheet, Text } from 'react-native';
import Stopwatch from '../screens/Stopwatch/Stopwatch';
import Timer from '../screens/Timer/Timer';

const Tab = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  //   Home: undefined;
  Stopwatch: {
    timerMode?: boolean;
  };
  Timer: undefined;
  //   Settings: undefined;
};

type TabIconProps = {
  color: string;
};

const StopwatchTabIcon = ({ color }: TabIconProps) => (
  <Text style={[styles.tabIcon, { color }]}>⏱️</Text>
);

const TimerTabIcon = ({ color }: TabIconProps) => (
  <Text style={[styles.tabIcon, { color }]}>⏳</Text>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Stopwatch"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#090909',
            borderTopColor: '#222222',
          },
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.gray,

          tabBarLabelStyle: {
            fontSize: 11,
            marginBottom: 7,
          },
        }}
      >
        <Tab.Screen
          name="Stopwatch"
          component={Stopwatch}
          options={{
            tabBarIcon: StopwatchTabIcon,
          }}
        />

        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            tabBarIcon: TimerTabIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 23,
  },
});

export default AppNavigator;
