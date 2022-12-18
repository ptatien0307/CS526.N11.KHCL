`use strict`;

import { openDatabase } from "expo-sqlite";
import { Room } from "../models/room";

const db = openDatabase("renthouse.db");

export const fetchRoomStatus = (room_id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT COUNT(id) FROM customers WHERE id = ?`,
                [room_id],
                (_, { rows: { _array } }) => {
                    resolve(_array[0]["COUNT(id)"] ? `${_array[0]["COUNT(id)"]} người` : `Còn trống`);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export const fetchRoomList = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM rooms WHERE id = ?",
                [1],
                (_, { rows: _array }) => {
                    const rooms = [];
                    for (let i = 0; i < _array.length; i++) {
                        console.log(_array[i]);
                        rooms.push(new Room(_array[i]));
                    }
                    resolve(rooms);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};