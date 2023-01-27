`use strict`;

export const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS rooms (
        id                     INTEGER PRIMARY KEY,
        name                   TEXT    NOT NULL,
        settlement_date        INTEGER,
        rental_fee             INTEGER NOT NULL,
        deposit                INTEGER,
        move_in_date           TEXT,
        old_electricity_number INTEGER NOT NULL,
        old_water_number       INTEGER NOT NULL,
    );
`;

export const populateRoomsTable = `
    INSERT OR REPLACE INTO rooms (id, name,rental_fee,move_in_date,old_electricity_number,old_water_number)
    VALUES
        (1,"Phòng 1",731000,"11/02/2023",1882,1180),
        (2,"Phòng 2",947000,"07/06/2022",1850,1469),
        (3,"Phòng 3",731000,"23/12/2021",1798,1157),
        (4,"Phòng 4",878000,"15/03/2022",1271,1203),
        (5,"Phòng 5",748000,"07/07/2023",1496,1828);
`;
