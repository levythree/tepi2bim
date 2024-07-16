import { View, TextInput, StyleSheet, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { firebaseAuth } from '../../FirebaseConfig';
import { firebaseFirestore } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button } from "react-native-ios-kit";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const auth = firebaseAuth;

    const signUp = async () => {
        if (password === confirmation) {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                const userid = response.user.uid;

                console.log(response);
                console.log(userid);

                await setDoc(doc(firebaseFirestore, "users", userid), { email: email });

                navigation.navigate('Login');
            } catch(error) {
                alert(error.message);
            }
        } else {
            alert("A senha e a confirmação da senha precisam ser iguais!");
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            <TextInput value={email} style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} secureTextEntry={true} style={styles.input} placeholder="Senha" onChangeText={(text) => setPassword(text)}></TextInput>
            <TextInput value={confirmation} secureTextEntry={true} style={styles.input} placeholder="Confirme sua senha" onChangeText={(text) => setConfirmation(text)}></TextInput>
            <Button style={styles.register} onPress={signUp} inline centered rounded inverted>
                <Text style={styles.registerText}>Criar conta</Text>
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
        top: 150,
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
    register: {
        width: 120,
        height: 50,
        marginTop: 10,
    },
    registerText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
    },
});

export default Register;
