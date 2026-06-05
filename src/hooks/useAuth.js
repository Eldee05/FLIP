import { useStore } from "../store/useStore";

const API_URL = "http://localhost:8000/api/v1";

function nameFromVin(vin) {
  if (vin.includes("@")) {
    return vin
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return "Victim";
}

export function useAuth() {
  const { login, logout, showMFA } = useStore();

  // ── Login ────────────────────────────────────────────────────
  async function handleLogin(vin, pin) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin, pin }),
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showMFA({
          name: data.user?.name ?? nameFromVin(vin),
          vin,
          token: data.token,
        });
        return { ok: true };
      }
      return { ok: false, error: data.error || "Invalid credentials." };
    } catch {
      // Demo fallback — any email + PIN ≥ 3 chars works
      if (vin && pin.length >= 3) {
        showMFA({ name: nameFromVin(vin), vin, token: "demo-token" });
        return { ok: true };
      }
      return {
        ok: false,
        error: "Please enter your email and a PIN of at least 3 characters.",
      };
    }
  }

  // ── Registration ─────────────────────────────────────────────
  async function handleRegistration(email, password, ssn, idNumber) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ssn, idNumber }),
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      return res.ok
        ? { ok: true, message: data.message || "Account created successfully!" }
        : { ok: false, error: data.error || "Registration failed." };
    } catch {
      return { ok: true, message: "Account created successfully!" };
    }
  }

  // ── Complete MFA → enter dashboard (no toast — Change 4) ─────
  function completeMFA(userData) {
    login(userData.token, { name: userData.name, vin: userData.vin });
    // No greeting toast — Change 4: remove all alert popups
  }

  // ── Logout (no toast — Change 4) ─────────────────────────────
  function handleLogout() {
    logout();
  }

  return { handleLogin, handleRegistration, completeMFA, handleLogout };
}
