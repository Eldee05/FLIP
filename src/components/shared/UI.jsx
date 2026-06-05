/* ── Button ─────────────────────────────────────────────────── */
export function Button({
  children,
  variant = "gold",
  size = "md",
  disabled,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "var(--transition)",
    border: "none",
    textDecoration: "none",
  };
  const variants = {
    gold: {
      background: "linear-gradient(135deg,var(--gold),var(--gold-dark))",
      color: "var(--bg-primary)",
      boxShadow: "0 4px 16px rgba(201,168,76,0.3)",
      borderRadius: "10px",
    },
    outline: {
      background: "transparent",
      border: "1px solid var(--border-light)",
      color: "var(--text-primary)",
      borderRadius: "10px",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      borderRadius: "8px",
    },
    danger: {
      background: "rgba(224,82,82,0.12)",
      color: "var(--red)",
      border: "1px solid rgba(224,82,82,0.3)",
      borderRadius: "10px",
    },
  };
  const sizes = {
    xs: { padding: "4px 12px", fontSize: "11px", borderRadius: "20px" },
    sm: { padding: "8px 16px", fontSize: "13px" },
    md: { padding: "13px 24px", fontSize: "15px", width: "100%" },
    icon: { padding: "8px", borderRadius: "8px" },
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...sizes[size], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Badge ──────────────────────────────────────────────────── */
export function Badge({ children, variant = "info" }) {
  const styles = {
    active: { background: "rgba(61,184,138,0.15)", color: "#3db88a" },
    pending: {
      background: "rgba(201,168,76,0.15)",
      color: "var(--gold-light)",
    },
    closed: {
      background: "rgba(128,128,128,0.12)",
      color: "var(--text-muted)",
    },
    urgent: { background: "rgba(224,82,82,0.15)", color: "#e05252" },
    info: { background: "rgba(79,142,247,0.15)", color: "#4f8ef7" },
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "10px",
        fontWeight: 700,
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
}

/* ── Alert ──────────────────────────────────────────────────── */
export function Alert({ children, variant = "info" }) {
  const styles = {
    error: {
      background: "rgba(224,82,82,0.12)",
      color: "#fca5a5",
      border: "1px solid rgba(224,82,82,0.3)",
    },
    success: {
      background: "rgba(61,184,138,0.12)",
      color: "#6ee7b7",
      border: "1px solid rgba(61,184,138,0.3)",
    },
    info: {
      background: "rgba(79,142,247,0.12)",
      color: "#93c5fd",
      border: "1px solid rgba(79,142,247,0.3)",
    },
  };
  return (
    <div
      role="alert"
      style={{
        padding: "12px 16px",
        borderRadius: "var(--radius)",
        fontSize: "14px",
        fontWeight: 500,
        marginBottom: "16px",
        ...styles[variant],
      }}
    >
      {children}
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────── */
export function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export function CardHeader({ children }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
export function CardTitle({ children }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "17px",
        fontWeight: 600,
      }}
    >
      {children}
    </h3>
  );
}
export function CardBody({ children, noPadding = false, style = {} }) {
  return (
    <div style={{ padding: noPadding ? 0 : "20px", ...style }}>{children}</div>
  );
}

/* ── StatCard ───────────────────────────────────────────────── */
export function StatCard({
  icon,
  value,
  label,
  trend,
  trendUp,
  color = "var(--blue)",
}) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        transition: "var(--transition)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "var(--border-light)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <span style={{ color }}>{icon}</span>
        {trend && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "10px",
              background: trendUp
                ? "rgba(61,184,138,0.15)"
                : "rgba(201,168,76,0.15)",
              color: trendUp ? "#3db88a" : "var(--gold-light)",
            }}
          >
            {trend}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: "30px",
          fontWeight: 800,
          letterSpacing: "-1px",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          fontWeight: 500,
          marginTop: "4px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Divider ────────────────────────────────────────────────── */
export function Divider({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        margin: "24px 0",
        color: "var(--text-muted)",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      {label}
      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
    </div>
  );
}

/* ── Table ──────────────────────────────────────────────────── */
export function Table({ children }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {children}
    </table>
  );
}
export function Th({ children }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "10px 16px",
        fontSize: "10px",
        fontWeight: 700,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: "1px solid var(--border)",
        background: "rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </th>
  );
}
export function Td({ children, style = {} }) {
  return (
    <td
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)",
        fontSize: "13px",
        ...style,
      }}
    >
      {children}
    </td>
  );
}

/* ── Form Elements ──────────────────────────────────────────── */
export function FormGroup({ children, style = {} }) {
  return <div style={{ marginBottom: "18px", ...style }}>{children}</div>;
}
export function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontSize: "11px",
        fontWeight: 700,
        color: "var(--text-secondary)",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </label>
  );
}
export function Input({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  style = {},
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      style={{
        width: "100%",
        padding: "13px 16px",
        background: "rgba(128,128,128,0.08)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius)",
        fontSize: "15px",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
        outline: "none",
        transition: "var(--transition)",
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--gold)";
        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--border-light)";
        e.target.style.boxShadow = "none";
      }}
      {...rest}
    />
  );
}
export function Textarea({
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  style = {},
}) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        width: "100%",
        padding: "13px 16px",
        background: "rgba(128,128,128,0.08)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius)",
        fontSize: "15px",
        fontFamily: "var(--font-body)",
        color: "var(--text-primary)",
        outline: "none",
        transition: "var(--transition)",
        resize: "vertical",
        ...style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--gold)";
        e.target.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.1)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "var(--border-light)";
        e.target.style.boxShadow = "none";
      }}
    />
  );
}
