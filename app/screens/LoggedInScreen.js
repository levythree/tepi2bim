import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Button } from "react-native-ios-kit";

import { firebaseAuth, firebaseFirestore } from '../../FirebaseConfig';
import { setDoc, addDoc, deleteDoc, doc, getDocs, collection } from 'firebase/firestore';

const LoggedInScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');

    const fetchNotes = async () => {
        if (firebaseAuth.currentUser) {
            const snapshot = await getDocs(collection(firebaseFirestore, 'users', firebaseAuth.currentUser.uid, 'notes'));
            const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            setNotes(notesData);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = async () => {
        if (newNote.trim() !== '') {
            const noteId = Date.now().toString();
            setNotes([...notes, { id: noteId, content: newNote }]);

            await setDoc(doc(firebaseFirestore, "users", firebaseAuth.currentUser.uid, "notes", noteId), {content: newNote});
            setNewNote('');
        }
    }

    const deleteNote = async id => {
        const updatedNotes = notes.filter(item => item.id !== id);
        
        setNotes(updatedNotes);

        await deleteDoc(doc(firebaseFirestore, "users", firebaseAuth.currentUser.uid, "notes", id));
    }

    const startEditing = (id, content) => {
        setEditingNoteId(id);
        setEditingNoteContent(content);
    }

    const saveEdit = async () => {
        const updatedNotes = notes.map(note => 
            note.id === editingNoteId ? { ...note, content: editingNoteContent } : note
        );
        setNotes(updatedNotes);

        await setDoc(doc(firebaseFirestore, "users", firebaseAuth.currentUser.uid, "notes", editingNoteId), { content: editingNoteContent });
        
        setEditingNoteId(null);
        setEditingNoteContent('');
    }

    const cancelEdit = () => {
        setEditingNoteId(null);
        setEditingNoteContent('');
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={notes} 
                keyExtractor={(item) => item.id} 
                renderItem={({ item }) => (
                <View style={styles.note}>
                    {editingNoteId === item.id ? (
                        <View style={styles.editInputContainer}>
                            <TextInput
                                style={[styles.noteText, styles.editInput]}
                                value={editingNoteContent}
                                onChangeText={(text) => setEditingNoteContent(text)}
                                underlineColorAndroid="white"
                            />
                        </View>
                    ) : (
                        <Text style={styles.noteText}>{item.content}</Text>
                    )}
                    {editingNoteId === item.id ? (
                        <View style={styles.editButtonsContainer}>
                            <Button style={styles.saveEdit} onPress={saveEdit} inline rounded inverted>
                                <Text style={styles.editText}>Salvar</Text>
                            </Button>
                            <Button style={styles.cancelEdit} onPress={cancelEdit} inline rounded inverted>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </Button>
                        </View>
                    ) : (
                        <View style={styles.defaultButtonsContainer}>
                            <Button style={styles.editNote} onPress={() => startEditing(item.id, item.content)} inline rounded inverted>
                                <Text style={styles.buttonText}>Editar</Text>
                            </Button>
                            <Button style={styles.removeNote} onPress={() => deleteNote(item.id)} inline rounded inverted>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </Button>
                        </View>
                    )}
                </View>
            )} />
            <TextInput 
                style={styles.input} 
                value={newNote} 
                onChangeText={(text) => setNewNote(text)} 
                placeholder="Escreva sua nota aqui" 
                autoCapitalize="none" 
            />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={addNote} inline centered rounded inverted>
                    <Text style={styles.buttonText}>Add Note</Text>
                </Button>
                <Button style={styles.logout} onPress={() => firebaseAuth.signOut()} inline centered rounded inverted>
                    <Text style={styles.buttonText}>Log out</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'relative',
        padding: 10,
    },
    note: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 8,
        backgroundColor: "#0c1899",
        borderRadius: 8,
    },
    noteText: {
        color: "#f0f00c",
        fontSize: 20,
        flex: 1,
    },
    removeNote: {
        borderColor: 'red',
        backgroundColor: 'red',
        width: 70,
        height: 30,
        marginLeft: 10,
    },
    editNote: {
        borderColor: '#56bf1f',
        backgroundColor: '#56bf1f',
        width: 70,
        height: 30,
        marginLeft: 10,
    },
    saveEdit: {
        borderColor: 'yellow',
        backgroundColor: 'yellow',
        width: 70,
        height: 30,
        marginLeft: 10,
    },
    cancelEdit: {
        borderColor: 'gray',
        backgroundColor: 'gray',
        width: 90,
        height: 30,
        marginLeft: 10,
    },
    editInputContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        marginRight: 10,
    },
    editInput: {
        color: "#f0f00c",
        fontSize: 20,
    },
    input: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginBottom: 20,
        marginTop: 25,
        width: 100,
        height: 50,
    },
    buttonText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center',
    },
    editText: {
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
    logout: {
        marginTop: 25,
        borderColor: 'red',
        backgroundColor: 'red',
        width: 100,
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    editButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    defaultButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default LoggedInScreen;
