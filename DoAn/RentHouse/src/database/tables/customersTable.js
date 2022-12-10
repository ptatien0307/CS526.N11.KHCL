export const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
        customerID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        birthday TEXT NOT NULL,
        gender INTEGER NOT NULL,
        address TEXT NOT NULL,
        citizen_id TEXT NOT NULL,
        citizen_id_date TEXT NOT NULL,
        citizen_id_place TEXT NOT NULL,
        job TEXT NOT NULL,
        phone TEXT NOT NULL,
        temporary_residence TEXT NOT NULL,
        UNIQUE (citizen_id)
    );
`;