`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchNoteList = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT id, content FROM notes',
				[],
				(_, { rows: { _array: result } }) => {
					console.log('Note list fetched successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const insertNote = (content) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO notes (content) VALUES (?)',
				[content],
				(_, result) => {
					console.log('Note inserted successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const updateNote = ({ id, content }) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'UPDATE notes SET content = ? WHERE id = ?',
				[content, id],
				(_, result) => {
					console.log('Note updated successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const deleteNote = (id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'DELETE FROM notes WHERE id = ?',
				[id],
				(_, result) => {
					console.log('Note deleted successfully');
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};
