import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import calendarScreen from '../screens/calendarScreen';

import HomeScreen from '../screens/homeScreen';
import MessageScreen from '../screens/messageScreen';
import CalendarScreen from '../screens/calendarScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />

      </Stack.Navigator>
  );
}