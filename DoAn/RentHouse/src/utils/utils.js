`use strict`;
import { useState } from 'react';
import { formatCurrency } from 'react-native-format-currency';

export function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return [() => setValue((value) => value + 1), value]; // update the state to force render
}


export function formatVNCurrency(amount, type = 1) {
    // ```
    // Return a formatted currency string
    // 	type = 1: 1,000,000 đ (formatted currency string) 
    // 	type = 2: 1,000,000 (formatted currency string without currency symbol)
    // 	type = 3: đ (currency symbol)
    // ```
    if (amount === undefined || amount === null) {
        return "";
    }
    return formatCurrency({
        amount: amount,
        code: "VND",
    })[type - 1];
}

export function getCurrentDateString() {
    return new Date().toLocaleString(
        "vi-VN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
}

export function formatHTMLBill({
    room_name: roomName,
    created_at: createdAt,
    number_of_months: numberOfMonths,
    number_of_days: numberOfDays,
    rental_fee: rentalFee,
    old_water_number: oldWaterNumber,
    new_water_number: newWaterNumber,
    water_fee: waterFee,
    old_electricity_number: oldElectricityNumber,
    new_electricity_number: newElectricityNumber,
    electricity_fee: electricityFee,
    garbage_fee: garbageFee,
    internet_fee: internetFee,
    others_fee: othersFee,
    credit: credit,
    total: total,
}) {
    return `
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        td,
        th {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        td.total {
            text-align: center;
        }

        td.calculation {
            text-align: right;
        }
    </style>
</head>

<body>
    <h1>HÓA ĐƠN</h1>
    <h2>${roomName}</h2>
    <h3>NGÀY LẬP: ${createdAt}</h3>
    <table>
        <tr>
            <th colspan="2">Tiền phòng</th>
            <th>Thành tiền</th>
        </tr>

        <tr>
            <td>Số tháng: <strong>${numberOfMonths}</strong></td>
            <td>Số ngày lẻ: <strong>${numberOfDays}</strong></td>
            <td rowspan="2" class="total">
                <strong>${formatVNCurrency(rentalFee * numberOfMonths + Math.round(rentalFee / 30) * numberOfDays)}</strong>
            </td>
        </tr>

        <tr>
            <td class="calculation" colspan="2">Giá: <strong>${formatVNCurrency(rentalFee)}/tháng</strong></td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Tiền nước</th>
            <th>Thành tiền</th>
        </tr>

        <tr>
            <td>Số cũ: <strong>${oldWaterNumber}</strong></td>
            <td>Số mới: <strong>${newWaterNumber}</strong></td>
            <td rowspan="2" class="total">
                <strong>${formatVNCurrency(waterFee * (newWaterNumber - oldWaterNumber))}</strong>
            </td>
        </tr>

        <tr>
            <td class="calculation" colspan="2">
                <strong>${newWaterNumber - oldWaterNumber} * ${formatVNCurrency(waterFee)}/KWh</strong>
            </td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Tiền điện</th>
            <th>Thành tiền</th>
        </tr>

        <tr>
            <td>Số cũ: <strong>${oldElectricityNumber}</strong></td>
            <td>Số mới: <strong>${newElectricityNumber}</strong></td>
            <td rowspan="2" class="total">
                <strong>${formatVNCurrency(electricityFee * (newElectricityNumber - oldElectricityNumber))}</strong>
            </td>
        </tr>

        <tr>
            <td class=" calculation" colspan="2">
                <strong>${newElectricityNumber - oldElectricityNumber} * ${formatVNCurrency(electricityFee)}/KWh</strong>
            </td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Tiền rác</th>
            <td class="total"><strong>${formatVNCurrency(garbageFee)}</strong></td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Tiền Internet</th>
            <td class="total"><strong>${formatVNCurrency(internetFee)}</strong></td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Thu thêm</th>
            <td class="total"><strong>${formatVNCurrency(othersFee)}</strong></td>
        </tr>

        <tr>
            <td colspan="3"></td>
        </tr>

        <tr>
            <th colspan="2">Giảm trừ</th>
            <td class="total"><strong>${formatVNCurrency(credit)}</strong></td>
        </tr>
    </table>

    <br>
    <table>
        <tr>
            <td class="total" colspan="2"><strong>TỔNG CỘNG</strong></tD>
            <td class="total"><strong>${formatVNCurrency(total)}</strong></td>
        </tr>
    </table>
</body>

</html>
`;
}

