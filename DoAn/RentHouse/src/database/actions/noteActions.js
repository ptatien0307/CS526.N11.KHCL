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
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const fetchNoteContent = (note_id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT content FROM notes WHERE id = ?',
				[note_id],
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

export const insertNote = (content, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'INSERT INTO notes (content) VALUES (?)',
					[content],
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
};

export const updateNote = ({ id, content }, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'UPDATE notes SET content = ? WHERE id = ?',
					[content, id],
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
};

export const deleteNote = (id, forceUpdate) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'DELETE FROM notes WHERE id = ?',
					[id],
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
};
