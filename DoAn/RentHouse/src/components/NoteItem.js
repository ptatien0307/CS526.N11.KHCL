`use strict`;

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

function NoteItem({ note, onPress }) {
    return (
        <View style={[styles.note, styles.myBackground]}>
            <View style={styles.noteContent}>
                <Text>
                    {note.id}. {note.noteContent}
                </Text>
            </View>

            <View style={styles.noteIcon}>
                <TouchableOpacity
                    onPress={() => {
                        handleEditNote(note);
                    }}
                >
                    <FontAwesomeIcon
                        name="pencil"
                        size={20}
                        style={[
                            styles.icon,
                            { display: mountEdit ? "flex" : "none" },
                        ]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleDeleteNote(note);
                    }}
                >
                    <FontAwesomeIcon
                        name="remove"
                        size={25}
                        style={[
                            styles.icon,
                            { display: mounDelete ? "flex" : "none" },
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
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

