import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useState, useRef } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';


export default function App({ navigation, route }) {

    const [electricityBillNew, setElectricityBillNew] = useState('');
    const [waterBillNew, setWaterBillNew] = useState('');
    const [internetBill, setInternetBill] = useState('1');
    const [roomBillMonth, setRoomBillMonth] = useState('1');
    const [roomBillDay, setRoomBillDay] = useState('0');
    const [garbageBill, setGarbageBill] = useState('1');
    const [discountBill, setDiscountBill] = useState('0');
    const [additionBill, setAdditionBill] = useState('0');

    const RoomValue = 950000;
    const electricityBillOld = 123;
    const waterBillOld = 50;
    const ElectricityValue = 3000;
    const WaterValue = 3000;
    const InternetValue = 30000;
    const GarbageValue = 15000;

    const calculateBill = () => {

        // Check if input electricityBillNew and WaterBillNew are empty
        if (electricityBillNew == '') {
            return alert('Chưa nhập chỉ số điện mới'); 
        }

        if (waterBillNew == '') {
            return alert('Chưa nhập chỉ số nước mới')
        }

        // Check if input electricityBillNew and WaterBillNew are less than old
        if (electricityBillNew < electricityBillOld) {
            return alert('Chỉ số điện mới phải lớn hơn chỉ số điện cũ');
        }
        if (waterBillNew < waterBillOld) {
            return alert('Chỉ số nước mới phải lớn hơn chỉ số nước cũ');
        }


        let roomBill = RoomValue * roomBillMonth + RoomValue / 30 * roomBillDay;
        let electricityBill = ElectricityValue * (electricityBillNew - electricityBillOld);
        let waterBill = WaterValue * (waterBillNew - waterBillOld);

        let internetBillTotal = InternetValue * internetBill;
        let garbageBillTotal = GarbageValue * garbageBill;
        let discountBillTotal = parseInt(discountBill);
        let additionBillTotal = parseInt(additionBill);

        let totalBill = roomBill + electricityBill + waterBill + internetBillTotal + garbageBillTotal - discountBillTotal + additionBillTotal;
        
        alert('Tổng tiền hóa đơn: ' + totalBill);
        return navigation.goBack();
    }

    return (
        <View style={styles.container}>

            {/* Body */}
            <ScrollView style={styles.body}>

                {/* Room bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{flexDirection:'row'}]}>
                        <FontAwesomeIcon5 name="door-closed" size={30} style={{padding:8}} />
                        <View>
                            <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền phòng</Text>
                            <Text>{RoomValue} đồng/tháng</Text>
                        </View>
                    </View>

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

                    <View style={[{flexDirection:'row'}]}>
                        <FontAwesomeIcon name="bolt" size={30} style={{padding:8}} />
                        <View>
                            <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền điện</Text>
                            <Text>{ElectricityValue} đồng/KWh</Text>
                        </View>
                    </View>
                    
                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, {width:'40%'}]}>Số cũ: {electricityBillOld}</Text>
                        <View style={[styles.billValueInput, {width:'55%'}]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setElectricityBillNew(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Water bill inputs */}
                <View style={styles.billContainer}>
                    <View style={[{flexDirection:'row'}]}>
                        <IonIcon name="water" size={25} style={{padding:8}} />
                        <View>
                            <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền nước</Text>
                            <Text>{WaterValue} đồng/1 Khối</Text>
                        </View>
                    </View>
                    <View style={styles.billValue}>

                        <Text style={[styles.billValueInput, {width:'40%'}]}>Số cũ: {waterBillOld}</Text>
                        <View style={[styles.billValueInput, {width:'55%'}]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setWaterBillNew(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Internet bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{flexDirection:'row'}]}>
                        <IonIcon name="wifi" size={25} style={{padding:8}} />
                        <View>
                            <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền mạng</Text>
                            <Text>{InternetValue} đồng/1 người</Text>
                        </View>
                    </View>

                    <View style={[styles.billValue, {justifyContent:'center'}]}>
                        <View style={[styles.billValueInput, {width:'90%'}]}>
                            <Text>Số người: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                value={internetBill}
                                keyboardType="number-pad"
                                onChangeText={text => setInternetBill(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Garbage bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{flexDirection:'row'}]}>
                        <IonIcon name="trash" size={25} style={{padding:8}} />
                        <View>
                            <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền rác</Text>
                            <Text>{GarbageValue} đồng/1 tháng</Text>
                        </View>
                    </View>

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

                {/* Discount bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền giảm trừ</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, miễn giảm khi khách xài dịch vụ ít hơn đơn giá,...</Text>
                    <View style={[styles.billValue, {justifyContent:'center'}]}>
                        <View style={[styles.billValueInput, {width:'90%'}]}>
                            <Text>Số tiền giảm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setDiscountBill(text)}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

                {/* Addition bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, {fontWeight:'bold'}]}>Tiền cộng thêm</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, tăng thêm khi khách xài dịch vụ nhiều hơn đơn giá,...</Text>
                    <View style={[styles.billValue, {justifyContent:'center'}]}>
                        <View style={[styles.billValueInput, {width:'90%'}]}>
                            <Text>Số tiền thêm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setAdditionBill(text)}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Calculate button */}
            <TouchableOpacity
                style={styles.calculateButton}
                onPress={() => {
                    calculateBill();
                }}
            >
                <AntDesign name="addfile" size={24} /> 
                <Text style={styles.calculateButtonText}>Lập hóa đơn</Text>
            </TouchableOpacity>

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
        padding:10, 
        borderWidth:1, 
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        borderColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
    },

    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '60%'
    },

    calculateButton: {
        height: '8%',
        width: '88%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
    
    calculateButtonText : {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 10,
    }
})