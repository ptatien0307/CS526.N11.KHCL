`use strict`;

import { openDatabase } from 'expo-sqlite';
import { updateRoomWaterElectricityNumber } from './roomActions';
import { Alert } from 'react-native';

const db = openDatabase('renthouse.db');

export const fetchBillList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                SELECT bills.id,
                    strftime('%d/%m/%Y %H:%M:%S', created_at, 'localtime') AS created_at,
                    total,
                    remained,
                    rooms.name AS room_name,
                    strftime('%m', created_at, 'localtime') AS month,
                    strftime('%Y', created_at, 'localtime') AS year
                FROM bills
                    INNER JOIN rooms ON rooms.id = bills.room_id
                WHERE bills.status = 'Chưa thanh toán'
                ORDER BY year DESC,
                        month DESC,
                        room_name ASC;
                `,
                [],
                (_, { rows: { _array } }) => {
                    resolve(_array);
                },
                (_, error) => reject(error)
            );
        });
    });
};

export const fetchBillDetails = (bill_id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                SELECT  bills.id,
                        strftime('%d/%m/%Y %H:%M:%S', created_at, 'localtime') AS created_at,
                        number_of_months,
                        number_of_days,
                        bills.rental_fee,
                        bills.new_electricity_number,
                        bills.old_electricity_number,
                        electricity_fee,
                        bills.new_water_number,
                        bills.old_water_number,
                        water_fee,
                        garbage_fee,
                        internet_fee,
                        bill_amount,
                        others_fee,
                        credit,
                        total,
                        remained,
                        paid_time,
                        room_id,
                        status,
                        room_id,
                        rooms.name as room_name
                FROM 
                    bills
                    INNER JOIN
                    rooms ON rooms.id = bills.room_id
                WHERE bills.id = ?
                `,
                [bill_id],
                (_, { rows: { _array } }) => {
                    resolve(_array[0]);
                },
                (_, error) => reject(error)
            );
        });
    });
};

export const insertBill = (bill, forceUpdate = null) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO bills (
                        room_id,
                        number_of_months,
                        number_of_days,
                        rental_fee,
                        new_electricity_number,
                        old_electricity_number,
                        electricity_fee,
                        new_water_number,
                        old_water_number,
                        water_fee,
                        garbage_fee,
                        internet_fee,
                        bill_amount,
                        others_fee,
                        credit,
                        total,
                        remained
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        bill.room_id,
                        bill.number_of_months,
                        bill.number_of_days,
                        bill.rental_fee,
                        bill.new_electricity_number,
                        bill.old_electricity_number,
                        bill.electricity_fee,
                        bill.new_water_number,
                        bill.old_water_number,
                        bill.water_fee,
                        bill.garbage_fee,
                        bill.internet_fee,
                        bill.bill_amount,
                        bill.others_fee,
                        bill.credit,
                        bill.total,
                        bill.remained,
                    ],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error) => reject(error)
                );
            },
            null,
            forceUpdate);
    });
};

export const updateBill = (bill, forceUpdate = null) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE bills SET
                        room_id = ?,
                        rental_fee = ?,
                        new_electricity_number = ?,
                        old_electricity_number = ?,
                        electricity_fee = ?,
                        new_water_number = ?,
                        old_water_number = ?,
                        water_fee = ?,
                        garbage_fee = ?,
                        internet_fee = ?,
                        bill_amount = ?,
                        others_fee = ?,
                        credit = ?,
                        total = ?,
                        status = ?,
                        paid_time = ?,
                        remained = ?
                    WHERE id = ?;`,
                    [
                        bill.room_id,
                        bill.rental_fee,
                        bill.new_electricity_number,
                        bill.old_electricity_number,
                        bill.electricity_fee,
                        bill.new_water_number,
                        bill.old_water_number,
                        bill.water_fee,
                        bill.garbage_fee,
                        bill.internet_fee,
                        bill.bill_amount,
                        bill.others_fee,
                        bill.credit,
                        bill.total,
                        bill.status,
                        bill.paid_time,
                        bill.remained,
                        bill.id,
                    ],
                    (_, { rows: { _array } }) => {
                        resolve(_array);
                    },
                    (_, error) => reject(error)
                );
            },
            null,
            forceUpdate);
    });
};

export const deleteBill = async (bill_id, forceUpdate = null) => {
    const billDetails = await fetchBillDetails(bill_id);
    if (billDetails.status === 'Chưa thanh toán') {
        Alert.alert('❗ Hủy hóa đơn', 'Hóa đơn này chưa thanh toán xong. Trạng thái phòng sẽ được khôi phục lại trước khi lập hóa đơn này. Bạn có muốn tiếp tục?',
            [
                {
                    text: 'Quay lại',
                    style: 'cancel',
                },
                {
                    text: 'Tiếp tục',
                    onPress: () => {
                        const newWaterNumber = billDetails.old_water_number;
                        const newElectricityNumber = billDetails.old_electricity_number;

                        return new Promise((resolve, reject) => {
                            db.transaction(
                                (tx) => {
                                    tx.executeSql(
                                        `DELETE FROM bills WHERE id = ?;`,
                                        [bill_id],
                                        (_, { rows: { _array } }) => {
                                            resolve(_array);
                                        },
                                        (_, error) => reject(error)
                                    );
                                },
                                null,
                                () => {
                                    updateRoomWaterElectricityNumber(billDetails.room_id, newWaterNumber, newElectricityNumber, forceUpdate);
                                });
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    }
    else {
        Alert.alert('❗ Xóa hóa đơn', 'Hóa đơn này đã thanh toán xong. Bạn có muốn tiếp tục xóa?',
            [
                {
                    text: 'Quay lại',
                    style: 'cancel',
                },
                {
                    text: 'Tiếp tục',
                    onPress: () => {

                        return new Promise((resolve, reject) => {
                            db.transaction(
                                (tx) => {
                                    tx.executeSql(
                                        `DELETE FROM bills WHERE id = ?;`,
                                        [bill_id],
                                        (_, { rows: { _array } }) => {
                                            resolve(_array);
                                        },
                                        (_, error) => reject(error)
                                    );
                                },
                                null,
                                forceUpdate);
                        });
                    }
                },
            ],
            { cancelable: true }
        );
    };
};


