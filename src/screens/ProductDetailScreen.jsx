import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SizeSelector from '../components/SizeSelector';
import ColorSelector from '../components/ColorSelector';
import CustomButton from '../components/CustomButton';

import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useGetWishlistQuery, useToggleWishlistMutation } from '../store/slices/wishlistApiSlice';

const { height } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { data: wishlistData } = useGetWishlistQuery();
    const [toggleWishlist] = useToggleWishlistMutation();

    const favoriteItems = wishlistData?.products || [];

    // Use product passed from route params or fallback to default
    const product = route?.params?.product || {
        id: 'default',
        name: 'Winter Coat',
        price: '$65.9',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
    };

    const productId = product.id || product._id;
    const isFavorite = favoriteItems.some(
        favId => favId === productId || favId._id === productId,
    );

    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = [
        '#A9B8C5',
        '#CB4335',
        '#2E86C1',
        '#D4AC0D',
        '#27AE60',
        '#2C3E50',
    ];

    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...product,
                size: selectedSize,
                color: selectedColor,
            }),
        );
        alert('Added to Cart!');
    };

    const handleToggleFavorite = async () => {
        try {
            await toggleWishlist(productId).unwrap();
        } catch (error) {
            console.error('Failed to toggle favorite: ', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header (Overlay on Image or above it) */}
                <Header
                    leftIconName="chevron-back"
                    onLeftPress={() => navigation.goBack()}
                    title={product.name}
                    rightIconName={isFavorite ? 'heart' : 'heart-o'}
                    onRightPress={handleToggleFavorite}
                    rightIconColor={isFavorite ? '#E96E6E' : '#333'}
                />

                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/* Details Section */}
                <View style={styles.detailsContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                    </View>

                    <View style={styles.separator} />

                    {/* Size Section */}
                    <Text style={styles.sectionTitle}>Size</Text>
                    <SizeSelector
                        sizes={sizes}
                        activeSize={selectedSize}
                        onSelect={setSelectedSize}
                    />

                    {/* Color Section */}
                    <Text style={styles.sectionTitle}>Colors</Text>
                    <ColorSelector
                        colors={colors}
                        activeColor={selectedColor}
                        onSelect={setSelectedColor}
                    />

                    {/* Add to Cart Button */}
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Add to Cart"
                            onPress={handleAddToCart}
                        />
                    </View>
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
    scrollContent: {
        paddingBottom: 40,
    },
    imageContainer: {
        width: '100%',
        height: height * 0.55,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        flex: 1,
        minHeight: height * 0.5,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 15,
    },
    buttonContainer: {
        marginTop: 35,
        marginBottom: 20,
    },
});

export default ProductDetailScreen;
