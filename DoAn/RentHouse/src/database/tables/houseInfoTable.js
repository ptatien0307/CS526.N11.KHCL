`use strict`;

export const createHouseInfoTable = `
    CREATE TABLE IF NOT EXISTS house_info (
        id      INTEGER PRIMARY KEY default 1,
        name TEXT default 'Trọ của tôi',
        phone_number TEXT,
        address TEXT
    );
`;

