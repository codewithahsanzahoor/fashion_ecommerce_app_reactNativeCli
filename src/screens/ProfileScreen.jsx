import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/userSlice';
import Header from '../components/Header';

const ProfileOption = ({ iconName, title, onPress, color = '#333' }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <View style={styles.optionLeft}>
      <View
        style={[
          styles.iconWrapper,
          color === '#333' ? styles.iconGray : styles.iconRed,
        ]}
      >
        <Icon name={iconName} size={22} color={color} />
      </View>
      <Text style={[styles.optionTitle, { color }]}>{title}</Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#CCC" />
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }) => {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ name: '', email: '' });

  React.useEffect(() => {
    if (isEditing) {
      setEditForm({ name: profile.name, email: profile.email });
    }
  }, [isEditing, profile]);

  const handleSave = () => {
    dispatch(updateProfile(editForm));
    setIsEditing(false);
  };

  return (
    <View style={styles.safeArea}>
      <Header
        title="My Profile"
        leftIconName="chevron-back"
        onLeftPress={() => navigation?.goBack()}
        rightIconName={isEditing ? "checkmark" : "pencil"}
        onRightPress={() => isEditing ? handleSave() : setIsEditing(true)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: profile.avatar }}
            style={styles.profileImage}
          />
          {isEditing ? (
            <>
              <TextInput
                style={styles.editInputName}
                value={editForm.name}
                onChangeText={(text) => setEditForm(f => ({ ...f, name: text }))}
                placeholder="Name"
              />
              <TextInput
                style={styles.editInputEmail}
                value={editForm.email}
                onChangeText={(text) => setEditForm(f => ({ ...f, email: text }))}
                placeholder="Email"
                autoCapitalize="none"
              />
            </>
          ) : (
            <>
              <Text style={styles.userName}>{profile.name}</Text>
              <Text style={styles.userEmail}>{profile.email}</Text>
            </>
          )}
        </View>

        {/* Menu Options Section */}
        <View style={styles.menuContainer}>
          <ProfileOption
            iconName="bag-outline"
            title="My Orders"
            onPress={() => navigation.navigate('Orders')}
          />
          <ProfileOption
            iconName="location-outline"
            title="Shipping Addresses"
            onPress={() => console.log('Shipping Addresses')}
          />
          <ProfileOption
            iconName="card-outline"
            title="Payment Methods"
            onPress={() => console.log('Payment Methods')}
          />
          <ProfileOption
            iconName="settings-outline"
            title="Settings"
            onPress={() => console.log('Settings')}
          />
        </View>

        {/* Log Out Button */}
        <View style={styles.logoutContainer}>
          <ProfileOption
            iconName="log-out-outline"
            title="Log Out"
            color="#E96E6E"
            onPress={() => console.log('Log Out')}
          />
        </View>
      </ScrollView>
    </View>
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
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  editInputName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#E96E6E',
    marginBottom: 5,
    minWidth: 200,
    textAlign: 'center',
    paddingVertical: 2,
  },
  editInputEmail: {
    fontSize: 14,
    color: '#777',
    borderBottomWidth: 1,
    borderBottomColor: '#E96E6E',
    minWidth: 200,
    textAlign: 'center',
    paddingVertical: 2,
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyAvatar: {
    width: 45,
    height: 45,
  },
  iconGray: {
    backgroundColor: '#F5F5F5',
  },
  iconRed: {
    backgroundColor: '#FFF1F1',
  },
});

export default ProfileScreen;
