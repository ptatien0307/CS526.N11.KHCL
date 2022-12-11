import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
export default function App({ navigation, route }) {
    const [roomList, setRoomList] = useState(route.params.roomList)

    const renderItem = ({ item }) => {
        return (

            // Go to specific room
            <TouchableHighlight onPress={() => {
                navigation.navigate("ChiTietPhong", {
                    currRoom: roomList[item.id - 1],
                    roomList,
                    setRoomList,
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
            </TouchableHighlight>
        )
    }

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

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableHighlight onPress={() => { navigation.navigate("Menu") }}>
                        <Icon name="arrow-left" size={35} />
                    </TouchableHighlight>

                    {/* Title */}
                    <Text style={styles.stackTitle}>DANH SÁCH PHÒNG</Text>

                </View>
            </View>


            {/* Body */}
            <View style={styles.body}>

                {/* View rooms */}
                <FlatList
                    data={roomList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}>
                </FlatList>

            </View>

            {/* Add room button */}
            <TouchableHighlight style={styles.addButton} onPress={() => { handleAddRoom() }}>
                <View>
                    <Text style={styles.textTitle}>+ THÊM PHÒNG</Text>
                </View>
            </TouchableHighlight >

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        paddingLeft: 8,
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        marginTop: 64,
        height: '90%',
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
    },


    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },

});
