import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { useCreateOrderMutation } from '../store/slices/orderApiSlice';

const OrderSummaryScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const { address, paymentMethod } = route.params || {};

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 5.0 : 0;
  const grandTotal = total + shipping;

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const formattedItems = cartItems.map(item => ({
      productId: item.productId || item._id || item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      size: item.size || 'M',
      color: item.color || 'Black'
    }));

    const orderData = {
      items: formattedItems,
      shippingAddress: {
        address: address?.address || 'Default Address',
        label: address?.label || 'Home',
        phone: address?.phone || '0000000000',
      },
      paymentMethod: paymentMethod?.label || 'Cash on Delivery',
      totalPrice: Number(grandTotal.toFixed(2)),
    };

    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      navigation.navigate('MainTabs', { screen: 'Orders' });
    } catch (err) {
      alert(err.data?.message || 'Failed to place order');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
       <Text style={styles.itemName} numberOfLines={1}>{item.quantity}x {item.name}</Text>
       <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Order Summary"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Items Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items in Cart</Text>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.cartItemId}
            scrollEnabled={false}
          />
        </View>

        {/* Address Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Text style={styles.cardTitle}>Shipping Address</Text>
             <Icon name="location-outline" size={20} color="#777" />
          </View>
          <Text style={styles.addressLabel}>{address?.label || 'Default'}</Text>
          <Text style={styles.addressText}>{address?.address || '123 E-commerce Street, CA 90210'}</Text>
          <Text style={styles.addressText}>{address?.phone || '+1 234-567-890'}</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <Text style={styles.cardTitle}>Payment Method</Text>
             <Icon name={paymentMethod?.icon || 'card-outline'} size={20} color="#777" />
          </View>
          <Text style={styles.addressLabel}>{paymentMethod?.label || 'Credit Card'}</Text>
          <Text style={styles.addressText}>
            {paymentMethod?.last4 ? `**** **** **** ${paymentMethod.last4}` : (paymentMethod?.email || paymentMethod?.status || 'Processing enabled')}
          </Text>
        </View>

        {/* Totals Summary */}
        <View style={styles.totalsCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.grandTotalRow]}>
              <Text style={styles.summaryLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
        </View>

        <View style={styles.footer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#E96E6E" />
          ) : (
            <CustomButton 
              title="Place Order" 
              onPress={handlePlaceOrder} 
            />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF0F3',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 3,
  },
  totalsCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#777',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  grandTotalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 0,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E96E6E',
  },
  footer: {
    marginTop: 10,
  },
});

export default OrderSummaryScreen;
