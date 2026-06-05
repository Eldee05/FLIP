import { useEffect } from "react";
import { useStore } from "../store/useStore";

// Ctrl/Cmd + number → switch tab
// Ctrl/Cmd + T → toggle theme
// Ctrl/Cmd + K → focus search
// Ctrl/Cmd + P → print
// Escape → close MFA / chat
const TAB_SHORTCUTS = {
  1: "overview",
  2: "cases",
  3: "solicitors", // Change 1: was 'timeline'
  4: "hearings",
  5: "documents",
  6: "notifications",
  7: "messages",
  8: "analytics",
  9: "profile",
};

export function useKeyboard() {
  const { setActiveTab, toggleTheme, hideMFA, toggleChat, isLoggedIn } =
    useStore();

  useEffect(() => {
    function onKeydown(e) {
      const mod = e.ctrlKey || e.metaKey;

      if (mod && TAB_SHORTCUTS[e.key] && isLoggedIn) {
        e.preventDefault();
        setActiveTab(TAB_SHORTCUTS[e.key]);
        return;
      }

      if (mod) {
        switch (e.key.toLowerCase()) {
          case "t":
            e.preventDefault();
            toggleTheme();
            break;
          case "p":
            e.preventDefault();
            window.print();
            break;
          case "k":
            e.preventDefault();
            document.getElementById("global-search")?.focus();
            break;
        }
      }

      if (e.key === "Escape") {
        hideMFA();
        if (useStore.getState().chatOpen) toggleChat();
      }
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isLoggedIn, setActiveTab, toggleTheme, hideMFA, toggleChat]);
}
