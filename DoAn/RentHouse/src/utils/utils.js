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
	// 	type = 1: 1,000,000 VND (formatted currency string) 
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

