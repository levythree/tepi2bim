import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'

import { Button } from "react-native-ios-kit";

import { firebaseAuth } from '../../FirebaseConfig';

const LoggedInScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.jpg')} />
            <Text style={styles.text}>Logado com sucesso!</Text>
            <Button style={styles.logout} onPress={() => firebaseAuth.signOut()} inline centered rounded inverted>
                <Text style={styles.logoutText}>Log out</Text>
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
        top: 210,
        position: 'absolute',
        height: 120,
        width: 120,
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'center',
        fontSize: 22,
    },
    logout: {
        width: 100,
        height: 50,
        marginTop: 25,
    },
    logoutText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
    }
})

export default LoggedInScreen;
