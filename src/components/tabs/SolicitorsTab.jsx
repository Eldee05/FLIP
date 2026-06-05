import { useState } from "react";
import { Card, CardBody, Badge, Button } from "../shared/UI";

const SOLICITORS = [
  {
    id: 1,
    name: "Sarah Thornton",
    firm: "Thornton & Associates",
    speciality: "Criminal Law",
    phone: "020 7946 0301",
    email: "sarah.thornton@thorntonlaw.co.uk",
    available: true,
    rating: 4.9,
    cases: 142,
    avatar: "ST",
    color: "var(--blue)",
  },
  {
    id: 2,
    name: "James Okafor",
    firm: "Okafor Legal Group",
    speciality: "Victim Advocacy",
    phone: "020 7946 0418",
    email: "j.okafor@okaforlaw.co.uk",
    available: true,
    rating: 4.8,
    cases: 89,
    avatar: "JO",
    color: "var(--green)",
  },
  {
    id: 3,
    name: "Priya Mehta",
    firm: "Crown Court Chambers",
    speciality: "Family & Abuse Law",
    phone: "020 7946 0509",
    email: "p.mehta@crownchambers.co.uk",
    available: false,
    rating: 4.7,
    cases: 203,
    avatar: "PM",
    color: "var(--purple)",
  },
  {
    id: 4,
    name: "David Whitmore",
    firm: "Whitmore & Partners",
    speciality: "Personal Injury",
    phone: "020 7946 0622",
    email: "d.whitmore@wmplaw.co.uk",
    available: true,
    rating: 4.6,
    cases: 115,
    avatar: "DW",
    color: "var(--gold)",
  },
];

function Stars({ rating }) {
  return (
    <span style={{ fontSize: "11px", color: "var(--gold)" }}>
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "var(--text-muted)", marginLeft: "4px" }}>
        {rating}
      </span>
    </span>
  );
}

export default function SolicitorsTab() {
  const [contacted, setContacted] = useState([]);

  function contact(sol) {
    if (contacted.includes(sol.id)) return;
    setContacted((p) => [...p, sol.id]);
    // Open mailto in a new tab — avoids mutating window.location directly
    const link = document.createElement("a");
    link.href = `mailto:${sol.email}?subject=Case Enquiry via FIIP Portal`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

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
          <span style={{ color: "var(--gold-light)" }}>Solicitors</span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Your Solicitors
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          Legal representatives assigned to support your case
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "18px",
        }}
      >
        {SOLICITORS.map((sol) => (
          <Card
            key={sol.id}
            style={{ transition: "var(--transition)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            <CardBody>
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: `rgba(${sol.color === "var(--blue)" ? "79,142,247" : sol.color === "var(--green)" ? "61,184,138" : sol.color === "var(--purple)" ? "159,122,234" : "201,168,76"},0.15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: sol.color,
                    flexShrink: 0,
                    border: `1px solid ${sol.color}30`,
                  }}
                >
                  {sol.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        marginBottom: "2px",
                      }}
                    >
                      {sol.name}
                    </h3>
                    <Badge variant={sol.available ? "active" : "closed"}>
                      {sol.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {sol.firm}
                  </p>
                </div>
              </div>

              {/* Speciality */}
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Speciality
                </span>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    marginTop: "2px",
                  }}
                >
                  {sol.speciality}
                </p>
              </div>

              {/* Stats */}
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "14px" }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Rating
                  </div>
                  <Stars rating={sol.rating} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Cases Handled
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 600 }}>
                    {sol.cases}
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(128,128,128,0.06)",
                  borderRadius: "var(--radius)",
                  marginBottom: "14px",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{ color: "var(--text-muted)", marginBottom: "4px" }}
                >
                  📞 {sol.phone}
                </div>
                <div
                  style={{ color: "var(--text-muted)", wordBreak: "break-all" }}
                >
                  ✉️ {sol.email}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  variant="gold"
                  size="sm"
                  style={{ flex: 1 }}
                  onClick={() => contact(sol)}
                  disabled={!sol.available}
                >
                  {contacted.includes(sol.id) ? "✓ Contacted" : "Contact"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `tel:${sol.phone.replace(/\s/g, "")}`)
                  }
                >
                  Call
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
