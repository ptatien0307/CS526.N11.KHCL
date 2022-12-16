import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';



export default function App({ navigation, route }) {
    const [billList, setBillList] = useState(route.params.billList)
    const [roomList, setRoomList] = useState(route.params.roomList)

    const renderItem = ({ item }) => {
        return (
            // Go to specific room
            <TouchableOpacity onPress={() => {
                navigation.navigate("ChiTietHoaDon", {
                    currBill: billList[item.id - 1],
                    roomList,
                    billList,
                    setBillList,
                })
            }}>
                <View style={[styles.room, styles.myBackground]}>
                    {/* Room name */}
                    <View>
                        <Text style={styles.styleRoomName}>{item.roomName} - {item.monthYear}</Text>
                    </View>

                    {/* Room status */}
                    <View style={styles.bodyTop}>
                        <View>
                            <Text style={styles.textBody}>Tổng tiền</Text>
                            <Text style={styles.textBody}>{item.total}</Text>
                        </View>
                        <View>
                            <Text style={styles.textBody}>Đã thu</Text>
                            <Text style={styles.textBody}>{item.collected}</Text>
                        </View>
                        <View>
                            <Text style={styles.textBody}>Còn lại</Text>
                            <Text style={styles.textBody}>{item.remained}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.stackTitle}>THU TIỀN HÓA ĐƠN</Text>

                </View>
            </View>


            {/* Body */}
            <View style={styles.body}>
                <FlatList
                    data={billList}
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
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        paddingLeft: 8,
        borderBottomWidth: 2,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    body: {
        height: '100%',
        width: '100%',
    },
    bodyTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
        flexDirection: 'row',
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
    textBody: {
        fontSize: 15,
        textAlign: 'center',
    },

});
