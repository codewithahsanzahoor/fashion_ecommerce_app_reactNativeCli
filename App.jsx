import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StripeProvider } from '@stripe/stripe-react-native';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import { useSelector } from 'react-redux';

// Importing screens
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import OrderSummaryScreen from './src/screens/OrderSummaryScreen';
import ShippingAddressScreen from './src/screens/ShippingAddressScreen';
import PaymentMethodsScreen from './src/screens/PaymentMethodsScreen';
import OrderSummaryScreen from './src/screens/OrderSummaryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();

function ProfileStack() {
    return (
        <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStackNav.Screen
                name="ProfileMenu"
                component={ProfileScreen}
            />
        </ProfileStackNav.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Wishlist') {
                        iconName = 'heart';
                    } else if (route.name === 'Cart') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'Orders') {
                        iconName = 'list';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
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
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MyTabs} />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
            <Stack.Screen
                name="ShippingAddress"
                component={ShippingAddressScreen}
            />
            <Stack.Screen
                name="PaymentMethods"
                component={PaymentMethodsScreen}
            />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        </Stack.Navigator>
    );
}

const NavigationWrapper = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StripeProvider publishableKey="pk_test_51SIViKRhctCoYxp1qydZ17YGVhtsPg6IJizhbqYjlqPBRmjvltotofpP3JjRknuGWLuAvx6rIXYmpgFIUCkpUxkQ00qK1GC4J4">
                    <NavigationWrapper />
                </StripeProvider>
            </PersistGate>
        </Provider>
    );
}
