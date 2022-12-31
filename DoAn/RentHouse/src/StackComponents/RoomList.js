import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';


export default function App({ navigation, route }) {
    const [roomList, setRoomList] = useState(route.params.roomList)
    const renderItem = ({ item }) => {
        return (
            // Go to specific room
            <TouchableOpacity onPress={() => {
                navigation.navigate("RoomDetail", {
                    currRoom: roomList[item.id - 1],
                    roomList,
                    setRoomList,
                    setGlobalRoomList: route.params.setRoomList,
                })
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
    }



    // BACK-END ___ ADD ROOM
    const handleAddRoom = () => {
        setRoomList([...roomList, {
            id: parseInt(roomList[roomList.length - 1].id) + 1,
            roomName: 'Phong ' + (parseInt(roomList[roomList.length - 1].id) + 1),
            roomStatus: 'trong',
            price: 800000,
            contractDay: '0',
            deposit: 0,
            members: [],
            donGiaDien: route.params.ELECTRICITY,
            donGiaNuoc: route.params.WATER,
        }])

        route.params.setRoomList([...roomList, {
            id: parseInt(roomList[roomList.length - 1].id) + 1,
            roomName: 'Phong ' + (parseInt(roomList[roomList.length - 1].id) + 1),
            roomStatus: 'trong',
            price: 800000,
            contractDay: '0',
            deposit: 0,
            members: [],
            donGiaDien: route.params.ELECTRICITY,
            donGiaNuoc: route.params.WATER,
        }])
    }






    return (
        <View style={styles.container}>

            {/* Body */}
            <View style={styles.body}>

                {/* View rooms */}
                <FlatList
                    data={roomList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}>
                </FlatList>
                {/* Add room button */}
                <TouchableOpacity style={styles.addButton} onPress={() => { handleAddRoom() }}>
                    <Icon name="plus-circle" size={35} color='white' />
                </TouchableOpacity >
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    body: {
        height: '100%',
        width: '95%',
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
    styleRoomName: {
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: 'absolute',
        bottom: 8,
        right: 8,
    },


    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitleWhite: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },

});
