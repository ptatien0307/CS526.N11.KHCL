import { StyleSheet, View, Text, TouchableHighlight, FlatList, TextInput, Modal, Alert, Touchable } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { ModalEdit } from './Modal';
export default function App({ navigation, route }) {

    const [specRoom, setSpecRoom] = useState(route.params.specRoom)
    const [deposit, setDeposit] = useState(specRoom.deposit)
    const [contractDay, setContractDay] = useState(specRoom.contractDay)
    const [price, setPrice] = useState(specRoom.price)
    const [roomName, setRoomName] = useState(specRoom.roomName)
    const [members, setMembers] = useState()

    const handleSaveInfo = () => {
        // console.log(deposit)
        // console.log(contractDay)
        // console.log(price)
        // console.log(roomName)
        // console.log(members.split('\n'))

        // let infoList = members.split('\n')
        // let index = 1
        // infoList.forEach((element) => {

        //     if (index === 3) {
        //         index = 1
        //     }
        // });


        // setSpecRoom({
        //     ...specRoom,
        //     [specRoom.deposit]: deposit,
        //     [specRoom.price]: price,
        //     [specRoom.contractDay]: contractDay,
        //     [specRoom.roomName]: roomName,
        // })
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
            <View style={[styles.header, styles.myBackground]}>

                {/* Back to ChiTietPhong button */}
                <TouchableHighlight onPress={() => { navigation.goBack() }}>
                    <FontAwesomeIcon name="arrow-left" size={35} />
                </TouchableHighlight>

                <Text style={styles.textTitleStyle}>EDIT CHI TIẾT PHÒNG</Text>

            </View>

            {/* Body */}
            <View style={styles.body}>

                {/* Info and Bill button */}
                <View style={[styles.row, styles.myBackground]}>
                    <Text style={styles.textBold}>THÔNG TIN</Text>
                </View>





                {/* View info */}
                <View style={styles.roomInfo}>
                    {/* View room details */}
                    <View style={[styles.infoContainer, styles.myBorder]}>

                        {/* View basic info */}
                        <View style={styles.basicInfoContainer}>

                            <View style={styles.infoRow}>

                                {/* Room name */}
                                <View style={[styles.basicInfo, styles.myBackground]}>
                                    <Text>Tên phòng:</Text>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        onChangeText={(text) => { setRoomName(text) }}
                                        defaultValue={roomName}
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}>
                                    </TextInput>
                                </View>

                                {/* Contract day */}
                                <View style={[styles.basicInfo, styles.myBackground]}>
                                    <Text>Ngày đến:</Text>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        onChangeText={(text) => { setContractDay(text) }}
                                        defaultValue={contractDay}
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}>
                                    </TextInput>
                                </View>

                            </View>



                            <View style={styles.infoRow}>
                                {/* Price */}
                                <View style={[styles.basicInfo, styles.myBackground]}>
                                    <Text>Giá thuê:</Text>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        onChangeText={(text) => { setPrice(text) }}
                                        defaultValue={price}
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}>
                                    </TextInput>

                                </View>



                                {/* Deposit */}
                                <View style={[styles.basicInfo, styles.myBackground]}>
                                    <Text>Tiền cọc:</Text>
                                    <TextInput
                                        style={styles.textInputStyle}
                                        onChangeText={(text) => { setDeposit(text) }}
                                        defaultValue={deposit}
                                        editable={true}
                                        multiline={false}
                                        maxLength={256}>
                                    </TextInput>
                                </View>

                            </View>

                        </View>

                        {/* View members */}
                        <View style={[styles.membersContainer, styles.myBackground]}>
                            <TextInput
                                style={styles.textInputStyleMem}
                                onChangeText={(text) => { setMembers(text) }}
                                defaultValue={members}
                                editable={true}
                                multiline={true}
                                maxLength={256}>
                            </TextInput>
                        </View>
                    </View>
                </View>









            </View>



            {/* Save button */}
            <TouchableHighlight style={styles.saveButton} onPress={() => { handleSaveInfo() }}>
                <View>
                    <Text style={styles.textTitle}>LƯU</Text>
                </View>
            </TouchableHighlight >
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
        marginVertical: 8,
    },



    body: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    row: {
        width: '90%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    roomInfo: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
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
    infoRow: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    basicInfo: {
        width: '45%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },

    textInputStyle: {
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 4,
        height: '90%',
        paddingLeft: 4,
    },
    textInputStyleMem: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 4,
        height: '90%',
        paddingLeft: 4,
    },
    membersContainer: {
        width: '90%',
        height: '60%',
        marginVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    member: {
        justifyContent: 'flex-start',
        height: 45,
        flexDirection: 'row',
        fontSize: 20,
        marginVertical: 8,
        marginLeft: 8,
    },






    saveButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 4,
        position: 'absolute',
        bottom: 8,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
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
