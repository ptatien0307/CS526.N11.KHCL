`use strict`;

export const createBillsTable = `
    CREATE TABLE IF NOT EXISTS bills (
        id                     INTEGER PRIMARY KEY,
        room_id                INTEGER NOT NULL,
        created_at             TEXT    NOT NULL DEFAULT (CURRENT_TIMESTAMP),
        number_of_months       INTEGER NOT NULL,
        number_of_days         INTEGER NOT NULL,
        rental_fee             INTEGER NOT NULL,
        new_electricity_number INTEGER NOT NULL,
        old_electricity_number INTEGER NOT NULL,
        electricity_fee        INTEGER NOT NULL,
        new_water_number       INTEGER NOT NULL,
        old_water_number       INTEGER NOT NULL,
        water_fee              INTEGER NOT NULL,
        garbage_fee            INTEGER NOT NULL,
        internet_fee           INTEGER NOT NULL,
        bill_amount            INTEGER NOT NULL,
        others_fee             INTEGER NOT NULL,
        credit                 INTEGER NOT NULL,
        total                  INTEGER NOT NULL,
        status                 TEXT    NOT NULL DEFAULT ('Chưa thanh toán'),
        paid_time              INTEGER NOT NULL DEFAULT (0),
        remained               INTEGER NOT NULL,
        FOREIGN KEY (
            room_id
        )
        REFERENCES rooms (id) ON UPDATE CASCADE
                            ON DELETE CASCADE
    );
`;

export const populateBillsTable = `
    INSERT OR REPLACE INTO bills (
                                    id,
                                    room_id,
                                    created_at,
                                    number_of_months,
                                    number_of_days,
                                    rental_fee,
                                    new_electricity_number,
                                    old_electricity_number,
                                    electricity_fee,
                                    new_water_number,
                                    old_water_number,
                                    water_fee,
                                    garbage_fee,
                                    internet_fee,
                                    bill_amount,
                                    others_fee,
                                    credit,
                                    total,
                                    remained
                                )
    VALUES
    (1, 2, '2022-05-05 00:00:00', 0, 6,950000,1861,1758,3000,1997,1735,3000, 30000,129000,1341002,283000,230000,1394002,1394002),
    (2, 5, '2022-06-05 00:00:00', 1, 13,950000,1916,1631,3000,1995,1768,3000, 30000,121000,2763671,66000,385000,2444671,2444671),
    (3, 1, '2022-05-01 00:00:00', 0, 1,950000,1890,1615,3000,1832,1665,3000, 30000,169000,1281667,466000,167000,1580667,1580667),
    (4, 3, '2022-01-12 00:00:00', 0, 4,950000,1921,1727,3000,1902,1629,3000, 30000,184000,1547668,218000,293000,1472668,1472668),
    (5, 1, '2022-04-06 00:00:00', 0, 13,950000,1921,1779,3000,1890,1608,3000, 30000,121000,1692671,222000,349000,1565671,1565671),
    (6, 2, '2022-05-08 00:00:00', 1, 5,950000,1919,1681,3000,1826,1637,3000, 30000,176000,2357335,28000,200000,2185335,2185335),
    (7, 4, '2022-02-01 00:00:00', 1, 1,950000,1803,1734,3000,1939,1731,3000, 30000,183000,1956667,134000,232000,1858667,1858667),
    (8, 5, '2022-04-06 00:00:00', 1, 8,950000,1842,1610,3000,1844,1706,3000, 30000,152000,2263336,346000,122000,2487336,2487336),
    (9, 3, '2022-02-04 00:00:00', 0, 1,950000,1817,1790,3000,1889,1638,3000, 30000,140000,1008667,345000,203000,1150667,1150667),
    (10, 2, '2022-12-12 00:00:00', 0, 9,950000,1806,1664,3000,1909,1794,3000, 30000,164000,1108003,365000,465000,1008003,1008003),
    (11, 5, '2022-07-11 00:00:00', 0, 5,950000,1927,1607,3000,1935,1786,3000, 30000,177000,1452335,285000,313000,1424335,1424335),
    (12, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (13, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (14, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (15, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (16, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (17, 1, '2022-01-07 00:00:00', 1, 8,950000,1983,1663,3000,1873,1743,3000, 30000,117000,2380336,439000,412000,2407336,2407336),
    (18, 2, '2022-10-09 00:00:00', 0, 5,950000,1832,1709,3000,1926,1736,3000, 30000,187000,1191335,333000,197000,1327335,1327335);
`;
