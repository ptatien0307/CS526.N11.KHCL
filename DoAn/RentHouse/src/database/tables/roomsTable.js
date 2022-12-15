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

export const populateRoomsTable = `
    INSERT OR REPLACE INTO rooms (id, name,rental_fee,move_in_date,old_electricity_number,old_water_number,using_internet,using_garbage)
    VALUES
        (1,"Phòng 1",731,"11/02/2023",1882,1180,1,1),
        (2,"Phòng 2",947,"07/06/2022",1850,1469,0,0),
        (3,"Phòng 3",731,"23/12/2021",1798,1157,0,0),
        (4,"Phòng 4",878,"15/03/2022",1271,1203,1,1),
        (5,"Phòng 5",748,"07/07/2023",1496,1828,1,1);
`;