import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";
import { Icons } from "../shared/Icons";
import WalletModal from "../tabs/WalletTab.jsx";

export default function Topbar() {
  const { currentUser, setActiveTab, toggleTheme } = useStore();
  const { handleLogout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const menuRef = useRef();

  const initials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JV";

  const displayName = currentUser?.name || "Portal User";
  const displayVin = currentUser?.vin || "";

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const iconBtn = {
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "var(--radius)",
    transition: "var(--transition)",
    display: "flex",
    alignItems: "center",
  };

  // Menu items — Wallet triggers modal, others navigate to a tab
  const menuItems = [
    { label: "My Profile", icon: "👤", tab: "profile" },
    { label: "Notifications", icon: "🔔", tab: "notifications" },
    { label: "Documents", icon: "📂", tab: "documents" },
    { label: "Settings", icon: "⚙️", tab: "profile" },
    { label: "Wallet", icon: "💱", tab: null }, // tab: null = open modal instead
  ];

  return (
    <>
      <header
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "var(--topbar-h)",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            gap: "16px",
          }}
        >
          {/* ── Brand ─────────────────────────────────────────── */}
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <Icons.Logo size={34} />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              FIIP Portal
            </span>
          </button>

          {/* ── Global Search ──────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(128,128,128,0.08)",
              border: "1px solid var(--border-light)",
              borderRadius: "30px",
              padding: "8px 16px",
              flex: 1,
              maxWidth: "380px",
            }}
          >
            <Icons.Search size={16} color="var(--text-muted)" />
            <input
              id="global-search"
              type="text"
              placeholder="Search cases, documents, hearings…"
              aria-label="Global search"
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                const q = e.target.value.toLowerCase();
                const map = [
                  { k: ["case"], t: "cases" },
                  { k: ["solicit"], t: "solicitors" },
                  { k: ["hear", "court"], t: "hearings" },
                  { k: ["doc", "file"], t: "documents" },
                  { k: ["notif"], t: "notifications" },
                  { k: ["msg", "message"], t: "messages" },
                  { k: ["resource"], t: "resources" },
                  { k: ["right"], t: "rights" },
                  { k: ["help", "faq"], t: "help" },
                  { k: ["analytic", "stat"], t: "analytics" },
                  { k: ["profile", "account"], t: "profile" },
                ];
                const match = map.find(({ k }) =>
                  k.some((kw) => q.includes(kw)),
                );
                if (match) setActiveTab(match.t);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                fontSize: "13px",
                fontFamily: "var(--font-body)",
                width: "100%",
                outline: "none",
              }}
            />
          </div>

          {/* ── Right Actions ──────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle dark / light mode"
              style={iconBtn}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <Icons.Sun size={20} />
            </button>

            {/* Notifications */}
            <button
              onClick={() => setActiveTab("notifications")}
              aria-label="Notifications"
              title="View notifications"
              style={{ ...iconBtn, position: "relative" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              <Icons.Bell size={20} />
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  width: "16px",
                  height: "16px",
                  background: "var(--red)",
                  borderRadius: "50%",
                  fontSize: "9px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  pointerEvents: "none",
                }}
              >
                3
              </span>
            </button>

            {/* ── User Menu ──────────────────────────────────────── */}
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="User menu"
                aria-expanded={menuOpen}
                title={displayName}
                style={{
                  background:
                    "linear-gradient(135deg,var(--gold),var(--gold-dark))",
                  border: "none",
                  cursor: "pointer",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "var(--bg-primary)",
                  flexShrink: 0,
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {initials}
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    minWidth: "200px",
                    overflow: "hidden",
                    animation: "fadeUp 0.2s var(--ease)",
                    zIndex: 200,
                  }}
                >
                  {/* User info header */}
                  <div
                    style={{
                      padding: "14px 16px",
                      borderBottom: "1px solid var(--border)",
                      background: "rgba(201,168,76,0.05)",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: 700 }}>
                      {displayName}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayVin}
                    </div>
                  </div>

                  {/* Menu items */}
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.tab === null) {
                          // Wallet → open modal
                          setWalletOpen(true);
                        } else {
                          setActiveTab(item.tab);
                        }
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "11px 16px",
                        background: "none",
                        border: "none",
                        color: "var(--text-secondary)",
                        fontSize: "13px",
                        fontFamily: "var(--font-body)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "var(--transition)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(128,128,128,0.06)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}

                  {/* Divider + Logout */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      padding: "6px 0",
                    }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "11px 16px",
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        fontFamily: "var(--font-body)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "var(--transition)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(224,82,82,0.08)";
                        e.currentTarget.style.color = "#fca5a5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "var(--text-muted)";
                      }}
                    >
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Wallet modal — rendered outside the header so it overlays everything */}
      {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
    </>
  );
}
