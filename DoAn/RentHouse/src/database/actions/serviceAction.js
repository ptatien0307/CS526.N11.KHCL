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
					console.log('Service list fetched successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const updateServicePrice = (service_id, service_price) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'UPDATE service_prices SET price = ? WHERE id = ?',
				[service_price, service_id],
				(_, result) => {
					console.log('Service updated successfully');
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
					console.log('Service fetched successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};
