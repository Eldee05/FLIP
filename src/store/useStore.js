import { create } from "zustand";

const SESSION_KEY = "flip_session";

function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const session = JSON.parse(saved);
      // Session valid for 30 days
      if (session.expiresAt && new Date(session.expiresAt) > new Date()) {
        return session;
      }
    }
  } catch (e) {}
  return null;
}

function saveSession(token, user) {
  const session = {
    token,
    currentUser: user,
    isLoggedIn: true,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("fiip_user");
}

const savedSession = loadSession();

export const useStore = create((set) => ({
  // Auth
  isLoggedIn: savedSession?.isLoggedIn || false,
  currentUser: savedSession?.currentUser || null,
  authToken: savedSession?.token || null,

  // Theme
  theme: localStorage.getItem("flip-theme") || "dark",

  // MFA (only for registration)
  mfaVisible: false,
  mfaPending: null,

  // Documents
  uploadedFiles: [],

  // Actions
  login: (token, user) => {
    const session = saveSession(token, user);
    localStorage.setItem("token", token);
    localStorage.setItem("fiip_user", JSON.stringify(user));
    set({
      isLoggedIn: true,
      currentUser: user,
      authToken: token,
    });
  },

  logout: () => {
    clearSession();
    set({
      isLoggedIn: false,
      currentUser: null,
      authToken: null,
      mfaVisible: false,
      mfaPending: null,
    });
  },

  showMFA: (userData) => set({ mfaVisible: true, mfaPending: userData }),
  hideMFA: () => set({ mfaVisible: false, mfaPending: null }),

  setTheme: (theme) => {
    localStorage.setItem("flip-theme", theme);
    set({ theme });
  },

  addUploadedFile: (file) =>
    set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  removeUploadedFile: (id) =>
    set((state) => ({ uploadedFiles: state.uploadedFiles.filter((f) => f.id !== id) })),
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
}));
