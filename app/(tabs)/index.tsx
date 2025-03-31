import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; 
import CartScreen from './screens/CartScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 
import ProductsScreen from './screens/ProductsScreen';
import { Ionicons } from '@expo/vector-icons';
import ProtectedRoute from '../(components)/ProtectedRoute';

import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const linking = {
  prefixes: ['https://yourapp.com', 'yourapp://'],
  config: {
    screens: {
      Home: 'home',
      Products: 'products/:productId',
      Cart: 'cart',
      Profile: 'profile',
    },
  },
};

export default function TabOneScreen() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f8f8f8', borderTopWidth: 0 },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Products" 
        component={ProductsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="pricetag-outline" size={24} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={() => (
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        )}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
