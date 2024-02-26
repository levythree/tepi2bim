import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import React, {useState} from 'react'

import { Button } from "react-native-ios-kit";

import { firebaseAuth } from '../../FirebaseConfig';

const AddNote = () => {
    const auth = firebaseAuth;

    const [note, setNote] = useState('');

    const saveNote = () => {

    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Escreva sua nota aqui" autoCapitalize="none"></TextInput>
            <Button style={styles.button} onPress={() => saveNote()} inline centered rounded inverted>
                <Text style={styles.buttonText}>Salvar</Text>
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
    input: {
        marginVertical: 4,
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
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
    }
})

export default AddNote;
