import { View, Text, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import React, {useState} from 'react'

import { Button } from "react-native-ios-kit";

import { firebaseAuth } from '../../FirebaseConfig';

const LoggedInScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (newNote.trim() !== '') {
            setNotes([...notes, { id: Date.now().toString(), content: newNote }]);
        }
    }

    const deleteNote = id => {
        const updatedNotes = notes.filter(item => item.id !== id);
        
        setNotes(updatedNotes);
    }

    return (
        <View style={styles.container}>
            <FlatList data={notes} keyExtractor={(item) => item.id} renderItem={({ item }) => (
                <View style={styles.note}>
                    <Text style={styles.noteText}>{item.content}</Text>
                    <Button style={styles.removeNote} onPress={() => deleteNote(item.id)} inline rounded inverted>
                        <Text style={styles.buttonText}>Excluir</Text>
                    </Button>
                </View>
            )}>
            </FlatList>
            <TextInput style={styles.input} value={newNote} onChangeText={(text) => setNewNote(text)} placeholder="Escreva sua nota aqui" autoCapitalize="none" />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={addNote} inline centered rounded inverted>
                    <Text style={styles.buttonText}>Add Note</Text>
                </Button>
                <Button style={styles.logout} onPress={() => firebaseAuth.signOut()} inline centered rounded inverted>
                    <Text style={styles.buttonText}>Log out</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'relative'
    },
    note: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 12,
        width: 350,
        height: 40,
        backgroundColor: "#0c1899",
        borderWidth: 2
    },
    noteText: {
        color: "#f0f00c",
        marginLeft: 8,
        marginTop: 2,
        fontSize: 20
    },
    removeNote: {
        marginLeft: 10,
        marginTop: 7,
        position: "absolute",
        borderColor: 'red',
        backgroundColor: 'red',
        width: 50,
        height: 20,
    },
    input: {
        position: "absolute",
        top: 630,
        marginHorizontal: 20,
        height: 60,
        width: 350,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        zIndex: 1
    },
    text: {
        alignSelf: 'center',
        fontSize: 22,
    },
    button: {
        marginBottom: 20,
        marginLeft: 255,
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
        position: "absolute",
        right: 255,
        top: 25,
        borderColor: 'red',
        backgroundColor: 'red',
        width: 100,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 20,
    }
});

export default LoggedInScreen;
