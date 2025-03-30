import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/store/auth';

export default function AuthLayout() {
  const { isAuthenticated, validateToken } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (isValid) {
        // Token is valid, user is authenticated
        return;
      }
    };
    checkAuth();
  }, []);

  // If the user is authenticated, redirect to the main app
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: 'Reset Password',
          headerShown: false,
        }}
      />
    </Stack>
  );
} 