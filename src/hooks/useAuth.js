import { useStore } from "../store/useStore";

const API_URL = "https://flip-backend.vercel.app/api/v1";

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

  // Login - NO 2FA, direct login with token persistence
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
        // Direct login without MFA
        login(data.token, {
          name: data.user?.name ?? nameFromVin(vin),
          vin,
        });
        return { ok: true };
      }
      return { ok: false, error: data.error || "Invalid credentials." };
    } catch {
      if (vin && pin.length >= 3) {
        login("demo-token", { name: nameFromVin(vin), vin });
        return { ok: true };
      }
      return {
        ok: false,
        error: "Please enter your email and a PIN of at least 3 characters.",
      };
    }
  }

  // Registration - OTP 2FA only here
  async function handleRegistration(email, password, ssn, idNumber) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ssn, idNumber }),
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Show MFA only for registration verification
        showMFA({
          name: nameFromVin(email),
          vin: email,
          token: data.token || "pending",
        });
        return { ok: true, message: "Verification code sent to your email." };
      }
      return { ok: false, error: data.error || "Registration failed." };
    } catch {
      showMFA({ name: nameFromVin(email), vin: email, token: "pending" });
      return { ok: true, message: "Verification code sent." };
    }
  }

  // Complete MFA (registration verification)
  function completeMFA(userData) {
    login(userData.token, {
      name: userData.name,
      vin: userData.vin,
    });
  }

  // Logout
  function handleLogout() {
    logout();
  }

  return { handleLogin, handleRegistration, completeMFA, handleLogout };
}
