import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

const CategoryList = ({ categories, activeCategory, onCategoryPress }) => {
  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => onCategoryPress(category)}
            style={[
              styles.categoryChip,
              activeCategory === category && styles.activeCategoryChip,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  activeCategoryChip: {
    backgroundColor: '#E96E6E',
  },
  categoryText: {
    color: '#A9A9A9',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFF',
  },
});

export default CategoryList;
