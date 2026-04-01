import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Importing reusable components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';

import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../store/slices/productApiSlice';
import { useGetWishlistQuery, useToggleWishlistMutation } from '../store/slices/wishlistApiSlice';
import { ActivityIndicator } from 'react-native';

const categories = ['All', 'Trending now', 'New', 'Jacket', 'Sweater'];

const HomeScreen = ({ navigation }) => {
    // 1. All Hooks must be at the top
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: products,
        isLoading,
        isError,
        refetch,
    } = useGetProductsQuery({
        category: activeCategory,
        search: searchQuery,
    });

    const { data: wishlistData } = useGetWishlistQuery();
    const [toggleWishlist] = useToggleWishlistMutation();

    const favoriteItems = wishlistData?.products || [];

    // 2. Helper functions and logic
    const handleToggleFavorite = async product => {
        try {
            await toggleWishlist(product._id || product.id).unwrap();
        } catch (error) {
            console.error('Failed to toggle favorite: ', error);
        }
    };

    const renderHeader = () => (
        <View>
            <Header
                onLeftPress={() => console.log('Menu Pressed')}
                onProfilePress={() => navigation.navigate('Profile')}
            />

            {/* Title Section */}
            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>Match Your Style</Text>
            </View>

            {/* SearchBar Component */}
            <View style={styles.searchBarContainer}>
                <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            </View>

            {/* CategoryList Component */}
            <View style={styles.categoryListContainer}>
                <CategoryList
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryPress={setActiveCategory}
                />
            </View>
        </View>
    );

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#E96E6E" />
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#FDF0F3', '#FFFBFC']}
            style={styles.container}
        >
            <FlatList
                data={products}
                ListHeaderComponent={renderHeader}
                onRefresh={refetch}
                refreshing={isLoading}
                renderItem={({ item }) => {
                    const itemId = item.id || item._id;
                    const isFavorite = favoriteItems.some(
                        favId => favId === itemId || favId._id === itemId,
                    );
                    return (
                        <ProductCard
                            product={{ ...item, id: itemId, isFavorite }}
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
                        <Text style={styles.emptyText}>No products found.</Text>
                    </View>
                }
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0, // Header now has internal horizontal padding, adjust as needed
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },
    titleSection: {
        marginBottom: 20,
        paddingHorizontal: 20, // Add explicit padding since container horizontal padding is removed (Header manages itself now)
    },
    searchBarContainer: {
        paddingHorizontal: 20,
    },
    categoryListContainer: {
        paddingLeft: 20,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    listPadding: {
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
});

export default HomeScreen;
