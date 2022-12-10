export const createRoomsTable = `
    CREATE TABLE IF NOT EXISTS rooms (
        room_id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_number TEXT NOT NULL,
        settlement_date INTEGER NOT NULL,
        rental_fee INTEGER NOT NULL,
        deposit INTEGER NOT NULL,
        move_in_date INTEGER NOT NULL,
        
        electricity_number INTEGER NOT NULL,
        water_number INTEGER NOT NULL,
        internet_number INTEGER NOT NULL,
        garbage INTEGER NOT NULL,

        customer_id INTEGER NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    )
`;