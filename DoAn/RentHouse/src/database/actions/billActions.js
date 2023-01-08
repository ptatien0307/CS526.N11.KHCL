`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchBillList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                SELECT  bills.*,
                        rooms.name as room_name
                FROM 
                    bills
                    INNER JOIN
                    rooms ON rooms.id = bills.room_id    
                `,
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
                `
                SELECT  bills.*,
                        rooms.name  as room_name
                FROM 
                    bills
                    INNER JOIN
                    rooms ON rooms.id = bills.room_id
                WHERE bills.id = ?
                `,
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
                        rental_fee,
                        number_of_months,
                        number_of_days,
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
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        bill.room_id,
                        bill.created_at,
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
                        bill.created_at,
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


