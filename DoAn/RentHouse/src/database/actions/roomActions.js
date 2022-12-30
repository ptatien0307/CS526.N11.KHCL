`use strict`;

import { openDatabase } from "expo-sqlite";

const db = openDatabase("renthouse.db");

export const fetchRoomList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT id, name, status FROM rooms",
                [],
                (_, { rows: { _array: result } }) => {
                    console.log("Room list fetched successfully");
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
                "SELECT * FROM rooms WHERE id = ?",
                [room_id],
                (_, { rows: { _array: result } }) => {
                    console.log("Room fetched successfully");
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
                    `INSERT INTO rooms (name, rental_fee, using_internet, using_garbage, old_electricity_number, old_water_number)
                    VALUES(?, ?, ?, ?, ?, ?)`,
                    [room.name, room.rental_fee, room.using_internet, room.using_garbage, room.old_electricity_number, room.old_water_number],
                    (_, result) => {
                        console.log("Room inserted successfully");
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

export const updateRoom = (room, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE rooms
                    SET name = ?, rental_fee = ?, using_internet = ?, using_garbage = ?, old_electricity_number = ?, old_water_number = ?
                    WHERE id = ?`,
                    [room.name, room.rental_fee, room.using_internet, room.using_garbage, room.old_electricity_number, room.old_water_number, room.id],
                    (_, result) => {
                        console.log("Room updated successfully");
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

export const deleteRoom = (room_id, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "DELETE FROM rooms WHERE id = ?",
                    [room_id],
                    (_, result) => {
                        console.log("Room deleted successfully");
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

