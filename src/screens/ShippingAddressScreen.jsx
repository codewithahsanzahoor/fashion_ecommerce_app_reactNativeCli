import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

const mockAddresses = [
  { id: '1', label: 'Home', address: '123 Main St, New York, NY 10001', phone: '+1 234-567-890' },
  { id: '2', label: 'Office', address: '456 Business Ave, New York, NY 10002', phone: '+1 987-654-321' },
];

const ShippingAddressScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState('1');

  const renderAddress = ({ item }) => (
    <TouchableOpacity 
      style={[styles.addressCard, selectedId === item.id && styles.selectedCard]}
      onPress={() => setSelectedId(item.id)}
    >
      <View style={styles.addressInfo}>
        <View style={styles.labelRow}>
          <Icon name="location" size={20} color={selectedId === item.id ? '#E96E6E' : '#777'} />
          <Text style={styles.addressLabel}>{item.label}</Text>
        </View>
        <Text style={styles.addressText}>{item.address}</Text>
        <Text style={styles.phoneText}>{item.phone}</Text>
      </View>
      {selectedId === item.id && (
        <Icon name="checkmark-circle" size={24} color="#E96E6E" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <Header
        title="Shipping Addresses"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Select Delivery Address</Text>
        
        <FlatList
          data={mockAddresses}
          renderItem={renderAddress}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />

        <View style={styles.footer}>
          <CustomButton 
            title="Continue to Payment" 
            onPress={() => navigation.navigate('PaymentMethods', {
              address: mockAddresses.find(a => a.id === selectedId)
            })} 
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
  addressCard: {
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
  addressInfo: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 13,
    color: '#777',
  },
  footer: {
    paddingVertical: 20,
  },
});

export default ShippingAddressScreen;
