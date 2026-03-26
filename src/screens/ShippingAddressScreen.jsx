import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const ShippingAddressScreen = ({ navigation }) => {
  return (
    <View style={styles.safeArea}>
      <Header
        title="Shipping Addresses"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.nestedContainer}>
        <View style={styles.iconGrayBig}>
          <Icon name="location-outline" size={40} color="#777" />
        </View>
        <Text style={styles.nestedTitle}>Saved Addresses</Text>
        <Text style={styles.nestedContent}>
          You haven't added any shipping addresses yet.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF0F3',
  },
  nestedContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  nestedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  nestedContent: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
  },
  iconGrayBig: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShippingAddressScreen;
