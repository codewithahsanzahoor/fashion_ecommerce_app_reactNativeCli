import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    useGetMyOrdersQuery,
    useCancelOrderMutation,
} from '../store/slices/orderApiSlice';

const OrdersScreen = ({ navigation }) => {
    const {
        data: orders = [],
        isLoading,
        refetch,
        isFetching,
    } = useGetMyOrdersQuery();
    const [cancelOrder] = useCancelOrderMutation();

    const handleCancel = id => {
        Alert.alert(
            'Cancel Order',
            'Kya aap waqai is order ko cancel karna chahte hain?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes, Cancel',
                    onPress: async () => {
                        try {
                            await cancelOrder(id).unwrap();
                        } catch (error) {
                            Alert.alert(
                                'Error',
                                error?.data?.message ||
                                    'Failed to cancel order',
                            );
                        }
                    },
                },
            ],
        );
    };

    const renderItem = ({ item }) => {
        // Ensure item.totalPrice is a number before using toFixed
        const formattedTotal =
            typeof item.totalPrice === 'number'
                ? item.totalPrice.toFixed(2)
                : parseFloat(item.totalPrice || 0).toFixed(2);

        const orderIdLabel = item._id
            ? item._id.substring(item._id.length - 8).toUpperCase()
            : 'N/A';
        const displayDate = new Date(item.createdAt).toLocaleDateString();

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderId}>Order #{orderIdLabel}</Text>
                    <Text style={styles.orderDate}>{displayDate}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderTotal}>${formattedTotal}</Text>
                    <Text
                        style={[
                            styles.orderStatus,
                            item.status === 'Pending'
                                ? styles.statusPending
                                : item.status === 'Cancelled'
                                ? styles.statusCancelled
                                : styles.statusDelivered,
                        ]}
                    >
                        {item.status}
                    </Text>
                </View>
                <View style={styles.actionRow}>
                    <Text style={styles.itemCount}>
                        {(item.items || []).length} Items
                    </Text>
                    {item.status === 'Pending' && (
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => handleCancel(item._id)}
                        >
                            <Text style={styles.cancelBtnText}>
                                Cancel Order
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Header
                    title="My Orders"
                    leftIconName="chevron-back"
                    onLeftPress={() => navigation?.goBack()}
                    rightComponent={
                        <View style={styles.rightComponentSpacer} />
                    }
                />
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#E96E6E" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="My Orders"
                leftIconName="chevron-back"
                onLeftPress={() => navigation?.goBack()}
                rightComponent={<View style={styles.rightComponentSpacer} />}
            />
            <View style={styles.container}>
                <FlatList
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onRefresh={refetch}
                    refreshing={isFetching}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No orders found.</Text>
                    }
                />
            </View>
        </SafeAreaView>
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
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
        paddingTop: 10,
    },
    orderCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#777',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    orderTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E96E6E',
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: '600',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    statusPending: {
        backgroundColor: '#FFF3E0',
        color: '#E67E22',
    },
    statusCancelled: {
        backgroundColor: '#FDEDEC',
        color: '#E74C3C',
    },
    statusDelivered: {
        backgroundColor: '#E8F8F5',
        color: '#2ECC71',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#F0F0F0',
        paddingTop: 15,
    },
    itemCount: {
        fontSize: 14,
        color: '#555',
    },
    cancelBtn: {
        backgroundColor: '#FFF1F1',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    cancelBtnText: {
        color: '#E96E6E',
        fontWeight: '600',
        fontSize: 14,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#777',
        fontSize: 16,
    },
    rightComponentSpacer: {
        width: 45,
    },
});

export default OrdersScreen;
