import { useState, useRef, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";
import { Icons } from "../shared/Icons";
import WalletModal from "../tabs/WalletTab.jsx";

export default function Topbar({ onMenuOpen }) {
  const { currentUser, setActiveTab, toggleTheme } = useStore();
  const { handleLogout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // mobile search toggle
  const menuRef = useRef();
  const searchRef = useRef();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close mobile search when clicking outside
  useEffect(() => {
    if (!searchOpen) return;
    function onClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [searchOpen]);

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
    flexShrink: 0,
  };

  const menuItems = [
    { label: "My Profile", icon: "👤", tab: "profile" },
    { label: "Notifications", icon: "🔔", tab: "notifications" },
    { label: "Documents", icon: "📂", tab: "documents" },
    { label: "Settings", icon: "⚙️", tab: "profile" },
    { label: "Wallet", icon: "💱", tab: null },
  ];

  function handleSearch(e) {
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
    const match = map.find(({ k }) => k.some((kw) => q.includes(kw)));
    if (match) {
      setActiveTab(match.t);
      setSearchOpen(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <header
        style={{
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "0 16px",
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
            gap: "10px",
          }}
        >
          {/* ── Left: Hamburger (mobile) + Brand ────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            {/* Hamburger — only visible on mobile via CSS */}
            <button
              className="mobile-menu-btn"
              onClick={onMenuOpen}
              aria-label="Open navigation menu"
              style={{
                ...iconBtn,
                padding: "8px 6px",
                // hidden on desktop via inline, shown via CSS media query
                display: "none",
              }}
            >
              {/* Hamburger icon — 3 lines */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                width={22}
                height={22}
              >
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </svg>
            </button>

            {/* Brand */}
            <button
              onClick={() => setActiveTab("overview")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-primary)",
                padding: 0,
                flexShrink: 0,
              }}
            >
              <Icons.Logo size={30} />
              {/* Brand text hidden on very small screens via CSS class */}
              <span
                className="topbar-brand-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                FIIP Portal
              </span>
            </button>
          </div>

          {/* ── Centre: Search (hidden on mobile, shown on desktop) ── */}
          <div
            className="topbar-search"
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
              onKeyDown={handleSearch}
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

          {/* ── Right: Actions ───────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
            }}
          >
            {/* Mobile search icon — only shown when topbar-search is hidden */}
            <button
              className="mobile-search-btn"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              style={{ ...iconBtn, display: "none" }}
            >
              <Icons.Search size={20} />
            </button>

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
                  width: "15px",
                  height: "15px",
                  background: "var(--red)",
                  borderRadius: "50%",
                  fontSize: "8px",
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

            {/* User menu */}
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
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "12px",
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
                  {/* User info */}
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

                  {/* Logout */}
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

        {/* ── Mobile Search Bar (expands below topbar) ─────── */}
        {searchOpen && (
          <div
            ref={searchRef}
            style={{
              position: "absolute",
              top: "var(--topbar-h)",
              left: 0,
              right: 0,
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border)",
              padding: "10px 16px",
              zIndex: 99,
              animation: "slideInDown 0.2s var(--ease)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(128,128,128,0.08)",
                border: "1px solid var(--border-light)",
                borderRadius: "30px",
                padding: "10px 16px",
              }}
            >
              <Icons.Search size={16} color="var(--text-muted)" />
              <input
                autoFocus
                type="text"
                placeholder="Search cases, documents, hearings…"
                aria-label="Mobile search"
                onKeyDown={handleSearch}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-primary)",
                  fontSize: "15px",
                  fontFamily: "var(--font-body)",
                  width: "100%",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Wallet modal */}
      {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
    </>
  );
}
