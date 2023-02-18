`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchServiceList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM service_prices',
                [],
                (_, { rows: { _array: result } }) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const updateServicePrice = (service_name, service_price) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE service_prices SET price = ? WHERE name = ?',
                [service_price, service_name],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const fetchServiceDetails = (service_name) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM service_prices WHERE name = ?',
                [service_name],
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
