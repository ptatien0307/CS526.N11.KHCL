`use strict`;
import { useState } from "react";

export function useForceUpdate() {
    const [value, setValue] = useState(true); //boolean state
    return [() => setValue(!value), value]; // toggle the state to force render
}