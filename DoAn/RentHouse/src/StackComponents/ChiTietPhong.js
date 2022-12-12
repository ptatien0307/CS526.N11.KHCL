import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useState } from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { ModalEdit } from '../helpers/modal';
import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog, deleteSuccessDialog } from '../helpers/dialog';

export default function App({ navigation, route }) {

    const roomList = route.params.roomList



    const [currRoom, setCurrRoom] = useState(route.params.currRoom)
    let billRemained = currRoom.billHistory.reduce((res, curr) => {
        return res + curr.remained
    }, 0)



    const [mountInfo, setMountInfo] = useState(true)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [inputText, setInputText] = useState('')
    const [editBillID, setEditBillID] = useState()
    const [editItemID, setEditItemID] = useState()
    const [editItemContent, setEditItemContent] = useState()
    const [chooseItemEdit, setChooseItemEdit] = useState()


    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false)
    const [mountEdit, setMountEdit] = useState(false)
    const [mounDelete, setMountDelete] = useState(false)

    const deleteRoomInfomation = async () => {
        let isConfirm = await alertDeleteDialog('Xóa thông tin', 'Khi xóa phòng, mọi thông thông về khách, hóa đơn sẽ bị xóa vĩnh viễn. Các chỉ số điện nước hiện tại sẽ được giữ lại.')
        if (isConfirm) {
            const newRoom = {
                id: '1',
                roomName: 'Phòng 1',
                roomStatus: 'Trống',
                price: '800000',
                contractDay: '',
                deposit: '',
                members: [

                ],
                donGiaDien: currRoom.donGiaDien,
                donGiaNuoc: currRoom.donGiaNuoc,
                billHistory: [
                ],
                latestDien: currRoom.latestDien,
                lastestNuoc: currRoom.lastestNuoc
            }
            setCurrRoom(newRoom)
            const newRoomList = roomList.map(item => {
                if (item.id === currRoom.id)
                    return newRoom
                return item
            })
            route.params.setGlobalRoomList(newRoomList)
            route.params.setRoomList(newRoomList)

        }
    }
    const handleDeleteMember = async (deleteMember) => {
        let isConfirm = await alertDeleteDialog('Xóa khách thuê', 'Bạn có chắc muốn xóa khách thuê này ?')
        if (isConfirm) {
            const newMemberList = currRoom.members.reduce((res, currMember) => {
                if (currMember.id != deleteMember.id)
                    res.push(currMember)
                return res
            }, [])

            let newRoomStatus = ''
            if (newMemberList.length === 0)
                newRoomStatus = 'Trống'
            else
                newRoomStatus = newMemberList.length + ' người'


            const newRoomList = roomList.map(item => {
                if (item.id === currRoom.id) {
                    return { ...currRoom, members: newMemberList, roomStatus: newRoomStatus }
                }
                return item
            })
            setCurrRoom({ ...currRoom, members: newMemberList })

            route.params.setRoomList(newRoomList)
            route.params.setGlobalRoomList(newRoomList)
            deleteSuccessDialog()
        }
    }

    const renderMembers = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ChiTietNguoiO',
                        {
                            member: item,
                            currRoom,
                            setCurrRoom,
                            roomList,
                            setGlobalRoomList: route.params.setGlobalRoomList,
                            memberList: currRoom.members,
                        })
                }}>
                <View style={[styles.member, styles.myBackground]}>

                    {/* Member icon */}
                    <FontAwesomeIcon name="user" size={20} style={{ marginRight: 32 }} />

                    {/* Member name */}
                    <Text>{item.memberName}</Text>

                    {/* Delete member icon */}
                    <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() => {
                            handleDeleteMember(item)
                        }}>
                        <FontAwesomeIcon name="remove" size={25} style={[styles.icon, { display: mounDelete ? 'flex' : 'none' }]} />
                    </TouchableOpacity>

                </View>
            </TouchableOpacity >
        )
    }

    const onPressEdit = (params) => {
        if (params.length === 3) { // Edit bill
            setChooseItemEdit(3)
            setEditBillID(params[1])
            setIsEditModalVisible(true)
            setInputText(currRoom[params[0]][params[1] - 1][params[2]])
            setEditItemID(currRoom.id)
            setEditItemContent(params[0])
        }
        else { // Edit basic info
            setChooseItemEdit(2)
            setIsEditModalVisible(true)
            setInputText(currRoom[params[0]])
            setEditItemID(currRoom.id)
            setEditItemContent(params[0])
        }


    }

    const renderBills = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("ChiTietHoaDon", {
                    specBill: item,
                    currRoom
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
                            <TouchableOpacity onPress={() => { onPressEdit(['billHistory', item.id, 'collected']) }}>
                                <FontAwesomeIcon name="pencil" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                            </TouchableOpacity>
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
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to DanhSachPhong button */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <FontAwesomeIcon name="arrow-left" size={35} />
                        </TouchableOpacity>

                        <Text style={styles.stackTitle}>CHI TIẾT PHÒNG</Text>
                    </View>

                    <TouchableOpacity onPress={() => { deleteRoomInfomation() }}>
                        <Text>XÓA</Text>
                    </TouchableOpacity>
                </View>

                {/* Info and Bill button */}
                <View style={styles.headerBot}>
                    <TouchableOpacity style={[styles.headerBtn, { borderBottomWidth: mountInfo ? 4 : 0 }]}
                        onPress={() => {
                            if (!mountInfo)
                                setMountInfo(!mountInfo)
                            if (mountEdit)
                                setMountEdit(!mountEdit)
                        }}>
                        <Text style={styles.textBold}>THÔNG TIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.headerBtn, { borderBottomWidth: !mountInfo ? 4 : 0 }]}
                        onPress={() => {
                            if (mountInfo)
                                setMountInfo(!mountInfo)
                            if (mountEdit)
                                setMountEdit(!mountEdit)
                        }}>
                        <Text style={styles.textBold}>LỊCH SỬ HÓA ĐƠN</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
                <ScrollView
                    style={{ width: '100%', height: '100%' }}
                    contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    {/* View info */}
                    {mountInfo && <View style={styles.infoContainer}>
                        {/* View room details */}
                        <View style={[styles.basicInfo, styles.myBorder]}>
                            <View style={styles.bodyHeader}>

                                <Text>Thông tin cơ bản</Text>

                                {/* Edit info button */}
                                <TouchableOpacity onPress={() => {
                                    setMountEdit(!mountEdit)

                                }}>
                                    <FontAwesomeIcon name="edit" size={20} />
                                </TouchableOpacity>

                            </View>


                            <View style={styles.infoRow}>
                                {/* Room name */}
                                <View style={[styles.rowItem, styles.myBackground]}>
                                    <View>
                                        <Text>Tên phòng:</Text>
                                        <Text style={styles.textBold}>{currRoom.roomName}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { onPressEdit(['roomName']) }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableOpacity>
                                </View>

                                {/* Contract day */}
                                <View style={[styles.rowItem, styles.myBackground]}>
                                    <View>
                                        <Text>Ngày đến:</Text>
                                        <Text style={styles.textBold}>{currRoom.contractDay}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { onPressEdit(['contractDay']) }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={styles.infoRow}>
                                {/* Price */}
                                <View style={[styles.rowItem, styles.myBackground]}>
                                    <View>
                                        <Text>Giá thuê:</Text>
                                        <Text style={styles.textBold}>{currRoom.price}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { onPressEdit(['price']) }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableOpacity>
                                </View>

                                {/* Deposit */}
                                <View style={[styles.rowItem, styles.myBackground]}>
                                    <View>
                                        <Text>Tiền cọc:</Text>
                                        <Text style={styles.textBold}>{currRoom.deposit}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { onPressEdit(['deposit']) }}>
                                        <FontAwesomeIcon name="edit" size={20} style={{ display: mountEdit ? 'flex' : 'none' }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                        {/* View members */}
                        <View style={[styles.memberInfo, styles.myBorder]}>
                            <View style={[styles.bodyHeader, { height: '10%', marginBottom: 16 }]}>

                                <Text>Thông tin người ở</Text>

                                {/* Sub menu icon */}
                                <TouchableOpacity onPress={() => { setIsSubMenuVisible(!isSubMenuVisible) }}>
                                    <FontAwesomeIcon name="navicon" size={20} />
                                </TouchableOpacity>

                            </View>

                            {/* View members  */}
                            <View style={[styles.memberContainer]}>
                                <FlatList
                                    data={currRoom.members}
                                    renderItem={renderMembers}
                                    keyExtractor={item => item.id}>
                                </FlatList>
                            </View>

                            {/* Sub menu */}
                            {isSubMenuVisible && <View style={styles.subMenuContainer}>
                                <TouchableOpacity style={[styles.subMenu, { borderBottomWidth: 2 }]}
                                    onPress={() => {
                                        navigation.navigate('ThemNguoiO', {
                                            setIsSubMenuVisible,

                                            currRoom,
                                            setCurrRoom,

                                            roomList,
                                            setRoomList: route.params.setRoomList,
                                            setGlobalRoomList: route.params.setGlobalRoomList,

                                            memberList: currRoom.members,
                                        })
                                    }}>
                                    <Text>THÊM</Text>
                                </TouchableOpacity>



                                <TouchableOpacity style={[styles.subMenu]}
                                    onPress={() => {
                                        setMountDelete(!mounDelete)
                                        setIsSubMenuVisible(false)
                                    }}>
                                    <Text>XÓA</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>

                        {/* Water and electricity */}
                        <View style={[styles.serviceInfo, styles.myBorder]}>
                            <View style={[styles.bodyHeader, { height: '20%', marginBottom: 16 }]}>
                                <Text>Thông tin dịch vụ</Text>
                            </View>
                            <View style={[styles.serviceContainer]}>
                                <View style={[styles.service, styles.myBackground]}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <IonIcon name="water" size={20} style={{ marginRight: 20 }} />
                                        <Text>{currRoom.donGiaNuoc} đ/khối</Text>
                                    </View>
                                    <View style={[styles.lastestUnit, styles.myBorder]}>
                                        <Text>{currRoom.lastestNuoc}</Text>
                                    </View>
                                </View>


                                <View style={[styles.service, styles.myBackground]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <FontAwesomeIcon name="bolt" size={20} style={{ marginLeft: 4, marginRight: 26 }} />
                                        <Text>{currRoom.donGiaDien} đ/kwh</Text>
                                    </View>
                                    <View style={[styles.lastestUnit, styles.myBorder]}>

                                        <Text>{currRoom.lastestDien}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>}



                </ScrollView>


                {/* View Bill */}
                {!mountInfo && <View style={[styles.billContainer, styles.myBorder]}>
                    <View style={styles.totalRemained}>
                        <IonIcon name="notifications" size={30} style={{ color: 'white' }} />
                        <View>
                            <Text style={{ color: 'white' }}>Tổng số tiền phòng này còn thiếu là: </Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {billRemained}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setMountEdit(!mountEdit)
                    }}>
                        <FontAwesomeIcon name="edit" size={20} />
                    </TouchableOpacity>
                    <FlatList
                        data={currRoom.billHistory}
                        renderItem={renderBills}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>}
            </View>






            {/* Modal for basic info */}
            <ModalEdit
                setIsEditModalVisible={setIsEditModalVisible}
                isEditModalVisible={isEditModalVisible}
                editSuccessDialog={editSuccessDialog}

                editItemID={editItemID}
                editItemContent={editItemContent}

                billHistory={currRoom.billHistory}
                editBillID={editBillID}

                setInputText={setInputText}
                inputText={inputText}

                alertEmptyDialog={alertEmptyDialog}

                setCurrRoom={setCurrRoom}
                currRoom={currRoom}

                setRoomList={route.params.setRoomList}
                setGlobalRoomList={route.params.setGlobalRoomList}
                roomList={roomList}

                chooseItemEdit={chooseItemEdit}>
            </ModalEdit>


        </View >



    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    header: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 10
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 2,
        paddingLeft: 8,
    },
    headerBot: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },


    body: {
        margin: 100,
        width: '100%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    bodyHeader: {
        width: '100%',
        height: '20%',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    basicInfo: {
        width: '90%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginBottom: 8,
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
        paddingLeft: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },



    memberInfo: {
        width: '90%',
        height: '55%',
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
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 45,
        flexDirection: 'row',
        marginBottom: 16,
        paddingLeft: 16,
    },



    serviceInfo: {
        width: '90%',
        height: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
        marginBottom: 8,
    },
    serviceContainer: {
        width: '100%',
        height: '60%',
        justifyContent: 'space-around',
    },
    service: {
        flexDirection: 'row',
        marginVertical: 4,
        height: '45%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    lastestUnit: {
        width: '25%',
        alignItems: 'center',
    },


    subMenuContainer: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '50%',
        height: '30%',
        position: 'absolute',
        top: 30,
        right: 8,
        backgroundColor: '#dfdfdf'
    },
    subMenu: {
        width: '100%',
        height: '51%',
        justifyContent: 'center',
    },


    deleteIcon: {
        position: 'absolute',
        right: 8,
    },


    billContainer: {
        height: '100%',
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
    totalRemained: {
        borderRadius: 10,
        backgroundColor: '#3c3f3e',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 16,
        padding: 8,
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





