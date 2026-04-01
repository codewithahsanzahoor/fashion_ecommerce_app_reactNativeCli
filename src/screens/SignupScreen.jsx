import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useRegisterMutation } from '../store/slices/authApiSlice';
import { ActivityIndicator, Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerApi, { isLoading }] = useRegisterMutation();

    const handleSignup = async () => {
        if (name && email && password) {
            try {
                await registerApi({ name, email, password }).unwrap();
                Alert.alert(
                    'Success',
                    'Account created successfully! Please login.',
                );
                navigation.navigate('Login');
            } catch (err) {
                Alert.alert(
                    'Signup Failed',
                    err.data?.message || 'Something went wrong',
                );
            }
        } else {
            Alert.alert('Validation Error', 'Please fill all fields');
        }
    };

    return (
        <LinearGradient
            colors={['#FDF0F3', '#FFFBFC']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Sign up to get started
                        </Text>
                    </View>

                    <View style={styles.formSection}>
                        <View style={styles.inputContainer}>
                            <Icon
                                name="user-o"
                                size={20}
                                color="#A9A9A9"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon
                                name="envelope-o"
                                size={20}
                                color="#A9A9A9"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon
                                name="lock"
                                size={20}
                                color="#A9A9A9"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.signupButton,
                                isLoading && { opacity: 0.7 },
                            ]}
                            onPress={handleSignup}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.signupButtonText}>
                                    Sign Up
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    headerSection: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#777',
    },
    formSection: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 55,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    signupButton: {
        backgroundColor: '#E96E6E',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#E96E6E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginTop: 10,
    },
    signupButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: '#777',
        fontSize: 15,
    },
    loginText: {
        color: '#C67C4E',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
