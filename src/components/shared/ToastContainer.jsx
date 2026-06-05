import { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";

const TYPE_STYLES = {
  success: { background: "var(--green)", color: "#fff" },
  error: { background: "var(--red)", color: "#fff" },
  info: { background: "var(--blue)", color: "#fff" },
  warning: { background: "var(--gold)", color: "var(--bg-primary)" },
};

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const t1 = setTimeout(() => setVisible(true), 10);
    // Start exit
    const t2 = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      onClick={() => onRemove(toast.id)}
      style={{
        padding: "13px 20px",
        borderRadius: "var(--radius)",
        fontWeight: 600,
        fontSize: "14px",
        minWidth: "280px",
        cursor: "pointer",
        boxShadow: "var(--shadow-lg)",
        transform: visible ? "translateX(0)" : "translateX(110%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s var(--ease), opacity 0.3s var(--ease)",
        ...(TYPE_STYLES[toast.type] ?? TYPE_STYLES.info),
      }}
    >
      {toast.message}
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div
      className="toast-container"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>
  );
}
