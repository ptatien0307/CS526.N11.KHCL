`use strict`;
import { openDatabase } from `expo-sqlite`;

const dbName = `renthouse.db`;

const db = openDatabase(dbName);

