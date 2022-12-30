`use strict`;

export const createNotesTable = `
    CREATE TABLE IF NOT EXISTS notes (
    id      INTEGER PRIMARY KEY,
    content TEXT    NOT NULL
)`;

export const populateNotesTable = `
    INSERT OR REPLACE INTO notes (id, content)
    VALUES
        (1, 'Thu tiền phòng 3'),
        (2, 'Ăn cưới phòng 4'),
        (3, 'Giảm tiền phòng 1 200k');
`;