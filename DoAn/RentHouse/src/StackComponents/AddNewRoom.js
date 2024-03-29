import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { fetchRoomList, insertRoom } from "../database/actions/roomActions";
import { fetchServiceDetails } from '../database/actions/serviceActions';
import { formatVNCurrency } from '../utils/utils';

import { ErrorDialog } from '../Dialogs/ErrorDialog';
import { BillSuccessDialog } from '../Dialogs/BillSuccessDialog';

export default function App({ navigation, route }) {
    const [roomName, setRoomName] = useState('');
    const [price, setPrice] = useState('');
    const [electricityCurrent, setElectricityCurrent] = useState('');
    const [waterServiceCurrent, setWaterServiceCurrent] = useState('');

    const [electricityPrice, setElectricityPrice] = useState(null);
    const [waterPrice, setWaterPrice] = useState(null);
    const [garbagePrice, setGarbagePrice] = useState(null);
    const [messageErrorDialog, setErrorMessageDialog] = useState('');
    const [errorDialogVisible, setErrorDialogVisible] = useState(false);
    const [billSuccessDialogVisible, setBillSuccessDialogVisible] = useState(false);


    // Load service price from database
    useEffect(() => {

        const loadServicePrices = async (service_name, setServicePrice) => {
            const servicePrices = await fetchServiceDetails(service_name)
                .catch((error) => { });

            setServicePrice(String(servicePrices.price));
        };

        loadServicePrices('Điện', setElectricityPrice);
        loadServicePrices('Nước', setWaterPrice);
        loadServicePrices('Rác', setGarbagePrice);
        loadServicePrices('Phòng', setPrice);

    }, []);

    const handleAddRoom = async () => {
        // Check if room name is empty
        if (roomName === '') {
            setErrorMessageDialog('Tên phòng không được để trống');
            setErrorDialogVisible(true);
            return;
        }

        // Check if price is empty
        if (price === '') {
            setErrorMessageDialog('Giá thuê không được để trống');
            setErrorDialogVisible(true);
            return;
        }

        // Check if electricityCurrent is empty
        if (electricityCurrent === '') {
            setErrorMessageDialog('Chỉ số điện hiện tại không được để trống');
            setErrorDialogVisible(true);
            return;
        }

        // Check if waterServiceCurrent is empty
        if (waterServiceCurrent === '') {
            setErrorMessageDialog('Chỉ số nước hiện tại không được để trống');
            setErrorDialogVisible(true);
            return;
        }

        // Check if room name is existed
        const roomList = await fetchRoomList();
        for (let i = 0; i < roomList.length; i++) {
            if (roomList[i]['name'] === `Phòng ${roomName}`) {
                setErrorMessageDialog('Tên phòng đã tồn tại');
                setErrorDialogVisible(true);
                return;
            }
        }

        // check if price have non-digit character
        if (/\D/.test(price)) {
            setErrorMessageDialog('Giá phòng chỉ được chứa số');
            setErrorDialogVisible(true);
            return;
        }

        // check if electricityCurrent have non-digit character
        if (/\D/.test(electricityCurrent)) {
            setErrorMessageDialog('Chỉ số điện mới chỉ được chứa số');
            setErrorDialogVisible(true);
            return;
        }

        // check if waterServiceCurrent have non-digit character
        if (/\D/.test(waterServiceCurrent)) {
            setErrorMessageDialog('Chỉ số nước mới chỉ được chứa số');
            setErrorDialogVisible(true);
            return;
        }

        insertRoom(
            {
                name: 'Phòng ' + roomName,
                rental_fee: price,
                old_electricity_number: electricityCurrent,
                old_water_number: waterServiceCurrent,
            },
        );

        setBillSuccessDialogVisible(true);
        return;
    };


    return (
        <View style={styles.container}>
            <View style={styles.roomName}>
                <Text style={styles.text}>Tên phòng</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên phòng. Ví dụ: 1,A1,..."
                    onChangeText={(text) => {
                        setRoomName(text);
                    }}
                />
            </View>

            <View style={styles.price}>
                <Text style={styles.text}>Giá thuê</Text>
                <TextInput
                    style={[styles.input, { width: '60%' }]}
                    keyboardType="number-pad"
                    placeholder="Nhập giá thuê"
                    onChangeText={(text) => {
                        setPrice(text);
                    }}
                    defaultValue={price}
                />
                <Text style={styles.text}>đ/tháng</Text>
            </View>

            <View style={styles.serviceCurrent}>
                <Text style={[styles.text, {
                    borderBottomColor: 'black', borderBottomWidth: 1,
                    width: '100%', paddingBottom: 8, paddingHorizontal: 10
                }]}>
                    Chỉ số điện nước hiện tại
                </Text>

                <View style={styles.inputService}>
                    <Text style={styles.text}>Chỉ số điện</Text>
                    <TextInput
                        style={[styles.input, { width: '60%' }]}
                        placeholder="Nhập chỉ số điện hiện tại"
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setElectricityCurrent(text);
                        }}
                    />
                </View>

                <View style={styles.inputService}>
                    <Text style={styles.text}>Chỉ số nước</Text>
                    <TextInput
                        style={[styles.input, { width: '60%' }]}
                        placeholder="Nhập chỉ số nước hiện tại"
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setWaterServiceCurrent(text);
                        }}
                    />
                </View>
            </View>

            <View style={styles.ServiceContainer}>
                <Text style={[styles.text, {
                    borderBottomColor: 'black', borderBottomWidth: 1,
                    width: '100%', paddingBottom: 8, paddingHorizontal: 10
                }]}>Dịch vụ</Text>
                <View style={styles.service}>
                    <FontAwesome name="bolt" size={30} style={{ paddingHorizontal: 8, paddingVertical: 4 }} />
                    <Text style={styles.text}>Điện</Text>
                    <Text style={styles.text}>{formatVNCurrency(electricityPrice)}/kWh</Text>
                </View>
                <View style={[styles.service]}>
                    <Ionicons name="water" size={30} style={{ paddingVertical: 2 }} />
                    <Text style={[styles.text]}>Nước</Text>
                    <Text style={styles.text}>{formatVNCurrency(waterPrice)}/khối</Text>
                </View>
                <View style={styles.service}>
                    <Ionicons name="trash" size={25} style={{ paddingHorizontal: 2, paddingVertical: 4 }} />
                    <Text style={styles.text}>Rác</Text>
                    <Text style={styles.text}>{formatVNCurrency(garbagePrice)}/tháng</Text>
                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={handleAddRoom}>
                <Text style={[styles.text, { fontWeight: 'bold', color: 'white' }]}>THÊM PHÒNG</Text>
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
                    message={'Thêm phòng thành công'}
                    navigation={navigation}
                    setBillSuccessDialogVisible={setBillSuccessDialogVisible}
                />
            </Modal>
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: '#d9d9d9'
    },
    roomName: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },
    input: {
        width: '75%',
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },

    serviceCurrent: {
        width: '95%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },

    inputService: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 10,
    },

    button: {
        width: '95%',
        backgroundColor: '#6bec4b',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        bottom: 10,
    },

    ServiceContainer: {
        width: '95%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: 'white'
    },

    service: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        padding: 10,
    },

});

