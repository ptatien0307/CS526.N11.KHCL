`use strict`;

import { openDatabase } from 'expo-sqlite';

const db = openDatabase('renthouse.db');

export const fetchRoomList = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
				SELECT id,
						name,
						CASE 
							WHEN soluong > 0 
								THEN soluong || ' người' 
								ELSE 'Còn trống' 
						END AS status
				FROM (
						SELECT count(customers.id) AS soluong,
								rooms.id,
								rooms.name
							FROM rooms
								LEFT JOIN
								customers ON rooms.id = customers.room_id
							GROUP BY rooms.id
					) AS result
				ORDER BY name ASC;
				`,
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

export const fetchRoomListForCreateBill = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`
				SELECT a.id,
						a.name,
						count(bills.id) AS bills_count
				FROM (
						SELECT count(customers.id) AS members_count,
								rooms.id,
								rooms.name
						FROM rooms
							LEFT JOIN customers ON rooms.id = customers.room_id
						GROUP BY rooms.id
						HAVING members_count > 0
					)
					AS a
						LEFT JOIN bills ON a.id = bills.room_id AND 
										strftime('%m-%Y', bills.created_at, 'localtime') = strftime('%m-%Y', 'now', 'localtime')
				GROUP BY a.id
				ORDER BY a.name ASC;
				`,
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


export const fetchRoomDetails = (room_id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT id,
        				name,
        				rental_fee,
						deposit,
						move_in_date,
						old_electricity_number,
						old_water_number
				FROM rooms WHERE id = ?`,
				[room_id],
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

export const insertRoom = (room, forceUpdate) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`
					INSERT INTO rooms (
						name,
						rental_fee,
						old_electricity_number,
						old_water_number
                  	)
                    VALUES(?, ?, ?, ?)
					`,
					[
						room.name,
						room.rental_fee,
						room.old_electricity_number,
						room.old_water_number,
					],
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

export const updateRoom = (room, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`UPDATE rooms
					SET name = ?,
						deposit = ?,
						rental_fee = ?,
						move_in_date = ?,
						old_electricity_number = ?,
						old_water_number = ?
					WHERE id = ?;`,
					[
						room.name,
						room.deposit,
						room.rental_fee,
						room.move_in_date,
						room.old_electricity_number,
						room.old_water_number,
						room.id,
					],
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

export const updateRoomWaterElectricityNumber = (room_id, water_number, electricity_number, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					`UPDATE rooms
					SET old_water_number = ?,
						old_electricity_number = ?
					WHERE id = ?;`,
					[
						water_number,
						electricity_number,
						room_id,
					],
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

export const deleteRoom = (room_id, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'DELETE FROM rooms WHERE id = ?',
					[room_id],
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

export const fetchRoomMemberList = (room_id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT id,
						name
				FROM customers
				WHERE room_id = ?
				ORDER BY name ASC
				`,
				[room_id],
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

export const fetchRoomBillList = (room_id) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`                
				SELECT  id,
                        strftime('%d/%m/%Y %H:%M:%S', created_at, 'localtime') AS created_at,
                        total,
                        remained
                FROM bills
                WHERE room_id = ?
                ORDER BY strftime('%m-%Y', created_at, 'localtime') DESC;
				`,
				[room_id],
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

export const resetRoom = (room_id, forceUpdate = null) => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'PRAGMA foreign_key = ON;',
					[],
					() => { },
					(_, error) => { }
				);
				tx.executeSql(
					`
					CREATE TABLE temp_table AS SELECT *
					FROM rooms
					WHERE id = ?;
					`,
					[room_id],
					() => { },
					(_, error) => { }
				);
				tx.executeSql(
					'DELETE FROM rooms WHERE id = ?;',
					[room_id],
					() => { },
					(_, error) => { }
				);
				tx.executeSql(
					`INSERT INTO rooms (
										id,
										name,
										rental_fee,
										old_electricity_number,
										old_water_number
									)
									SELECT id,
											name,
											rental_fee,
											old_electricity_number,
											old_water_number
									FROM temp_table;
					`,
					[],
					() => { },
					(_, error) => { }
				);
				tx.executeSql(
					'DROP TABLE temp_table;',
					[],
					() => { },
					(_, error) => { }
				);
			},
			null,
			forceUpdate
		);
	});
};