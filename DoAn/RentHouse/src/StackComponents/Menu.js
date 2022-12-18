import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function App({ navigation }) {
    const [WATER, setWATER] = useState('12000');
    const [ELECTRICITY, setELECTRICITY] = useState('3000');

    let DATA = [
        {
            id: '1',
            roomName: 'Phòng 1',
            roomStatus: null,
            price: '800000',
            contractDay: '23/11/2022',
            deposit: '400000',
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien1', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
                { id: 2, memberName: 'Pham Tran Anh Tien2', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
                { id: 3, memberName: 'Pham Tran Anh Tien3', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
                { id: 4, memberName: 'Pham Tran Anh Tien4', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
            ],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [
                { id: 1, monthYear: '5/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0', count: '1' },
                { id: 2, monthYear: '6/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0', count: '1' },
                { id: 3, monthYear: '7/2022', dienCu: '1420', dienMoi: '1520', nuocCu: '90', nuocMoi: '120', total: '0', collected: '595000', remained: '0', count: '1' },
            ],
            lastestDien: null,
            lastestNuoc: null,
        },
        {
            id: '2',
            roomName: 'Phòng 2',
            roomStatus: null,
            price: '800000',
            contractDay: '12/12/2022',
            deposit: '0',
            members: [
                { id: 1, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
                { id: 2, memberName: 'Pham Tran Anh Tien', dateOfBirth: '03/07/2002', CCCD: '123456789', ngayCapCCCD: '01/01/2021', noiCapCCCD: 'Vĩnh Long', job: 'Sinh viên', sex: 1, address: 'ấp Phước Hòa, xã Hòa Phú, huyện Long Hồ, tỉnh Vĩnh Long' },
            ],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [
                { id: 1, monthYear: '5/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '595000', remained: '0', count: '1' },
                { id: 2, monthYear: '6/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '0', remained: '0', count: '0' },
                { id: 3, monthYear: '7/2022', dienCu: '1420', dienMoi: '1480', nuocCu: '90', nuocMoi: '100', total: '0', collected: '0', remained: '0', count: '0' },
            ],
            lastestDien: null,
            lastestNuoc: null,
        },
        {
            id: '3',
            roomName: 'Phòng 3',
            roomStatus: null,
            price: '800000',
            contractDay: '',
            deposit: '0',
            members: [],
            donGiaDien: ELECTRICITY,
            donGiaNuoc: WATER,
            billHistory: [],
            lastestDien: null,
            lastestNuoc: null,
        },
    ];

    let modifiedDATA = DATA.map(item => {
        if (item.members.length === 0)
            item.roomStatus = 'Trống';
        else
            item.roomStatus = item.members.length + ' người';

        if (item.billHistory.length !== 0) {
            item.lastestDien = item.billHistory[item.billHistory.length - 1].dienMoi;
            item.lastestNuoc = item.billHistory[item.billHistory.length - 1].nuocMoi;
        }

        item.billHistory.forEach(billItem => {
            let totalE = (billItem.dienMoi - billItem.dienCu) * ELECTRICITY;
            let totalW = (billItem.nuocMoi - billItem.nuocCu) * WATER;

            billItem.total = parseInt(totalE) + parseInt(totalW) + parseInt(item.price);
            billItem.remained = billItem.total - billItem.collected;
        });
        return item;
    });

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
        {
            id: 6,
            noteContent: 'Do something 5'
        },

    ];

    const [notes, setNotes] = useState(NOTE);
    const [roomList, setRoomList] = useState(modifiedDATA);


    return (
        <View style={styles.container}>
            {/* Header */}
            <View View style={[styles.header, styles.myBackground]}>
                <Text style={styles.textTitle}>TÊN NHÀ TRỌ</Text>
            </View >

            {/* Container */}
            <View style={styles.body}>

                {/* Row */}
                <View style={styles.row}>

                    {/* Go to room list */}
                    <TouchableOpacity TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => {
                            navigation.navigate("DanhSachPhong");
                        }}
                    >
                        <Text style={styles.textTitle}>DANH SÁCH PHÒNG</Text>

                    </TouchableOpacity>

                    {/* Go to bill */}
                    <TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => { navigation.navigate("LapHoaDon", {}); }}>
                        <Text style={styles.textTitle}>LẬP HÓA ĐƠN</Text>
                    </TouchableOpacity >

                </View >


                {/* Row */}
                <View style={styles.row}>

                    {/* Cai dat dich vu */}
                    <TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => { navigation.navigate("ThietLapDichVu", {}); }}>
                        <Text style={styles.textTitle}>CÀI ĐẶT DỊCH VỤ</Text>
                    </TouchableOpacity>

                    {/* Ghi chu */}
                    <TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => { navigation.navigate("GhiChu"); }}>
                        <Text style={styles.textTitle}>GHI CHÚ</Text>
                    </TouchableOpacity>

                </View >

                {/* Row */}
                <View style={styles.row}>

                    {/* Cai dat dich vu */}
                    <TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => { navigation.navigate("DanhSachHoaDon", {}); }}>
                        <Text style={styles.textTitle}>THU TIỀN HÓA ĐƠN</Text>
                    </TouchableOpacity>

                    {/* Ghi chu */}
                    <TouchableOpacity
                        style={[styles.feature, styles.myBackground]}
                        onPress={() => { navigation.navigate("HuongDan", {}); }}>
                        <Text style={styles.textTitle}>HƯỚNG DẪN</Text>
                    </TouchableOpacity>

                </View >

            </View >


        </View >
    );

}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#ffffff",
    },
    header: {
        marginTop: 12,
        flex: 1,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 4,
        width: "90%",
    },
    row: {
        width: "100%",
        height: "33%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    feature: {
        width: "45%",
        height: "85%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    myBackground: {
        backgroundColor: "#dfdfdf",
        borderRadius: 10,
    },

    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
