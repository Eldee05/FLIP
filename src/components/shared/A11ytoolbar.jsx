import { useStore } from "../../store/useStore";
import { Icons } from "./Icons";

// Change 2 & 4: toolbar has NO sidebar icons, NO popup alerts on click
export default function A11yToolbar() {
  const { toggleTheme } = useStore();

  const btn = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 700,
    fontFamily: "var(--font-body)",
    transition: "var(--transition)",
    boxShadow: "var(--shadow-sm)",
  };
  const hover = (e) => {
    e.currentTarget.style.borderColor = "var(--gold)";
    e.currentTarget.style.transform = "scale(1.1)";
  };
  const leave = (e) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <button
      style={{
        ...btn,
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 500,
      }}
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme"
      onMouseEnter={hover}
      onMouseLeave={leave}
    >
      <Icons.Sun size={16} />
    </button>
  );
}
