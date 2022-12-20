`use strict`;

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function RoomItem({ room, onPress }) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.room, styles.myBackground]}>
                <View>
                    <Text style={styles.styleRoomName}>{room.name}</Text>
                </View>

                <View>
                    <Text>TÌNH TRẠNG: {room.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    room: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 16,
        paddingVertical: 16,
        marginBottom: 8,
        width: "100%",
        borderLeftWidth: 5,
    },
    styleRoomName: {
        fontWeight: "bold",
    },
    myBackground: {
        backgroundColor: "#dfdfdf",
        borderRadius: 10,
    },
});

export default RoomItem;
