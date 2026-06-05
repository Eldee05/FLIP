import { useState, useEffect, useRef } from "react";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";
import { Button, Alert } from "../shared/UI";
//import { Icons } from "../shared/Icons";

export default function MFAModal() {
  const { hideMFA, mfaPending } = useStore();
  const { completeMFA } = useAuth();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const refs = useRef([]);

  useEffect(() => {
    setTimeout(() => refs.current[0]?.focus(), 80);
  }, []);

  function handleChange(val, i) {
    const next = [...digits];
    next[i] = val.replace(/\D/g, "").slice(-1);
    setDigits(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(e, i) {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      refs.current[i - 1]?.focus();
  }

  function verify() {
    const code = digits.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    completeMFA(mfaPending);
    hideMFA();
  }

  function cancel() {
    hideMFA();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s var(--ease)",
      }}
      onClick={(e) => e.target === e.currentTarget && cancel()}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "36px 32px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
          animation: "fadeUp 0.3s var(--ease)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg,transparent,var(--gold),transparent)",
            borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          }}
        />

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "rgba(201,168,76,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "22px",
          }}
        >
          🔐
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Two-Factor Authentication
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginBottom: "24px",
          }}
        >
          Enter the 6-digit code sent to your email
        </p>

        {error && <Alert variant="error">{error}</Alert>}

        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              aria-label={`Digit ${i + 1}`}
              style={{
                width: "46px",
                height: "54px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: 700,
                fontFamily: "var(--font-body)",
                background: "rgba(128,128,128,0.08)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius)",
                color: "var(--text-primary)",
                outline: "none",
                transition: "var(--transition)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--gold)";
                e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-light)";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={verify}
          style={{ marginBottom: "10px" }}
        >
          Verify Code
        </Button>
        <Button variant="outline" size="md" onClick={cancel}>
          Cancel
        </Button>

        <p
          style={{
            marginTop: "14px",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          Demo: enter any 6 digits
        </p>
      </div>
    </div>
  );
}
