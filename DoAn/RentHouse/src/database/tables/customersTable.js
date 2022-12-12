`use strict`;

export const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
        customerID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        birthday TEXT NOT NULL,
        gender INTEGER NOT NULL,
        address TEXT NOT NULL,
        citizen_id TEXT,
        citizen_id_date TEXT,
        citizen_id_place TEXT,
        job TEXT,
        phone TEXT,
        temporary_residence INTEGER,
        UNIQUE (citizen_id)
    );
`;