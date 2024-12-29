import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { UserProvider } from './src/context/UserContext';

// Import screens
import CategoriesScreen from './src/screens/CategoriesScreen';
import RestaurantsScreen from './src/screens/RestaurantsScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CategoryDetailsScreen from './src/screens/CategoryDetailsScreen';
import RestaurantDetailsScreen from './src/screens/RestaurantDetailsScreen';
import MenuScreen from './src/screens/MenuScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const COLORS = {
  background: '#1A1A2E',
  primary: '#6C63FF',
  secondary: '#30305C',
  text: '#FFFFFF',
  textSecondary: '#B5B5B5',
  card: '#252A4A',
};

// Create a separate component for the tab navigation
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Categories':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Restaurants':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          elevation: 0,
          height: 100,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
      />
      <Tab.Screen 
        name="Restaurants" 
        component={RestaurantsScreen}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator}
            options={{
              gestureEnabled: false
            }}
          />
          <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}


