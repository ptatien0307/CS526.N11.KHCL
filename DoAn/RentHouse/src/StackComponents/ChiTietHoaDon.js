import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import ThuTienHoaDon from './ThuTienHoaDon.js'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default function App({ navigation, route }) {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    const [currBill, setCurrBill] = useState(route.params.currBill)
    console.log(currBill)
    const [isThuTienModal, setIsThuTienModal] = useState(false)

    const currRoom = route.params.roomList[currBill.roomID-1]
    console.log(currRoom)
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
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <FontAwesomeIcon name="arrow-left" size={35} />
                    </TouchableOpacity>

                    <Text style={styles.stackTitle}>CHI TIẾT HÓA ĐƠN</Text>
                </View>

            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Bill detail */}
                <View style={[styles.billDetail, styles.myBorder]}>

                    {/* Name and day */}
                    <View>
                        <Text style={styles.textTitle}>{currRoom.roomName}</Text>
                        <Text style={styles.textTitle}>{currBill.monthYear}</Text>
                    </View>

                    {/* Price */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền phòng</Text>
                            <Text style={styles.textBold}>30 ngày, giá: {currRoom.price}đ</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{currRoom.price}đ</Text>
                        </View>
                    </View>

                    {/* Electricity */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền điện</Text>
                            <Text>{`Số cũ: ${currBill.dienCu}, số mới: ${currBill.dienMoi}`}</Text>
                            <Text style={styles.textBold}>{`${currBill.dienMoi - currBill.dienCu} KWh x ${currRoom.donGiaDien}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{`${(currBill.dienMoi - currBill.dienCu) * currRoom.donGiaDien}đ`}</Text>
                        </View>

                    </View>

                    {/* Water */}
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Tiền nước</Text>
                            <Text>{`Số cũ: ${currBill.nuocCu}, số mới: ${currBill.nuocMoi}`}</Text>
                            <Text style={styles.textBold}>{`${currBill.nuocMoi - currBill.nuocCu} KWh x ${currRoom.donGiaNuoc}đ`}</Text>
                        </View>
                        <View >
                            <Text>Thành tiền</Text>
                            <Text style={styles.textBoldRight}>{`${(currBill.nuocMoi - currBill.nuocCu) * currRoom.donGiaNuoc}đ`}</Text>
                        </View>
                    </View>

                    {/* Total */}
                    <View style={[styles.detailItemRight, styles.myBackground]}>
                        <Text>Tổng cộng kỳ này</Text>
                        <Text style={styles.textBoldRight}>{currBill.total}đ</Text>
                    </View>
                </View>

                {/* Sum */}
                <View style={[styles.sum, styles.myBorder]}>
                    <View style={[styles.detailItemRight, { borderBottomWidth: 2 }]}>
                        <Text>Khách đã trả</Text>
                        <Text style={styles.textBoldRight}>{currBill.collected}đ</Text>
                    </View>
                    <View style={[styles.detailItem, styles.myBackground]}>
                        <View>
                            <Text>Số lần thu</Text>
                            <Text style={styles.textBold}>{currBill.count} lần</Text>
                        </View>
                        <View>
                            <Text>Tổng phải thu</Text>
                            <Text style={styles.textBoldRight}>{currBill.total - currBill.collected}đ</Text>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.collectButton}
                onPress={() => {
                    setIsThuTienModal(true)
                }}>
                <Text style={styles.textTitleWhite}>THU TIỀN HÓA ĐƠN</Text>
            </TouchableOpacity>


            {isThuTienModal && <ThuTienHoaDon
                currBill={currBill}
                setCurrBill={setCurrBill}
                billHistory={currRoom.billHistory}
                currRoom={currRoom}
                setCurrRoom={route.params.setCurrRoom}
                setRoomList={route.params.setRoomList}
                setGlobalRoomList={route.params.setGlobalRoomList}
                roomList={route.params.roomList}
                setIsThuTienModal={setIsThuTienModal} >
            </ThuTienHoaDon>}
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
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },


    body: {
        width: '100%',
        height: '80%',
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
        minHeight: 60,
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




    collectButton: {
        width: '90%',
        height: '5%',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black'
    },



    stackTitle: {
        marginLeft: 32,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textTitleWhite: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
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
