import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

import { useGetProductsQuery } from '../store/slices/productApiSlice';
import { useGetWishlistQuery, useToggleWishlistMutation } from '../store/slices/wishlistApiSlice';

const WishlistScreen = ({ navigation }) => {
    const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery({});
    const { data: wishlistData, isLoading: isLoadingWishlist } = useGetWishlistQuery();
    const [toggleWishlist] = useToggleWishlistMutation();

    const favoriteItems = wishlistData?.products || [];

    const handleToggleFavorite = async product => {
        try {
            await toggleWishlist(product._id || product.id).unwrap();
        } catch (error) {
            console.error('Failed to toggle favorite: ', error);
        }
    };

    const isLoading = isLoadingProducts || isLoadingWishlist;

    // Filter products to keep only those whose ID is in favoriteItems
    const wishlistProducts = products?.filter(item => {
        const itemId = item.id || item._id;
        return favoriteItems.some(favId => favId === itemId || favId._id === itemId);
    }) || [];

    if (isLoading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#E96E6E" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                leftIconName="chevron-back"
                onLeftPress={() => navigation?.goBack()}
                title="My Wishlist"
                rightComponent={<View style={styles.rightComponentSpacer} />}
            />
            <LinearGradient
                colors={['#FDF0F3', '#FFFBFC']}
                style={styles.container}
            >
                <FlatList
                    data={wishlistProducts}
                    renderItem={({ item }) => {
                        const itemId = item.id || item._id;
                        return (
                            <ProductCard
                                product={{ ...item, id: itemId, isFavorite: true }}
                                onFavoritePress={() => handleToggleFavorite(item)}
                                onPress={() =>
                                    navigation.navigate('ProductDetail', {
                                        product: item,
                                    })
                                }
                            />
                        );
                    }}
                    keyExtractor={item => item._id || item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listPadding}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Your wishlist is empty.</Text>
                        </View>
                    }
                />
            </LinearGradient>
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
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    listPadding: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDF0F3',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
    rightComponentSpacer: {
        width: 45,
    },
});

export default WishlistScreen;
