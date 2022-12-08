import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
export default function App({ navigation, route }) {
    const [roomList, setRoomList] = useState(route.params.roomList)

    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={() => {
                navigation.navigate("ChiTietPhong", {
                    specRoom: roomList[item.id - 1],
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
            id: roomList[roomList.length - 1].id + 1,
            roomName: 'Phong ' + (roomList[roomList.length - 1].id + 1),
            roomStatus: 'trong',
            price: 800000,
            contractDay: '0',
            deposit: 0,
            members: [],
            donGiaDien: route.params.ELECTRICITY,
            donGiaNuoc: route.params.WATER,
        }])

        route.params.setRoomList([...roomList, {
            id: roomList[roomList.length - 1].id + 1,
            roomName: 'Phong ' + (roomList[roomList.length - 1].id + 1),
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
            <View style={[styles.header, styles.myBackground]}>

                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.navigate("Menu") }}>
                    <Icon name="arrow-left" size={35} />
                </TouchableHighlight>

                {/* Title */}
                <Text style={styles.textTitleStyle}>DANH SÁCH PHÒNG</Text>

                {/* Add room button */}
                <TouchableHighlight onPress={() => { handleAddRoom() }}>
                    <Icon name="plus-circle" size={35} />
                </TouchableHighlight>
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 8,
    },
    body: {
        height: '90%',
        width: '90%',
    },
    room: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingVertical: 16,
        marginBottom: 8,
        width: '100%',
    },





    styleRoomName: {
        fontWeight: 'bold',
    },
    textTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    myBackground: {

        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
});
