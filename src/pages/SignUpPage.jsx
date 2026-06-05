import React, { useState, useRef } from "react";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";
import {
  Button,
  Alert,
  FormGroup,
  Label,
  Input,
  Divider,
} from "../components/shared/UI";
import { Icons } from "../components/shared/Icons";

const API_URL = "http://localhost:8000/api/v1";

const STEPS = ["Email", "Verify", "Details", "Complete"];

function StepIndicator({ current }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        marginBottom: "32px",
      }}
    >
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const isLast = i === STEPS.length - 1;
        return (
          <React.Fragment key={label}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  background: done
                    ? "var(--green)"
                    : active
                      ? "var(--gold)"
                      : "rgba(128,128,128,0.15)",
                  color:
                    done || active
                      ? active
                        ? "var(--bg-primary)"
                        : "#fff"
                      : "var(--text-muted)",
                  border: active ? "2px solid var(--gold-light)" : "none",
                  transition: "var(--transition)",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: active ? "var(--gold)" : "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                style={{
                  width: "48px",
                  height: "2px",
                  marginBottom: "18px",
                  background: done ? "var(--green)" : "var(--border)",
                  transition: "var(--transition)",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function SignUpPage({ onGoLogin }) {
  const { addToast } = useStore();
  const { handleRegistration } = useAuth();

  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Step 0 — email
  const [email, setEmail] = useState("");
  // Step 1 — OTP (6 digits)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  // Step 2 — details
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ssn, setSsn] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // ── Helpers ────────────────────────────────────────────────
  const err = (msg) => {
    setError(msg);
    setBusy(false);
  };
  // BEFORE
  async function sendOtp(e) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return err("Please enter a valid email address.");
    }
    setBusy(true);
    try {
      await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(5000),
      });
    } catch {
      /* demo: always proceed */
      // ← THIS is why OTP is never required
    }
    // Demo: always move forward
    setStep(1);
    setBusy(false);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }

  // ── Step 0: Send OTP ───────────────────────────────────────
  {
    /*async function sendOtp(e) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return err("Please enter a valid email address.");
    }
    setBusy(true);
    try {
      const res = await fetch(`${API_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return err(
          body.detail || "Failed to send verification code. Try again.",
        );
      }
      setStep(1);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch {
      return err("Could not reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  */
  }

  // ── Step 1: Verify OTP ─────────────────────────────────────
  function handleOtpChange(val, i) {
    const digits = [...otp];
    digits[i] = val.replace(/\D/g, "").slice(-1);
    setOtp(digits);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  }
  function handleOtpKeyDown(e, i) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  }

  // BEFORE
  function verifyOtp(e) {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) return err("Please enter all 6 digits.");
    // Demo: any 6-digit code passes   // ← never actually verifies
    setStep(2);
  }

  // After successful OTP verification, we would normally call handleRegistration to create the account. keep this in mind when implementing the backend API.
  {
    /*async function verifyOtp(e) {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) return err("Please enter all 6 digits.");
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return err(body.detail || "Invalid or expired code. Try again.");
      }
      setStep(2);
    } catch {
      return err("Could not reach the server. Check your connection.");
    } finally {
      setBusy(false);
    }
  }*/
  }
  function resendOtp() {
    setOtp(["", "", "", "", "", ""]);
    addToast("A new code has been sent to " + email, "info");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  }

  // ── Step 2: Account Details ────────────────────────────────
  async function submitDetails(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8)
      return err("Password must be at least 8 characters.");
    if (password !== confirm) return err("Passwords do not match.");
    if (!ssn.trim()) return err("SSN is required.");
    if (!idNumber.trim()) return err("ID number is required.");

    setBusy(true);
    const result = await handleRegistration(email, password, ssn, idNumber);
    if (result.ok) {
      setStep(3);
    } else {
      err(result.error);
    }
    setBusy(false);
  }

  // ── Card wrapper ───────────────────────────────────────────
  const card = (content) => (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          animation: "fadeUp 0.45s var(--ease) both",
        }}
      >
        {/* Gold top line */}
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

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <Icons.Logo size={40} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              fontWeight: 600,
            }}
          >
            FIIP Portal
          </span>
        </div>

        <StepIndicator current={step} />
        {content}
      </div>
    </div>
  );

  // ── Step 0 ─────────────────────────────────────────────────
  if (step === 0)
    return card(
      <>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          Create Account
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Enter your email to get started
        </p>
        {error && <Alert variant="error">{error}</Alert>}
        <form onSubmit={sendOtp} noValidate>
          <FormGroup>
            <Label htmlFor="su-email">Email Address</Label>
            <Input
              id="su-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormGroup>
          <Button type="submit" variant="gold" size="md" disabled={busy}>
            {busy ? "⏳ Sending…" : "Send Verification Code"}
          </Button>
        </form>
        <Divider label="already registered?" />
        <Button variant="outline" size="md" onClick={onGoLogin}>
          Sign In Instead
        </Button>
      </>,
    );

  // ── Step 1 ─────────────────────────────────────────────────
  if (step === 1)
    return card(
      <>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          Verify Email
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Enter the 6-digit code sent to{" "}
          <strong style={{ color: "var(--gold-light)" }}>{email}</strong>
        </p>
        {error && <Alert variant="error">{error}</Alert>}
        <form onSubmit={verifyOtp} noValidate>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                aria-label={`OTP digit ${i + 1}`}
                style={{
                  width: "48px",
                  height: "56px",
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
          <Button type="submit" variant="gold" size="md" disabled={busy}>
            {busy ? "⏳ Verifying…" : "Verify Code"}
          </Button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "13px",
            color: "var(--text-muted)",
          }}
        >
          Didn't receive it?{" "}
          <button
            onClick={resendOtp}
            style={{
              background: "none",
              border: "none",
              color: "var(--gold-light)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "13px",
              fontFamily: "var(--font-body)",
            }}
          >
            Resend Code
          </button>
        </p>
      </>,
    );

  // ── Step 2 ─────────────────────────────────────────────────
  if (step === 2)
    return card(
      <>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          Account Details
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Set your password and provide ID information
        </p>
        {error && <Alert variant="error">{error}</Alert>}
        <form onSubmit={submitDetails} noValidate>
          <FormGroup>
            <Label htmlFor="su-pwd">Password</Label>
            <div style={{ position: "relative" }}>
              <Input
                id="su-pwd"
                type={showPwd ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="su-confirm">Confirm Password</Label>
            <Input
              id="su-confirm"
              type={showPwd ? "text" : "password"}
              placeholder="Repeat password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="su-ssn">Social Security Number (SSN)</Label>
            <Input
              id="su-ssn"
              type="text"
              placeholder="XXX-XX-XXXX"
              value={ssn}
              onChange={(e) => {
                // Auto-format as user types: 123-45-6789
                const raw = e.target.value.replace(/\D/g, "").slice(0, 9);
                const fmt =
                  raw.length > 5
                    ? `${raw.slice(0, 3)}-${raw.slice(3, 5)}-${raw.slice(5)}`
                    : raw.length > 3
                      ? `${raw.slice(0, 3)}-${raw.slice(3)}`
                      : raw;
                setSsn(fmt);
              }}
              required
              autoComplete="off"
              style={{ letterSpacing: "1px" }}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="su-id">Government-Issued ID Number</Label>
            <Input
              id="su-id"
              type="text"
              placeholder="Passport, Driver's Licence, etc."
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              autoComplete="off"
            />
          </FormGroup>

          {/* Password strength indicator */}
          {password && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      flex: 1,
                      height: "3px",
                      borderRadius: "2px",
                      background:
                        n <= passwordStrength(password)
                          ? [
                              "",
                              "var(--red)",
                              "var(--gold)",
                              "var(--gold-light)",
                              "var(--green)",
                            ][passwordStrength(password)]
                          : "var(--border)",
                      transition: "var(--transition)",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Strength:{" "}
                {
                  ["", "Weak", "Fair", "Good", "Strong"][
                    passwordStrength(password)
                  ]
                }
              </p>
            </div>
          )}

          <Button type="submit" variant="gold" size="md" disabled={busy}>
            {busy ? "⏳ Creating account…" : "Create Account"}
          </Button>
        </form>
      </>,
    );

  // ── Step 3 — Success ───────────────────────────────────────
  return card(
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "rgba(61,184,138,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: "28px",
        }}
      >
        ✅
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        Account Created!
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "14px",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        Your account has been successfully created. You can now sign in to
        access your case portal.
      </p>
      <Button variant="gold" size="md" onClick={onGoLogin}>
        Go to Sign In
      </Button>
    </div>,
  );
}

function passwordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}
