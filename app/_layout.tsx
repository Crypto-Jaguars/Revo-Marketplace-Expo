import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { usePathname, Link } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// New OfflineBanner component
function OfflineBanner() {
  const [isOffline, setIsOffline] = React.useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });
    return unsubscribe;
  }, []);
  if (!isOffline) return null;
  return (
    <View style={{ backgroundColor: 'red', padding: 8 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        You are offline. Some features may not be available.
      </Text>
    </View>
  );
}

// Custom Bottom Tab Bar component
function CustomBottomTabBar() {
  const pathname = usePathname();
  
  const tabs = [
    {
      name: 'Home',
      path: '/(tabs)',
      icon: 'home'
    },
    {
      name: 'Products',
      path: '/(tabs)/two',
      icon: 'shopping-basket'
    },
    {
      name: 'Cart',
      path: '/(tabs)/cart',
      icon: 'shopping-cart'
    },
    {
      name: 'Profile',
      path: '/(tabs)/profile',
      icon: 'user'
    }
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path || pathname.startsWith(`${tab.path}/`);
        
        return (
          <Link key={tab.name} href={tab.path} asChild>
            <TouchableOpacity style={styles.tab}>
              <FontAwesome5 
                name={tab.icon} 
                size={20} 
                color={isActive ? '#4CAF50' : '#757575'} 
              />
              <Text 
                style={[
                  styles.tabText, 
                  { color: isActive ? '#4CAF50' : '#757575' }
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <OfflineBanner />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/cart/cart" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <CustomBottomTabBar />
      </View>
      <Redirect href="/(tabs)" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  tabText: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: '500'
  }
});

