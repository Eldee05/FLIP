import { useStore } from "../../store/useStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  StatCard,
  Badge,
  Button,
} from "../shared/UI";

export default function OverviewTab() {
  const { currentUser, setActiveTab } = useStore();
  const firstName = currentUser?.name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease) both" }}>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "4px",
          }}
        >
          Dashboard /{" "}
          <span style={{ color: "var(--gold-light)" }}>Overview</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Good {greeting},{" "}
          <span style={{ color: "var(--gold)" }}>{firstName}</span>
        </h1>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          icon="📁"
          value="2"
          label="Active Cases"
          trend="Active"
          trendUp
          color="var(--blue)"
        />
        <StatCard
          icon="✅"
          value="3"
          label="Resolved"
          trend="+2"
          trendUp
          color="var(--green)"
        />
        <StatCard
          icon="📅"
          value="4"
          label="Hearings"
          trend="Upcoming"
          color="var(--gold)"
        />
        <StatCard
          icon="🔔"
          value="5"
          label="Notifications"
          trend="New"
          color="var(--purple)"
        />
      </div>

      {/* Quick actions */}
      <Card style={{ marginBottom: "18px" }}>
        <CardBody>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Button
              variant="gold"
              size="sm"
              onClick={() => setActiveTab("cases")}
            >
              📋 View Cases
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("hearings")}
            >
              📅 Hearings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("solicitors")}
            >
              ⚖️ Solicitors
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("messages")}
            >
              💬 Messages
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("documents")}
            >
              📂 Documents
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Cases + Hearings grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "18px" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <button
              onClick={() => setActiveTab("cases")}
              style={{
                background: "none",
                border: "none",
                color: "var(--gold-light)",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              View All →
            </button>
          </CardHeader>
          <CardBody noPadding>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Case Number", "Offence", "Status", ""].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "10px 16px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderBottom: "1px solid var(--border)",
                        background: "rgba(0,0,0,0.08)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "CASE-2024-001",
                    offence: "Assault ABH",
                    status: "active",
                  },
                  { id: "CASE-2024-002", offence: "Fraud", status: "pending" },
                ].map((c) => (
                  <tr
                    key={c.id}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(128,128,128,0.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--gold-light)",
                        cursor: "pointer",
                      }}
                    >
                      {c.id}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        fontSize: "13px",
                      }}
                    >
                      {c.offence}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        fontSize: "13px",
                      }}
                    >
                      <Badge variant={c.status}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </Badge>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setActiveTab("cases")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Hearings</CardTitle>
          </CardHeader>
          <CardBody>
            {[
              {
                day: "15",
                month: "Jun",
                case: "CASE-2024-001",
                time: "10:00 AM · Crown Court",
              },
              {
                day: "20",
                month: "Jul",
                case: "CASE-2024-002",
                time: "2:30 PM · Magistrates",
              },
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    minWidth: "46px",
                    padding: "8px",
                    background: "rgba(201,168,76,0.1)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {h.day}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--gold-light)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {h.month}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600 }}>
                    {h.case}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {h.time}
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
