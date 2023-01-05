`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchBillList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM bills',
                [],
                (_, { rows: { _array } }) => {
                    console.log('Bill list fetched successfully');
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
                'SELECT * FROM bills WHERE id = ?',
                [bill_id],
                (_, { rows: { _array } }) => {
                    console.log('Bill fetched successfully');
                    resolve(_array[0]);
                },
                (_, error) => reject(error)
            );
        });
    });
};

export const fetchBillListByRoom = (room_id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM bills WHERE room_id = ?',
                [room_id],
                (_, { rows: { _array } }) => {
                    console.log('Bill list fetched successfully');
                    resolve(_array);
                },
                (_, error) => reject(error)
            );
        });
    });
};

export const insertBill = (bill, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO bills (
                        room_id,
                        created_at,
                        room_price,
                        present_electricity_number,
                        previous_electricity_number,
                        present_water_number,
                        previous_water_number,
                        garbage_fee,
                        internet_fee,
                        bill_amount,
                        others_fee,
                        credit,
                        total,
                        status,
                        paid_time,
                        remained
                    )
                    Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        bill.room_id,
                        bill.created_at,
                        bill.room_price,
                        bill.present_electricity_number,
                        bill.previous_electricity_number,
                        bill.present_water_number,
                        bill.previous_water_number,
                        bill.garbage_fee,
                        bill.internet_fee,
                        bill.bill_amount,
                        bill.others_fee,
                        bill.credit,
                        bill.total,
                        bill.status,
                        bill.paid_time,
                        bill.remained,
                    ],
                    (_, { rows: { _array } }) => {
                        console.log('Bill inserted successfully');
                        resolve(_array);
                    },
                    (_, error) => reject(error)
                );
            },
            null,
            forceUpdate);
    });
};

export const updateBill = (bill, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE bills SET
                        room_id = ?,
                        created_at = ?,
                        room_price = ?,
                        present_electricity_number = ?,
                        previous_electricity_number = ?,
                        present_water_number = ?,
                        previous_water_number = ?,
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
                        bill.created_at,
                        bill.room_price,
                        bill.present_electricity_number,
                        bill.previous_electricity_number,
                        bill.present_water_number,
                        bill.previous_water_number,
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
                        console.log('Bill updated successfully');
                        resolve(_array);
                    },
                    (_, error) => reject(error)
                );
            },
            null,
            forceUpdate);
    });
};

export const deleteBill = (bill_id, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'DELETE FROM bills WHERE id = ?;',
                    [bill_id],
                    (_, { rows: { _array } }) => {
                        console.log('Bill deleted successfully');
                        resolve(_array);
                    },
                    (_, error) => reject(error)
                );
            },
            null,
            forceUpdate);
    });
};


