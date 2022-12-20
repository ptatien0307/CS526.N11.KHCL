`use strict`;

import { openDatabase } from "expo-sqlite";

const db = openDatabase("renthouse.db");

export const fetchRoomStatus = (room_id) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT COUNT(*) FROM customers WHERE room_id = ?`,
                    [room_id],
                    (_, { rows: { _array: result } }) => {
                        console.log("Room's status fetched successfully");
                        console.log(result["COUNT(id)"]);
                        resolve(result["COUNT(id)"] ? `${result["COUNT(id)"]} người` : `Còn trống`);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            }
        );
    });
};

export const fetchRoomList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM rooms WHERE id",
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