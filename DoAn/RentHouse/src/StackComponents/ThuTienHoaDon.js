import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

import { alertEmptyDialog } from '../helpers/dialog';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function App({ navigation, route }) {
    const [inputText, setInputText] = useState('')

    const handleCollect = () => {
        if (inputText === '')
            alertEmptyDialog()
        else {
            let collected = parseInt(route.params.currBill.collected) + parseInt(inputText)
            let remained = route.params.currBill.total - collected
            let count = parseInt(route.params.currBill.count) + 1
            route.params.setCurrBill({ ...route.params.currBill, collected: collected, remained: remained, count: count })
            const newBillHistory = route.params.billHistory.map(item => {
                if (item.id === route.params.currBill.id) {
                    item.collected = collected
                    item.remained = item.total - collected
                    item.count = count
                    return item
                }
                return item
            })
            route.params.setCurrRoom({ ...route.params.currRoom, billHistory: newBillHistory })
            const newRoomList = route.params.roomList.map(item => {
                if (item.id === route.params.currRoom.id) {
                    return { ...route.params.currRoom, billHistory: newBillHistory }
                }
                return item
            })

            route.params.setGlobalRoomList(newRoomList)
            route.params.setRoomList(newRoomList)
            setInputText('')
        }
    }


    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>THU TIỀN</Text>
                </View>

            </View>

            {/* Body */}
            <View style={styles.body}>
                <View style={styles.nhap}>
                    <Text style={{ fontSize: 25 }}>Nhập số tiền khách trả:</Text>
                </View>

                <TextInput style={[styles.input, styles.myBorder]}
                    onChangeText={(text) => { setInputText(text) }}
                    placeholder={'Nhập số tiền ...'}
                    defaultValue={''}
                >
                </TextInput>

                <View style={[styles.thieu, styles.myBackground]}>
                    <Text style={{ fontSize: 20, }}>Khách còn thiếu:</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{route.params.currBill.remained}đ</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => { handleCollect() }}>
                    <FontAwesomeIcon name="dollar" size={30} style={{ color: 'white', marginRight: 16 }} />

                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>THU TIỀN</Text>
                </TouchableOpacity>
            </View >
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        marginBottom: 8,
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
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },


    nhap: {
        width: '90%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    input: {
        width: '90%',
        height: '10%',
        marginBottom: 16,
        paddingLeft: 16
    },
    thieu: {
        width: '90%',
        height: '15%',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        marginBottom: 64,

    },
    button: {
        backgroundColor: 'black',
        borderRadius: 10,
        width: '90%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },





    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
