import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
export default function App({ navigation, route }) {
    const [billItem, setBillItem] = useState(route.params.specBill)
    const [roomItem, setRoomItem] = useState(route.params.currRoom)
    const formatNumber = (q) => {
        return q.toLocaleString({
            style: 'currency',
            currency: 'VND'
        })
    }



    return (




        <View style={styles.container}>

            {/* Header */}
            <View style={[styles.header]}>

                <View style={styles.headerTop}>
                    {/* Back to menu button */}
                    <TouchableHighlight onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableHighlight>

                    <Text style={styles.stackTitle}>CHI TIẾT HÓA ĐƠN</Text>
                </View>

            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Bill detail */}
                <View style={[styles.billDetail, styles.myBorder]}>

                    {/* Name and day */}
                    <View>
                        <Text style={{ fontSize: 20 }}>{roomItem.roomName}</Text>
                        <Text style={styles.textTitle}>{billItem.monthYear}</Text>
                    </View>

                    {/* Price */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền phòng</Text>
                            <Text style={styles.textBold}>30 ngày, giá: {roomItem.price}đ</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{roomItem.price}đ</Text>
                        </View>
                    </View>

                    {/* Electricity */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền điện</Text>
                            <Text>{`Số cũ: ${billItem.dienCu}, số mới: ${billItem.dienMoi}`}</Text>
                            <Text style={styles.textBold}>{`${billItem.dienMoi - billItem.dienCu} KWh x ${roomItem.donGiaDien}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{`${(billItem.dienMoi - billItem.dienCu) * roomItem.donGiaDien}đ`}</Text>
                        </View>

                    </View>

                    {/* Water */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền nước</Text>
                            <Text>{`Số cũ: ${billItem.nuocCu}, số mới: ${billItem.nuocMoi}`}</Text>
                            <Text style={styles.textBold}>{`${billItem.nuocMoi - billItem.nuocCu} KWh x ${roomItem.donGiaNuoc}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{`${(billItem.nuocMoi - billItem.nuocCu) * roomItem.donGiaNuoc}đ`}</Text>
                        </View>
                    </View>

                    {/* Total */}
                    <View style={[styles.detailItemRight, styles.myBackground]}>
                        <Text>Tổng cộng kỳ này</Text>
                        <Text style={styles.textBoldRight}>{billItem.total}đ</Text>
                    </View>
                </View>

                {/* Sum */}
                <View style={[styles.sum, styles.myBorder]}>
                    <View style={[styles.detailItemRight, { borderBottomWidth: 2 }]}>
                        <Text>Khách hàng trả</Text>
                        <Text style={styles.textBoldRight}>{billItem.collected}đ</Text>
                    </View>
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Số lần thu</Text>
                            <Text style={styles.textBold}>1 lần</Text>
                        </View>
                        <View>
                            <Text>Tổng phải thu</Text>
                            <Text style={styles.textBoldRight}>{billItem.total - billItem.collected}đ</Text>
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
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#dfdfdf',
        marginBottom: 8,
        paddingLeft: 8,
        borderBottomWidth: 2,
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },


    body: {
        marginTop: 80,
        width: '100%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    billDetail: {
        width: '90%',
        height: 'auto',
        alignItems: 'center',
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





    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: 'bold',
    },
    textBoldRight: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
    myBackground: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
    },
    myBorder: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
    }
});
