import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const netInfo = useNetInfo();
  
  return (
    <NavigationContainer>
      {!netInfo.isConnected && (
        <View style={{ backgroundColor: '#ff6b6b', padding: 10, alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>You are currently offline</Text>
        </View>
      )}
      <Stack.Navigator>
        {/* Implement lazy loading using the getComponent pattern */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
