import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from 'react-native';
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { fetchRoomDetails, updateRoomWaterElectricityNumber } from '../database/actions/roomActions';
import { fetchServiceDetails } from '../database/actions/serviceActions';
import { insertBill } from '../database/actions/billActions';
import { formatVNCurrency } from '../utils/utils';
import { ErrorDialog } from '../Dialogs/ErrorDialog';
import { BillSuccessDialog } from '../Dialogs/BillSuccessDialog';


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
    const [messageErrorDialog, setErrorMessageDialog] = useState('');
    const [errorDialogVisible, setErrorDialogVisible] = useState(false);
    const [billSuccessDialogVisible, setBillSuccessDialogVisible] = useState(false);
    const [messageBill, setMessageBill] = useState('');


    useEffect(() => {
        const loadRoomDetails = async () => {
            const roomDetails = await fetchRoomDetails(selected_room_id)
                .catch((error) => { });

            setRoomRentalFee(roomDetails['rental_fee']);
            setOldElectricityNumber(roomDetails['old_electricity_number']);
            setOldWaterNumber(roomDetails['old_water_number']);
        };

        const loadServicePrices = async (service_name, setServicePrice) => {
            const servicePrices = await fetchServiceDetails(service_name)
                .catch((error) => { });

            setServicePrice(servicePrices['price']);
        };

        loadRoomDetails();

        loadServicePrices('Điện', setElectricityPrice);
        loadServicePrices('Nước', setWaterPrice);
        loadServicePrices('Rác', setGarbagePrice);

    }, []);


    const calculateBill = () => {

        // Check if newElectricityNumber and WaterBillNew have non-digit characters
        if (/\D/.test(newElectricityNumber)) {
            setErrorMessageDialog('Chỉ số điện mới chỉ được chứa số');
            setErrorDialogVisible(true);
            return;
        }

        if (/\D/.test(newWaterNumber)) {
            setErrorMessageDialog('Chỉ số nước mới chỉ được chứa số');
            setErrorDialogVisible(true);
            return;
        }

        // Check if input newElectricityNumber and WaterBillNew are empty
        if (newElectricityNumber == '') {
            setErrorMessageDialog('Chưa nhập chỉ số điện mới');
            setErrorDialogVisible(true);
            return;
        }

        if (newWaterNumber == '') {
            setErrorMessageDialog('Chưa nhập chỉ số nước mới');
            setErrorDialogVisible(true);
            return;
        }

        if (internetPrice == '') {
            setErrorMessageDialog('Chưa nhập tiền Internet');
            setErrorDialogVisible(true);
            return;
        }

        if (credit == '') {
            setErrorMessageDialog('Chưa nhập số tiền miễn giảm');
            setErrorDialogVisible(true);
            return;
        }

        if (othersFee == '') {
            setErrorMessageDialog('Chưa nhập số tiền thu thêm');
            setErrorDialogVisible(true);
            return;
        }

        // Check if input newElectricityNumber and WaterBillNew are less than old
        if (newElectricityNumber <= oldElectricityNumber) {
            setErrorMessageDialog('Chỉ số điện mới phải lớn hơn chỉ số điện cũ');
            setErrorDialogVisible(true);
            return;
        }
        if (newWaterNumber <= oldWaterNumber) {
            setErrorMessageDialog('Chỉ số nước mới phải lớn hơn chỉ số nước cũ');
            setErrorDialogVisible(true);
            return;
        }


        const roomBill = rentalFee * parseInt(numberOfMonths) + Math.round(rentalFee / 30) * numberOfDays;
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
            number_of_months: numberOfMonths,
            number_of_days: numberOfDays,
            rental_fee: rentalFee,
            new_electricity_number: newElectricityNumber,
            old_electricity_number: oldElectricityNumber,
            electricity_fee: electricityPrice,
            new_water_number: newWaterNumber,
            old_water_number: oldWaterNumber,
            water_fee: waterPrice,
            garbage_fee: garbagePrice,
            internet_fee: internetPrice,
            bill_amount: billAmount,
            others_fee: othersFeeTotal,
            credit: creditTotal,
            total: totalBill,
            remained: totalBill
        }).catch((error) => { });

        updateRoomWaterElectricityNumber(
            selected_room_id,
            newWaterNumber,
            newElectricityNumber
        ).catch((error) => { });
        setMessageBill('Lập hóa đơn thành công.\nTổng tiền hóa đơn: ' + formatVNCurrency(totalBill));
        setBillSuccessDialogVisible(true);
        return;
    };

    return (
        <View style={styles.container}>

            {/* Body */}
            <ScrollView style={styles.body}>

                {/* Room bill inputs */}
                <View style={styles.billContainer}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <FontAwesome5 name="door-closed" size={30} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Tiền phòng</Text>
                            <Text>{formatVNCurrency(rentalFee)}/tháng</Text>
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
                        <FontAwesome name="bolt" size={30} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Tiền điện</Text>
                            <Text>{formatVNCurrency(electricityPrice)}/KWh</Text>
                        </View>
                    </View>

                    <View style={styles.billValue}>
                        <Text style={[styles.billValueInput, { width: '40%', paddingVertical: 8.5 }]}>Số cũ: {oldElectricityNumber}</Text>
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
                        <Ionicons name="water" size={30} style={{ paddingHorizontal: 8, paddingVertical: 2 }} />
                        <View>
                            <Text style={[styles.billName]}>Tiền nước</Text>
                            <Text>{formatVNCurrency(waterPrice)}/khối</Text>
                        </View>
                    </View>
                    <View style={styles.billValue}>

                        <Text style={[styles.billValueInput, { width: '40%', paddingVertical: 8.5 }]}>Số cũ: {oldWaterNumber}</Text>
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
                        <Ionicons name="wifi" size={25} style={{ paddingHorizontal: 8, paddingVertical: 1 }} />
                        <View>
                            <Text style={[styles.billName, { justifyContent: 'center' }]}>Tiền mạng</Text>
                        </View>
                    </View>

                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Thành tiền: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setInternetPrice(text)}
                                defaultValue={internetPrice}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

                {/* Garbage bill inputs */}
                <View style={[styles.billContainer, { paddingBottom: 10 }]}>

                    <View style={[{ flexDirection: 'row' }]}>
                        <Ionicons name="trash" size={25} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                        <View>
                            <Text style={[styles.billName]}>Tiền rác</Text>
                            <Text>{formatVNCurrency(garbagePrice)}/tháng</Text>
                        </View>
                    </View>
                </View>

                {/* Discount bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName]}>Tiền giảm trừ</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, miễn giảm khi khách xài dịch vụ ít hơn đơn giá,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Số tiền giảm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setCredit(text)}
                                defaultValue={credit}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

                {/* Addition bill inputs */}
                <View style={styles.billContainer}>
                    <Text style={[styles.billName]}>Tiền cộng thêm</Text>
                    <Text>Dùng vào dịp lễ, tết, covid, tăng thêm khi khách xài dịch vụ nhiều hơn đơn giá,...</Text>
                    <View style={[styles.billValue, { justifyContent: 'center' }]}>
                        <View style={[styles.billValueInput, { width: '90%' }]}>
                            <Text>Số tiền thêm: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                keyboardType="number-pad"
                                onChangeText={text => setOthersFee(text)}
                                defaultValue={othersFee}
                            />
                            <Text>đ</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Calculate button */}
            <TouchableOpacity
                style={styles.calculateButton}
                onPress={calculateBill}
            >
                <AntDesign name="addfile" size={24} color='white' />
                <Text style={styles.calculateButtonText}>Lập hóa đơn</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorDialogVisible}
                onRequestClose={() => { setErrorDialogVisible(false); }}>
                <ErrorDialog
                    message={messageErrorDialog}
                    setErrorDialogVisible={setErrorDialogVisible}
                />
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={billSuccessDialogVisible}
                onRequestClose={() => { setBillSuccessDialogVisible(false); }}>
                <BillSuccessDialog
                    title={'Thành công'}
                    message={messageBill}
                    navigation={navigation}
                    setBillSuccessDialogVisible={setBillSuccessDialogVisible}
                />
            </Modal>
        </View>
    );
};

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
        fontSize: 16,
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
        paddingLeft: 4,
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
        backgroundColor: '#6bec4b',
        borderRadius: 10,
    },

    calculateButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 10,
        color: 'white',
    }
});