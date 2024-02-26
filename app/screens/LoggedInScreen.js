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
    text: {
        alignSelf: 'center',
        fontSize: 22,
    },
    button: {
        top: 299,
        left: 130,
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
        top: 375,
        right: 130,
        borderColor: 'red',
        backgroundColor: 'red',
        width: 100,
        height: 50,
        marginTop: 25,
    }
})

export default LoggedInScreen;
