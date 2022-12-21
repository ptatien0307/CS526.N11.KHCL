import { StyleSheet, View, Text, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useEffect, useState, useRef } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function App({ navigation, route }) {
    const [electricityBillOld, setElectricityBillOld] = useState('123');
    const [electricityBillNew, setElectricityBillNew] = useState('');
    const [waterBillOld, setWaterBillOld] = useState('456');
    const [waterBillNew, setWaterBillNew] = useState('');
    const [internetBill, setInternetBill] = useState('1');
    const [roomBillMonth, setRoomBillMonth] = useState('1');
    const [roomBillDay, setRoomBillDay] = useState('0');
    const [garbageBill, setGarbageBill] = useState('1');

    const RoomValue = 950000;
    const ElectricityValue = 3000;
    const WaterValue = 3000;
    const InternetValue = 30000;
    const GarbageValue = 15000;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>GHI CHỈ SỐ DỊCH VỤ</Text>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>

                {/* Room bill inputs */}
                <View style={styles.billContainer}>
                        <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền phòng</Text>
                        <Text>{RoomValue} đồng/tháng</Text>
                        <View style={styles.billValue}>
                            <View style={[styles.billValueInput, {width:'45%'}]}>
                                <Text>Số tháng: </Text>
                                <TextInput
                                    style={[styles.textInput, {width:'40%'}]}
                                    keyboardType="number-pad"
                                    value={roomBillMonth}
                                    onChangeText={text => setRoomBillMonth(text)}
                                />
                            </View>
                            <View style={[styles.billValueInput, {width:'45%'}]}>
                                <Text>Số ngày lẻ: </Text>
                                <TextInput
                                    style={[styles.textInput, {width:'40%'}]}
                                    keyboardType="number-pad"
                                    value={roomBillDay}
                                    onChangeText={text => setRoomBillDay(text)}
                                />
                            </View>
                        </View>
                    </View>


                {/* Electricity bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền điện</Text>
                    <Text>{ElectricityValue} đồng/KWh</Text>
                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, {width:'40%'}]}>Số cũ: {electricityBillOld}</Text>
                        <View style={[styles.billValueInput, {width:'55%'}]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                value={electricityBillNew}
                                onChangeText={text => setElectricityBillNew(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Water bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền nước</Text>
                    <Text>{WaterValue} đồng/1 Khối</Text>
                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, {width:'40%'}]}>Số cũ: {waterBillOld}</Text>
                        <View style={[styles.billValueInput, {width:'55%'}]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                value={waterBillNew}
                                onChangeText={text => setWaterBillNew(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Internet bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền mạng</Text>
                    <Text>{InternetValue} đồng/1 người</Text>
                    <View style={[styles.billValue, {justifyContent:'center'}]}>
                        <View style={[styles.billValueInput, {width:'90%'}]}>
                            <Text>Số người: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                value={internetBill}
                                onChangeText={text => setInternetBill(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Garbage bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền rác</Text>
                    <Text>{GarbageValue} đồng/1 tháng</Text>
                    <View style={[styles.billValue, {justifyContent:'center'}]}>
                        <View style={[styles.billValueInput, {width:'90%'}]}>
                            <Text>Số tháng: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                value={garbageBill}
                                onChangeText={text => setGarbageBill(text)}
                            />
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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

    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    body: {
        alignItems: 'right',
        justifyContent: 'flex-start',
    },

    billContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 8,   
    },
    
    billValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    billValueInput: {
        padding:'10px', 
        borderWidth:'1px', 
        borderRadius:'10px',
        marginTop:'10px',
        marginBottom:'10px',
        borderColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
    },

    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '60%'
    },
    
})