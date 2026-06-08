import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";

const NAV = [
  { section: "Main" },
  { tab: "overview", label: "Overview" },
  { tab: "cases", label: "My Cases", badge: 2 },
  { tab: "solicitors", label: "Solicitors" },
  { tab: "hearings", label: "Hearings", badge: 1 },
  { tab: "documents", label: "Documents" },
  { tab: "notifications", label: "Notifications", badge: 3 },
  { tab: "messages", label: "Messages" },
  { tab: "analytics", label: "Analytics" },
  { tab: "profile", label: "Profile" },
  { section: "Support" },
  { tab: "resources", label: "Resources" },
  { tab: "rights", label: "Your Rights" },
  { tab: "help", label: "Help Centre" },
];

// isOpen and onClose are passed from DashboardPage for mobile drawer control
export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab } = useStore();
  const { handleLogout } = useAuth();

  const linkBase = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderRadius: "var(--radius)",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "var(--font-body)",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left",
    transition: "var(--transition)",
    background: "none",
  };

  function navigate(tab) {
    setActiveTab(tab);
    // Close drawer after navigation on mobile
    if (onClose) onClose();
  }

  function logout() {
    handleLogout();
    if (onClose) onClose();
  }

  return (
    <>
      {/* ── Dim overlay (mobile only) ──────────────────────── */}
      <div
        className={`sidebar-overlay${isOpen ? " open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Sidebar / Drawer ───────────────────────────────── */}
      <aside
        className={`sidebar-drawer${isOpen ? " open" : ""}`}
        aria-label="Navigation"
        style={{
          width: "var(--sidebar-w)",
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
          padding: "14px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          // Desktop: sticky below topbar
          position: "sticky",
          top: "var(--topbar-h)",
          height: "calc(100vh - var(--topbar-h))",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {/* ── Mobile close button ─────────────────────────── */}
        {onClose && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 4px 12px",
              borderBottom: "1px solid var(--border)",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--gold)",
                paddingLeft: "10px",
              }}
            >
              FIIP Portal
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "20px",
                padding: "6px 10px",
                borderRadius: "var(--radius)",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Nav items ───────────────────────────────────── */}
        {NAV.map((item, i) => {
          if (item.section) {
            return (
              <div
                key={i}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  padding: "14px 14px 6px",
                }}
              >
                {item.section}
              </div>
            );
          }

          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => navigate(item.tab)}
              data-tab={item.tab}
              style={{
                ...linkBase,
                color: isActive ? "var(--gold)" : "var(--text-secondary)",
                background: isActive ? "rgba(201,168,76,0.08)" : "none",
                fontWeight: isActive ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "rgba(128,128,128,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "none";
                }
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: "var(--red)",
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "10px",
                    marginLeft: "auto",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* ── Logout ──────────────────────────────────────── */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "10px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={logout}
            style={{
              ...linkBase,
              color: "var(--text-muted)",
              justifyContent: "flex-start",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fca5a5";
              e.currentTarget.style.background = "rgba(224,82,82,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.background = "none";
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
