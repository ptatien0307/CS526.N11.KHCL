'use strict';

import {
	createCustomersTable,
	populateCustomersTable,
} from './tables/customersTable';
import { createRoomsTable, populateRoomsTable } from './tables/roomsTable';
import { createBillsTable, populateBillsTable } from './tables/billsTable';
import { createServicePricesTable } from './tables/servicePricesTable';
import { populateServicePricesTable } from './tables/servicePricesTable';
import { createNotesTable, populateNotesTable } from './tables/notesTable';
import { createHouseInfoTable, populateHouseInfoTable } from './tables/houseInfoTable';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

const createTables = () => {
	db.transaction((tx) => {
		tx.executeSql(
			createCustomersTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			createRoomsTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			createBillsTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			createServicePricesTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			createNotesTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			createHouseInfoTable,
			[],
			() => { },
			(_, error) => { }
		);
	});
};

const populateTables = () => {
	db.transaction((tx) => {
		tx.executeSql(
			populateRoomsTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			populateCustomersTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			populateBillsTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			populateNotesTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			populateServicePricesTable,
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			populateHouseInfoTable,
			[],
			() => { },
			(_, error) => { }
		);
	});
};

export const createDatabase = () => {
	createTables();
	populateTables();
};

export const deleteDatabase = () => {
	db.transaction((tx) => {
		tx.executeSql(
			'DROP TABLE IF EXISTS rooms;',
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			'DROP TABLE IF EXISTS customers;',
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			'DROP TABLE IF EXISTS bills;',
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			'DROP TABLE IF EXISTS service_prices;',
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			'DROP TABLE IF EXISTS notes;',
			[],
			() => { },
			(_, error) => { }
		);
		tx.executeSql(
			'DROP TABLE IF EXISTS house_info;',
			[],
			() => { },
			(_, error) => { }
		);
	});
};

export const enableAutoVacuum = () => {
	db.exec(
		[{ sql: 'PRAGMA auto_vacuum = 1;', args: [] }],
		false,
		() => { }
	);
};

export const vacuum = () => {
	db.exec([{ sql: 'VACUUM;', args: [] }], false, () => { });
};

export const enableForeignKeys = () => {
	db.exec(
		[{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
		false,
		() => { }
	);
};