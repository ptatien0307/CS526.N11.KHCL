import { StyleSheet, View, TextInput, TouchableHighlight, Text, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
export default function App({ navigation, route }) {
    const currRoom = route.params.currRoom

    const memberList = route.params.currRoom.members
    let lastMemberID = null
    if (memberList.length !== 0)
        lastMemberID = memberList[memberList.length - 1].id
    else
        lastMemberID = 1

    const [memberName, setMemberName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)

    const [address, setAddress] = useState('')
    const [CCCD, setCCCD] = useState('')
    const [ngayCapCCCD, setNgayCapCCCD] = useState('')
    const [noiCapCCCD, setNoiCapCCCD] = useState('')
    const [job, setJob] = useState('')

    const handleAddMember = () => {
        let gioiTinh = -1
        if (male) gioiTinh = 1
        else gioiTinh = 0

        const newMember = {
            id: lastMemberID + 1,
            memberName: memberName,
            dateOfBirth: dateOfBirth,
            CCCD: CCCD,
            ngayCapCCCD: ngayCapCCCD,
            noiCapCCCD: noiCapCCCD,
            job: job,
            sex: gioiTinh,
            address: address
        }
        const newMemberList = [...memberList, newMember]

        route.params.setCurrRoom({ ...route.params.currRoom, members: newMemberList })
        const newRoomList = (route.params.globalRoomList).map(item => {
            if (item.id === currRoom.id) {
                let newItem = { ...route.params.currRoom, members: newMemberList }
                newItem.roomStatus = newItem.members.length + ' người'
                return newItem
            }
            return item
        })
        route.params.setGlobalRoomList(newRoomList)
        route.params.setIsSubMenuVisible(false)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to button */}
                    <TouchableHighlight onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableHighlight>

                    <Text style={styles.textTitleStyle}>THÔNG TIN KHÁCH THUÊ</Text>
                </View>
            </View>


            {/* Body */}
            <View style={[styles.body, styles.myBorder]}>
                <ScrollView
                    style={{ width: '100%', height: '100%' }}
                    contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                    {/* Name */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Họ tên:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[styles.myBorder, { paddingLeft: 8 }]}
                                onChangeText={(text) => { setMemberName(text) }}
                                placeholder='Nhập ...'
                                editable={true}
                                multiline={false}
                                maxLength={256}></TextInput>
                        </View>
                    </View>

                    {/* DataOfBirth */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Ngày sinh:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[styles.myBorder, { paddingLeft: 8 }]}
                                onChangeText={(text) => { setDateOfBirth(text) }}
                                placeholder='Nhập ...'
                                editable={true}
                                multiline={false}
                                maxLength={256}></TextInput>
                        </View>

                    </View>

                    {/* Sex */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Giới tính:</Text>
                        </View>
                        <View style={[styles.row, { justifyContent: 'flex-start' }]}>
                            <View style={{ flexDirection: 'row', marginRight: 104 }}>
                                <View>
                                    <Checkbox value={male} onValueChange={setMale} />
                                </View>
                                <View style={{ marginLeft: 8 }}>
                                    <Text>Nam</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Checkbox value={female} onValueChange={setFemale} />
                                </View>
                                <View style={{ marginLeft: 8 }}>
                                    <Text>Nữ</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Address */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Địa chỉ thường trú:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[styles.myBorder, { paddingLeft: 8 }]}
                                onChangeText={(text) => { setAddress(text) }}
                                placeholder='Nhập ...'
                                editable={true}
                                multiline={false}
                                maxLength={256}></TextInput>
                        </View>
                    </View>

                    {/* CCCD */}
                    <View style={[styles.item, styles.myBackground]}>

                        <View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>CCCD:</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={[styles.myBorder, { paddingLeft: 8 }]}
                                    onChangeText={(text) => { setCCCD(text) }}
                                    placeholder='Nhập ...'
                                    editable={true}
                                    multiline={false}
                                    maxLength={256}></TextInput>
                            </View>
                        </View>

                        <View style={styles.row}>
                            {/* Day */}
                            <View style={styles.itemRow}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>Ngày cấp</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={[styles.myBorder, { paddingLeft: 8 }]}
                                        onChangeText={(text) => { setNgayCapCCCD(text) }}
                                        placeholder='Nhập ...'
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}></TextInput>
                                </View>

                            </View>
                            {/* Place */}
                            <View style={styles.itemRow}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>Nơi cấp</Text>
                                </View>
                                <View>
                                    <TextInput
                                        style={[styles.myBorder, { paddingLeft: 8 }]}
                                        onChangeText={(text) => { setNoiCapCCCD(text) }}
                                        placeholder='Nhập ...'
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}></TextInput>
                                </View>

                            </View>
                        </View>
                    </View>

                    {/* Job */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Nghề nghiệp:</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={[styles.myBorder, { paddingLeft: 8 }]}
                                    onChangeText={(text) => { setJob(text) }}
                                    placeholder='Nhập ...'
                                    editable={true}
                                    multiline={false}
                                    maxLength={256}></TextInput>
                            </View>
                        </View>
                    </View>

                    {/* Add room button */}
                    <TouchableHighlight style={styles.addButton} onPress={() => { handleAddMember() }}>
                        <View>
                            <Text style={styles.textTitle}>+ THÊM KHÁCH THUÊ</Text>
                        </View>
                    </TouchableHighlight >
                </ScrollView>

            </View>


        </View >

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
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        paddingLeft: 8,
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },



    body: {
        height: '90%',
        marginTop: 72,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    item: {
        width: '90%',
        height: 'auto',
        paddingHorizontal: 8,
        paddingTop: 8,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemRow: {
        width: '45%',
    },
    titleContainer: {
        borderBottomWidth: 2,
        height: '20%',
        paddingBottom: 24,
        marginBottom: 8,
    },


    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 16
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
    },
    textTitleStyle: {
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
        borderRadius: 15,
        borderWidth: 2,
    }
});
