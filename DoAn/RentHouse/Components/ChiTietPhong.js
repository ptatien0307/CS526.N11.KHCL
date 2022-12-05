import { StyleSheet, View, Text, TouchableHighlight, FlatList, TextInput, Modal, Alert, Touchable } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { ModalEdit } from './Modal';
export default function App({ navigation, route }) {

    const [specRoom, setSpecRoom] = useState(route.params.specRoom)
    const [mountInfo, setMountInfo] = useState(true)
    const [mountEdit, setMountEdit] = useState(false)





    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [inputText, setInputText] = useState('')

    const [editItemID, setEditItemID] = useState()
    const [editItemContent, setEditItemContent] = useState()

    const [viewMoreID, setViewMoreID] = useState([])


    const viewMoreInfo = (item) => {
        if (viewMoreID.includes(item.id))
            return (
                <View>
                    <Text>{item.memberName}</Text>
                    <Text>{item.dateOfBirth}</Text>
                    <Text>{item.CCCD}</Text>
                </View>
            )
        else
            return <Text>{item.memberName}</Text>
    }

    const renderMembers = ({ item }) => {
        return (
            <View style={styles.member}>
                {/* Member icon */}
                <FontAwesomeIcon name="user" size={20} style={{ marginRight: 8 }} />

                {/* View info */}
                {viewMoreInfo(item)}

                {/* Read more or less info button */}
                <TouchableHighlight style={{ position: 'absolute', right: 0 }} onPress={() => {
                    if (viewMoreID.includes(item.id)) {
                        let newIDList = viewMoreID.filter(mem => mem !== item.id)
                        setViewMoreID(newIDList)
                    }
                    else
                        setViewMoreID([...viewMoreID, item.id])
                }}>
                    <IonIcon name="ellipsis-vertical" size={20} />
                </TouchableHighlight>
            </View>
        )
    }

    const renderBills = ({ item }) => {
        return (
            <View style={[styles.bill, styles.myBorder]}>
                <Text style={{ fontSize: 20 }}> {item.monthYear}</Text>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around' }}>
                    <View>{item.total}</View>
                    <View>{item.collected}</View>
                    <View>{item.total - item.collected}</View>
                </View> */}
            </View>
        )
    }

    const onPressEdit = (type) => {
        setIsEditModalVisible(true)
        setInputText(specRoom[type])
        setEditItemID(specRoom.id)
        setEditItemContent(type)
    }

    const alertEmptyDialog = () => {
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
                    <TouchableHighlight style={[styles.feature, styles.myBorder]}
                        onPress={() => { if (!mountInfo) setMountInfo(!mountInfo) }}>
                        <Text>THONG TIN</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.feature, styles.myBorder]}
                        onPress={() => { if (mountInfo) setMountInfo(!mountInfo) }}>
                        <Text>LICH SU HOA DON</Text>
                    </TouchableHighlight>
                </View>





                {/* View info */}
                {mountInfo && <View style={styles.roomInfo}>
                    {/* View room details */}
                    <View style={[styles.infoContainer, styles.myBorder]}>

                        {/* View basic info */}
                        <View style={styles.basicInfoContainer}>

                            <View style={styles.infoRow}>

                                {/* Room name */}
                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>{specRoom.roomName}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('roomName') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                                {/* Contract day */}
                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>Hop dong:</Text>
                                        <Text>{specRoom.contractDay}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('contractDay') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>

                            </View>



                            <View style={styles.infoRow}>
                                {/* Price */}
                                <View style={[styles.basicInfo, styles.myBorder]}>
                                    <View>
                                        <Text>Gia thue:</Text>
                                        <Text>{specRoom.price}</Text>
                                    </View>
                                    <TouchableHighlight onPress={() => { onPressEdit('price') }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableHighlight>
                                </View>



                                {/* Deposit */}
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

                        {/* Water and electricity */}
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
                    <FlatList
                        data={specRoom.billHistory}
                        renderItem={renderBills}
                        keyExtractor={item => item.id}>
                    </FlatList>

                </View>}
            </View>


            {/* Modal for edit room */}
            <ModalEdit
                setIsEditModalVisible={setIsEditModalVisible}
                isEditModalVisible={isEditModalVisible}
                editItemID={editItemID}
                editItemContent={editItemContent}
                setInputText={setInputText}
                inputText={inputText}
                alertEmptyDialog={alertEmptyDialog}
                setSpecRoom={setSpecRoom}
                specRoom={specRoom}
                setGlobalRoomList={route.params.setRoomList}
                roomList={route.params.roomList}
                isEditNote={false}>
            </ModalEdit>

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
        justifyContent: 'space-around',
        marginTop: 8,
    },
    body: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    roomInfo: {
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
        flexDirection: 'row',
        paddingHorizontal: 8,
    },
    bill: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
    },
    membersContainer: {
        width: '90%',
        height: 'auto',
        minHeight: 50,
        marginVertical: 4,
    },
    member: {
        justifyContent: 'flex-start',
        height: 45,
        flexDirection: 'row',
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
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
