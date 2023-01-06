`use strict`;

export const createBillsTable = `
    CREATE TABLE IF NOT EXISTS bills (
        id                          INTEGER PRIMARY KEY,
        room_id                     INTEGER NOT NULL,
        created_at                  TEXT    NOT NULL,
        number_of_months            INTEGER NOT NULL,
        number_of_days              INTEGER NOT NULL,
        rental_fee                  INTEGER NOT NULL,
        new_electricity_number      INTEGER NOT NULL,
        old_electricity_number      INTEGER NOT NULL,
        new_water_number            INTEGER NOT NULL,
        old_water_number            INTEGER NOT NULL,
        garbage_fee                 INTEGER NOT NULL,
        internet_fee                INTEGER NOT NULL,
        bill_amount                 INTEGER NOT NULL,
        others_fee                  INTEGER NOT NULL,
        credit                      INTEGER NOT NULL,
        total                       INTEGER NOT NULL,
        status                      TEXT    NOT NULL DEFAULT ('Chưa thanh toán'),
        paid_time                   INTEGER NOT NULL DEFAULT (0),
        remained                    INTEGER NOT NULL,
        FOREIGN KEY (
            room_id
        )
        REFERENCES rooms (id) 
    );
`;
