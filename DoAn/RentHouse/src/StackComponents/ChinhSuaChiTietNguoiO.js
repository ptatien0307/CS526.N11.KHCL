import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';


import { alertDeleteDialog, alertEmptyDialog, editSuccessDialog } from '../Dialogs/dialog.js';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function App({ navigation, route }) {

    const [member, setMember] = useState(route.params.member)

    const [memberName, setMemberName] = useState(member.memberName)
    const [dateOfBirth, setDateOfBirth] = useState(member.dateOfBirth)
    const [address, setAddress] = useState(member.address)
    const [CCCD, setCCCD] = useState(member.CCCD)
    const [ngayCapCCCD, setNgayCapCCCD] = useState(member.ngayCapCCCD)
    const [noiCapCCCD, setNoiCapCCCD] = useState(member.noiCapCCCD)
    const [job, setJob] = useState(member.job)


    const [sex, setSex] = useState(member.sex)
    const [male, setMale] = useState(parseInt(sex) ? true : false)
    const [female, setFemale] = useState(parseInt(!sex) ? true : false)

    // BACK-END ___ EDIT MEMBER INFORMATION
    const handleSave = () => {
        if (memberName === '' || dateOfBirth === '' || address === '' || CCCD === '' || ngayCapCCCD === '' || noiCapCCCD === '' || job === '')
            alertEmptyDialog()
        else {
            const newMember = {
                id: member.id,
                memberName: memberName,
                dateOfBirth: dateOfBirth,
                CCCD: CCCD,
                ngayCapCCCD: ngayCapCCCD,
                noiCapCCCD: noiCapCCCD,
                job: job,
                sex: sex,
                address: address
            }
            const newMemberList = route.params.memberList.map(item => {
                if (item.id === member.id)
                    return newMember
                return item
            })
            route.params.setMember(newMember)
            route.params.setCurrRoom({ ...route.params.currRoom, members: newMemberList })

            const newRoomList = route.params.roomList.map(item => {
                if (item.id === route.params.currRoom.id) {
                    return { ...route.params.currRoom, members: newMemberList }
                }
                return item
            })
            route.params.setGlobalRoomList(newRoomList)
            navigation.goBack()
            editSuccessDialog()
        }

    }
    return (
        <View style={styles.container}>




            {/* Body */}
            <View style={[styles.body]}>
                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                    {/* Name */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Họ tên:</Text>
                        </View>
                        <View>
                            <TextInput
                                style={[styles.myBorder, styles.input]}
                                onChangeText={(text) => { setMemberName(text) }}
                                defaultValue={memberName}
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
                                style={[styles.myBorder, styles.input]}
                                onChangeText={(text) => { setDateOfBirth(text) }}
                                defaultValue={dateOfBirth}
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
                                    <Checkbox value={male} onValueChange={() => {
                                        setFemale(false)
                                        setMale(true)
                                        setSex(1)
                                    }} />
                                </View>
                                <View style={{ marginLeft: 8 }}>
                                    <Text>Nam</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Checkbox value={female} onValueChange={() => {
                                        setMale(false)
                                        setFemale(true)
                                        setSex(0)
                                    }} />
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
                                style={[styles.myBorder, styles.input]}
                                onChangeText={(text) => { setAddress(text) }}
                                defaultValue={address}
                                editable={true}
                                multiline={false}
                                maxLength={256}></TextInput>
                        </View>
                    </View>

                    {/* CCCD */}
                    <View style={[styles.item, styles.myBackground]}>

                        <View style={{ marginBottom: 16 }}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>CCCD:</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={[styles.myBorder, styles.input]}
                                    onChangeText={(text) => { setCCCD(text) }}
                                    defaultValue={CCCD}
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
                                        style={[styles.myBorder, styles.input]}
                                        onChangeText={(text) => { setNgayCapCCCD(text) }}
                                        defaultValue={ngayCapCCCD}
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
                                        style={[styles.myBorder, styles.input]}
                                        onChangeText={(text) => { setNoiCapCCCD(text) }}
                                        defaultValue={noiCapCCCD}
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
                                    style={[styles.myBorder, styles.input]}
                                    onChangeText={(text) => { setJob(text) }}
                                    defaultValue={job}
                                    editable={true}
                                    multiline={false}
                                    maxLength={256}></TextInput>
                            </View>
                        </View>
                    </View>

                    {/* Add room button */}
                    <TouchableOpacity style={styles.addButton} onPress={() => { handleSave() }}>
                        <View>
                            <Text style={styles.textTitle}>LƯU CHỈNH SỬA</Text>
                        </View>
                    </TouchableOpacity >
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



    body: {
        height: '100%',
        marginTop: 8,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    item: {
        width: '100%',
        height: 'auto',
        minHeight: 75,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        marginBottom: 8,
    },
    input: {
        paddingLeft: 8,
        fontSize: 18
    },



    addButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    stackTitle: {
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
