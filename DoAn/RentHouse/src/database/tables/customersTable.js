`use strict`;

export const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
        id                  INTEGER PRIMARY KEY,
        name                TEXT    NOT NULL,
        birthday            TEXT    NOT NULL,
        gender              INTEGER NOT NULL,
        address             TEXT    NOT NULL,
        citizen_id          TEXT,
        citizen_id_date     TEXT,
        citizen_id_place    TEXT,
        job                 TEXT,
        phone               TEXT,
        temporary_residence INTEGER,
        room_id             INTEGER NOT NULL,
        FOREIGN KEY (
            room_id
        )
        REFERENCES rooms (id) 
    );
`;