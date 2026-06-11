import { createContext, useCallback, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useWindowActions } from "./WindowManagerContext";

const PreviewContext = createContext(null);

// Holds the document currently shown in the Preview window. Opening a
// document sets it here, then launches (or focuses) the single Preview window.
export function PreviewProvider({ children }) {
    const { openApp } = useWindowActions();
    const [doc, setDoc] = useState(null);

    const openDocument = useCallback(
        (document) => {
            setDoc(document);
            openApp("preview");
        },
        [openApp],
    );

    const value = useMemo(() => ({ doc, openDocument }), [doc, openDocument]);

    return (
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    );
}

PreviewProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function usePreview() {
    const ctx = useContext(PreviewContext);
    if (!ctx) {
        throw new Error("usePreview must be used within PreviewProvider");
    }
    return ctx;
}
