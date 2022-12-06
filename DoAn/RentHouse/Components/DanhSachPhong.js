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
                <View style={[styles.room, styles.myBorder]}>
                    <View><Text>{item.roomName}</Text></View>
                    <View><Text>TINH TRANG: {item.roomStatus}</Text></View>
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
            <View style={[styles.header, styles.myBorder]}>

                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.navigate("Menu") }}>
                    <Icon name="arrow-left" size={35} />
                </TouchableHighlight>

                {/* Title */}
                <Text>DANH SACH PHONG</Text>

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
        marginTop: 8,
    },
    body: {
        flex: 1,
        width: '90%',
    },
    room: {
        justifyContent: 'center',
        paddingLeft: 16,
        marginVertical: 8,
        height: 70,
        width: '100%',
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
