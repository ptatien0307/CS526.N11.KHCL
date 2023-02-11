`use strict`;

export const createHouseInfoTable = `
    CREATE TABLE IF NOT EXISTS house_info (
        id           INTEGER PRIMARY KEY,
        name         TEXT    DEFAULT 'Trọ của tôi',
        phone_number TEXT,
        address      TEXT
    );
`;

export const populateHouseInfoTable = `
    INSERT OR REPLACE INTO house_info (id, name, phone_number, address)
    VALUES (1, 'Chưa đặt tên', '0123456789', 'Địa chỉ trọ');
`;
