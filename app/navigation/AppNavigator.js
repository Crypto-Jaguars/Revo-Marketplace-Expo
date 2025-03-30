import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Implement lazy loading using the getComponent pattern */}
        <Stack.Screen 
          name="Home"
          getComponent={() => require('../screens/HomeScreen').default}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Details"
          getComponent={() => require('../screens/DetailsScreen').default}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

