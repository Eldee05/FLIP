import { useStore } from "../../store/useStore";
import { useAuth } from "../../hooks/useAuth";

// Change 2: No icons in sidebar — text labels only
const NAV = [
  { section: "Main" },
  { tab: "overview", label: "Overview" },
  { tab: "cases", label: "My Cases", badge: 2 },
  { tab: "solicitors", label: "Solicitors" }, // Change 1: replaces Timeline
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

export default function Sidebar() {
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

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        position: "sticky",
        top: "var(--topbar-h)",
        height: "calc(100vh - var(--topbar-h))",
        overflowY: "auto",
        flexShrink: 0,
      }}
    >
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
            onClick={() => setActiveTab(item.tab)}
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

      {/* Logout */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "10px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <button
          onClick={handleLogout}
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
          Sign Out
        </button>
      </div>
    </aside>
  );
}
