import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useState } from 'react';


export default function App({ navigation }) {
    const [WATER, setWATER] = useState('10000')
    const [ELECTRICITY, setELECTRICITY] = useState('3000')

    let DATA = [
        {
            id: '1',
            roomName: 'Phong 1',
            roomStatus: null,
            price: '800000',
            contractDay: '23/11/2022',
            deposit: '400000',
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
                { id: 2, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
                { id: 3, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
                { id: 4, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
            ],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [
                { id: 1, monthYear: '5/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 2, monthYear: '6/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 3, monthYear: '7/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
            ]
        },
        {
            id: '2',
            roomName: 'Phong 2',
            roomStatus: null,
            price: '800000',
            contractDay: '12/12/2022',
            deposit: '0',
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
                { id: 2, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
            ],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [
                { id: 1, monthYear: '5/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 2, monthYear: '6/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 3, monthYear: '7/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
            ]
        },
        {
            id: '3',
            roomName: 'Phong 3',
            roomStatus: null,
            price: '800000',
            contractDay: '',
            deposit: '0',
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789' },
            ],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [
                { id: 1, monthYear: '5/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 2, monthYear: '6/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
                { id: 3, monthYear: '7/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0' },
            ]
        },
    ]

    let modifiedDATA = DATA.map(item => {
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

    const [notes, setNotes] = useState(NOTE)
    const [roomList, setRoomList] = useState(modifiedDATA)


    return (
        <View style={styles.container}>
            {/* Header */}
            <View View style={[styles.header, styles.myBorder]}>
                <Text>TEN NHA TRO</Text>
            </View >

            {/* Container */}
            <View style={styles.body}>

                {/* Row */}
                <View style={styles.row}>

                    {/* Go to room list */}
                    <TouchableHighlight TouchableHighlight
                        style={[styles.feature, styles.myBorder]}
                        onPress={() => { navigation.navigate("DanhSachPhong", { roomList, setRoomList, ELECTRICITY, WATER }) }
                        }>
                        <Text>DANH SACH PHONG</Text>

                    </TouchableHighlight>

                    {/* Go to bill */}
                    <TouchableHighlight
                        style={[styles.feature, styles.myBorder]}
                        onPress={() => { }}>
                        <Text>LAP HOA DON</Text>
                    </TouchableHighlight >

                </View >


                {/* Row */}
                <View style={styles.row}>

                    {/* Cai dat dich vu */}
                    <TouchableHighlight
                        style={[styles.feature, styles.myBorder]}
                        onPress={() => { }}>
                        <Text>CAI DAT DICH VU</Text>
                    </TouchableHighlight>

                    {/* Ghi chu */}
                    <TouchableHighlight
                        style={[styles.feature, styles.myBorder]}
                        onPress={() => { navigation.navigate("GhiChu", { notes, setNotes }) }}>
                        <Text>GHI CHU</Text>
                    </TouchableHighlight>

                </View >


            </View >


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
        marginTop: 12,
        flex: 1,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 4,
        width: '90%'
    },
    row: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    feature: {
        width: '45%',
        height: '85%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    myBorder: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
    }
});


