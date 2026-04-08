import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { useStripe, AddressSheet } from '@stripe/stripe-react-native';
import { useCreatePaymentIntentMutation } from '../store/slices/paymentApiSlice';
import { useGetCartQuery } from '../store/slices/cartApiSlice';
import { useCreateOrderMutation } from '../store/slices/orderApiSlice';

const OrderSummaryScreen = ({ navigation, route }) => {
    const { address: paramAddress, paymentMethod: paramPaymentMethod } = route.params || {};
    
    const [selectedAddress, setSelectedAddress] = useState(paramAddress || null);
    const [paymentType, setPaymentType] = useState(paramPaymentMethod ? 'Card' : 'Card'); // Default to Card
    const [isPayLoading, setIsPayLoading] = useState(false);
    const [isAddressSheetVisible, setIsAddressSheetVisible] = useState(false);

    const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
    const rawCartItems = cartData?.items || [];
    const cartItems = rawCartItems.map(item => ({
        ...item,
        cartItemId:
            item._id ||
            `${item.productId?._id || item.productId}-${item.size}-${
                item.color
            }`,
        productId: item.productId?._id || item.productId,
        name: item.productId?.name || 'Unknown Item',
        price: item.productId?.price || 0,
        image: item.productId?.image,
    }));

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const shipping = cartItems.length > 0 ? 5.0 : 0;
    const grandTotal = total + shipping;

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const initializePaymentSheet = async () => {
        try {
            const { paymentIntent, ephemeralKey, customer } =
                await createPaymentIntent({
                    amount: Math.round(grandTotal * 100), // Stripe expects amount in cents
                }).unwrap();

            // Ensure address is in object format for Stripe
            const stripeAddress = typeof selectedAddress?.address === 'object' 
                ? selectedAddress.address 
                : { line1: selectedAddress?.address || '' };

            const { error } = await initPaymentSheet({
                merchantDisplayName: 'Fashion App',
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: selectedAddress?.name || 'Customer',
                    address: stripeAddress,
                },
            });

            if (error) {
                console.error('Error initializing payment sheet:', error);
                return false;
            }
            return true;
        } catch (err) {
            console.error('Error in initializePaymentSheet:', err);
            return false;
        }
    };

    const handleAddressSheet = () => {
        setIsAddressSheetVisible(true);
    };

    const handleAddressSubmit = stripeAddress => {
        if (stripeAddress) {
            setSelectedAddress({
                name: stripeAddress.name,
                // Store both structured and formatted address
                address: stripeAddress.address, 
                formattedAddress: `${stripeAddress.address.line1}, ${stripeAddress.address.city}, ${stripeAddress.address.country}`,
                phone: stripeAddress.phone,
                label: 'Shipping Address',
            });
        }
        setIsAddressSheetVisible(false);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            alert('Please add a shipping address');
            return;
        }

        setIsPayLoading(true);

        if (paymentType === 'Card') {
            const initialized = await initializePaymentSheet();
            if (!initialized) {
                alert('Failed to initialize payment');
                setIsPayLoading(false);
                return;
            }

            const { error } = await presentPaymentSheet();

            if (error) {
                if (error.code !== 'Canceled') {
                    alert(`Payment failed: ${error.message}`);
                }
                setIsPayLoading(false);
                return;
            }
        }

        const formattedItems = cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
            size: item.size || 'M',
            color: item.color || 'Black',
        }));

        const orderData = {
            items: formattedItems,
            shippingAddress: {
                address: selectedAddress.formattedAddress || selectedAddress.address,
                label: selectedAddress.label || 'Shipping Address',
                phone: selectedAddress.phone,
            },
            paymentMethod:
                paymentType === 'Card' ? 'Credit Card' : 'Cash on Delivery',
            totalPrice: Number(grandTotal.toFixed(2)),
            isPaid: paymentType === 'Card',
            paidAt: paymentType === 'Card' ? new Date() : undefined,
        };

        try {
            await createOrder(orderData).unwrap();
            setIsPayLoading(false);
            navigation.navigate('MainTabs', { screen: 'Orders' });
        } catch (err) {
            setIsPayLoading(false);
            alert(err.data?.message || 'Failed to place order');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemRow}>
            <Text style={styles.itemName} numberOfLines={1}>
                {item.quantity}x {item.name}
            </Text>
            <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
            </Text>
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
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Items in Cart</Text>
                    {cartItems.map(item => (
                        <View key={item.cartItemId} style={styles.itemRow}>
                            <Text style={styles.itemName} numberOfLines={1}>
                                {item.quantity}x {item.name}
                            </Text>
                            <Text style={styles.itemPrice}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Shipping Address</Text>
                        <Icon
                            name="create-outline"
                            size={20}
                            color="#E96E6E"
                            onPress={handleAddressSheet}
                        />
                    </View>
                    {selectedAddress ? (
                        <>
                            <Text style={styles.addressLabel}>
                                {selectedAddress.name || selectedAddress.label}
                            </Text>
                            <Text style={styles.addressText}>
                                {selectedAddress.formattedAddress || selectedAddress.address}
                            </Text>
                            <Text style={styles.addressText}>
                                {selectedAddress.phone}
                            </Text>
                        </>
                    ) : (
                        <CustomButton
                            title="Add Address"
                            outline
                            onPress={handleAddressSheet}
                        />
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Payment Method</Text>
                    <View style={styles.paymentToggle}>
                        <TouchableOpacity
                            style={[
                                styles.toggleBtn,
                                paymentType === 'Card' && styles.activeToggle,
                            ]}
                            onPress={() => setPaymentType('Card')}
                        >
                            <Icon
                                name="card-outline"
                                size={20}
                                color={paymentType === 'Card' ? '#FFF' : '#333'}
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    paymentType === 'Card' &&
                                        styles.activeToggleText,
                                ]}
                            >
                                Card
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleBtn,
                                paymentType === 'Cash' && styles.activeToggle,
                            ]}
                            onPress={() => setPaymentType('Cash')}
                        >
                            <Icon
                                name="cash-outline"
                                size={20}
                                color={paymentType === 'Cash' ? '#FFF' : '#333'}
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    paymentType === 'Cash' &&
                                        styles.activeToggleText,
                                ]}
                            >
                                Cash
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <AddressSheet
                    visible={isAddressSheetVisible}
                    onSubmit={handleAddressSubmit}
                    onError={error => {
                        alert(error.message);
                        setIsAddressSheetVisible(false);
                    }}
                    allowedCountries={['US', 'CA', 'GB', 'PK']}
                    additionalFields={{
                        phoneNumber: 'required',
                    }}
                />

                <View style={styles.totalsCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>
                            ${shipping.toFixed(2)}
                        </Text>
                    </View>
                    <View style={[styles.summaryRow, styles.grandTotalRow]}>
                        <Text style={styles.summaryLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>
                            ${grandTotal.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    {isLoading || isCartLoading || isPayLoading ? (
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
    paymentToggle: {
        flexDirection: 'row',
        gap: 10,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        backgroundColor: '#FAFAFA',
        gap: 8,
    },
    activeToggle: {
        backgroundColor: '#E96E6E',
        borderColor: '#E96E6E',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    activeToggleText: {
        color: '#FFF',
    },
});

export default OrderSummaryScreen;
