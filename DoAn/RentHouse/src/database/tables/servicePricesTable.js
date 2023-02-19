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
    INSERT OR IGNORE INTO service_prices (id, name, price, unit)
    VALUES 
        (1, 'Rác', 50000, '₫/tháng'),
        (2, 'Điện', 2000, '₫/kWh'),
        (3, 'Nước', 10000, '₫/khối'),
        (4, 'Phòng', 950000, '₫/Phòng');
`;
