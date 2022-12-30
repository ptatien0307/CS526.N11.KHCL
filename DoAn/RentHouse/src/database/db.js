"use strict";

import { createCustomersTable, populateCustomersTable } from "./tables/customersTable";
import { createRoomsTable, populateRoomsTable } from "./tables/roomsTable";
import { createBillsTable } from "./tables/billsTable";
import { createServicePricesTable } from "./tables/servicePricesTable";
import { populateServicePricesTable } from "./tables/servicePricesTable";
import { createNotesTable, populateNotesTable } from "./tables/notesTable";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("renthouse.db");

const createTables = () => {
	db.transaction((tx) => {
		tx.executeSql(createCustomersTable, [], () => console.log("Created customers table"), (_, error) => console.log(error));
		tx.executeSql(createRoomsTable, [], () => console.log("Created rooms table"), (_, error) => console.log(error));
		tx.executeSql(createBillsTable, [], () => console.log("Created bills table"), (_, error) => console.log(error));
		tx.executeSql(createServicePricesTable, [], () => console.log("Created service prices table"), (_, error) => console.log(error));
		tx.executeSql(createNotesTable, [], () => console.log("Created notes table"), (_, error) => console.log(error));
	});
};

const populateTables = () => {
	db.transaction((tx) => {
		tx.executeSql(populateRoomsTable, [], () => console.log("Populated rooms table"), (_, error) => console.log(error));
		tx.executeSql(populateCustomersTable, [], () => console.log("Populated customers table"), (_, error) => console.log(error));
		tx.executeSql(populateServicePricesTable, [], () => console.log("Populated service prices table"), (_, error) => console.log(error));
		tx.executeSql(populateNotesTable, [], () => console.log("Populated notes table"), (_, error) => console.log(error));
	});
};

export const createDatabase = () => {
	createTables();
	populateTables();
};

export const deleteDatabase = () => {
	db.transaction((tx) => {
		tx.executeSql('DROP TABLE  IF EXISTS rooms', [], () => console.log("Deleted rooms table"), (_, error) => console.log(error));
		tx.executeSql('DROP TABLE IF EXISTS customers', [], () => console.log("Deleted customers table"), (_, error) => console.log(error));
		tx.executeSql('DROP TABLE IF EXISTS bills', [], () => console.log("Deleted bills table"), (_, error) => console.log(error));
		tx.executeSql('DROP TABLE IF EXISTS service_prices', [], () => console.log("Deleted service prices table"), (_, error) => console.log(error));
	});
};
