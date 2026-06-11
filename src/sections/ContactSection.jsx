import { useState } from "react";

const EMAIL = "armandoberlanga2708@gmail.com";

export default function ContactSection() {
    const [from, setFrom] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    function handleSend(e) {
        e.preventDefault();
        const body = `${message}\n\n— ${from || "A portfolio visitor"}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
            subject || "Hello from your portfolio",
        )}&body=${encodeURIComponent(body)}`;
        setStatus("sent");
        setTimeout(() => setStatus(""), 4000);
    }

    const fieldRow =
        "flex items-center gap-3 border-b border-(--window-divider) px-4 py-2.5";
    const fieldLabel = "w-14 shrink-0 text-right text-[13px] font-medium text-ink-3";
    const fieldInput =
        "w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3";

    return (
        <section
            id="contact"
            aria-label="Contact information"
            className="flex min-h-full flex-col"
        >
            <form onSubmit={handleSend} className="flex min-h-full flex-1 flex-col">
                {/* Compose toolbar */}
                <div className="flex items-center justify-between border-b border-(--window-divider) bg-titlebar/60 px-4 py-2">
                    <span className="text-sm font-semibold text-ink">
                        New Message
                    </span>
                    <button
                        type="submit"
                        aria-label="Send message"
                        className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-primary/90 active:scale-95"
                    >
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                        </svg>
                        Send
                    </button>
                </div>

                {/* Headers */}
                <div className={fieldRow}>
                    <span className={fieldLabel}>To:</span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[13px] font-medium text-primary">
                        Armando Berlanga &lt;{EMAIL}&gt;
                    </span>
                </div>
                <div className={fieldRow}>
                    <label htmlFor="compose-from" className={fieldLabel}>
                        From:
                    </label>
                    <input
                        id="compose-from"
                        type="email"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="you@example.com"
                        className={fieldInput}
                    />
                </div>
                <div className={fieldRow}>
                    <label htmlFor="compose-subject" className={fieldLabel}>
                        Subject:
                    </label>
                    <input
                        id="compose-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Let's work together"
                        className={fieldInput}
                    />
                </div>

                {/* Body */}
                <textarea
                    aria-label="Message body"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={"Write your message…\n\n\n—\nSent from aberlang's portfolio"}
                    className="min-h-40 w-full flex-1 resize-none bg-transparent p-4 text-[15px] leading-relaxed text-ink outline-none placeholder:text-ink-3"
                />

                {/* Attachment */}
                <div className="border-t border-(--window-divider) px-4 py-2">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-(--window-divider) bg-hover-fill px-3 py-1.5 transition-colors duration-150 hover:bg-primary/10"
                    >
                        <svg viewBox="0 0 24 24" className="size-3.5 text-ink-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                        <span className="text-[13px] font-medium text-ink">
                            resume.pdf
                        </span>
                        <span className="text-[11px] text-ink-3">86 KB</span>
                    </a>
                </div>

                {/* Status / footer */}
                <div className="flex items-center justify-between border-t border-(--window-divider) px-4 py-2.5">
                    <p aria-live="polite" className="text-[13px] text-ink-3">
                        {status === "sent"
                            ? "Opening your mail client…"
                            : "Opens in your default mail app"}
                    </p>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="text-[13px] font-medium text-primary hover:underline"
                    >
                        Or email directly
                    </a>
                </div>
            </form>
        </section>
    );
}
