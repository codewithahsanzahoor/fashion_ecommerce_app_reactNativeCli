import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onFavoritePress, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity 
          onPress={() => onFavoritePress(product.id)} 
          style={styles.favoriteButton}
        >
          <FontAwesome
            name={product.isFavorite ? 'heart' : 'heart-o'}
            size={18}
            color={product.isFavorite ? '#E96E6E' : '#FFF'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 6,
    borderRadius: 15,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
    fontWeight: 'bold',
  },
});

export default ProductCard;
