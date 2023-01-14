import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useForceUpdate } from "../utils/utils";
import { fetchRoomList, insertRoom } from "../database/actions/roomActions";

export default function App({ navigation, route }) {
    const [roomName, setRoomName] = useState('');
    const [price, setPrice] = useState('');
    const [electricityCurrent, setElectricityCurrent] = useState('');
    const [waterServiceCurrent, setWaterServiceCurrent] = useState('');

    const handleAddRoom = () => {
        insertRoom(
            {
                name: 'Phòng ' + roomName,
                rental_fee: price,
                old_electricity_number: electricityCurrent,
                old_water_number: waterServiceCurrent,
            },
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.roomName}>
                <Text style={styles.text}>Tên phòng</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tên phòng. Ví dụ: 1,2,..."
                    onChangeText={(text) => {
                        setRoomName(text);
                    }}
                />
            </View>

            <View style={styles.price}>
                <Text style={styles.text}>Giá thuê</Text>
                <TextInput
                    style={[styles.input, {width: '60%'}]}
                    keyboardType="number-pad"
                    placeholder="Nhập giá thuê"
                    onChangeText={(text) => {
                        setPrice(text);
                    }}
                />
                <Text style={styles.text}>đ/tháng</Text>
            </View>

            <View style={styles.serviceCurrent}>
                <Text style={styles.text}>Chỉ số điện nước hiện tại</Text>

                <View style={styles.inputService}>
                    <Text style={styles.text}>Chỉ số điện</Text>
                    <TextInput
                        style={[styles.input, {width: '60%'}]}  
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
                        style={[styles.input, {width: '60%'}]}  
                        placeholder="Nhập chỉ số nước hiện tại"
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                            setWaterServiceCurrent(text);
                        }}
                    />
                </View>
            </View>

            <View style={styles.Service}>
                <Text>Dịch vụ</Text>
                
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                handleAddRoom();
                navigation.goBack();
            }}>
                <Text style={styles.text}>Thêm phòng</Text>
            </TouchableOpacity>

        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
    },

    serviceCurrent: {
        width: '95%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
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
        backgroundColor: '#00bfff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        bottom: 10,
    },

});

