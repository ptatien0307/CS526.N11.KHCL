"use strict";

import { createCustomersTable, populateCustomersTable } from "./tables/customersTable";
import { createRoomsTable, populateRoomsTable } from "./tables/roomsTable";
import { createBillsTable } from "./tables/billsTable";
import { createServicePricesTable } from "./tables/servicePricesTable";


const createTables = (db) => {
	db.transaction((tx) => {
		tx.executeSql(createCustomersTable);
		tx.executeSql(createRoomsTable);
		tx.executeSql(createBillsTable);
		tx.executeSql(createServicePricesTable);
	});
};

const populateTables = (db) => {
	db.transaction((tx) => {
		tx.executeSql(populateRoomsTable);
		tx.executeSql(populateCustomersTable);
	});
};

export const createDatabase = (db) => {
	createTables(db);
	populateTables(db);
};

export const deleteDatabase = (db) => {
	db.transaction(tx => {
		tx.executeSql('DROP TABLE rooms');
		tx.executeSql('DROP TABLE customers');
		tx.executeSql('DROP TABLE bills');
		tx.executeSql('DROP TABLE service_prices');
	});
};
