import { useEffect, useState } from "react";

export default function useClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        // Tick on the minute boundary so the clock never shows a stale minute.
        let interval;
        const msToNextMinute = 60000 - (Date.now() % 60000);
        const timeout = setTimeout(() => {
            setNow(new Date());
            interval = setInterval(() => setNow(new Date()), 60000);
        }, msToNextMinute);
        return () => {
            clearTimeout(timeout);
            if (interval) {clearInterval(interval);}
        };
    }, []);

    return now;
}
