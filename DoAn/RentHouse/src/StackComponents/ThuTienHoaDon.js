import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import { alertEmptyDialog, successDialog, errorDialog } from '../helpers/dialog';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function App(params) {
    const inAnimetedValue = useRef(new Animated.Value(470)).current
    const outAnimetedValue = useRef(new Animated.Value(0)).current

    const [inputText, setInputText] = useState('')

    const handleCollect = () => {
        if (inputText === '')
            alertEmptyDialog()
        else if (parseInt(inputText) > params.currBill.remained) {
            errorDialog('Vui lòng nhập số tiền nhỏ hơn số tiền mà phòng còn thiếu.')
        }
        else {
            let collected = parseInt(params.currBill.collected) + parseInt(inputText)
            let remained = params.currBill.total - collected
            let count = parseInt(params.currBill.count) + 1
            params.setCurrBill({ ...params.currBill, collected: collected, remained: remained, count: count })
            const newBillHistory = params.billHistory.map(item => {
                if (item.id === params.currBill.id) {
                    item.collected = collected
                    item.remained = remained
                    item.count = count
                    return item
                }
                return item
            })
            params.setCurrRoom({ ...params.currRoom, billHistory: newBillHistory })
            const newRoomList = params.roomList.map(item => {
                if (item.id === params.currRoom.id) {
                    return { ...params.currRoom, billHistory: newBillHistory }
                }
                return item
            })

            params.setGlobalRoomList(newRoomList)
            params.setRoomList(newRoomList)
            successDialog(`Đã thu thành công ${inputText}đ. ${params.currRoom.roomName} còn nợ ${remained}đ`)
            setInputText('')
            handleClose()
        }
    }


    useEffect(() => {
        Animated.timing(inAnimetedValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start()
    }, [inAnimetedValue])


    const slideOutAnimation = () => {
        return new Promise((resolve) => {
            Animated.timing(outAnimetedValue, {
                toValue: 470,
                duration: 250,
                useNativeDriver: false,
            }).start(() => { resolve(1) })
        })
    }

    const handleClose = async () => {
        let temp = await slideOutAnimation()
        if (temp)
            params.setIsThuTienModal(false)
    }

    return (
        <View style={[styles.container]}>

            <Animated.View style={[styles.modal, {
                transform: [{ translateY: outAnimetedValue }, { translateY: inAnimetedValue }]
            }]}>
                {/* Header */}
                <View style={[styles.header]}>

                    <View style={styles.headerTop}>

                        <Text style={styles.stackTitle}>THU TIỀN</Text>


                        <TouchableOpacity onPress={() => {
                            handleClose()
                        }}>
                            <FontAwesomeIcon name="times-circle" size={40} />
                        </TouchableOpacity>

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
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{params.currBill.remained}đ</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => { handleCollect() }}>
                        <FontAwesomeIcon name="dollar" size={25} style={{ color: 'white', marginRight: 16 }} />

                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>THU TIỀN</Text>
                    </TouchableOpacity>
                </View >
            </Animated.View>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 999,
        position: 'absolute',
    },
    modal: {
        width: '100%',
        height: '75%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
    },



    header: {
        width: '100%',
        height: '15%',
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
        alignItems: 'flex-start',
        marginBottom: 8,
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
        marginRight: 128,
        fontSize: 35,
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
