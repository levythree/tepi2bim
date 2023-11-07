import { View, TextInput, StyleSheet, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { firebaseAuth } from '../../FirebaseConfig';
import { Button } from "react-native-ios-kit";

import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const auth = firebaseAuth;

    const forgotPassword = async () => {
        try {
            const response = await sendPasswordResetEmail(auth, email);

            console.log(response);

            navigation.navigate('Login');
        } catch (error) {
            console.log(error);

            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <Button style={styles.sendEmail} onPress={forgotPassword} inline centered rounded inverted>
                <Text style={styles.sendEmailText}>Enviar email</Text>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        top: 220,
        position: 'absolute',
        height: 120,
        width: 120,
        alignSelf: 'center',
    },
    input: {
        marginVertical: 4,
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    sendEmail: {
        width: 120,
        height: 50,
        position: 'absolute',
        top: 20,
    },
    sendEmailText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
    },
})

export default ForgotPassword;
