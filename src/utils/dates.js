const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2019-08" -> "Aug 2019"; anything else passes through ("Present", "Fall 2022").
export function formatYM(value) {
    const match = /^(\d{4})-(\d{2})$/.exec(value ?? "");
    if (!match) {
        return value;
    }
    return `${MONTHS[Number(match[2]) - 1]} ${match[1]}`;
}

export function formatRange(start, end) {
    return `${formatYM(start)} — ${formatYM(end)}`;
}
