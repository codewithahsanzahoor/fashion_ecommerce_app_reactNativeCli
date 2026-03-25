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
import { removeFromCart } from '../store/slices/cartSlice';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const removeItem = id => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(1);
  const shipping = (0.0).toFixed(1);
  const grandTotal = (parseFloat(total) + parseFloat(shipping)).toFixed(1);

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
        <Text style={styles.itemPrice}>${item.price.toFixed(1)}</Text>

        <View style={styles.attributesRow}>
          <View
            style={[styles.colorIndicator, { backgroundColor: item.color }]}
          />
          <Text style={styles.sizeText}>{item.size}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.deleteButton}
      >
        <Icon name="trash-outline" size={20} color="#E96E6E" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        leftIconName="chevron-back"
        onLeftPress={() => navigation?.goBack()}
        onProfilePress={() => console.log('Profile pressed from Cart')}
        title="My Cart"
      />

      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
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
            onPress={() => console.log('Proceed to checkout')}
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
  deleteButton: {
    padding: 8,
    marginRight: 5,
  },
  summaryContainer: {
    paddingVertical: 20,
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
});

export default CartScreen;
