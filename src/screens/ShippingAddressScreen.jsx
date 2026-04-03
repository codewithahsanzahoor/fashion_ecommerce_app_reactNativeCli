import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import { setAddresses } from '../store/slices/userSlice';
import { useAddShippingAddressMutation } from '../store/slices/userApiSlice';

const ShippingAddressScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const savedAddresses = useSelector(state => state.user.addresses) || [];

    const [selectedId, setSelectedId] = useState(
        savedAddresses.length > 0 ? savedAddresses[0].id : null,
    );
    const [showAddForm, setShowAddForm] = useState(false);

    const [newLabel, setNewLabel] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const [addShippingAddress] = useAddShippingAddressMutation();

    const handleSaveAddress = async () => {
        if (!newLabel || !newAddress || !newPhone) {
            alert('Please fill out all fields');
            return;
        }
        const addressObj = {
            id: Math.random().toString(36).substr(2, 9),
            label: newLabel,
            address: newAddress,
            phone: newPhone,
        };
        
        try {
            const updatedAddresses = await addShippingAddress(addressObj).unwrap();
            dispatch(setAddresses(updatedAddresses));
            setSelectedId(addressObj.id);

            // Reset form
            setNewLabel('');
            setNewAddress('');
            setNewPhone('');
            setShowAddForm(false);
        } catch (error) {
            alert(error?.data?.message || 'Failed to save address');
        }
    };

    const renderAddress = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.addressCard,
                selectedId === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedId(item.id)}
        >
            <View style={styles.addressInfo}>
                <View style={styles.labelRow}>
                    <Icon
                        name="location"
                        size={20}
                        color={selectedId === item.id ? '#E96E6E' : '#777'}
                    />
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

    const renderHeader = () => (
        <Text style={styles.sectionTitle}>Select Delivery Address</Text>
    );

    const renderFooter = () => (
        <View style={styles.footerWrapper}>
            {!showAddForm ? (
                <TouchableOpacity
                    style={styles.addNewBtn}
                    onPress={() => setShowAddForm(true)}
                >
                    <Icon name="add" size={24} color="#E96E6E" />
                    <Text style={styles.addNewText}>Add New Address</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Label (e.g. Home, Office)"
                        value={newLabel}
                        onChangeText={setNewLabel}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Address"
                        value={newAddress}
                        onChangeText={setNewAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={newPhone}
                        onChangeText={setNewPhone}
                        keyboardType="phone-pad"
                    />
                    <View style={styles.formActions}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setShowAddForm(false)}
                        >
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleSaveAddress}
                        >
                            <Text style={styles.saveBtnText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={styles.footer}>
                <CustomButton
                    title="Continue to Payment"
                    onPress={() => {
                        if (savedAddresses.length === 0 || !selectedId) {
                            alert('Please select or add an address first.');
                            return;
                        }
                        navigation.navigate('PaymentMethods', {
                            address: savedAddresses.find(
                                a => a.id === selectedId,
                            ),
                        });
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
                title="Shipping Addresses"
                leftIconName="chevron-back"
                onLeftPress={() => navigation.goBack()}
            />

            <View style={styles.container}>
                <FlatList
                    data={savedAddresses}
                    renderItem={renderAddress}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={renderHeader()}
                    ListFooterComponent={renderFooter()}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            No addresses saved yet.
                        </Text>
                    }
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

export default ShippingAddressScreen;
