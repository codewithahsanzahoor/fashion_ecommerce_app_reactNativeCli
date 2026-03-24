import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Importing reusable components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';

const categories = ['Trending now', 'All', 'New'];

const initialProducts = [
  {
    id: '1',
    name: 'Jacket Jeans',
    price: '$49.9',
    image: 'https://images.unsplash.com/photo-1551028711-131da507bd7c?q=80&w=1000&auto=format&fit=crop',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Acrylic Sweater',
    price: '$34.8',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?q=80&w=1000&auto=format&fit=crop',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Leather Jacket',
    price: '$89.9',
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Stylish Coat',
    price: '$65.9',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
    isFavorite: false,
  },
];

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Trending now');
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Component */}
        <Header 
          onMenuPress={() => console.log('Menu Pressed')}
          onProfilePress={() => console.log('Profile Pressed')}
        />

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Match Your Style</Text>
        </View>

        {/* SearchBar Component */}
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => console.log('Filter Pressed')}
        />

        {/* CategoryList Component */}
        <CategoryList 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryPress={setActiveCategory}
        />

        {/* Product Grid */}
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onFavoritePress={toggleFavorite}
              onPress={() => console.log('Product Pressed', item.name)}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listPadding}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titleSection: {
    marginBottom: 20,
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
  },
});

export default HomeScreen;
