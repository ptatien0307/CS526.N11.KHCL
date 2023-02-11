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
    bill: {
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
        remained: remained,
    },
    info: {
        name: houseName,
        address: houseAddress,
        phone_number: housePhoneNumber,
    }
}) {
    return `
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
        .bill-details {
            table-layout: auto;
            width: 100%;
            border-collapse: collapse;
        }

        .bill-details td,
        th {
            word-wrap: break-word;
            border: 1px solid black;
            padding: 3px;
            text-align: left;
        }

        .bill-details th {
            font-weight: 'bold';
            background-color: #f2f2f2;
        }

        .bill-details td.total {
            text-align: right;
        }

        .info {
            width: 100%;
            border-collapse: collapse;
        }

        .info td {
            word-wrap: break-word;
            border: none;
            padding: 8px;
            text-align: lèt;
        }

        p {
            margin: 0.5px;
        }
    </style>
</head>

<body>
    <h2 style="text-align: center;">HÓA ĐƠN TIỀN PHÒNG</h2>
    <h3 style="text-align: center;">Nhà trọ ${houseName}</h3>
    <table class="info">
        <tr>
            <td style="width: 25%; font-size: large;">
                <b>${roomName} </b>
            </td>

        </tr>
        <tr>
            <td style="width: 75%; font-size: large;">
                <b>Ngày lập hóa đơn:</b> ${createdAt}
            </td>
        </tr>
    </table>
    <br>
    <table class="bill-details">
        <tr>
            <th>Khoản thu</th>
            <th>Chi tiết</th>
            <th style="text-align: right;">Thành tiền</th>
        </tr>
        <tr>
            <td><b>Phòng</b></td>
            <td>
                <p>Số tháng: <b>${numberOfMonths}</b>. Số ngày lẻ: <b>${numberOfDays}</b></p>
                <p>Giá: <b>${formatVNCurrency(rentalFee)}</b></p>
            </td>
            <td class="total">${formatVNCurrency(rentalFee * parseInt(numberOfMonths) + Math.round(rentalFee / 30) *
        numberOfDays)}</td>
        </tr>
        <tr>
            <td><b>Điện</b></td>
            <td>
                <p>Số cũ: <b>${oldElectricityNumber}</b>. Số mới: <b>${newElectricityNumber}</b></p>
                <p>Đơn giá: <b>${electricityFee}/KWh</b></p>
            </td>
            <td class="total">${formatVNCurrency(electricityFee * (newElectricityNumber - oldElectricityNumber))}</td>
        </tr>
        <tr>
            <td><b>Nước</b></td>
            <td>
                <p>Số cũ: <b>${oldWaterNumber}</b>. Số mới: <b>${newWaterNumber}</b></p>
                <p>Đơn giá: <b>${formatVNCurrency(waterFee)}/khối</b></p>
            </td>
            <td class="total">${formatVNCurrency(waterFee * (newWaterNumber - oldWaterNumber))}</td>
        </tr>
        <tr>
            <td><b>Rác</b></td>
            <td>
                <p>Đơn giá: <b>${formatVNCurrency(garbageFee)}/tháng</b></p>
            </td>
            <td class="total">${formatVNCurrency(garbageFee)}</td>
        </tr>
        <tr>
            <td><b>Internet</b></td>
            <td>
                <p>Đơn giá: <b>${formatVNCurrency(internetFee)}/tháng</b></p>
            </td>
            <td class="total">${formatVNCurrency(internetFee)}</td>
        </tr>
        <tr>
            <td><b>Giảm trừ</b></td>
            <td>
                <p>Giảm: <b>${formatVNCurrency(credit)}</b></p>
            </td>
            <td class="total">-${formatVNCurrency(credit)}</td>
        </tr>
        <tr>
            <td><b>Phụ thu</b></td>
            <td>
                <p>Thu thêm: <b>${formatVNCurrency(othersFee)}</b></p>
            </td>
            <td class="total">${formatVNCurrency(othersFee)}</td>
        </tr>
        <tr style="font-size: large; ">
            <td colspan="2" style="text-align: right; padding: 8px;font-size: large;"><b>Tổng cộng</b></td>
            <td class="total"><b>${formatVNCurrency(total)}</b></td>
        </tr>
        <tr style="font-size: large; ">
            <td colspan="2" style="text-align: right; padding: 8px;font-size: large;"><b>Đã trả</b></td>
            <td class="total"><b>-${formatVNCurrency(total - remained)}</b></td>
        </tr>
        <tr style="font-size: large; ">
            <td colspan="2" style="text-align: right; padding: 8px;font-size: large;"><b>Còn lại</b></td>
            <td class="total"><b>${formatVNCurrency(remained)}</b></td>
        </tr>

    </table>
    <br>
    <table class="info">
        <tr>
            <td style="width: 50%; font-size: large; text-align: center;">
                <b>Người lập hóa đơn</b>
            </td>
            <td style="width: 50%; font-size: large; text-align: center;">
                <b>Người nhận hóa đơn</b>
            </td>
        </tr>
    </table>
    <div style="height: 150px;"></div>
    <table class="info">
        <tr>
            <td style="font-size: large;" colspan="2">
                <b>Nhà trọ ${houseName}</b>
            </td>
        </tr>
        <tr>
            <td style="width: 20%; font-weight: bold;">Địa chỉ</td>
            <td>${houseAddress}</td>
            </td>
        </tr>
        <tr>
            <td style="width: 20%; font-weight: bold;">Điện thoại</td>
            <td>${housePhoneNumber}</td>
        </tr>
    </table>
</body>

</html>
`;
};

