import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

import { fetchRoomDetails, updateRoom } from '../database/actions/roomActions';
import { fetchServiceDetails } from '../database/actions/serviceActions';
import { insertBill } from '../database/actions/billActions';


export default function App({ navigation, route }) {
    const selected_room_id = route.params.selected_room_id;
    // from database
    //          room attributes
    const [rentalFee, setRoomRentalFee] = useState(null);
    const [oldElectricityNumber, setOldElectricityNumber] = useState(null);
    const [oldWaterNumber, setOldWaterNumber] = useState(null);

    //          service prices
    const [electricityPrice, setElectricityPrice] = useState(null);
    const [waterPrice, setWaterPrice] = useState(null);
    const [garbagePrice, setGarbagePrice] = useState(null);

    // from input
    const [internetPrice, setInternetPrice] = useState('1');

    const [newElectricityNumber, setNewElectricityNumber] = useState('');
    const [newWaterNumber, setNewWaterNumber] = useState('');

    const [numberOfMonths, setNumberOfMonths] = useState('1');
    const [numberOfDays, setNumberOfDays] = useState('0');

    const [credit, setCredit] = useState('0');
    const [othersFee, setOthersFee] = useState('0');


    useEffect(() => {
        const loadRoomDetails = async () => {
            const roomDetails = await fetchRoomDetails(selected_room_id)
                .catch((error) => console.log(error));

            setRoomRentalFee(roomDetails['rental_fee']);
            setOldElectricityNumber(roomDetails['old_electricity_number']);
            setOldWaterNumber(roomDetails['old_water_number']);
        };

        const loadServicePrices = async (service_name, setServicePrice) => {
            const servicePrices = await fetchServiceDetails(service_name)
                .catch((error) => console.log(error));

            setServicePrice(String(servicePrices['price']));
        };

        loadRoomDetails();

        loadServicePrices('Điện', setElectricityPrice);
        loadServicePrices('Nước', setWaterPrice);
        loadServicePrices('Rác', setGarbagePrice);

    }, []);

    const calculateBill = () => {

        // Check if input newElectricityNumber and WaterBillNew are empty
        if (newElectricityNumber == '') {
            return alert('Chưa nhập chỉ số điện mới');
        }

        if (newWaterNumber == '') {
            return alert('Chưa nhập chỉ số nước mới');
        }

        // Check if input newElectricityNumber and WaterBillNew are less than old
        if (newElectricityNumber < oldElectricityNumber) {
            return alert('Chỉ số điện mới phải lớn hơn chỉ số điện cũ');
        }
        if (newWaterNumber < oldWaterNumber) {
            return alert('Chỉ số nước mới phải lớn hơn chỉ số nước cũ');
        }


        const roomBill = rentalFee * numberOfMonths + rentalFee / 30 * numberOfDays;
        const electricityBill = electricityPrice * (newElectricityNumber - oldElectricityNumber);
        const waterBill = waterPrice * (newWaterNumber - oldWaterNumber);

        const internetPriceTotal = parseInt(internetPrice);
        const garbagePriceTotal = parseInt(garbagePrice);
        const creditTotal = parseInt(credit);
        const othersFeeTotal = parseInt(othersFee);

        const billAmount = roomBill + electricityBill + waterBill + internetPriceTotal + garbagePriceTotal;

        const totalBill = billAmount - creditTotal + othersFeeTotal;

        insertBill({
            room_id: selected_room_id,
            created_at: new Date().toLocaleString(),
            number_of_months: numberOfMonths,
            number_of_days: numberOfDays,
            rental_fee: rentalFee,
            new_electricity_number: newElectricityNumber,
            old_electricity_number: oldElectricityNumber,
            new_water_number: newWaterNumber,
            old_water_number: oldWaterNumber,
            garbage_fee: garbagePrice,
            internet_fee: internetPrice,
            bill_amount: billAmount,
            others_fee: othersFeeTotal,
            credit: creditTotal,
            total: totalBill,
            remained: totalBill
        })

        updateRoom({
        })

        alert('Tổng tiền hóa đơn: ' + totalBill);
        return navigation.goBack();
    };

    return (
        <View style={styles.container}>

            {/* Body */}
            <ScrollView style={styles.body}>

                {/* Room bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <FontAwesomeIcon5 name="door-closed" size={30} style={{ padding: 8 }} />
                        <View>
                            <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền phòng</Text>
                            <Text>{rentalFee} đồng/tháng</Text>
                        </View>
                    </View>

                    <View style={styles.billValue}>
                        <View style={[styles.billValueInput, { width: '45%' }]}>
                            <Text>Số tháng: </Text>
                            <TextInput
                                style={[styles.textInput, { width: '40%' }]}
                                keyboardType="number-pad"
                                value={numberOfMonths}
                                onChangeText={text => setNumberOfMonths(text)}
                            />
                        </View>
                        <View style={[styles.billValueInput, { width: '45%' }]}>
                            <Text>Số ngày lẻ: </Text>
                            <TextInput
                                style={[styles.textInput, { width: '40%' }]}
                                keyboardType="number-pad"
                                value={numberOfDays}
                                onChangeText={text => setNumberOfDays(text)}
                            />
                        </View>
                    </View>
                </View>


                {/* Electricity bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <FontAwesomeIcon name="bolt" size={30} style={{ padding: 8 }} />
                        <View>
                            <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền điện</Text>
                            <Text>{electricityPrice} đồng/KWh</Text>
                        </View>
                    </View>

                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, { width: '40%' }]}>Số cũ: {oldElectricityNumber}</Text>
                        <View style={[styles.billValueInput, { width: '55%' }]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setNewElectricityNumber(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Water bill inputs */}
                <View style={styles.billContainer}>
                    <View style={[{ flexDirection: 'row' }]}>
                        <IonIcon name="water" size={25} style={{ padding: 8 }} />
                        <View>
                            <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền nước</Text>
                            <Text>{waterPrice} đồng/1 Khối</Text>
                        </View>
                    </View>
                    <View style={styles.billValue}>

                        <Text style={[styles.billValueInput, { width: '40%' }]}>Số cũ: {oldWaterNumber}</Text>
                        <View style={[styles.billValueInput, { width: '55%' }]}>
                            <Text>Số mới: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setNewWaterNumber(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Internet bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <IonIcon name="wifi" size={25} style={{ padding: 8 }} />
                        <View>
                            <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền mạng</Text>
                        </View>
                    </View>

                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Thành tiền: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                value={internetPrice}
                                keyboardType="number-pad"
                                onChangeText={text => setInternetPrice(text)}
                            />
                        </View>
                    </View>
                </View>

                {/* Garbage bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <IonIcon name="trash" size={25} style={{ padding: 8 }} />
                        <View>
                            <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền rác</Text>
                            <Text>{garbagePrice} đồng/1 tháng</Text>
                        </View>
                    </View>
                </View>

                {/* Discount bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền giảm trừ</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, miễn giảm khi khách xài dịch vụ ít hơn đơn giá,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Số tiền giảm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setCredit(text)}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

                {/* Addition bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName, { fontWeight: 'bold' }]}>Tiền cộng thêm</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, tăng thêm khi khách xài dịch vụ nhiều hơn đơn giá,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Số tiền thêm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setOthersFee(text)}
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
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    calculateButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 10,
    }
});