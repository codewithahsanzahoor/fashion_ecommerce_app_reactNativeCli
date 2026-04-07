import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethods } from '../store/slices/userSlice';
import { useAddPaymentMethodMutation } from '../store/slices/userApiSlice';

const PaymentMethodsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const savedMethods = useSelector(state => state.user.paymentMethods) || [];
  
  const [selectedId, setSelectedId] = useState(savedMethods.length > 0 ? savedMethods[0].id : null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newLabel, setNewLabel] = useState('');
  const [newCardNo, setNewCardNo] = useState('');
  const [newExpiry, setNewExpiry] = useState('');

  const { address } = route.params || {};

  const [addPaymentMethod] = useAddPaymentMethodMutation();

  const handleSaveCard = async () => {
    if (!newLabel || !newCardNo || !newExpiry) {
      alert('Please fill out all fields');
      return;
    }
    const cardObj = {
      id: Math.random().toString(36).substr(2, 9),
      label: newLabel,
      icon: 'card-outline',
      last4: newCardNo.slice(-4)
    };
    
    try {
        const updatedMethods = await addPaymentMethod(cardObj).unwrap();
        dispatch(setPaymentMethods(updatedMethods));
        setSelectedId(cardObj.id);
        
        // Reset form
        setNewLabel('');
        setNewCardNo('');
        setNewExpiry('');
        setShowAddForm(false);
    } catch (error) {
        alert(error?.data?.message || 'Failed to save payment method');
    }
  };

  const handleContinue = () => {
    navigation.navigate('OrderSummary', {
      address,
      paymentMethod: savedMethods.find(p => p.id === selectedId)
    });
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

  const renderHeader = () => (
    <Text style={styles.sectionTitle}>Choose Payment Method</Text>
  );

  const renderFooter = () => (
    <View style={styles.footerWrapper}>
      {!showAddForm ? (
        <TouchableOpacity style={styles.addNewBtn} onPress={() => setShowAddForm(true)}>
          <Icon name="add" size={24} color="#E96E6E" />
          <Text style={styles.addNewText}>Add New Card</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Cardholder Name (e.g. John Doe)" value={newLabel} onChangeText={setNewLabel} />
          <TextInput style={styles.input} placeholder="Card Number" value={newCardNo} onChangeText={setNewCardNo} keyboardType="numeric" maxLength={16} />
          <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" value={newExpiry} onChangeText={setNewExpiry} maxLength={5} />
          <View style={styles.formActions}>
             <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddForm(false)}>
               <Text style={styles.cancelBtnText}>Cancel</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.saveBtn} onPress={handleSaveCard}>
               <Text style={styles.saveBtnText}>Save</Text>
             </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <CustomButton 
          title="Review Order" 
          onPress={() => {
            if (savedMethods.length === 0 || !selectedId) {
              alert('Please select or add a payment method first.');
              return;
            }
            handleContinue();
          }} 
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title="Payment Methods"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.container}>
        <FlatList
          data={savedMethods}
          renderItem={renderPayment}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
          ListEmptyComponent={<Text style={styles.emptyText}>No payment methods saved.</Text>}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF0F3',
  },
  flexOne: {
    flex: 1,
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
  footer: {
    paddingVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E96E6E',
    borderRadius: 15,
    marginTop: 5,
  },
  addNewText: {
    color: '#E96E6E',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  cancelBtnText: {
    color: '#777',
    fontSize: 14,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#E96E6E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PaymentMethodsScreen;
