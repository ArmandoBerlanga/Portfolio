import { useCallback, useSyncExternalStore } from "react";

export default function useMediaQuery(query) {
    const subscribe = useCallback(
        (callback) => {
            const mq = window.matchMedia(query);
            mq.addEventListener("change", callback);
            return () => mq.removeEventListener("change", callback);
        },
        [query],
    );

    return useSyncExternalStore(subscribe, () =>
        window.matchMedia(query).matches,
    );
}
