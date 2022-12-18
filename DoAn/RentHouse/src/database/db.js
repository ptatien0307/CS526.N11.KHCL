"use strict";

import { createCustomersTable, populateCustomersTable } from "./tables/customersTable";
import { createRoomsTable, populateRoomsTable } from "./tables/roomsTable";
import { createBillsTable } from "./tables/billsTable";
import { createServicePricesTable } from "./tables/servicePricesTable";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("renthouse.db");

const createTables = () => {
	db.transaction((tx) => {
		tx.executeSql(createCustomersTable);
		tx.executeSql(createRoomsTable);
		tx.executeSql(createBillsTable);
		tx.executeSql(createServicePricesTable);
	});
};

const populateTables = () => {
	db.transaction((tx) => {
		tx.executeSql(populateRoomsTable);
		tx.executeSql(populateCustomersTable);
	});
};

export const createDatabase = () => {
	createTables();
	populateTables();
};

export const deleteDatabase = () => {
	db.transaction((tx) => {
		tx.executeSql('DROP TABLE rooms');
		tx.executeSql('DROP TABLE customers');
		tx.executeSql('DROP TABLE bills');
		tx.executeSql('DROP TABLE service_prices');
	});
};
