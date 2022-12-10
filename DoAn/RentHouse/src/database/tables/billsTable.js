`use strict`;

export const createBillsTable = `
    CREATE TABLE IF NOT EXISTS bills (
        bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
        bill_date INTEGER NOT NULL,
        bill_amount INTEGER NOT NULL,
        electricity INTEGER NOT NULL,
        water INTEGER NOT NULL,
        internet INTEGER NOT NULL,
        garbage INTEGER NOT NULL,
        room_id INTEGER NOT NULL,
        FOREIGN KEY (room_id) REFERENCES rooms(room_id)
    );
`;