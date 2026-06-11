import { useContext, useEffect, useRef, useState } from "react";
import { execute, complete } from "../terminal/commands";
import { APP_BY_ID } from "../apps";
import { useTheme } from "../useTheme";
import { ActionsContextForTerminal } from "../WindowManagerContext";

const PROMPT = "aberlang@portfolio ~ %";

const WELCOME = [
    "PortfolioOS Terminal — type 'help' to get started.",
    "",
];

let lineId = 0;

export default function TerminalApp() {
    // Window-manager actions exist on desktop; on mobile the terminal runs
    // fullscreen outside the provider and falls back to hash navigation.
    const actions = useContext(ActionsContextForTerminal);
    const { setTheme } = useTheme();
    const [lines, setLines] = useState(() =>
        WELCOME.map((text) => ({ id: (lineId += 1), kind: "out", text })),
    );
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: "end" });
    }, [lines]);

    const ctx = {
        openApp: (appId) => {
            if (actions) {
                actions.openApp(appId);
            } else if (APP_BY_ID[appId]) {
                window.location.hash = APP_BY_ID[appId].hash;
            }
        },
        closeSelf: () => actions?.closeApp("terminal"),
        setTheme,
        clear: () => setLines([]),
    };

    function run() {
        const line = input;
        setInput("");
        setHistoryIdx(-1);
        const echo = { id: (lineId += 1), kind: "in", text: line };
        const output = execute(line, ctx).map((text) => ({
            id: (lineId += 1),
            kind: "out",
            text,
        }));
        setLines((prev) =>
            line.trim().toLowerCase() === "clear"
                ? []
                : [...prev, echo, ...output],
        );
        if (line.trim()) {setHistory((prev) => [...prev, line]);}
    }

    function onKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            run();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) {return;}
            const idx =
                historyIdx === -1
                    ? history.length - 1
                    : Math.max(0, historyIdx - 1);
            setHistoryIdx(idx);
            setInput(history[idx]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx === -1) {return;}
            const idx = historyIdx + 1;
            if (idx >= history.length) {
                setHistoryIdx(-1);
                setInput("");
            } else {
                setHistoryIdx(idx);
                setInput(history[idx]);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const match = complete(input);
            if (match) {setInput(match);}
        }
    }

    return (
        <div
            className="flex h-full min-h-full cursor-text flex-col bg-[#1a1c22] p-3 font-mono text-[13px] leading-relaxed text-[#e4e6eb]"
            onClick={() => inputRef.current?.focus()}
        >
            <div aria-live="polite" className="whitespace-pre-wrap break-words">
                {lines.map((line) => (
                    <div key={line.id}>
                        {line.kind === "in" ? (
                            <span>
                                <span className="text-[#6fd66f]">{PROMPT}</span>{" "}
                                {line.text}
                            </span>
                        ) : (
                            line.text || " "
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <span className="shrink-0 text-[#6fd66f]">{PROMPT}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    aria-label="Terminal command input"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full bg-transparent text-[#e4e6eb] caret-[#6fd66f] outline-none"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
