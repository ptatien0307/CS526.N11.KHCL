import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useForceUpdate } from "../utils/utils";
import { fetchRoomList, insertRoom } from "../database/actions/roomActions";

export default function App({ navigation, route }) {
    const [roomList, setRoomList] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    // Get room list from database
    useEffect(() => {
        const loadRoomList = async () => {
            const rooms = await fetchRoomList().catch((err) =>
                console.log(err)
            );
            setRoomList(rooms);
        };

        loadRoomList();
    }, [forceUpdateId]);

    const renderItem = ({ item }) => {
        return (
            // Go to room's details
            <TouchableOpacity
                onPress={() => {
                    setSelectedRoomId(item.id);
                    navigation.navigate('RoomDetail', {
                        selected_room_id: item.id,
                    });
                }}>
                <View style={[styles.room, styles.myBackground]}>
                    <View>
                        <Text style={styles.styleRoomName}>{item.name}</Text>
                    </View>

                    <View>
                        <Text>TÌNH TRẠNG: {item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const handleAddRoom = () => {
        insertRoom(
            {
                name: `Phòng ${roomList.length + 1}`,
                rental_fee: 950000,
                old_electricity_number: new Date().getTime() % 1000000,
                old_water_number: new Date().getTime() % 2000000,
            },
            forceUpdate
        );
    };

    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.body}>
                <FlatList
                    data={roomList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedRoomId}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        handleAddRoom();
                    }}>
                    <Icon name="plus-circle" size={35} color="white" />
                </TouchableOpacity>
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
        textAlign: 'center',
    },
    textTitleWhite: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
});
