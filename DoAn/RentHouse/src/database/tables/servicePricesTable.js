`use strict`;

export const createServicePricesTable = `
    CREATE TABLE IF NOT EXISTS service_prices (
        id            INTEGER PRIMARY KEY,
        service_name  TEXT    NOT NULL,
        service_price INTEGER NOT NULL,
        service_unit  TEXT    NOT NULL
    );
`;
