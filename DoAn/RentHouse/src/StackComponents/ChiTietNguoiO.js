import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function App({ navigation, route }) {

    const [member, setMember] = useState(route.params.member)



    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>THÔNG TIN KHÁCH THUÊ</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ChinhSuaCHiTietNguoiO',
                            {
                                member,
                                setMember,
                                currRoom: route.params.currRoom,
                                setCurrRoom: route.params.setCurrRoom,
                                memberList: route.params.memberList,
                                roomList: route.params.roomList,
                                setGlobalRoomList: route.params.setGlobalRoomList
                            })

                    }}>
                        <FontAwesomeIcon name="edit" size={35} />
                    </TouchableOpacity>
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
                            <Text>{member.memberName}</Text>
                        </View>
                    </View>

                    {/* DataOfBirth */}
                    <View style={[styles.item, styles.myBackground]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Ngày sinh:</Text>

                        </View>

                        <View>
                            <Text>{member.dateOfBirth}</Text>
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
                                    <Checkbox value={parseInt(member.sex)} />
                                </View>
                                <View style={{ marginLeft: 8 }}>
                                    <Text>Nam</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Checkbox value={!parseInt(member.sex)} />
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
                            <Text>{member.address}</Text>
                        </View>
                    </View>

                    {/* CCCD */}
                    <View style={[styles.item, styles.myBackground]}>

                        <View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>CCCD:</Text>

                            </View>
                            <View>
                                <Text>{member.CCCD}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            {/* Day */}
                            <View style={styles.itemRow}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>Ngày cấp</Text>

                                </View>
                                <View>
                                    <Text>{member.ngayCapCCCD}</Text>
                                </View>

                            </View>
                            {/* Place */}
                            <View style={styles.itemRow}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>Nơi cấp</Text>

                                </View>
                                <View>
                                    <Text>{member.noiCapCCCD}</Text>
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
                                <Text>{member.job}</Text>
                            </View>
                        </View>
                    </View>
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
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },



    body: {
        marginTop: 72,
        width: '90%',
        height: '90%',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        height: '20%',
        paddingBottom: 24,
        marginBottom: 8,
    },




    title: {
        fontWeight: 'bold',
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
