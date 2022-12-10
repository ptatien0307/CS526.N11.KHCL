`use strict`;

export const createBillsTable = `
    CREATE TABLE IF NOT EXISTS bills (
        id                          INTEGER PRIMARY KEY,
        room_id                     INTEGER NOT NULL,
        created_at                  TEXT    NOT NULL,
        room_price                  INTEGER NOT NULL,
        present_electricity_number  INTEGER NOT NULL,
        previous_electricity_number INTEGER NOT NULL,
        present_water_number        INTEGER NOT NULL,
        previous_water_number       INTEGER NOT NULL,
        garbage_fee                 INTEGER NOT NULL,
        internet_fee                INTEGER NOT NULL,
        bill_amount                 INTEGER NOT NULL,
        others_fee                  INTEGER NOT NULL,
        credit                      INTEGER NOT NULL,
        total                       INTEGER NOT NULL,
        status                      TEXT    NOT NULL DEFAULT ('Chưa thanh toán'),
        paid_time                   INTEGER NOT NULL DEFAULT (0),
        FOREIGN KEY (
            room_id
        )
        REFERENCES rooms (id) 
    );
`;

