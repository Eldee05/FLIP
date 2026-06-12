import React, { useEffect } from "react";
import { useStore } from "./store/useStore";
import { useKeyboard } from "./hooks/useKeyboard";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MFAModal from "./components/Auth/MFAModal.jsx";
import ToastContainer from "./components/shared/ToastContainer.jsx";
import ReadingProgress from "./components/shared/ReadingProgress.jsx";
import A11yToolbar from "./components/shared/A11ytoolbar.jsx";

export default function App() {
  const { isLoggedIn, mfaVisible, theme } = useStore(); // removed this fro now "checkBackend"
  const [view, setView] = React.useState("login"); // 'login' | 'signup'

  useKeyboard();

  // Apply saved theme on mount and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Backend health check — silent, no toast
  {
    /*useEffect(() => {
    const interval = setInterval(checkBackend, 30_000);
    return () => clearInterval(interval);
  }, [checkBackend]);*/
  }

  return (
    <>
      <ReadingProgress />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {isLoggedIn ? (
        <DashboardPage />
      ) : view === "signup" ? (
        <SignUpPage onGoLogin={() => setView("login")} />
      ) : (
        <LoginPage onGoSignUp={() => setView("signup")} />
      )}

      {/* Overlays */}
      {mfaVisible && <MFAModal />}

      {/* Global widgets — always mounted */}
      <A11yToolbar />
      <ToastContainer />
    </>
  );
}
