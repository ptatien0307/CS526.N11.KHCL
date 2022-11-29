import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useState } from 'react';
export default function App({ navigation }) {
    const [WATER, setWATER] = useState(10000)
    const [ELECTRICITY, setELECTRICITY] = useState(3000)
    let DATA = [
        {
            id: 1,
            roomName: 'Phong 1',
            roomStatus: null,
            price: 800000,
            contractDay: '23/11/2022',
            deposit: 400000,
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien' },
                { id: 2, memberName: 'Pham Tran Anh Tien' },
                { id: 3, memberName: 'Pham Tran Anh Tien' },
                { id: 4, memberName: 'Pham Tran Anh Tien' },
            ],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 2,
            roomName: 'Phong 2',
            roomStatus: null,
            price: 800000,
            contractDay: '12/12/2022',
            deposit: 0,
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien' },
                { id: 2, memberName: 'Pham Tran Anh Tien' },
            ],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 3,
            roomName: 'Phong 3',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 4,
            roomName: 'Phong 4',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien' }
            ],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 5,
            roomName: 'Phong 5',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 6,
            roomName: 'Phong 6',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 7,
            roomName: 'Phong 7',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 8,
            roomName: 'Phong 8',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 9,
            roomName: 'Phong 9',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
        {
            id: 10,
            roomName: 'Phong 10',
            roomStatus: null,
            price: 800000,
            contractDay: '',
            deposit: 0,
            members: [],
            tienDien: ELECTRICITY,
            tienNuoc: WATER,
        },
    ]
    let newDATA = DATA.map(item => {
        if (item.members.length === 0)
            item.roomStatus = 'Trong'
        else
            item.roomStatus = item.members.length + ' nguoi'
        return item
    })


    let NOTE = [
        {
            id: 1,
            noteContent: 'Do something 1'
        },
        {
            id: 2,
            noteContent: 'Do something 2'
        },
        {
            id: 3,
            noteContent: 'Do something 3'
        },
        {
            id: 4,
            noteContent: 'Do something 4'
        },
        {
            id: 5,
            noteContent: 'Do something 5'
        },
    ]



    const [roomList, setRoomList] = useState(newDATA)

    const [notes, setNotes] = useState(NOTE)

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text>TEN NHA TRO</Text>
            </View>

            {/* Container */}
            <View style={styles.body}>

                {/* Row */}
                <View style={styles.row}>

                    {/* Go to room list */}
                    <TouchableHighlight style={styles.feature} onPress={() => { navigation.navigate("DanhSachPhong", { roomList, setRoomList }) }}>
                        <Text>DANH SACH PHONG</Text>
                    </TouchableHighlight>

                    {/* Go to bill */}
                    <TouchableHighlight style={styles.feature} onPress={() => { }}>
                        <Text>LAP HOA DON</Text>
                    </TouchableHighlight>

                </View>


                {/* Row */}
                <View style={styles.row}>

                    {/* Cai dat dich vu */}
                    <TouchableHighlight style={styles.feature} onPress={() => { }}>
                        <Text>CAI DAT DICH VU</Text>
                    </TouchableHighlight>

                    {/* Ghi chu */}
                    <TouchableHighlight style={styles.feature} onPress={() => { navigation.navigate("GhiChu", { notes, setNotes }) }}>
                        <Text>GHI CHU</Text>
                    </TouchableHighlight>

                </View>


            </View>


        </View >
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    header: {
        width: '93%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        borderWidth: 2,

    },
    body: {
        width: '100%',
        height: '65%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    row: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    feature: {
        width: '45%',
        height: '90%',
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});