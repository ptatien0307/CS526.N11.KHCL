`use strict`;

export class Room {
    constructor (
        id,
        name,
        settlement_date,
        rental_fee,
        deposit,
        move_in_date,
        old_electricity_number,
        old_water_number,
        using_internet,
        using_garbage,
        status
    ) {
        this.id = id;
        this.name = name;
        this.settlement_date = settlement_date;
        this.rental_fee = rental_fee;
        this.deposit = deposit;
        this.move_in_date = move_in_date;
        this.old_electricity_number = old_electricity_number;
        this.old_water_number = old_water_number;
        this.using_internet = using_internet;
        this.using_garbage = using_garbage;
        this.status = status;

    }
}