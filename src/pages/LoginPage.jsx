import { useState, useEffect } from "react";
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

export default function LoginPage({ onGoSignUp }) {
  const [vin, setVin] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { backendStatus, checkBackend } = useStore();
  const { handleLogin } = useAuth();

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!vin || !pin) {
      setError("Please enter your email and PIN.");
      return;
    }
    setBusy(true);
    const result = await handleLogin(vin, pin);
    if (!result.ok) setError(result.error);
    setBusy(false);
  }

  const statusMap = {
    online: {
      dot: "🟢",
      text: "Backend Connected",
      bg: "rgba(61,184,138,0.1)",
      color: "#3db88a",
    },
    offline: {
      dot: "🔴",
      text: "Demo Mode",
      bg: "rgba(224,82,82,0.1)",
      color: "var(--red)",
    },
    partial: {
      dot: "🟡",
      text: "API Running (partial)",
      bg: "rgba(201,168,76,0.1)",
      color: "var(--gold)",
    },
    checking: {
      dot: "🟡",
      text: "Checking…",
      bg: "rgba(201,168,76,0.1)",
      color: "var(--gold)",
    },
  };
  const s = statusMap[backendStatus] || statusMap.checking;

  return (
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
          maxWidth: "420px",
          position: "relative",
          animation: "fadeUp 0.45s var(--ease) both",
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

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "28px",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "4px",
          }}
        >
          Welcome Back
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Sign in to your victim case portal
        </p>

        {error && <Alert variant="error">{error}</Alert>}

        <form onSubmit={onSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="vin">Email or VIN</Label>
            <Input
              id="vin"
              type="text"
              placeholder="victim@example.com"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              autoComplete="username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="pin">Security PIN</Label>
            <Input
              id="pin"
              type="password"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoComplete="current-password"
              required
            />
          </FormGroup>
          <Button type="submit" variant="gold" size="md" disabled={busy}>
            {busy ? "⏳ Signing in…" : "Sign In"}
          </Button>
        </form>

        <Divider label="new here?" />
        <Button variant="outline" size="md" onClick={onGoSignUp}>
          Create an Account
        </Button>

        <div
          style={{
            marginTop: "14px",
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",

            color: s.color,
            fontSize: "11px",
            fontWeight: 600,
            textAlign: "center",
          }}
        ></div>
      </div>
    </div>
  );
}
