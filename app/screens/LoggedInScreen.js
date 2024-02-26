import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'

import { Button } from "react-native-ios-kit";

import { firebaseAuth } from '../../FirebaseConfig';

const LoggedInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Button style={styles.logout} onPress={() => firebaseAuth.signOut()} inline centered rounded inverted>
                <Text style={styles.buttonText}>Log out</Text>
            </Button>
            <Button style={styles.button} onPress={() => navigation.navigate('Add Note')} inline centered rounded inverted>
                <Text style={styles.buttonText}>Add Note</Text>
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
    button: {
        width: 100,
        height: 50,
        marginTop: 25,
    },
    buttonText: {
        fontSize: 17,
        color: '#fff',
        alignSelf: 'center',
    },
    logout: {
        color: '#e81010',
        width: 100,
        height: 50,
        marginTop: 25,
    }
})

export default LoggedInScreen;
