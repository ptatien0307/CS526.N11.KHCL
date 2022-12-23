`use strict`;

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

import { ModalAdd, ModalEdit } from "../helpers/modal";
import { insertNote, updateNote, deleteNote } from "../database/actions/noteAction";

function NoteItem({ note }) {
    const [mountEdit, setMountEdit] = useState(false);
    const [mounDelete, setMountDelete] = useState(false);

    const handleEditNote = (note) => {
        updateNote(note);
    };

    const handleDeleteNote = (note) => {

    };



    return (
        <TouchableOpacity
            style={[styles.note, styles.myBackground]}
            onPress={() => handleEditNote(note)}
        >
            <View style={styles.noteContent}>
                <Text>
                    {note.id}. {note.noteContent}
                </Text>
            </View>

            <View style={styles.noteIcon}>
                <TouchableOpacity
                    onPress={() => {
                        handleDeleteNote(note);
                    }}
                >
                    <Icon
                        name="remove"
                        size={25}
                        style={[styles.icon]}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    note: {
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 5,
        width: "100%",
        marginBottom: 16,
    },
    icon: {
        marginHorizontal: 4,
    },
    noteContent: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    noteIcon: {
        position: "absolute",
        right: 0,
        flexDirection: "row",
    },
    myBackground: {
        backgroundColor: "#dfdfdf",
        borderRadius: 10,
    },
});

export default NoteItem;