import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../(context)/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <View>
        <Text>You need to be logged in to access this screen.</Text>
      </View>
    );
  }

  return children;
};

export default ProtectedRoute; 