import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const ColorSelector = ({ colors, activeColor, onSelect }) => {
  return (
    <View style={styles.container}>
      {colors.map((color, index) => {
        const isActive = activeColor === color;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorOuterRing,
              isActive && { borderColor: color },
            ]}
            onPress={() => onSelect(color)}
          >
            <View style={[styles.colorInnerCircle, { backgroundColor: color }]} />
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
  colorOuterRing: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorInnerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default ColorSelector;
