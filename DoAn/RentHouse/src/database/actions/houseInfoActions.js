`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchHouseInfo = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM house_info WHERE id = 1',
                [],
                (_, { rows: { _array: result } }) => {
                    resolve(result[0]);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const updateHouseInfo = (houseInfo, forceUpdate = null) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'UPDATE house_info SET name = ?, address = ?, phone_number = ?',
                    [houseInfo.name, houseInfo.address, houseInfo.phone_number],
                    (_, result) => {
                        resolve(result);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            },
            null,
            forceUpdate
        );
    });
}



