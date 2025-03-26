import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { AuthInput } from '@/components/auth/AuthInput';
import { signupSchema, type SignupFormData } from '@/schemas/auth';
import { useAuthStore } from '@/store/auth';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const { signup, isLoading, error } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    await signup(data.email, data.password, data.name);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.form}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Create Account
        </Text>
        
        <AuthInput
          label="Name"
          placeholder="Enter your name"
          autoCapitalize="words"
          {...register('name')}
          error={errors.name?.message}
        />

        <AuthInput
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          {...register('email')}
          error={errors.email?.message}
        />

        <AuthInput
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          {...register('password')}
          error={errors.password?.message}
        />

        <AuthInput
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={[styles.link, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Already have an account? Login
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