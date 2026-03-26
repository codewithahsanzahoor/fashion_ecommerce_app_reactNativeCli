import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Importing reusable components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';

import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const categories = ['All', 'Trending now', 'New', 'Jacket', 'Sweater'];

const initialProducts = [
  {
    id: '1',
    name: 'Jacket Jeans',
    price: '$49.9',
    category: 'Jacket',
    image:
      'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Acrylic Sweater',
    price: '$34.8',
    category: 'Sweater',
    image:
      'https://plus.unsplash.com/premium_photo-1669688174622-0393f5c6baa2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'Leather Jacket',
    price: '$89.9',
    category: 'Jacket',
    image:
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Stylish Coat',
    price: '$65.9',
    category: 'New',
    image:
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Woolen Jacket',
    price: '$75.9',
    category: 'Jacket',
    image:
      'https://images.unsplash.com/photo-1617662408044-cda3ab7134c9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbnMlMjBmYXNoaW9ufGVufDB8fDB8fHww',
  },
  {
    id: '6',
    name: 'Casual Sweater',
    price: '$45.9',
    category: 'Sweater',
    image:
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lbnMlMjBmYXNoaW9ufGVufDB8fDB8fHww',
  },
];

const HomeScreen = ({ navigation }) => {
  // 1. All Hooks must be at the top
  const [activeCategory, setActiveCategory] = useState('All');
  const [products] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const favoriteItems = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                           product.category === activeCategory || 
                           (activeCategory === 'Trending now' && (product.id === '1' || product.id === '3'));
    
    return matchesSearch && matchesCategory;
  });

  // 2. Helper functions and logic
  const handleToggleFavorite = (product) => {
    dispatch(toggleFavorite(product));
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

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <FlatList
        data={filteredProducts}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => {
          const isFavorite = favoriteItems.some((fav) => fav.id === item.id);
          return (
            <ProductCard
              product={{ ...item, isFavorite }}
              onFavoritePress={() => handleToggleFavorite(item)}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
            />
          );
        }}
        keyExtractor={item => item.id}
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
