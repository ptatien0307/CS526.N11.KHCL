`use strict`;

export const createServicePricesTable = `
    CREATE TABLE IF NOT EXISTS service_prices (
        id            INTEGER PRIMARY KEY,
        name  TEXT    NOT NULL,
        price INTEGER NOT NULL,
        unit  TEXT    NOT NULL
    );
`;

export const populateServicePricesTable = `
    INSERT OR REPLACE INTO service_prices (id, name, price, unit)
    VALUES 
        (1, 'Internet', 100000, 'VND/tháng'),
        (2, 'Rác', 50000, 'VND/tháng'),
        (3, 'Điện', 2000, 'VND/kWh'),
        (4, 'Nước', 10000, 'VND/m3'),
        (5, 'Phòng', 950000, 'VND/Phòng');
`;
