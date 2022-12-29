`use strict`;

import { openDatabase } from "expo-sqlite";

const db = openDatabase("renthouse.db");

export const insertCustomer = (customer, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO customers (
                        name,
                        birthday,
                        gender,
                        address,
                        citizen_id,
                        citizen_id_date,
                        citizen_id_place,
                        job,
                        phone,
                        temporary_residence,
                        room_id
                    )
                    VALUES (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    );`,
                    [
                        customer.name,
                        customer.birthday,
                        customer.gender,
                        customer.address,
                        customer.citizen_id,
                        customer.citizen_id_date,
                        customer.citizen_id_place,
                        customer.job,
                        customer.phone,
                        customer.temporary_residence,
                        customer.room_id,
                    ],
                    (_, result) => {
                        console.log("Customer inserted successfully");
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

export const updateCustomer = (customer, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE customers
                        SET name = ?,
                            birthday = ?,
                            gender = ?,
                            address = ?,
                            citizen_id = ?,
                            citizen_id_date = ?,
                            citizen_id_place = ?,
                            job = ?,
                            phone = ?,
                            temporary_residence = ?,
                            room_id = ?
                        WHERE id = ?;`,
                    [
                        customer.name,
                        customer.birthday,
                        customer.gender,
                        customer.address,
                        customer.citizen_id,
                        customer.citizen_id_date,
                        customer.citizen_id_place,
                        customer.job,
                        customer.phone,
                        customer.temporary_residence,
                        customer.room_id,
                        customer.id,
                    ],
                    (_, result) => {
                        console.log("Customer updated successfully");
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

export const deleteCustomer = (customer_id, forceUpdate) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `DELETE FROM customers WHERE id = ?;`,
                    [customer_id],
                    (_, result) => {
                        console.log("Customer deleted successfully");
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

export const fetchCustomerDetails = (customer_id) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT * FROM customers;
                    WHERE id = ?;`,
                    [customer_id],
                    (_, { rows: { _array: result } }) => {
                        console.log("Customer updated successfully");
                        resolve(result);
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            }
        );
    });
};
