import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ onMenuPress, profileUri, onProfilePress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
        <Icon name="grid-outline" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={{ uri: profileUri || 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});

export default Header;
