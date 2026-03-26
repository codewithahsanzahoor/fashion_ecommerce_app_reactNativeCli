import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity 
} from '../store/slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const removeItem = cartItemId => {
    dispatch(removeFromCart(cartItemId));
  };

  const increment = cartItemId => {
    dispatch(incrementQuantity(cartItemId));
  };

  const decrement = cartItemId => {
    dispatch(decrementQuantity(cartItemId));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  const shipping = cartItems.length > 0 ? (5.0).toFixed(2) : (0.0).toFixed(2);
  const grandTotal = (parseFloat(total) + parseFloat(shipping)).toFixed(2);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.attributesRow}>
          <View
            style={[styles.colorIndicator, { backgroundColor: item.color }]}
          />
          <Text style={styles.sizeText}>{item.size}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrement(item.cartItemId)} style={styles.quantityBtn}>
            <Icon name="remove-outline" size={16} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increment(item.cartItemId)} style={styles.quantityBtn}>
            <Icon name="add-outline" size={16} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => removeItem(item.cartItemId)}
          style={styles.deleteButton}
        >
          <Icon name="trash-outline" size={20} color="#E96E6E" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        leftIconName="chevron-back"
        onLeftPress={() => navigation?.goBack()}
        onProfilePress={() => navigation.navigate('Profile')}
        title="My Cart"
      />

      <View style={styles.container}>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={item => item.cartItemId}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${total}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shipping}</Text>
              </View>
              <View style={[styles.summaryRow, styles.grandTotalRow]}>
                <Text style={styles.summaryLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>${grandTotal}</Text>
              </View>

              <CustomButton
                title="Checkout"
                onPress={() => navigation.navigate('ShippingAddresses')}
              />
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="cart-outline" size={80} color="#DDD" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  listContent: {
    paddingBottom: 20,
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 5,
  },
  attributesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  sizeText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 70,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 2,
  },
  quantityBtn: {
    padding: 5,
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    padding: 5,
  },
  summaryContainer: {
    paddingVertical: 20,
    backgroundColor: '#FFF',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
    marginBottom: 20,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    marginBottom: 10,
  },
  shopNowText: {
    fontSize: 16,
    color: '#E96E6E',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default CartScreen;
