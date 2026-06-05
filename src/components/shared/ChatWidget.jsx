import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useStore";

const BOT_RESPONSES = [
  "I understand this can be difficult. You're not alone — we're here to support you.",
  "Your case officer will be notified. Is there anything specific you'd like to discuss?",
  "I can help you find resources for emotional support, legal advice, or court preparation.",
  "Would you like me to connect you with a victim support specialist?",
  "Your safety is our priority. If this is an emergency, please call 999 immediately.",
];

export default function ChatWidget() {
  const { chatOpen, chatMessages, toggleChat, addChatMessage } = useStore();
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatOpen]);

  function send() {
    const text = input.trim();
    if (!text) return;
    addChatMessage(text, "user");
    setInput("");
    setTimeout(() => {
      addChatMessage(
        BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        "bot",
      );
    }, 800);
  }

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 400 }}
    >
      {/* Panel */}
      {chatOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: 0,
            width: "320px",
            height: "420px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--shadow-lg)",
            animation: "fadeUp 0.25s var(--ease)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "13px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "14px" }}>
              💬 Victim Support
            </span>
            <button
              onClick={toggleChat}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
              }}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {chatMessages.map((m) => (
              <div
                key={m.id}
                style={{
                  maxWidth: "82%",
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  padding: "10px 13px",
                  borderRadius:
                    m.role === "user"
                      ? "14px 14px 4px 14px"
                      : "14px 14px 14px 4px",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  background:
                    m.role === "user" ? "var(--blue)" : "rgba(201,168,76,0.1)",
                  color: m.role === "user" ? "#fff" : "var(--text-primary)",
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message…"
              aria-label="Chat message"
              style={{
                flex: 1,
                padding: "9px 13px",
                background: "rgba(128,128,128,0.08)",
                border: "1px solid var(--border-light)",
                borderRadius: "20px",
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              aria-label="Send"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--gold)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
                color: "var(--bg-primary)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        aria-label="Open support chat"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,var(--gold),var(--gold-dark))",
          border: "none",
          cursor: "pointer",
          fontSize: "22px",
          boxShadow: "var(--shadow-gold)",
          transition: "var(--transition)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {chatOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
