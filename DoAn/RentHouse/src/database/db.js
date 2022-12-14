"use strict";

import { openDatabase } from "expo-sqlite";
import { createCustomersTable } from "./tables/customersTable";
import { createRoomsTable } from "./tables/roomsTable";
import { createBillsTable } from "./tables/billsTable";
import { createServicePricesTable } from "./tables/servicePricesTable";

const dbName = "renthouse.db";

const db = openDatabase(dbName);

const createTables = () => {
	db.transaction((tx) => {
		tx.executeSql(createCustomersTable);
		tx.executeSql(createRoomsTable);
		tx.executeSql(createBillsTable);
		tx.executeSql(createServicePricesTable);
	});
};

export const createDatabase = () => {
	createTables();
};
