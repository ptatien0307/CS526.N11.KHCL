`use strict`;

export const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS rooms (
        id                     INTEGER PRIMARY KEY,
        name                   TEXT    NOT NULL,
        settlement_date        INTEGER,
        rental_fee             INTEGER NOT NULL,
        deposit                INTEGER,
        move_in_date           INTEGER,
        old_electricity_number INTEGER NOT NULL,
        old_water_number       INTEGER NOT NULL,
        using_internet         INTEGER NOT NULL DEFAULT 0,
        using_garbage          INTEGER NOT NULL DEFAULT 1,
        status                 TEXT    NOT NULL DEFAULT ('Còn trống') 
    );
`;
