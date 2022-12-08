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

    const [editBillID, setEditBillID] = useState()
    const [editItemID, setEditItemID] = useState()
    const [editItemContent, setEditItemContent] = useState()
    const [chooseItemEdit, setChooseItemEdit] = useState([])

    const [viewMoreID, setViewMoreID] = useState([])

    const setGlobalRoomList = route.params.setRoomList

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

    const onPressEdit = (params) => {
        if (params.length === 3) {
            setChooseItemEdit([false, false, true])
            setEditBillID(params[1])
            setIsEditModalVisible(true)
            setInputText(specRoom[params[0]][params[1] - 1][params[2]])
            setEditItemID(specRoom.id)
            setEditItemContent(params[0])
        }
        else {
            setChooseItemEdit([false, true, false])
            setIsEditModalVisible(true)
            setInputText(specRoom[params[0]])
            setEditItemID(specRoom.id)
            setEditItemContent(params[0])
        }


    }

    const renderBills = ({ item }) => {
        // Compute total money
        item.total = parseInt((item.dienMoi - item.dienCu) * specRoom.donGiaDien) +
            parseInt((item.nuocMoi - item.nuocCu) * specRoom.donGiaNuoc) + parseInt(specRoom.price)


        return (
            <TouchableHighlight onPress={() => {
                navigation.navigate("ChiTietHoaDon", {
                    specBill: item,
                    specRoom
                })
            }}>
                <View style={[styles.billInfo, styles.myBackground]}>

                    {/* Bill month year */}
                    <View style={styles.billDay}>
                        <Text style={styles.textTitle}> {item.monthYear}</Text>
                    </View>

                    {/* Bill money: total, collected, remained */}
                    <View style={styles.billMoney}>
                        {/* Total */}
                        <View style={[styles.myBorder, styles.money]}>
                            <Text>Tổng tiền:</Text>
                            <Text style={styles.textBold}>
                                {item.total}đ
                            </Text>
                        </View>

                        {/* Collected */}
                        <View style={[styles.myBorder, styles.money, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <View>
                                <Text>Đã thu:</Text>
                                <Text style={styles.textBold}>
                                    {item.collected}đ
                                </Text>
                            </View>
                            <TouchableHighlight onPress={() => { onPressEdit(['billHistory', item.id, 'collected']) }}>
                                <FontAwesomeIcon name="pencil" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                            </TouchableHighlight>
                        </View>


                        {/* Remained */}
                        <View style={[styles.myBorder, styles.money]}>
                            <Text>Còn lại: </Text>
                            <Text style={styles.textBold}>
                                {item.total - item.collected}đ
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
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
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to DanhSachPhong button */}
                    <TouchableHighlight onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableHighlight>

                    <Text style={styles.textTitleStyle}>CHI TIẾT PHÒNG</Text>
                </View>

                {/* Info and Bill button */}
                <View style={styles.headerBot}>
                    <TouchableHighlight style={[styles.headerBtn, { borderBottomWidth: mountInfo ? 4 : 0 }]}
                        onPress={() => {
                            if (!mountInfo)
                                setMountInfo(!mountInfo)
                            if (mountEdit)
                                setMountEdit(!mountEdit)
                        }}>
                        <Text style={styles.textBold}>THÔNG TIN</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={[styles.headerBtn, { borderBottomWidth: !mountInfo ? 4 : 0 }]}
                        onPress={() => {
                            if (mountInfo)
                                setMountInfo(!mountInfo)
                            if (mountEdit)
                                setMountEdit(!mountEdit)
                        }}>
                        <Text style={styles.textBold}>LỊCH SỬ HÓA ĐƠN</Text>
                    </TouchableHighlight>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* View info */}
                {mountInfo && <View style={styles.infoContainer}>
                    {/* View room details */}
                    <View style={[styles.basicInfo, styles.myBorder]}>
                        <View style={styles.bodyHeader}>
                            <Text>Thông tin cơ bản</Text>
                        </View>
                        <View style={styles.infoRow}>
                            {/* Room name */}
                            <View style={[styles.rowItem, styles.myBackground]}>
                                <View>
                                    <Text>Tên phòng:</Text>
                                    <Text style={styles.textBold}>{specRoom.roomName}</Text>
                                </View>
                                <TouchableHighlight onPress={() => { onPressEdit(['roomName']) }}>
                                    <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                </TouchableHighlight>
                            </View>

                            {/* Contract day */}
                            <View style={[styles.rowItem, styles.myBackground]}>
                                <View>
                                    <Text>Ngày đến:</Text>
                                    <Text style={styles.textBold}>{specRoom.contractDay}</Text>
                                </View>
                                <TouchableHighlight onPress={() => { onPressEdit(['contractDay']) }}>
                                    <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                </TouchableHighlight>
                            </View>

                        </View>
                        <View style={styles.infoRow}>
                            {/* Price */}
                            <View style={[styles.rowItem, styles.myBackground]}>
                                <View>
                                    <Text>Giá thuê:</Text>
                                    <Text style={styles.textBold}>{specRoom.price}</Text>
                                </View>
                                <TouchableHighlight onPress={() => { onPressEdit(['price']) }}>
                                    <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                </TouchableHighlight>
                            </View>

                            {/* Deposit */}
                            <View style={[styles.rowItem, styles.myBackground]}>
                                <View>
                                    <Text>Tiền cọc:</Text>
                                    <Text style={styles.textBold}>{specRoom.deposit}</Text>
                                </View>
                                <TouchableHighlight onPress={() => { onPressEdit(['deposit']) }}>
                                    <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                </TouchableHighlight>
                            </View>

                        </View>

                    </View>


                    {/* View members */}
                    <View style={[styles.memberInfo, styles.myBorder]}>
                        <View style={[styles.bodyHeader, { height: '10%', marginBottom: 16 }]}>
                            <Text>Thông tin người ở</Text>
                        </View>
                        <View style={[styles.memberContainer, styles.myBackground]}>
                            <FlatList
                                data={specRoom.members}
                                renderItem={renderMembers}
                                keyExtractor={item => item.id}>
                            </FlatList>
                        </View>
                    </View>

                    {/* Water and electricity */}
                    <View style={[styles.serviceInfo, styles.myBorder]}>
                        <View style={[styles.bodyHeader, { marginBottom: 16 }]}>
                            <Text>Thông tin dịch vụ</Text>
                        </View>
                        <View style={[styles.serviceContainer, styles.myBackground]}>
                            <View style={styles.service}>
                                <IonIcon name="water" size={20} style={{ marginRight: 20 }} />
                                <Text>{specRoom.donGiaNuoc} đ/khối</Text>
                            </View>
                            <View style={styles.service}>
                                <FontAwesomeIcon name="bolt" size={20} style={{ marginLeft: 4, marginRight: 26 }} />
                                <Text>{specRoom.donGiaDien} đ/kwh</Text>
                            </View>
                        </View>
                    </View>

                </View>}


                {/* View Bill */}
                {!mountInfo && <View style={[styles.billContainer, styles.myBorder]}>
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

                billHistory={specRoom.billHistory}
                editBillID={editBillID}

                setInputText={setInputText}
                inputText={inputText}

                alertEmptyDialog={alertEmptyDialog}

                setSpecRoom={setSpecRoom}
                specRoom={specRoom}

                setGlobalRoomList={setGlobalRoomList}
                roomList={route.params.roomList}

                chooseItemEdit={chooseItemEdit}>
            </ModalEdit>

        </View>



    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    header: {
        width: '100%',
        height: '18%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    headerBtn: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTop: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 2,
        paddingVertical: 8,
    },
    headerBot: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },


    body: {
        marginTop: 128,
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
    },
    basicInfo: {
        width: '90%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 8,
    },
    bodyHeader: {
        width: '100%',
        height: '20%',
        borderBottomWidth: 2,
    },



    infoRow: {
        flexDirection: 'row',
        width: '100%',
        height: '30%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowItem: {
        width: '45%',
        height: '100%',
        paddingLeft: 8,
    },







    billContainer: {
        height: '90%',
        width: '90%',
        padding: 8,
    },
    billInfo: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 8,
        marginBottom: 8,
        width: '100%',
    },
    billDay: {
        width: '100%',
        height: '30%',
        textAlign: 'center',
        marginBottom: 8,
    },
    billMoney: {
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    money: {
        paddingLeft: 8,
        width: '30%',
        height: '80%',
        justifyContent: 'center',
    },


    memberInfo: {
        width: '90%',
        height: '60%',
        minHeight: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    memberContainer: {
        width: '100%',
        height: 'auto',
        minHeight: 50,
    },
    member: {
        justifyContent: 'flex-start',
        height: 45,
        flexDirection: 'row',
        fontSize: 20,
        marginVertical: 8,
        marginLeft: 8,
    },



    serviceInfo: {
        width: '90%',
        height: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
    },
    serviceContainer: {
        width: '100%',
        height: 'auto',
    },
    service: {
        flexDirection: 'row',
        marginVertical: 4,
    },


    textTitleStyle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: 'bold',
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
