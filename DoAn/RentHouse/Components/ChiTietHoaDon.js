import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
export default function App({ navigation, route }) {
    const [billItem, setBillItem] = useState(route.params.specBill)
    const [roomItem, setRoomItem] = useState(route.params.specRoom)
    const formatNumber = (q) => {
        return q.toLocaleString({
            style: 'currency',
            currency: 'VND'
        })
    }



    return (




        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header, styles.myBorder]}>

                {/* Back to menu button */}
                <TouchableHighlight onPress={() => { navigation.goBack() }}>
                    <FontAwesomeIcon name="arrow-left" size={35} />
                </TouchableHighlight>

                <Text>CHI TIET HOA DON</Text>

                {/* Edit info button */}
                <TouchableHighlight onPress={() => { setMountEdit(!mountEdit) }}>
                    <FontAwesomeIcon name="edit" size={35} />
                </TouchableHighlight>
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Bill detail */}
                <View style={[styles.billDetail, styles.myBorder]}>

                    {/* Name and day */}
                    <View>
                        <Text style={{ fontSize: 20 }}>{roomItem.roomName}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{billItem.monthYear}</Text>
                    </View>

                    {/* Price */}
                    <View style={[styles.detailItem, styles.myBorder]}>
                        <View>
                            <Text>Tiền phòng</Text>
                            <Text style={{ fontWeight: 'bold' }}>30 ngày, giá: {roomItem.price}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>{roomItem.price}đ</Text>
                        </View>
                    </View>

                    {/* Electricity */}
                    <View style={[styles.detailItem, styles.myBorder]}>
                        <View>
                            <Text>Tiền điện</Text>
                            <Text>{`Số cũ: ${billItem.dienCu}, số mới: ${billItem.dienMoi}`}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{`${billItem.dienMoi - billItem.dienCu} KWh x ${roomItem.donGiaDien}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>{`${(billItem.dienMoi - billItem.dienCu) * roomItem.donGiaDien}đ`}</Text>
                        </View>

                    </View>

                    {/* Water */}
                    <View style={[styles.detailItem, styles.myBorder]}>
                        <View>
                            <Text>Tiền nước</Text>
                            <Text>{`Số cũ: ${billItem.nuocCu}, số mới: ${billItem.nuocMoi}`}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{`${billItem.nuocMoi - billItem.nuocCu} KWh x ${roomItem.donGiaNuoc}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>{`${(billItem.nuocMoi - billItem.nuocCu) * roomItem.donGiaNuoc}đ`}</Text>
                        </View>
                    </View>

                    {/* Total */}
                    <View style={[styles.detailItemRight, styles.myBorder]}>
                        <Text>Tổng cộng kỳ này</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>{billItem.total}đ</Text>
                    </View>
                </View>

                {/* Sum */}
                <View style={[styles.sum, styles.myBorder]}>
                    <View style={[styles.detailItemRight, { borderBottomWidth: 2 }]}>
                        <Text>Khách hàng trả</Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>1000000đ</Text>
                    </View>
                    <View style={[styles.detailItem, styles.count]}>
                        <View>
                            <Text>Số lần thu</Text>
                            <Text style={{ fontWeight: 'bold' }}>1 lần</Text>
                        </View>
                        <View>
                            <Text>Tổng phải thu</Text>
                            <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>55000đ</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 8,
    },



    body: {
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    billDetail: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        marginTop: 8,
        paddingBottom: 4,
    },
    detailItem: {
        width: '90%',
        minHeight: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginTop: 8,

    },
    detailItemRight: {
        width: '90%',
        minHeight: 75,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 8,
        marginTop: 8,

    },
    sum: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
        marginTop: 8,
        paddingBottom: 4,
    },
    count: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
