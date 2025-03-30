import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { AuthInput } from '@/components/auth/AuthInput';
import { loginSchema, type LoginFormData } from '@/schemas/auth';
import { useAuthStore } from '@/store/auth';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { login, authenticateWithBiometrics, isLoading, error } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  const handleBiometricAuth = async () => {
    const success = await authenticateWithBiometrics();
    if (success) {
      // TODO: Implement biometric login logic
      console.log('Biometric authentication successful');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Welcome Back
        </Text>
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricAuth}
        >
          <Text style={[styles.biometricText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            Login with Biometrics
          </Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={[styles.link, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={[styles.link, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  biometricButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  biometricText: {
    fontSize: 16,
  },
  links: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    marginVertical: 8,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
}); 