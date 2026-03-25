import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SizeSelector = ({ sizes, activeSize, onSelect }) => {
  return (
    <View style={styles.container}>
      {sizes.map((size, index) => {
        const isActive = activeSize === size;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.sizeBox, isActive && styles.activeSizeBox]}
            onPress={() => onSelect(size)}
          >
            <Text style={[styles.sizeText, isActive && styles.activeSizeText]}>
              {size}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  sizeBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  activeSizeBox: {
    backgroundColor: '#E96E6E',
  },
  sizeText: {
    fontSize: 16,
    color: '#777',
    fontWeight: '600',
  },
  activeSizeText: {
    color: '#FFF',
  },
});

export default SizeSelector;
