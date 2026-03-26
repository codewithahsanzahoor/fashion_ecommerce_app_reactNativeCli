import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ value, onChangeText, placeholder = 'Search' }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#A9A9A9" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {/* <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Icon name="options-outline" size={20} color="#000" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  filterButton: {
    marginLeft: 15,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 15,
    elevation: 2,
  },
});

export default SearchBar;
