import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

import { fetchRoomDetails, updateRoom } from '../database/actions/roomActions';
import { fetchServiceDetails } from '../database/actions/serviceActions';
import { insertBill } from '../database/actions/billActions';
import { getCurrentDateString } from '../utils/utils';


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
    const [internetPrice, setInternetPrice] = useState('0');

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

        loadServicePrices('??i???n', setElectricityPrice);
        loadServicePrices('N?????c', setWaterPrice);
        loadServicePrices('R??c', setGarbagePrice);

    }, []);


    const calculateBill = () => {

        // Check if newElectricityNumber and WaterBillNew have space
        if (newElectricityNumber.includes(' ')) {
            return alert('Ch??? s??? ??i???n m???i kh??ng ???????c c?? kho???ng tr???ng');
        }

        if (newWaterNumber.includes(' ')) {
            return alert('Ch??? s??? n?????c m???i kh??ng ???????c c?? kho???ng tr???ng');
        }

        // Check if input newElectricityNumber and WaterBillNew have comma
        if (newElectricityNumber.includes(',')) {
            return alert('Ch??? s??? ??i???n m???i kh??ng ???????c c?? d???u ph???y');
        }

        if (newWaterNumber.includes(',')) {
            return alert('Ch??? s??? n?????c m???i kh??ng ???????c c?? d???u ph???y');
        }

        // Check if input newElectricityNumber and WaterBillNew have - sign
        if (newElectricityNumber.includes('-')) {
            return alert('Ch??? s??? ??i???n m???i kh??ng ???????c c?? d???u tr???');
        }

        if (newWaterNumber.includes('-')) {
            return alert('Ch??? s??? n?????c m???i kh??ng ???????c c?? d???u tr???');
        }
        
        // Check if input newElectricityNumber and WaterBillNew are empty
        if (newElectricityNumber == '') {
            return alert('Ch??a nh???p ch??? s??? ??i???n m???i');
        }

        if (newWaterNumber == '') {
            return alert('Ch??a nh???p ch??? s??? n?????c m???i');
        }

        // Check if input newElectricityNumber and WaterBillNew are less than old
        if (newElectricityNumber < oldElectricityNumber) {
            return alert('Ch??? s??? ??i???n m???i ph???i l???n h??n ch??? s??? ??i???n c??');
        }
        if (newWaterNumber < oldWaterNumber) {
            return alert('Ch??? s??? n?????c m???i ph???i l???n h??n ch??? s??? n?????c c??');
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
            created_at: getCurrentDateString(),
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
        });

        updateRoom({
        });

        alert('T???ng ti???n h??a ????n: ' + totalBill);
        return navigation.goBack();
    };

    return (
        <View style={styles.container}>

            {/* Body */}
            <ScrollView style={styles.body}>

                {/* Room bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <FontAwesomeIcon5 name="door-closed" size={30} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Ti???n ph??ng</Text>
                            <Text>{rentalFee} ?????ng/th??ng</Text>
                        </View>
                    </View>

                    <View style={styles.billValue}>
                        <View style={[styles.billValueInput, { width: '45%' }]}>
                            <Text>S??? th??ng: </Text>
                            <TextInput
                                style={[styles.textInput, { width: '40%' }]}
                                keyboardType="number-pad"
                                value={numberOfMonths}
                                onChangeText={text => setNumberOfMonths(text)}
                            />
                        </View>
                        <View style={[styles.billValueInput, { width: '45%' }]}>
                            <Text>S??? ng??y l???: </Text>
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
                        <FontAwesomeIcon name="bolt" size={30} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Ti???n ??i???n</Text>
                            <Text>{electricityPrice} ?????ng/KWh</Text>
                        </View>
                    </View>

                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, { width: '40%', paddingVertical: 8.5 }]}>S??? c??: {oldElectricityNumber}</Text>
                        <View style={[styles.billValueInput, { width: '55%' }]}>
                            <Text>S??? m???i: </Text>
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
                        <IonIcon name="water" size={30} style={{ paddingHorizontal: 8, paddingVertical: 2 }} />
                        <View>
                            <Text style={[styles.billName]}>Ti???n n?????c</Text>
                            <Text>{waterPrice} ?????ng/Kh???i</Text>
                        </View>
                    </View>
                    <View style={styles.billValue}>

                        <Text style={[styles.billValueInput, { width: '40%', paddingVertical: 8.5 }]}>S??? c??: {oldWaterNumber}</Text>
                        <View style={[styles.billValueInput, { width: '55%' }]}>
                            <Text>S??? m???i: </Text>
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
                        <IonIcon name="wifi" size={25} style={{ paddingHorizontal: 8, paddingVertical: 1 }} />
                        <View>
                            <Text style={[styles.billName, {justifyContent:'center'}]}>Ti???n m???ng</Text>
                        </View>
                    </View>

                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Th??nh ti???n: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                placeholder="0"
                                keyboardType="number-pad"
                                onChangeText={text => setInternetPrice(text)}
                            />
                            <Text>??</Text>
                        </View>
                    </View>
                </View>

                {/* Garbage bill inputs */}
                <View style={[styles.billContainer, {paddingBottom:10}]}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <IonIcon name="trash" size={25} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Ti???n r??c</Text>
                            <Text>{garbagePrice} ?????ng/1 th??ng</Text>
                        </View>
                    </View>
                </View>

                {/* Discount bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName]}>Ti???n gi???m tr???</Text>
                    <Text>D??ng v??o d???p l???, t???t, covid, mi???n gi???m khi kh??ch x??i d???ch v??? ??t h??n ????n gi??,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>S??? ti???n gi???m: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setCredit(text)}
                            />
                            <Text>??</Text>
                        </View>
                    </View>
                </View>

                {/* Addition bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName]}>Ti???n c???ng th??m</Text>
                    <Text>D??ng v??o d???p l???, t???t, covid, t??ng th??m khi kh??ch x??i d???ch v??? nhi???u h??n ????n gi??,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>S??? ti???n th??m: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                placeholder="0"
                                onChangeText={text => setOthersFee(text)}
                            />
                            <Text>??</Text>
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
                <Text style={styles.calculateButtonText}>L???p h??a ????n</Text>
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

    billName: {
        fontSize:16,
        fontWeight: 'bold',
    },

    billValueInput: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 8,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '60%',
        maxHeight: '70%'
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