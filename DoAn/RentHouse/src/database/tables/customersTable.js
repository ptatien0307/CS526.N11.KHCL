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

export const populateCustomersTable = `
    INSERT OR REPLACE INTO customers (
                                        id,
                                        name,
                                        birthday,
                                        gender,
                                        address,
                                        citizen_id,
                                        citizen_id_date,
                                        citizen_id_place,
                                        job,
                                        phone,
                                        temporary_residence,
                                        room_id
                                    )
    VALUES
    (1,"Hyatt Cotton","03/04/2023",0,"4221 Orci Road","9457D190-DFB8-5B4D-0628-22BAAD1B55E1","02/11/2016","Thái Bình","Quality Assurance","0184989597",7,5),
    (2,"Kyle Flores","01/09/2023",1,"1310 Eros. Ave","CC71F4FB-365B-ADCD-B951-B5596BA7A749","09/01/1954","Lâm Đồng","Public Relations","0763526486",6,2),
    (3,"Daphne Delgado","06/06/2022",0,"648-141 Tincidunt Avenue","BB5EA9E9-4833-DB4A-6237-3846362AC6C5","14/08/1997","Thái Bình","Tech Support","0528393058",1,3),
    (4,"Quamar Mcclure","17/11/2023",0,"608-6668 Suspendisse Ave","BD59CCD1-15DA-A72A-A982-352C02A833DC","23/02/1986","Trà Vinh","Research and Development","0996006517",0,4),
    (5,"Maite Thomas","14/05/2022",0,"Ap #713-2303 Nunc Ave","CC40C182-53D0-2EB2-8FDF-B6C97E54A8CE","20/01/1961","Cà Mau","Public Relations","0569354711",0,4),
    (6,"Conan Tyson","24/08/2023",0,"Ap #815-6575 Purus. Road","7F4FDA23-35C2-BE81-1DC5-6CDD9956EB60","16/10/1954","Phú Thọ","Asset Management","0415211622",10,1),
    (7,"Christopher Haley","28/02/2023",1,"Ap #856-9421 Mi Avenue","88D8BA36-8267-C5CB-6CDB-691621EDE57B","17/01/2000","Phú Thọ","Legal Department","0538966594",4,1),
    (8,"Francis Page","21/03/2023",1,"P.O. Box 286, 5180 In Ave","A6AEEA0A-8A4D-8E57-829A-989AAA70899C","10/05/1958","Lào Cai","Asset Management","0848337914",9,4),
    (9,"Zeus Meadows","12/07/2023",1,"P.O. Box 975, 1554 Pellentesque St.","D41ECCAB-EDC3-4336-8CAA-74525D876819","30/04/1953","Sơn La","Accounting","0206650681",9,4);
`;
