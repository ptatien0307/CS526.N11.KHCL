`use strict`;
import { useState } from 'react';

export function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return [() => setValue((value) => value + 1), value]; // update the state to force render
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

