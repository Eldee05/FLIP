import React from "react";
import { useStore } from "../../store/useStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Th,
  Td,
  Badge,
  Button,
  StatCard,
} from "../shared/UI";

// ── Cases ─────────────────────────────────────────────────────
export function CasesTab() {
  const CASES = [
    {
      id: "CASE-2024-001",
      offence: "Assault ABH",
      offender: "Michael Roberts",
      role: "Victim",
      hearing: "15 Jun 2026",
      status: "active",
    },
    {
      id: "CASE-2024-002",
      offence: "Fraud",
      offender: "Sarah Connor",
      role: "Witness",
      hearing: "20 Jul 2026",
      status: "pending",
    },
    {
      id: "CASE-2023-089",
      offence: "Theft",
      offender: "David Brown",
      role: "Victim",
      hearing: "N/A",
      status: "closed",
    },
  ];
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
          <span style={{ color: "var(--gold-light)" }}>My Cases</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Case Management
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
          <Button variant="outline" size="sm">
            📥 Export
          </Button>
        </CardHeader>
        <CardBody noPadding>
          <Table>
            <thead>
              <tr>
                <Th>Case #</Th>
                <Th>Offence</Th>
                <Th>Offender</Th>
                <Th>Role</Th>
                <Th>Hearing</Th>
                <Th>Status</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {CASES.map((c) => (
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
                  <Td
                    style={{
                      fontWeight: 600,
                      color: "var(--gold-light)",
                      cursor: "pointer",
                    }}
                  >
                    {c.id}
                  </Td>
                  <Td>{c.offence}</Td>
                  <Td>{c.offender}</Td>
                  <Td>
                    <span style={{ fontSize: "12px", fontWeight: 500 }}>
                      {c.role}
                    </span>
                  </Td>
                  <Td style={{ color: "var(--text-muted)" }}>{c.hearing}</Td>
                  <Td>
                    <Badge variant={c.status}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </Badge>
                  </Td>
                  <Td>
                    <Button variant="outline" size="xs">
                      View
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

// ── Hearings ──────────────────────────────────────────────────
export function HearingsTab() {
  const HEARINGS = [
    {
      day: "15",
      month: "Jun",
      case: "CASE-2024-001",
      title: "Assault ABH",
      time: "10:00 AM",
      location: "Crown Court, Courtroom 4",
      judge: "Judge Williams",
      required: true,
    },
    {
      day: "20",
      month: "Jul",
      case: "CASE-2024-002",
      title: "Fraud",
      time: "2:30 PM",
      location: "Magistrates Court, Courtroom 2",
      judge: "",
      required: false,
    },
  ];
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
          <span style={{ color: "var(--gold-light)" }}>Hearings</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Hearing Schedule
        </h1>
      </div>
      <Card>
        <CardBody>
          {HEARINGS.map((h, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "16px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                marginBottom: "10px",
                alignItems: "center",
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-light)";
                e.currentTarget.style.background = "rgba(128,128,128,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  minWidth: "52px",
                  padding: "10px",
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: "var(--radius)",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
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
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                  {h.case} — {h.title}
                </h4>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "3px",
                  }}
                >
                  🕐 {h.time} · 📍 {h.location}
                  {h.judge ? ` · 👨‍⚖️ ${h.judge}` : ""}
                </p>
              </div>
              <Badge variant={h.required ? "urgent" : "pending"}>
                {h.required ? "Attendance Required" : "Optional"}
              </Badge>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

// ── Notifications ─────────────────────────────────────────────
export function NotificationsTab() {
  const NOTIFS = [
    {
      dot: "blue",
      icon: "🔔",
      title: "Hearing Scheduled",
      body: "CASE-2024-001 hearing June 15, 2026",
      time: "Today",
    },
    {
      dot: "gold",
      icon: "📋",
      title: "Evidence Filed",
      body: "New evidence submitted in CASE-2024-001",
      time: "Yesterday",
    },
    {
      dot: "green",
      icon: "✅",
      title: "Statement Processed",
      body: "Your victim statement has been received",
      time: "May 28",
    },
  ];
  const dotColor = {
    blue: "var(--blue)",
    gold: "var(--gold)",
    green: "var(--green)",
  };
  return (
    <div style={{ animation: "fadeUp 0.35s var(--ease) both" }}>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "4px",
            }}
          >
            Dashboard /{" "}
            <span style={{ color: "var(--gold-light)" }}>Notifications</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "26px",
              fontWeight: 600,
            }}
          >
            Notifications
          </h1>
        </div>
        <Badge variant="urgent">3 New</Badge>
      </div>
      <Card>
        <CardBody>
          <div style={{ position: "relative", paddingLeft: "26px" }}>
            <div
              style={{
                position: "absolute",
                left: "7px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "var(--border)",
              }}
            />
            {NOTIFS.map((n, i) => (
              <div
                key={i}
                style={{ position: "relative", paddingBottom: "22px" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-22px",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    border: `2px solid ${dotColor[n.dot]}`,
                    background: `${dotColor[n.dot]}30`,
                  }}
                />
                <h4 style={{ fontSize: "13px", fontWeight: 600 }}>
                  {n.icon} {n.title}
                </h4>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                  }}
                >
                  {n.body}
                </p>
                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    opacity: 0.6,
                  }}
                >
                  {n.time}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ── Analytics ─────────────────────────────────────────────────
export function AnalyticsTab() {
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
          <span style={{ color: "var(--gold-light)" }}>Analytics</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Case Analytics
        </h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          icon="⏱️"
          value="6.5"
          label="Avg resolution (months)"
          color="var(--blue)"
        />
        <StatCard
          icon="📊"
          value="72%"
          label="Case progress"
          color="var(--gold)"
        />
        <StatCard
          icon="⚡"
          value="4.2"
          label="Officer response (hrs)"
          color="var(--green)"
        />
        <StatCard
          icon="🏆"
          value="89%"
          label="Similar cases won"
          color="var(--purple)"
          trendUp
          trend="High"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Case Progress Timeline</CardTitle>
        </CardHeader>
        <CardBody>
          {[
            { label: "Report Filed", pct: 100, color: "var(--green)" },
            { label: "Investigation", pct: 100, color: "var(--green)" },
            { label: "Evidence Collection", pct: 100, color: "var(--green)" },
            { label: "Pre-Trial Preparation", pct: 72, color: "var(--gold)" },
            { label: "Trial", pct: 0, color: "var(--border)" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  fontSize: "13px",
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      item.pct === 100
                        ? "var(--green)"
                        : item.pct > 0
                          ? "var(--gold)"
                          : "var(--text-muted)",
                  }}
                >
                  {item.pct}%
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  background: "var(--border)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${item.pct}%`,
                    background:
                      item.pct === 100
                        ? "var(--green)"
                        : item.pct > 0
                          ? "var(--gold)"
                          : "var(--border)",
                    borderRadius: "3px",
                    transition: "width 0.8s var(--ease)",
                  }}
                />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

// ── Profile ───────────────────────────────────────────────────
export function ProfileTab() {
  const { currentUser } = useStore();
  const name = currentUser?.name || "Jane Victim";
  const vin = currentUser?.vin || "victim@example.com";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
          <span style={{ color: "var(--gold-light)" }}>Profile</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          My Profile
        </h1>
      </div>
      <Card>
        <CardBody>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg,var(--gold),var(--gold-dark))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--bg-primary)",
                  margin: "0 auto 12px",
                }}
              >
                {initials}
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                Case Victim
              </p>
            </div>
            <div>
              {[
                { label: "Full Name", value: name },
                { label: "Email / VIN", value: vin },
                { label: "Active Cases", value: "2" },
                { label: "Closed Cases", value: "1" },
                { label: "Registered", value: "March 2026" },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                      width: "120px",
                      flexShrink: 0,
                    }}
                  >
                    {row.label}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    {row.value}
                  </span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button variant="gold" size="sm">
                  Update Profile
                </Button>
                <Button variant="outline" size="sm">
                  Change PIN
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ── Resources ─────────────────────────────────────────────────
export function ResourcesTab() {
  const RESOURCES = [
    {
      icon: "📞",
      title: "Crisis Hotline",
      desc: "0800 555 3477",
      sub: "Available 24/7",
      href: "tel:08005553477",
      color: "var(--red)",
    },
    {
      icon: "⚖️",
      title: "Legal Advice",
      desc: "0300 555 0333",
      sub: "Mon–Fri, 9am–5pm",
      href: "tel:03005550333",
      color: "var(--blue)",
    },
    {
      icon: "💙",
      title: "Counselling",
      desc: "NHS Services",
      sub: "Mental health support",
      href: "#",
      color: "var(--green)",
    },
    {
      icon: "🏠",
      title: "Safe Housing",
      desc: "Emergency Referral",
      sub: "24hr placement",
      href: "#",
      color: "var(--gold)",
    },
  ];
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
          <span style={{ color: "var(--gold-light)" }}>Resources</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Support Resources
        </h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: "16px",
        }}
      >
        {RESOURCES.map((r) => (
          <a
            key={r.title}
            href={r.href}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <Card
              style={{ transition: "var(--transition)", cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <CardBody style={{ textAlign: "center", padding: "28px 20px" }}>
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                  {r.icon}
                </div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {r.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: r.color,
                    marginBottom: "3px",
                  }}
                >
                  {r.desc}
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {r.sub}
                </p>
              </CardBody>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Rights ────────────────────────────────────────────────────
export function RightsTab() {
  const RIGHTS = [
    {
      color: "var(--blue)",
      icon: "🛡️",
      title: "Right to Protection",
      body: "Reasonable protection from the accused and anyone acting for the accused.",
    },
    {
      color: "var(--gold)",
      icon: "🔔",
      title: "Right to Notice",
      body: "Timely notice of any public court proceeding involving the crime.",
    },
    {
      color: "var(--green)",
      icon: "🗣️",
      title: "Right to Be Heard",
      body: "Not to be excluded from any such public court proceeding.",
    },
    {
      color: "var(--purple)",
      icon: "⏰",
      title: "Right to No Delay",
      body: "Proceedings free from unreasonable delay.",
    },
    {
      color: "var(--red)",
      icon: "🤝",
      title: "Right to Treatment",
      body: "Treatment with fairness and respect for your dignity and privacy.",
    },
    {
      color: "var(--blue)",
      icon: "💰",
      title: "Right to Restitution",
      body: "Full and timely restitution as provided in law.",
    },
  ];
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
          <span style={{ color: "var(--gold-light)" }}>Your Rights</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Your Rights
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          As a victim, you are legally entitled to the following rights
          throughout proceedings.
        </p>
      </div>
      <Card>
        <CardBody>
          {RIGHTS.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                padding: "14px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                marginBottom: "10px",
                borderLeft: `3px solid ${r.color}`,
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(128,128,128,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{r.icon}</span>
              <div>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  {r.title}
                </h4>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

// ── Help ──────────────────────────────────────────────────────
export function HelpTab() {
  const [open, setOpen] = React.useState(null);
  const FAQ = [
    {
      q: "How do I track my case?",
      a: 'Visit "My Cases" in the sidebar for live case status updates.',
    },
    {
      q: "What should I bring to court?",
      a: "Bring your VIN, government-issued photo ID, and all case documents.",
    },
    {
      q: "How do I contact my solicitor?",
      a: 'Go to the Messages tab and click "New Message" to send a direct email.',
    },
    {
      q: "Can I upload my own documents?",
      a: "Yes — visit the Documents tab and use the upload area to add files.",
    },
    {
      q: "What does the VIN number mean?",
      a: "Your Victim Identification Number — a unique reference for your case records.",
    },
  ];
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
          Dashboard / <span style={{ color: "var(--gold-light)" }}>Help</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Help Centre
        </h1>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "18px" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardBody>
            {FAQ.map((f, i) => (
              <div key={i}>
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    {f.q}
                  </span>
                  <span
                    style={{
                      color: "var(--text-muted)",
                      transition: "var(--transition)",
                      transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    ▾
                  </span>
                </div>
                {open === i && (
                  <div
                    style={{
                      padding: "10px 0",
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardBody>
            <a
              href="tel:08005553477"
              style={{
                display: "flex",
                width: "100%",
                marginBottom: "10px",
                textDecoration: "none",
              }}
            >
              <Button variant="gold" size="md">
                📞 Call Support Line
              </Button>
            </a>
            <Button variant="outline" size="md">
              📧 Submit Ticket
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
