import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';

const paymentMethods = [
  { id: '1', label: 'Credit Card', icon: 'card-outline', last4: '4242' },
  { id: '2', label: 'PayPal', icon: 'logo-paypal', email: 'user@example.com' },
  { id: '3', label: 'Apple Pay', icon: 'logo-apple', status: 'Enabled' },
];

const PaymentMethodsScreen = ({ route, navigation }) => {
  const [selectedId, setSelectedId] = useState('1');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const { address } = route.params || {};

  const handlePlaceOrder = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5.0; // Total + Shipping
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: cartItems,
      address,
      paymentMethod: paymentMethods.find(p => p.id === selectedId).label,
      total: total.toFixed(2),
      status: 'Pending',
      date: new Date().toLocaleDateString(),
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    
    alert('Order Placed Successfully!');
    navigation.navigate('MainTabs', { screen: 'Orders' });
  };

  const renderPayment = ({ item }) => (
    <TouchableOpacity 
      style={[styles.paymentCard, selectedId === item.id && styles.selectedCard]}
      onPress={() => setSelectedId(item.id)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={28} color={selectedId === item.id ? '#E96E6E' : '#777'} />
      </View>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentLabel}>{item.label}</Text>
        <Text style={styles.paymentDetail}>
          {item.last4 ? `**** **** **** ${item.last4}` : item.email || item.status}
        </Text>
      </View>
      {selectedId === item.id && (
        <Icon name="checkmark-circle" size={24} color="#E96E6E" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        title="Payment Methods"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Choose Payment Method</Text>
        
        <FlatList
          data={paymentMethods}
          renderItem={renderPayment}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <Text style={styles.summaryText}>Items: {cartItems.length}</Text>
            <Text style={styles.summaryText}>Delivery: {address?.label || 'Not Selected'}</Text>
        </View>

        <View style={styles.footer}>
          <CustomButton 
            title="Place Order" 
            onPress={handlePlaceOrder} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF0F3',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedCard: {
    borderColor: '#E96E6E',
    backgroundColor: '#FFF9F9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentDetail: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  summaryBox: {
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 15,
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#EEE',
  },
  summaryTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
  },
  summaryText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5,
  },
  footer: {
    paddingVertical: 20,
  },
});

export default PaymentMethodsScreen;
