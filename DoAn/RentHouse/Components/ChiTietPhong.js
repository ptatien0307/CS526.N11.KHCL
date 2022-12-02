import { StyleSheet, View, Text, TouchableHighlight, FlatList, TextInput, Modal, Alert } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { useState } from 'react';
export default function App({ navigation, route }) {

    const [specRoom, setSpecRoom] = useState(route.params.specRoom)
    const [mountInfo, setMountInfo] = useState(true)
    const [mountEdit, setMountEdit] = useState(false)





    const [isModalVisible, setIsModalVisible] = useState(false)
    const [inputText, setInputText] = useState('')
    const [editItemID, setEditItemID] = useState()
    const [editItemContent, setEditItemContent] = useState()


    const renderMembers = ({ item }) => {
        return (
            <View style={styles.member}>
                <Text>{item.memberName}</Text>
            </View>
        )
    }

    const renderBills = ({ item }) => {
        return (
            <View style={[styles.bill, styles.myBorder]}>
                <Text style={{ fontSize: 20 }}>Tháng {item.month}: {item.money}</Text>
            </View>
        )
    }

    const onPressEdit = (type) => {
        setIsModalVisible(true)
        setInputText(specRoom[type])
        setEditItemID(specRoom.id)
        setEditItemContent(type)
    }


    const createAlertButton = () => {
        Alert.alert(
            "Error",
            "Empty note",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }


    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header, styles.myBorder]}>

                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.goBack() }}>
                    <FontAwesomeIcon name="arrow-left" size={35} />
                </TouchableHighlight>

                <Text>CHI TIET PHONG</Text>

                {/* Edit info button */}
                <TouchableHighlight onPress={() => { setMountEdit(!mountEdit) }}>
                    <FontAwesomeIcon name="edit" size={35} />
                </TouchableHighlight>
            </View>

            {/* Body */}
            <View style={styles.body}>

                {/* Info and Bill button */}
                <View style={styles.row}>
                    <TouchableHighlight style={styles.feature} onPress={() => { if (!mountInfo) setMountInfo(!mountInfo) }}>
                        <Text>THONG TIN</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.feature} onPress={() => { if (mountInfo) setMountInfo(!mountInfo) }}>
                        <Text>LICH SU HOA DON</Text>
                    </TouchableHighlight>
                </View>

                {/* View info */}
                {mountInfo && <View style={styles.info}>
                    {/* View room details */}
                    <View style={[styles.infoContainer, styles.myBorder]}>

                        {/* View basic info */}
                        <View style={styles.basicInfoContainer}>

                            <View style={styles.infoRow}>

                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>{specRoom.roomName}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('roomName') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>Ngay lap hop dong:</Text>
                                        <Text>{specRoom.contractDay}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('contractDay') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                            </View>
                            <View style={styles.infoRow}>

                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>Gia thue:</Text>
                                        <Text>{specRoom.price}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('price') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>Tien coc:</Text>
                                        <Text>{specRoom.deposit}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('deposit') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                            </View>

                        </View>

                        {/* View members */}
                        <View style={[styles.membersContainer, styles.myBorder]}>
                            <FlatList
                                data={specRoom.members}
                                renderItem={renderMembers}
                                keyExtractor={item => item.id}>
                            </FlatList>
                        </View>


                        <View style={[styles.chiSoDichVu, styles.myBorder]}>
                            <View style={styles.dichVu}>
                                <IonIcon name="water" size={20} style={{ marginRight: 20 }} />
                                <Text>{specRoom.tienNuoc} đ/khối</Text>
                            </View>
                            <View style={styles.dichVu}>
                                <FontAwesomeIcon name="bolt" size={20} style={{ marginLeft: 4, marginRight: 26 }} />
                                <Text>{specRoom.tienDien} đ/kwh</Text>
                            </View>
                        </View>

                    </View>
                </View>}








                {/* View Bill */}
                {!mountInfo && <View style={styles.billInfo}>
                    {/* View bill details */}
                    <FlatList
                        data={specRoom.billHistory}
                        renderItem={renderBills}
                        keyExtractor={item => item.id}>
                    </FlatList>

                </View>}
            </View>


            {/* View modal */}
            <Modal
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => { setIsModalVisible(false) }}>

                <View style={styles.modalContainer}>
                    <View style={[styles.modalView, styles.myBorder]}>
                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                            <TouchableHighlight onPress={() => { setIsModalVisible(!isModalVisible) }}>
                                <FontAwesomeIcon name="times-circle" size={20} />
                            </TouchableHighlight>
                        </View>


                        <Text style={[styles.textTitle, styles.myBorder]}> Change Text</Text>


                        <TextInput
                            style={[styles.myBorder, styles.text]}

                            onChangeText={(text) => { setInputText(text) }}
                            defaultValue={inputText}
                            editable={true}
                            multiline={false}
                            maxLength={256}>
                        </TextInput>

                        <TouchableHighlight style={styles.saveButton}
                            onPress={() => {
                                if (inputText === '') {
                                    createAlertButton()

                                }
                                else {
                                    setSpecRoom({ ...specRoom, [editItemContent]: inputText })


                                    const newRoomList = route.params.roomList.map(item => {
                                        if (item.id === editItemID) {
                                            if (editItemContent === 'contractDay') item.contractDay = inputText
                                            else if (editItemContent === 'price') item.price = inputText
                                            else if (editItemContent === 'deposit') item.deposit = inputText
                                            else if (editItemContent === 'roomName') item.roomName = inputText

                                            return item
                                        }
                                        return item
                                    })
                                    route.params.setRoomList(newRoomList)
                                    setInputText('')
                                    setIsModalVisible(false)
                                }

                            }}>
                            <Text style={{ fontSize: 20 }}>SAVE</Text>


                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
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
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    body: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        textAlign: 'center',
        width: '90%',
        height: 25,
        marginTop: 8,
        marginRight: 4,
    },
    info: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
    billInfo: {
        flex: 1,
        width: '90%'
    },
    row: {
        width: '90%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 4,
    },
    infoRow: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    feature: {
        width: '45%',
        height: '90%',
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    basicInfoContainer: {
        width: '90%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    basicInfo: {
        width: '45%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    membersContainer: {
        width: '90%',
        height: 'auto',
        marginVertical: 4,
    },
    member: {
        fontSize: 20,
        marginVertical: 8,
        marginLeft: 8,
    },
    chiSoDichVu: {
        width: '90%',
        height: 'auto',
        marginVertical: 4,
    },
    dichVu: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    bill: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '80%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        marginTop: 8,
        width: '30%',
        height: '10%',
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitle: {
        marginVertical: 8,
        paddingHorizontal: 8,
        width: 'auto',
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    text: {
        marginVertical: 8,
        paddingLeft: 4,
        width: '80%',
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
