import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = ({
  leftIconName = 'grid-outline',
  onLeftPress,
  profileUri,
  onProfilePress,
  title = '',
  rightIconName,
  onRightPress,
  rightIconColor = '#333',
}) => {
  const isFontAwesome = rightIconName?.includes('heart');

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
        <Icon name={leftIconName} size={24} color="#000" />
      </TouchableOpacity>

      {title ? (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={onRightPress || onProfilePress}>
        {rightIconName ? (
          <View style={styles.iconButton}>
            {isFontAwesome ? (
              <FontAwesome name={rightIconName} size={22} color={rightIconColor} />
            ) : (
              <Icon name={rightIconName} size={24} color={rightIconColor} />
            )}
          </View>
        ) : (
          <Image
            source={{
              uri:
                profileUri || 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.profileImage}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 10,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
});

export default Header;
