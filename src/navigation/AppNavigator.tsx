import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { COLORS } from '../theme';
import Stopwatch from '../screens/Stopwatch/Stopwatch';
import Timer from '../screens/Timer/Timer';
import Ionicons from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  Stopwatch: {
    timerMode?: boolean;
  };
  Timer: undefined;
};

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
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="stopwatch-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="hourglass-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
