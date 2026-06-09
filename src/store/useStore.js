import { create } from "zustand";

let _toastId = 0;
const makeToast = (message, type = "info") => ({
  id: ++_toastId,
  message,
  type,
});

export const useStore = create((set, get) => ({
  // ── Auth Token───────

  authToken: null,
  currentUser: null,
  isLoggedIn: false,

  login: (token, user) =>
    set({
      authToken: token,
      currentUser: {
        ...user,
        name: localStorage.getItem("profileName") || user.name,
        avatarUrl: localStorage.getItem("profilePhoto") || user.avatarUrl,
      },
      isLoggedIn: true,
    }),

  logout: () => set({ authToken: null, currentUser: null, isLoggedIn: false }),

  updateProfile: (updates) =>
    set((state) => {
      const updatedUser = {
        ...state.currentUser,
        ...updates,
      };

      if (updates.name) {
        localStorage.setItem("profileName", updates.name);
      }

      if (updates.avatarUrl) {
        localStorage.setItem("profilePhoto", updates.avatarUrl);
      }

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      return {
        currentUser: updatedUser,
      };
    }),

  // ── UI ──

  theme:
    typeof window !== "undefined"
      ? localStorage.getItem("fiip_theme") || "dark"
      : "dark",
  fontSize:
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("fiip_fontSize") || "15")
      : 15,
  activeTab: "overview",
  backendStatus: "checking",

  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fiip_theme", theme);
    set({ theme });
  },

  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },

  setFontSize: (size) => {
    const clamped = Math.max(12, Math.min(22, size));
    const root = document.documentElement;
    root.style.setProperty("--font-size-base", `${clamped}px`);
    localStorage.setItem("fiip_fontSize", clamped);
    set({ fontSize: clamped });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setBackendStatus: (s) => set({ backendStatus: s }),

  // ── Toasts ───────────────────────────────────────────────────
  toasts: [],

  addToast: (message, type = "info") => {
    const toast = makeToast(message, type);
    set((s) => ({ toasts: [...s.toasts, toast] }));
    setTimeout(() => get().removeToast(toast.id), 3200);
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  // ── MFA ──────────────────────────────────────────────────────

  mfaVisible: false,
  mfaPending: null,
  showMFA: (userData) => set({ mfaVisible: true, mfaPending: userData }),
  hideMFA: () => set({ mfaVisible: false, mfaPending: null }),

  // ── Chat ─────────────────────────────────────────────────────

  chatOpen: false,
  chatMessages: [
    {
      id: 1,
      role: "bot",
      text: "👋 Hello! I'm your victim support assistant. How can I help?",
    },
  ],

  toggleChat: () => set((s) => ({ chatOpen: !s.chatOpen })),
  addChatMessage: (text, role) =>
    set((s) => ({
      chatMessages: [...s.chatMessages, { id: Date.now(), role, text }],
    })),

  // ── Documents ────────────────────────────────────────────────
  uploadedFiles: [],

  setUploadedFiles: (files) => set({ uploadedFiles: files }),

  addUploadedFile: (file) =>
    set((s) => ({
      uploadedFiles: [...s.uploadedFiles, file],
    })),

  removeUploadedFile: (id) =>
    set((s) => ({
      uploadedFiles: s.uploadedFiles.filter((f) => f.id !== id),
    })),

  // ── Backend ──────────────────────────────────────────────────
  checkBackend: async () => {
    set({ backendStatus: "checking" });
    try {
      const res = await fetch("http://localhost:8000/api/v1", {
        signal: AbortSignal.timeout(3000),
      });
      set({ backendStatus: res.ok ? "online" : "partial" });
    } catch {
      set({ backendStatus: "offline" });
    }
  },
}));
