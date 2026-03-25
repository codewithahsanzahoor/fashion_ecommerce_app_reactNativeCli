import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

// Importing screens
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrdersScreen from './src/screens/OrdersScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ProductDetail') {
            iconName = 'th-large';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Orders') {
            iconName = 'list';
          }

          return (
            <Icon
              name={iconName}
              size={25}
              color={focused ? '#C67C4E' : '#A9A9A9'}
            />
          );
        },
        tabBarActiveTintColor: '#C67C4E',
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#FFF',
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
