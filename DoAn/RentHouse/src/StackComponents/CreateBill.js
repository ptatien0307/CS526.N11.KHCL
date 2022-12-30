import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog, deleteSuccessDialog, addSuccessDialog } from '../Dialogs/dialog.js';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {
    const [isLapHoaDonModal, setIsLapHoaDonModal] = useState(false)
    const [roomList, setRoomList] = useState(route.params.roomList.filter(room => room.members.length > 0))
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const renderItem = ({ item }) => (

        // Ghi chi so dich vu modal
        <TouchableOpacity onPress={() => {
            navigation.navigate('GhiChiSoDichVu',
                { room: item, roomList: roomList, setRoomList: setRoomList })
        }}>
            <View style={[styles.room, styles.myBackground]}>

                {/* Room name */}
                <View>
                    <Text style={styles.styleRoomName}>{item.roomName}</Text>
                </View>

                {/* Room status */}
                <View>
                    <Text>TÌNH TRẠNG: {item.roomStatus}</Text>
                </View>

            </View>
        </TouchableOpacity>

    )

    return (
        <View style={styles.container}>



            {/* Body */}
            <View style={styles.body}>
                <Text style={[styles.date]}> Thang {month} {year}</Text>

                <FlatList
                    data={roomList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },

    body: {
        width: '90%',
        minHeight: '50%',
        maxHeight: '90%',
        paddingLeft: 8,
    },

    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },

    styleRoomName: {
        fontWeight: 'bold',
    },

    room: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingVertical: 16,
        marginBottom: 8,
        width: '100%',
        borderLeftWidth: 5,
    },

    date: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
});
