import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  authenticateWithBiometrics: () => Promise<boolean>;
  validateToken: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const TOKEN_EXPIRY_KEY = 'token_expiry';

// Test credentials for development
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
};

// Token expiration time (24 hours)
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  validateToken: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const expiry = await SecureStore.getItemAsync(TOKEN_EXPIRY_KEY);
      
      if (!token || !expiry) {
        return false;
      }

      const expiryTime = parseInt(expiry);
      if (Date.now() > expiryTime) {
        // Token expired, try to refresh
        await get().refreshToken();
        return true;
      }

      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  refreshToken: async () => {
    try {
      // TODO: Implement actual token refresh API call
      const newToken = 'test_token_' + Date.now();
      const expiryTime = Date.now() + TOKEN_EXPIRY;

      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
      await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, expiryTime.toString());

      set({ token: newToken });
    } catch (error) {
      console.error('Token refresh error:', error);
      await get().logout();
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development: Check against test credentials
      if (email === TEST_USER.email && password === TEST_USER.password) {
        const user = {
          id: '1',
          email: TEST_USER.email,
          name: TEST_USER.name,
        };
        const token = 'test_token_' + Date.now();
        const expiryTime = Date.now() + TOKEN_EXPIRY;

        await SecureStore.setItemAsync(TOKEN_KEY, token);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
        await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, expiryTime.toString());

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  signup: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development: Create a new user
      const user = {
        id: Date.now().toString(),
        email,
        name,
      };
      const token = 'test_token_' + Date.now();
      const expiryTime = Date.now() + TOKEN_EXPIRY;

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      await SecureStore.setItemAsync(TOKEN_EXPIRY_KEY, expiryTime.toString());

      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Signup failed',
        isLoading: false,
      });
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(TOKEN_EXPIRY_KEY);
      
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development: Simulate password reset
      if (email === TEST_USER.email) {
        set({ isLoading: false });
      } else {
        throw new Error('Email not found');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Password reset failed',
        isLoading: false,
      });
    }
  },

  authenticateWithBiometrics: async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        throw new Error('Biometric authentication is not available');
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error('No biometrics enrolled');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        fallbackLabel: 'Use password',
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  },
})); 