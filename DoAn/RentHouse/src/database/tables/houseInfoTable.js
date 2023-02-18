`use strict`;

export const createHouseInfoTable = `
    CREATE TABLE IF NOT EXISTS house_info (
        id           INTEGER PRIMARY KEY,
        name         TEXT    DEFAULT 'Chưa đặt tên',
        phone_number TEXT,
        address      TEXT
    );
`;

export const populateHouseInfoTable = `
    INSERT OR REPLACE INTO house_info (id)
    VALUES (1);
`;
