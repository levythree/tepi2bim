import React, { useState } from 'react';

import { View, TextInput, StyleSheet, Text, Image } from 'react-native';
import { Button } from "react-native-ios-kit";

import { firebaseAuth } from '../../FirebaseConfig';
import { signInWithEmailAndPassword} from 'firebase/auth';

const Login = ({ navigation }) => {
    const auth = firebaseAuth;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            console.log(response);
        } catch(error) {
            console.log(error);

            alert(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Senha" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
            <Button style={{position: 'absolute', top: 10}} onPress={() => navigation.navigate('ForgotPassword')} inline centered>
                Esqueci minha senha
            </Button>
            <Button style={styles.login} onPress={signIn} inline centered rounded inverted>
                <Text style={styles.loginText}>Login</Text>
            </Button>
            <Button style={{position: 'absolute', top: 110}} onPress={() => navigation.navigate('Register')} inline centered>
                Registrar
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        top: 190,
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
    login: {
        width: 100,
        height: 45,
        position: 'absolute',
        top: 50,
    },
    loginText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
    },
})

export default Login;
